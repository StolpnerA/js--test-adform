import DB from "./../utils/DB";
import BusinessRequirements from "./../utils/BusinessRequirements";
let db = new DB();
let br = new BusinessRequirements();
let placeRender = document.querySelector(".workPlace");

class HolidaysPage {
  renderPage() {
    db.fetch("employees").then(data => {
      let select = `<select class="form-control" id="exampleFormControlSelect1">`;
      data.forEach(element => {
        select += `<option>${element.name}</option>`;
      }, this);
      placeRender.innerHTML = `
      <div class="container">
      <div class="form-group">
          <label for="exampleFormControlSelect1">Выбор сотрудника</label>
          ${select}
          </select>
          <label for="dateFrom">Дата начало отпуска: </label>
          <input type="date" name="calendar" class="dateFrom form-control" id="dateFrom">
          <label for="dateTo">Дата конца отпуска</label>
          <input type="date" name="calendar" class="dateTo form-control" id="dateTo">
          <div class="info"></div>
          <input class="submitHoliday btn btn-outline-primary" type="submit" value="Submit">
      </div>
  </div>
        `;
      this.addHandlerEvent();
    });
  }
  addHandlerEvent() {
    document
      .querySelector(".submitHoliday")
      .addEventListener("click", this.checkingData.bind(this));
  }
  checkingData() {
    let countDays, idEmployee, positionEmployee;
    let spanInfo = document.querySelector(".info");
    let dateFrom = document.querySelector(".dateFrom");
    let dateTo = document.querySelector(".dateTo");
    let selectEmployee = document.querySelector("#exampleFormControlSelect1");
    let valSelectEmployee =
      selectEmployee.options[selectEmployee.selectedIndex].value;
    db
      .fetch("employees")
      .then(data => {
        data.forEach(element => {
          if (element.name === valSelectEmployee) {
            idEmployee = element.id;
            positionEmployee = element.position;
            return (countDays = element.countDaysHoli);
          }
        });
      })
      .then(() => {
        return br.checkingData(
          countDays,
          dateFrom.value,
          dateTo.value,
          idEmployee,
          positionEmployee
        );
      })
      .then(() => {
        return (spanInfo.innerHTML = `<div class="alert alert-success" role="alert">Счастливого Вам отдыха</div>`);
      })
      .then(() => {
        return this.addEmployeeAfterCheckingValid(
          idEmployee,
          dateFrom.value,
          dateTo.value
        );
      })
      .then(() => {
        return db.fetch("employees");
      })
      .then(arr => {
        let diffBetweenDate = br.toCountDiffBetweenDates(
          dateFrom.value,
          dateTo.value
        );
        arr.forEach((item, i) => {
          if (item.id === idEmployee) {
            item.countDaysHoli = item.countDaysHoli - diffBetweenDate;
          }
        });
        db.setItem("employees", arr);
      })
      .catch(info => {
        spanInfo.innerHTML = `<div class="alert alert-danger" role="alert">${info}</div>`;
      });
  }
  addEmployeeAfterCheckingValid(idEmployee, dateFrom, dateTo) {
    db
      .fetch("holidays")
      .then(data => {
        let holiday = {
          idHoli: data.length + 1,
          id: idEmployee,
          dateFrom: dateFrom,
          dateTo: dateTo
        };
        data.push(holiday);
        db.setItem("holidays", data);
      })
      .catch(() => {
        let holiday = [
          {
            idHoli: 1,
            id: idEmployee,
            dateFrom: dateFrom,
            dateTo: dateTo
          }
        ];
        db.setItem("holidays", holiday);
      });
  }
}

export default HolidaysPage;

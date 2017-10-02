import DB from "./../utils/DB";
import BR from "./../utils/BusinessRequirements";
let db = new DB();
let br = new BR();
let placeRender = document.querySelector(".workPlace");

class EditHolidaysPage {
  constructor() {
    this.arrDate = [];
    this.arrEmployees = [];
    this.currentEmployee = [];
    this.currentDate = [];
  }
  init() {
    let arrHash = location.hash.split("&");
    db
      .fetch("holidays")
      .then(arrDate => {
        this.arrDate = arrDate;
        let idHoli = arrHash[0].slice(4);
        this.currentDate = arrDate.filter(item => item.idHoli === +idHoli);
        return;
      })
      .then(() => db.fetch("employees"))
      .then(arrEmployees => {
        this.arrEmployees = arrEmployees;
        let idEmployee = arrHash[1].slice(8);
        this.currentEmployee = arrEmployees.filter(
          item => item.id === +idEmployee
        );
        return;
      })
      .then(() => this.renderPage());
  }
  renderPage() {
    placeRender.innerHTML = `
        <div class="container">
        <div class="form-group">
            <label><b>${this.currentEmployee[0].name}</b></label><br>
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
  }
  addHandlerEvent() {
    document
      .querySelector(".submitHoliday")
      .addEventListener("click", this.checkingData.bind(this));
  }
  checkingData() {
    let spanInfo = document.querySelector(".info");
    let dateFrom = document.querySelector(".dateFrom");
    let dateTo = document.querySelector(".dateTo");
    let countDays = this.currentEmployee[0].countDaysHoli;
    let idEmployee = this.currentEmployee[0].id;
    let positionEmployee = this.currentEmployee[0].position;
    Promise.resolve()
      .then(() => {
        this.arrDate.forEach((item, i) => {
          if (item.idHoli === this.currentDate[0].idHoli) {
            this.arrDate.splice(i, 1);
          }
        });
        return;
      })
      .then(() => {
        return br.checkingData(
          countDays,
          dateFrom.value,
          dateTo.value,
          idEmployee,
          positionEmployee,
          this.arrDate
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
      //   .then(() => {
      //     return db.fetch("employees");
      //   })
      //   .then(arr => {
      //     let diffBetweenDate = br.toCountDiffBetweenDates(
      //       dateFrom.value,
      //       dateTo.value
      //     );
      //     arr.forEach((item, i) => {
      //       if (item.id === idEmployee) {
      //         item.countDaysHoli = item.countDaysHoli - diffBetweenDate;
      //       }
      //     });
      //     db.setItem("employees", arr);
      //   })
      .catch(info => {
        spanInfo.innerHTML = `<div class="alert alert-danger" role="alert">${info}</div>`;
      });
  }
  addEmployeeAfterCheckingValid(idEmployee, dateFrom, dateTo) {
    let holiday = {
      idHoli: this.arrDate.length + 1,
      id: idEmployee,
      dateFrom: dateFrom,
      dateTo: dateTo
    };
    this.arrDate.push(holiday);
    db.setItem("holidays", this.arrDate);
  }
}

export default EditHolidaysPage;

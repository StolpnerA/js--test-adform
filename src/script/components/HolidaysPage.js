import DB from "./../utils/DB";
import BusinessRequirements from "./../utils/BusinessRequirements";
let db = new DB();
let br = new BusinessRequirements();
let placeRender = document.querySelector(".workPlace");

class HolidaysPage {
  renderPage() {
    db.fetch("employees").then(data => {
      let select = `<select class="form-control" id="exampleFormControlSelect1">`;
      data.forEach(function(element) {
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
      .addEventListener("click", this.checkingData);
  }
  checkingData() {
    let spanInfo = document.querySelector(".info");
    let dateFrom = document.querySelector(".dateFrom");
    let dateTo = document.querySelector(".dateTo");
    br
      .checkingData(24, dateFrom.value, dateTo.value)
      .then(() => {
        spanInfo.innerHTML = `<div class="alert alert-success" role="alert">Счастливого Вам отдыха</div>`;
      })
      .catch(info => {
        spanInfo.innerHTML = `<div class="alert alert-danger" role="alert">${info}</div>`;
      });
  }
}

export default HolidaysPage;

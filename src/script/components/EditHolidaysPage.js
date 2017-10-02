import DB from "./../utils/DB";
let db = new DB();
let placeRender = document.querySelector(".workPlace");

class EditHolidaysPage {
  constructor() {
    this.arrDate = [];
    this.arrEmployees = [];
  }
  init() {
    db
      .fetch("holidays")
      .then(arrDate => (this.arrDate = arrDate))
      .then(() => db.fetch("employees"))
      .then(arrEmloyees => (this.arrEmloyees = arrEmloyees))
      .then(() => this.renderPage());
  }
  renderPage() {
    placeRender.innerHTML = `
        <div class="container">
        <div class="form-group">
            <label>Выбор сотрудника</label>
            <label for="dateFrom">Дата начало отпуска: </label>
            <input type="date" name="calendar" class="dateFrom form-control" id="dateFrom">
            <label for="dateTo">Дата конца отпуска</label>
            <input type="date" name="calendar" class="dateTo form-control" id="dateTo">
            <div class="info"></div>
            <input class="submitHoliday btn btn-outline-primary" type="submit" value="Submit">
        </div>
    </div>
          `;
  }
}

export default EditHolidaysPage;

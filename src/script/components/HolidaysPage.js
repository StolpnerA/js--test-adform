import DB from "./../utils/DB";
let db = new DB();
let placeRender = document.querySelector(".workPlace");

class HolidaysPage {
  renderPage() {
    let employees = db.fetch("employees");
    let select = `<select class="form-control" id="exampleFormControlSelect1">`;
    employees.forEach(function(element) {
      select += `<option>${element.name}</option>`;
    }, this);
    placeRender.innerHTML = `
    <div class="container">
    <div class="form-group">
        <label for="exampleFormControlSelect1">Выбор сотрудника</label>
        ${select}
        </select>
        <label for="dateFrom">Дата начало отпуска: </label>
        <input type="date" name="calendar" class="form-control" id="dateFrom">
        <label for="dateTo">Дата конца отпуска</label>
        <input type="date" name="calendar" class="form-control" id="dateTo">
        <span class="info"></span>
        <input class="submitHoliday btn btn-outline-primary" type="submit" value="Submit">
    </div>
</div>
      `;
  }
}

export default HolidaysPage;

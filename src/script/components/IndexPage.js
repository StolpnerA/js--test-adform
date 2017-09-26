import DB from "./../utils/DB";
let db = new DB();
let placeRender = document.querySelector(".workPlace");

class IndexPage {
  renderPage() {
    let employees = db.fetch("employees");
    console.log(employees);
    let tbody = `<tbody>`;
    employees.forEach(function(element) {
      tbody += `
      <tr>
        <th scope="row">${element.id}</th>
        <td>${element.name}</td>
        <td>${element.position}</td>
      </tr>
      `;
    }, this);
    placeRender.innerHTML = `
    <table class="table table-striped">
    <thead>
        <tr>
            <th>#</th>
            <th>ФИО</th>
            <th>Должность</th>
            <th>Дата Начало</th>
            <th>Дата Конца</th>
        </tr>
    </thead>
    ${tbody}
    </tbody>
    </table>
    `;
  }
  showError() {
    placeRender.innerHTML = ` <div class="alert alert-warning" role="alert">
    Нехватает данных! Добавьте отпуск для сотрудников (кнопочка выше)
    </div>;`;
  }
}
export default IndexPage;

import DB from "./../utils/DB";
let db = new DB();
class IndexPage {
  renderPage() {
    let placeRender = document.querySelector(".workPlace");
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
}
export default IndexPage;

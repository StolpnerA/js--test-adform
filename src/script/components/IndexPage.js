import DB from "./../utils/DB";
let db = new DB();
let placeRender = document.querySelector(".workPlace");

class IndexPage {
  renderPage() {
    let tbody = `<tbody>`;
    db.fetch("holidays").then(data => {
      db.fetch("employees").then(employees => {
        data.forEach(elem => {
          employees.forEach(element => {
            if (element.id === elem.id) {
              console.log(elem, element);
              tbody += `
              <tr>
                <th scope="row">${element.id}</th>
                <td>${element.name}</td>
                <td>${element.position}</td>
                <td>${elem.dateFrom}</td>
                <td>${elem.dateTo}</td>
              </tr>
              `;
            }
          });
        });
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
      });
    });
  }
  showError() {
    placeRender.innerHTML = ` <div class="alert alert-warning" role="alert">
    Нехватает данных! Добавьте отпуск для сотрудников (кнопочка выше)
    </div>;`;
  }
}
export default IndexPage;

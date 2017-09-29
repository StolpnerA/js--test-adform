import DB from "./../utils/DB";
import SortArr from "./SortArr";
let sortArr = new SortArr();
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
              let classForTr;
              let dateNow = new Date();
              let dateFrom = new Date(elem.dateFrom);
              let dateTo = new Date(elem.dateTo);
              if (dateNow < dateFrom) {
                classForTr = "upcoming";
              } else if (dateNow >= dateFrom && dateNow <= dateTo) {
                classForTr = "present";
              } else classForTr = "past";
              tbody += `
              <tr class="${classForTr}">
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
                  <th>ФИО <i class="sortByFioDescending fa fa-caret-down" aria-hidden="true"></i>
                  <i class="sortByFioАscending fa fa-caret-up" aria-hidden="true"></i>
                  </th>
                  <th>Должность</th>
                  <th>Дата Начало <i class="sortByDateFromDescending fa fa-caret-down" aria-hidden="true"></i>
                  <i class="sortByDateFromАscending fa fa-caret-up" aria-hidden="true"></i></th>
                  <th>Дата Конца</th>
              </tr>
          </thead>
          ${tbody}
          </tbody>
          </table>
          `;
        this.addHandlerEvent();
      });
    });
  }
  renderAfterSort(arr) {
    let tbody = `<tbody>`;
    db.fetch("holidays").then(data => {
      arr.forEach(element => {
        data.forEach(elem => {
          if (element.id === elem.id) {
            let classForTr;
            let dateNow = new Date();
            let dateFrom = new Date(elem.dateFrom);
            let dateTo = new Date(elem.dateTo);
            if (dateNow < dateFrom) {
              classForTr = "upcoming";
            } else if (dateNow >= dateFrom && dateNow <= dateTo) {
              classForTr = "present";
            } else classForTr = "past";
            tbody += `
            <tr class="${classForTr}">
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
              <th>ФИО <i class="sortByFioDescending fa fa-caret-down" aria-hidden="true"></i>
              <i class="sortByFioАscending fa fa-caret-up" aria-hidden="true"></i>
              </th>
              <th>Должность</th>
              <th>Дата Начало <i class="sortByDateFromDescending fa fa-caret-down" aria-hidden="true"></i>
              <i class="sortByDateFromАscending fa fa-caret-up" aria-hidden="true"></i></th>
              <th>Дата Конца</th>
          </tr>
      </thead>
      ${tbody}
      </tbody>
      </table>
      `;
      this.addHandlerEvent();
    });
  }
  showError() {
    placeRender.innerHTML = ` <div class="alert alert-warning" role="alert">
    Нехватает данных! Добавьте отпуск для сотрудников (кнопочка выше)
    </div>;`;
  }

  addHandlerEvent() {
    let btnSortByFioАscending = document.querySelector(".sortByFioАscending");
    let btnSortByFioDescending = document.querySelector(".sortByFioDescending");
    let btnSortByDateFromAscending = document.querySelector(
      ".sortByDateFromАscending"
    );
    let btnSortByDateFromDescending = document.querySelector(
      ".sortByDateFromDescending"
    );
    btnSortByFioАscending.addEventListener(
      "click",
      eventForSort("employees", "sortByFioАscending")
    );
    btnSortByFioDescending.addEventListener(
      "click",
      eventForSort("employees", "sortByFioDescending")
    );
    btnSortByDateFromAscending.addEventListener(
      "click",
      eventForSort("holidays", "sortByDateFromАscending")
    );
    btnSortByDateFromDescending.addEventListener(
      "click",
      eventForSort("holidays", "sortByDateFromDescending")
    );
    let that = this;
    function eventForSort(nameDB, sortBy) {
      return () => {
        db.fetch(nameDB).then(arr => {
          let data = sortArr.sort(arr, sortBy);
          that.renderAfterSort(arr);
        });
      };
    }
  }
}
export default IndexPage;

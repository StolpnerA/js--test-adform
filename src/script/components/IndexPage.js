import DB from "./../utils/DB";
import SortArr from "./SortArr";
import BR from "./../utils/BusinessRequirements";
let sortArr = new SortArr();
let db = new DB();
let br = new BR();
let placeRender = document.querySelector(".workPlace");

class IndexPage {
  constructor() {
    this.arrDate = [];
    this.arrEmloyees = [];
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
    let tbody = `<tbody>`;
    this.arrDate.forEach(elem => {
      this.arrEmloyees.forEach(element => {
        if (element.id === elem.id) {
          let classForTr, btnEdite, btnDel;
          let dateNow = new Date();
          let dateFrom = new Date(elem.dateFrom);
          let dateTo = new Date(elem.dateTo);
          if (dateNow < dateFrom) {
            classForTr = "upcoming";
            btnEdite = `<button type="button" class="editDate id_${elem.idHoli} idEmplo_${element.id} btn btn-light">Изменить даты</button>`;
            btnDel = `<button type="button" class="delData id_${elem.idHoli} dateFrom_${elem.dateFrom} dateTo_${elem.dateTo} idEmplo_${element.id} btn btn-light">Удалить</button>`;
          } else if (dateNow >= dateFrom && dateNow <= dateTo) {
            classForTr = "present";
          } else classForTr = "past";
          tbody += `
              <tr class="${classForTr}">
                <th scope="row">${element.id}</th>
                <td>${element.name}</td>
                <td>${element.position}</td>
                <td>${elem.dateFrom}${btnEdite || ""}${btnDel || ""}</td>
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
    let table = document.querySelector("table");
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
    table.addEventListener("click", ev => {
      if (ev.target.tagName != "BUTTON") return;
      if (ev.target.classList[0] === "editDate") {
        this.eventEditeBtn(ev);
      } else {
        this.eventRemoveBtn(ev);
      }
    });

    let that = this;
    function eventForSort(nameDB, sortBy) {
      return () => {
        let sortedArr = sortArr.sort(that.arrDate, sortBy, that.arrEmloyees);
        that.arrDate = sortedArr;
        that.renderPage();
      };
    }
  }
  eventRemoveBtn(ev) {
    let idHoli = ev.target.classList[1].slice(3);
    let dateFrom = ev.target.classList[2].slice(9);
    let dateTo = ev.target.classList[3].slice(7);
    let diffBetweenDates = br.toCountDiffBetweenDates(dateFrom, dateTo);
    let idEmplo = ev.target.classList[4].slice(8);
    db
      .fetch("holidays")
      .then(data => {
        data.forEach((item, i) => {
          if (item.idHoli == idHoli) {
            data.splice(i, 1);
          }
        });
        return data;
      })
      .then(data => {
        db.setItem("holidays", data);
        this.arrDate = data;
      })
      .then(() => db.fetch("employees"))
      .then(data => {
        data.forEach(item => {
          if (item.id == idEmplo) {
            item.countDaysHoli += diffBetweenDates;
          }
        });
        return data;
      })
      .then(newArr => {
        db.setItem("employees", newArr);
        this.arrEmloyees = newArr;
      })
      .then(() => this.renderPage());
  }
  eventEditeBtn(ev) {
    location.hash = `${ev.target.classList[1]}&${ev.target.classList[2]}`;
  }
}

export default IndexPage;

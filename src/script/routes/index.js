import IndexPage from "./../components/IndexPage";
import DB from "./../utils/DB";
import DemoData from "./../DemoData";
let indexPage = new IndexPage();
let db = new DB();
let demoData = new DemoData();
var index = {
  name: "index",
  match: "",
  onBeforeEnter: () => {},
  onEnter: () => {
    let btn = document.querySelector(".addHolidays");
    btn.innerHTML = "Добавить отпуск сотруднику";
    btn.addEventListener("click", () => {
      location.hash = "addHolidays";
    });
    db
      .fetch("employees")
      .then(data => {
        if (!data) {
          db.setItem("employees", demoData.createEmployees());
        }
      })
      .catch(() => alert("Не прошла загрузка данных с LS"));
    db
      .fetch("holidays")
      .then(() => indexPage.renderPage())
      .catch(() => indexPage.showError());
  },
  onLeave: () => {}
};

export { index };

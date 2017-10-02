import IndexPage from "./../components/IndexPage";
import DB from "./../utils/DB";
import DemoData from "./../DemoData";
let indexPage = new IndexPage();
let db = new DB();
let demoData = new DemoData();

let index = {
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
      .catch(() => db.setItem("employees", demoData.createEmployees()));
    db
      .fetch("holidays")
      .then(() => indexPage.init())
      .catch(() => indexPage.showError());
  },
  onLeave: () => {}
};

export { index };

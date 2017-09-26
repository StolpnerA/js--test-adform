import IndexPage from "./../components/IndexPage";
import DB from "./../utils/DB";
let indexPage = new IndexPage();
let db = new DB();
var index = {
  name: "index",
  match: "",
  onBeforeEnter: () => {},
  onEnter: () => {
    if (!db.fetch("employees")) {
      let count = 1;
      let employees = [
        {
          id: count++,
          name: "Столпнер Андрей Сергеевич",
          position: "Front-end developer"
        },
        {
          id: count++,
          name: "Столпнер Сергей Сергеевич",
          position: "System Administrator"
        },
        {
          id: count++,
          name: "Сукора Станислав Игоревич",
          position: "Back-end developer"
        },
        {
          id: count++,
          name: "Довгаль Алексей Владимирович",
          position: "Front-end developer"
        },
        {
          id: count++,
          name: "Иванов Иван Иванович",
          position: "Front-end developer"
        }
      ];
      db.setItem("employees", employees);
    } else if (db.fetch("holiday")) {
      indexPage.renderPage();
    } else {
      indexPage.showError();
    }
  },
  onLeave: () => {}
};

export { index };
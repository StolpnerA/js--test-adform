import IndexPage from "./../components/IndexPage";
let indexPage = new IndexPage();
var index = {
  name: "index",
  match: "",
  onBeforeEnter: () => {},
  onEnter: () => {
    if (localStorage.getItem("employess")) {
      indexPage.renderPage();
    } else {
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
      localStorage.setItem("employees", JSON.stringify(employees));
    }
  },
  onLeave: () => {}
};

export { index };

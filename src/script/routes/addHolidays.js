import HolidaysPage from "./../components/HolidaysPage";
let holidaysPage = new HolidaysPage();

var addHolidays = {
  name: "addHolidays",
  match: text => text == "addHolidays",
  onBeforeEnter: () => {},
  onEnter: () => {
    let btn = document.querySelector(".addHolidays");
    btn.removeEventListener("click", () => {
      location.hash = "addHolidays";
    });
    btn.innerHTML = "Назад";
    btn.addEventListener("click", () => {
      location.hash = "";
    });
    holidaysPage.renderPage();
  },
  onLeave: () => {}
};

export { addHolidays };

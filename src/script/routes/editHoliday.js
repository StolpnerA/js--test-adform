import EditHolidaysPage from "./../components/EditHolidaysPage";
let editHolidaysPage = new EditHolidaysPage();
var editHoliday = {
  name: "editHoliday",
  match: text => text === text,
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
    editHolidaysPage.init();
  },
  onLeave: () => {}
};

export { editHoliday };

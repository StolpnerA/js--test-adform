import HolidaysPage from "./../components/HolidaysPage";
let holidaysPage = new HolidaysPage();

var addHolidays = {
  name: "addHolidays",
  match: text => text == "addHolidays",
  onBeforeEnter: () => {},
  onEnter: () => {
    holidaysPage.renderPage();
  },
  onLeave: () => {}
};

export { addHolidays };

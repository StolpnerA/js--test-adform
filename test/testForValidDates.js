function checkingMaxCountDay(countDays) {
  if (countDays <= 1)
    return "Данный сотрудник неможет больше выходить в отпуск в данном году";
}
function checkingMaxDaysOnHoliday(dateFrom, dateTo) {
  if (!dateFrom && !dateTo) return "Выберите дату";
  dateFrom = new Date(dateFrom);
  dateTo = new Date(dateTo);
  let count = (dateTo - dateFrom) / 1000 / 60 / 60 / 24 + 1;
  if (count > 15) {
    return "Выбранный диапазон дат не соответсвуют правилу (максимальное кол. дней в отпуске = 15)";
  }
  //return "Счастилвого Вам отдыха";
}

let chai = require("chai");
let assert = chai.assert;

describe("ValidDates", function() {
  describe("checkingMaxCountDay", function() {
    it("should be return undefined if countDays > 1", function() {
      assert.isUndefined(checkingMaxCountDay(2));
    });
    it("should be return defined if countDays <= 1", () => {
      assert.isDefined(checkingMaxCountDay(1));
      assert.isDefined(checkingMaxCountDay(0));
    });
  });
  describe("checkingMaxDaysOnHoliday", () => {
    it("sould be undefined, because date select correct", () => {
      assert.isUndefined(checkingMaxDaysOnHoliday("2017-09-28", "2017-09-30"));
    });
    it("sould be defined, because date select uncorrect", () => {
      assert.isDefined(checkingMaxDaysOnHoliday("2017-09-28", "2017-10-30"));
    });
  });
});

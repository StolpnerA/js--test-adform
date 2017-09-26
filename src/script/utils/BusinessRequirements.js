class BusinessRequirements {
  //   checkingData(countDays, dateFrom, dateTo) {
  //     return Promise.resolve()
  //       .then(() => this.checkingMaxCountDay(countDays))
  //       .then(() => this.checkingMinDaysOnHoliday(dateFrom, dateTo))
  //       .then(() => this.checkingMaxDaysOnHoliday(dateFrom, dateTo));
  //   }
  checkingMaxCountDay(countDays) {
    if (countDays <= 1)
      return "Данный сотрудник неможет больше выходить в отпуск в данном году";
  }
  checkingMinDaysOnHoliday(dateFrom, dateTo) {
    if (dateTo - dateFrom < 2)
      return "Выбранный диапазон дат не соответсвуют правилу (минимальное кол. дней в отпуске = 2)";
  }
  checkingMaxDaysOnHoliday(dateFrom, dateTo) {
    if (!dateFrom && !dateTo) return "Выберите дату";
    dateFrom = new Date(dateFrom);
    dateTo = new Date(dateTo);
    let count = (dateTo - dateFrom) / 1000 / 60 / 60 / 24 + 1;
    if (count > 15) {
      return "Выбранный диапазон дат не соответсвуют правилу (максимальное кол. дней в отпуске = 15)";
    }
    //return "Счастилвого Вам отдыха";
  }
}

export default BusinessRequirements;

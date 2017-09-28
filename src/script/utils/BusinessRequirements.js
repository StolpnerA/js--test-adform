class BusinessRequirements {
  checkingData(countDays, dateFrom, dateTo) {
    if (!dateFrom || !dateTo) return Promise.reject("Выберите дату");
    return (
      Promise.resolve()
        .then(() => {
          dateFrom = new Date(dateFrom);
          dateTo = new Date(dateTo);
          return (dateTo - dateFrom) / 1000 / 60 / 60 / 24 + 1;
        })
        //.then(() => this.checkingMaxCountDay(countDays))
        .then(diffBetweenDates => {
          return this.checkingMinDaysOnHoliday(diffBetweenDates);
        })
        .then(diffBetweenDates =>
          this.checkingMaxDaysOnHoliday(diffBetweenDates)
        )
    );
  }
  checkingMaxCountDay(countDays) {
    if (countDays <= 1) {
      return Promise.reject(
        "Данный сотрудник неможет больше выходить в отпуск в данном году"
      );
    }
    return Promise.resolve();
  }
  checkingMinDaysOnHoliday(diffBetweenDates) {
    if (diffBetweenDates < 2) {
      return Promise.reject(
        "Выбранный диапазон дат не соответсвуют правилу (минимальное кол. дней в отпуске = 2)"
      );
    }
    return Promise.resolve(diffBetweenDates);
  }
  checkingMaxDaysOnHoliday(diffBetweenDates) {
    if (diffBetweenDates > 15) {
      return Promise.reject(
        "Выбранный диапазон дат не соответсвуют правилу (максимальное кол. дней в отпуске = 15)"
      );
    }
    return Promise.resolve();
  }
}

export default BusinessRequirements;

class BusinessRequirements {
  checkingData(countDays, dateFrom, dateTo) {
    if (!dateFrom || !dateTo) return Promise.reject("Выберите дату");
    return Promise.resolve()
      .then(() => this.toCountDiffBetweenDates(dateFrom, dateTo))
      .then(diffBetweenDates =>
        this.checkingMaxCountDay(countDays, diffBetweenDates)
      )
      .then(diffBetweenDates => {
        return this.checkingMinDaysOnHoliday(diffBetweenDates);
      })
      .then(diffBetweenDates =>
        this.checkingMaxDaysOnHoliday(diffBetweenDates)
      );
  }
  checkingMaxCountDay(countDays, diffBetweenDates) {
    if (countDays <= 1) {
      return Promise.reject(
        "Данный сотрудник неможет больше выходить в отпуск в данном году"
      );
    } else if (diffBetweenDates > countDays) {
      return Promise.reject(
        `Период отпуска составляет ${diffBetweenDates} дн., а у данного сотрудника осталось ${countDays} дн.`
      );
    }
    return Promise.resolve(diffBetweenDates);
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
        `Выбранный диапазон дат не соответсвуют правилу (максимальное кол. дней в отпуске = 15), а выбранно ${diffBetweenDates} дн.`
      );
    }
    return Promise.resolve();
  }
  toCountDiffBetweenDates(dateFrom, dateTo) {
    dateFrom = new Date(dateFrom);
    dateTo = new Date(dateTo);
    return (dateTo - dateFrom) / 1000 / 60 / 60 / 24 + 1;
  }
}

export default BusinessRequirements;

import DB from "./DB";
import SortArr from "./../components/SortArr";
let db = new DB();
let sortArr = new SortArr();
class BusinessRequirements {
  checkingData(countDays, dateFrom, dateTo, idEmployee, positionEmployee) {
    if (!dateFrom || !dateTo) return Promise.reject("Выберите дату");
    return Promise.resolve()
      .then(() => this.toCountDiffBetweenDates(dateFrom, dateTo))
      .then(diffBetweenDates =>
        this.checkingMaxCountDay(countDays, diffBetweenDates)
      )
      .then(diffBetweenDates => {
        return this.checkingMinDaysOnHoliday(diffBetweenDates);
      })
      .then(diffBetweenDates => this.checkingMaxDaysOnHoliday(diffBetweenDates))
      .then(() => {
        return this.filterById(idEmployee);
      })
      .then(filterArr => sortArr.sort(filterArr, "sortByDateToDescending"))
      .then(sortedArr => {
        return sortedArr.find(item => {
          if (item.dateTo < dateTo) {
            return true;
          }
        });
      })
      .then(obj => {
        if (!obj) {
          return Promise.resolve();
        }
        let diffBetweenDateLastHoli = this.toCountDiffBetweenDates(
          obj.dateFrom,
          obj.dateTo
        );
        let diffBetweenDatesWithLH = this.toCountDiffBetweenDates(
          obj.dateTo,
          dateFrom
        );
        return this.checkingRangeDates(
          diffBetweenDatesWithLH,
          diffBetweenDateLastHoli
        );
      });
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
    return Promise.resolve(diffBetweenDates);
  }
  checkingRangeDates(diffBetweenDatesWithLH, diffBetweenDateLastHoli) {
    diffBetweenDateLastHoli = diffBetweenDateLastHoli + 2;
    if (diffBetweenDateLastHoli > diffBetweenDatesWithLH) {
      let infoError = diffBetweenDateLastHoli - diffBetweenDatesWithLH;
      return Promise.reject(
        `Выбранный диапазон дат не соответсвуют правилу (минимальный период между периодами отпуска равен размеру прошлого отпуска), Вы еще должны проработать ${infoError} дн.`
      );
      return Promise.resolve();
    }
  }
  filterById(idEmployee) {
    return Promise.resolve()
      .then(() => db.fetch("holidays"))
      .catch(() => [])
      .then(data => {
        let filterArr = data.filter(item => {
          if (item.id === idEmployee) {
            return item.id;
          }
        });
        return filterArr;
      });
  }
  toCountDiffBetweenDates(dateFrom, dateTo) {
    dateFrom = new Date(dateFrom);
    dateTo = new Date(dateTo);
    return (dateTo - dateFrom) / 1000 / 60 / 60 / 24 + 1;
  }
}

export default BusinessRequirements;

import DB from "./DB";
import SortArr from "./../components/SortArr";
let db = new DB();
let sortArr = new SortArr();
class BusinessRequirements {
  constructor() {
    this.arrEmployees = [];
    this.arrDate = [];
  }
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
      .then(() => this.filterByPosition(idEmployee, positionEmployee))
      .then(() => this.filterByDateRange(dateFrom, dateTo))
      .then(filteredArr => this.chackingCountEmployeeInHoli(filteredArr))
      .then(() => {
        return this.filterById(idEmployee);
      })
      .then(filterArr => this.chackingDateWithCurrent(filterArr, dateFrom))
      .then(filterArr => sortArr.sort(filterArr, "sortByDateToDescending"))
      .then(sortedArr => {
        return sortedArr.find(item => {
          if (item.dateTo <= dateFrom) {
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
  chackingCountEmployeeInHoli(filteredArr) {
    debugger;
    let res = filteredArr.length * 100 / this.arrDate.length;
    if (!res || res > 50) {
      return Promise.reject(
        "По данной специальности нельзя уходить в отпуск (в отпуске имеют право находиться не более 50% сотрудников одной должности)"
      );
    }
    return Promise.resolve();
  }
  chackingDateWithCurrent(arr, dateFrom) {
    let tmp = arr.find(item => {
      if (item.dateFrom == dateFrom) {
        return true;
      }
    });
    if (tmp) {
      return Promise.reject("Данные даты уже имеются");
    }
    return Promise.resolve(arr);
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
  filterByPosition(idEmployee, positionEmployee) {
    return Promise.resolve()
      .then(() => db.fetch("holidays"))
      .catch(() => [])
      .then(data => (this.arrDate = data))
      .then(() => db.fetch("employees"))
      .then(data => (this.arrEmployees = data))
      .then(() => {
        this.arrEmployees = this.getUserByPositiom(
          positionEmployee,
          this.arrEmployees
        );

        this.arrDate = this.arrDate.filter(item => {
          let tmp = sortArr.getUserById(item.id, this.arrEmployees);
          if (tmp && item.id === tmp.id) {
            return item.id;
          }
        });
      });
  }
  getUserByPositiom(userPosi, users) {
    return users.filter(item => userPosi === item.position);
  }
  filterByDateRange(dateFrom) {
    let newArr = this.arrDate.filter(item => {
      return dateFrom >= item.dateFrom && dateFrom < item.dateTo;
    });
    return newArr;
  }
  toCountDiffBetweenDates(dateFrom, dateTo) {
    dateFrom = new Date(dateFrom);
    dateTo = new Date(dateTo);
    return (dateTo - dateFrom) / 1000 / 60 / 60 / 24 + 1;
  }
}

export default BusinessRequirements;

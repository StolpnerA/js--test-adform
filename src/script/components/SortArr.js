class SortArr {
  constructor() {
    this.arrEmployees = [];
    this.arrDate = [];
  }
  sort(arr, order, arrEmployees) {
    this.arrDate = arr;
    this.arrEmployees = arrEmployees;
    if (order === "sortByFioАscending") {
      arr.sort(this.sortByFioАscending.bind(this));
    } else if (order === "sortByFioDescending") {
      arr.sort(this.sortByFioDescending.bind(this));
    } else if (order === "sortByDateFromАscending") {
      arr.sort(this.sortByDateFromАscending);
    } else arr.sort(this.sortByDateFromDescending);
    return arr;
  }
  getUserById(userId, users) {
    return users.find(item => userId === item.id);
  }
  sortByFioАscending(personA, personB) {
    personA = this.getUserById(personA.id, this.arrEmployees);
    personB = this.getUserById(personB.id, this.arrEmployees);
    if (personA.name > personB.name) {
      return 1;
    } else if (personA.name < personB.name) {
      return -1;
    }
  }
  sortByFioDescending(personA, personB) {
    personA = this.getUserById(personA.id, this.arrEmployees);
    personB = this.getUserById(personB.id, this.arrEmployees);
    if (personA.name < personB.name) {
      return 1;
    } else if (personA.name > personB.name) {
      return -1;
    }
  }
  sortByDateFromАscending(personA, personB) {
    if (personA.dateFrom > personB.dateFrom) {
      return 1;
    } else if (personA.dateFrom < personB.dateFrom) {
      return -1;
    }
  }
  sortByDateFromDescending(personA, personB) {
    if (personA.dateFrom < personB.dateFrom) {
      return 1;
    } else if (personA.dateFrom > personB.dateFrom) {
      return -1;
    }
  }
}

export default SortArr;

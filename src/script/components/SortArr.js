class SortArr {
  sort(arr, order) {
    if (order === "sortByFioАscending") {
      arr.sort(this.sortByFioАscending);
    } else if (order === "sortByFioDescending") {
      arr.sort(this.sortByFioDescending);
    } else if (order === "sortByDateFromАscending") {
      arr.sort(this.sortByDateFromАscending);
    } else arr.sort(this.sortByDateFromDescending);
    console.log(arr);
    return arr;
  }
  sortByFioАscending(personA, personB) {
    if (personA.name > personB.name) {
      return 1;
    } else if (personA.name < personB.name) {
      return -1;
    }
  }
  sortByFioDescending(personA, personB) {
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

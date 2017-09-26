class DB {
  setItem(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  fetch(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}
export default DB;

class DB {
  setItem(key, data) {
    return Promise.resolve(localStorage.setItem(key, JSON.stringify(data)));
  }
  fetch(key) {
    return Promise.resolve(JSON.parse(localStorage.getItem(key)));
  }
}
export default DB;

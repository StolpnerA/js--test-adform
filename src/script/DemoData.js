class DemoData {
  createEmployees() {
    let count = 1;
    let employees = [
      {
        id: count++,
        name: "Столпнер Андрей Сергеевич",
        position: "Front-end developer",
        countDaysHoli: 24
      },
      {
        id: count++,
        name: "Столпнер Сергей Сергеевич",
        position: "System Administrator",
        countDaysHoli: 24
      },
      {
        id: count++,
        name: "Сукора Станислав Игоревич",
        position: "Back-end developer",
        countDaysHoli: 24
      },
      {
        id: count++,
        name: "Довгаль Алексей Владимирович",
        position: "Front-end developer",
        countDaysHoli: 24
      },
      {
        id: count++,
        name: "Иванов Иван Иванович",
        position: "Front-end developer",
        countDaysHoli: 24
      },
      {
        id: count++,
        name: "Паныш Илья Владимирович",
        position: "Back-end developer",
        countDaysHoli: 24
      }
    ];
    return employees;
  }
}

export default DemoData;

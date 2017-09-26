class IndexPage {
  renderPage() {
    let placeRender = document.querySelector(".workPlace");
    placeRender.innerHTML = `
    <table class="table table-striped">
    <thead>
        <tr>
            <th>#</th>
            <th>ФИО</th>
            <th>Должность</th>
            <th>Дата Начало</th>
            <th>Дата Конца</th>
        </tr>
    </thead>
</table>
    `;
  }
}
export default IndexPage;

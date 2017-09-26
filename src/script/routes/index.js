import IndexPage from "./../components/IndexPage";
var index = {
  name: "index",
  match: text => text == "index",
  onBeforeEnter: () => {},
  onEnter: () => {
    let indexPage = new IndexPage();
    indexPage.renderPage();
  },
  onLeave: () => {}
};

export { index };

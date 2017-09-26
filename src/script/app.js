import Router from "./utils/Router";
import { index } from "./routes/index";
import { addHolidays } from "./routes/addHolidays";
const routes = [index, addHolidays];
new Router({ routes });

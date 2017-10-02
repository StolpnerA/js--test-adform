import Router from "./utils/Router";
import { index } from "./routes/index";
import { addHolidays } from "./routes/addHolidays";
import { editHoliday } from "./routes/editHoliday";
const routes = [index, addHolidays, editHoliday];
new Router({ routes });

import MapRouter from "../routers/Map";
import AccountRouter from "../routers/Account";
import MapDetailRouter from "../routers/MapDetail";
import CategoryRouter from "../routers/Category";
function route(app) {
  app.use("/api", MapRouter);
  app.use("/api", AccountRouter);
  app.use("/api", MapDetailRouter);
  app.use("/api", CategoryRouter);
}
export default route;

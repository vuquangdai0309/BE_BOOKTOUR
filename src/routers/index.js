import MapRouter from "../routers/Map";
import AccountRouter from "../routers/Account";
import MapDetailRouter from "../routers/MapDetail";
import CategoryRouter from "../routers/Category";
import ViewMapRouter from "../routers/Viewmap";
import ArticlesRouter from "../routers/Articles";
function route(app) {
  app.use("/api", MapRouter);
  app.use("/api", AccountRouter);
  app.use("/api", MapDetailRouter);
  app.use("/api", CategoryRouter);
  app.use("/api", ViewMapRouter);
  app.use("/api", ArticlesRouter);
}
export default route;

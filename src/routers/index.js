import MapRouter from "../routers/Map";
import AccountRouter from "../routers/Account";
import CategoryRouter from "../routers/Category";

import ViewMapRouter from "../routers/Viewmap";
import ArticlesRouter from "../routers/Articles";
import TourRouter from "../routers/Tour";
import PackagesRouter from "../routers/Packages";
import BookingRouter from "../routers/Booking";
import ContactRouter from "../routers/Contact";
function route(app) {
  app.use("/api", MapRouter);
  app.use("/api", AccountRouter);
  app.use("/api", CategoryRouter);
  app.use("/api", ViewMapRouter);
  app.use("/api", ArticlesRouter);
  app.use("/api", TourRouter);
  app.use("/api", PackagesRouter);
  app.use("/api", BookingRouter);
  app.use("/api", ContactRouter);
}
export default route;

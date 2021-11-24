const express = require("express");
const App = express();
const connectDB = require("./db/connection");
const cors = require("cors");
const UserRoutes = require("./routes/userroutes");
const Privacy = require("./routes/privacy");
const Aboutus = require("./routes/aboutus");
const PlanRoutes = require("./routes/planroute");
// const UploadRoutes = require("./routes/UploadRoutes");
const NotesRoutes = require("./routes/NotesRoutes");

const path = require("path");

// const UserSchema = require("./models/userMoodel");
process.env.NODE_ENV !== "production" ? require("dotenv").config() : null;
connectDB();
const Port = process.env.PORT || 8080;

App.use(cors());

App.use(express.json({ extended: false, limit: "20mb" }));
App.set("views", path.join(__dirname, "views"));
App.set("view engine", "ejs");
App.use("/users", UserRoutes);
App.use("/plans",PlanRoutes)

App.use("/privacy",Privacy)
App.use("/aboutus",Aboutus)
App.use(express.static('client'))
App.use(express.static('admin'))

// App.use("/users", UploadRoutes);
App.use("/notes", NotesRoutes);

App.use(express.urlencoded({ limit: "20mb" }));


App.get("/admin", (req, res) => {

  res.sendFile(path.join(__dirname,"./admin","index.html"))
});
App.get("/*", (req, res) => {

  res.sendFile(path.join(__dirname,"./client","index.html"))

});

const server = App.listen(Port, (err, successs) => {
  if (err) throw err;
  console.log(`server running on port ${Port}`);
});
// const io = require("socket.io")(server);

require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./db");
const user = require("./controllers/usercontroller");
const gameLog = require("./controllers/gamelogcontroller");

sequelize.sync();
// sequelize.sync({ force: true });
app.use(express.json());

app.use(require("./middleware/headers"));
app.use("/user", user);

app.use(require("./middleware/validate-session"));
app.use("/gamelog", gameLog);

app.listen(process.env.PORT, () =>
  console.log("app is listening on:", process.env.PORT)
);

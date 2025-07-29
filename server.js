const express = require("express");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const kategorijaRouter = require("./routes/kategorija/kategorijaRoutes");
const brendRouter = require("./routes/brend/brendRoutes");
const radnikRouter = require("./routes/radnik/radnikRoutes");
const artikalRouter = require("./routes/artikal/artikalRoutes");
const racunRouter = require("./routes/racun/racunRoutes");

require("dotenv").config();
require("./configs/dbConnect");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "<p>Auto Otpad X API, dokumentacija: <a>https://github.com/husk1c/diplomski-api</a></p>"
  );
});

app.use("/api/v1/kategorija", kategorijaRouter);
app.use("/api/v1/brend", brendRouter);
app.use("/api/v1/radnik", radnikRouter);
app.use("/api/v1/artikal", artikalRouter);
app.use("/api/v1/racun", racunRouter);

app.use(globalErrorHandler);
app.use("*", (req, res) => {
  res.status(404).json({
    message: `${req.originalUrl}: Route not found.`,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("port is initialized");
});

require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const foodRoutes = require("./routes/food");
const predictionRoutes = require("./routes/prediction");
const historyRoutes = require('./routes/history');

const errorMiddleware = require("./middlewares/error");

const app = express();
app.use(bodyParser.json({limit: "10mb"}));

app.options("*", cors());
app.use(cors());

app.use(authRoutes);
app.use(userRoutes);
app.use(foodRoutes);
app.use(predictionRoutes);
app.use(historyRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

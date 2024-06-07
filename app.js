require("dotenv").config();

const express = require("express");

const authRoutes = require("./routes/auth");
const userRoutes = require('./routes/user');


const errorMiddleware = require("./middlewares/error");

const app = express();
app.use(bodyParser.json());

app.options("*", cors());
app.use(cors());

app.use(authRoutes);
app.use(userRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORTx}`);
});

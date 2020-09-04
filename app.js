const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const parg = require("path");

const middlewares = require("./middlewares");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/link.routes"));
app.use("/t", require("./routes/redirect.routes"));

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

if (process.env.NODE_ENV === "prodution") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (error) {
    console.log("Server Error", error.message);
    process.exit(1);
  }
};

start();

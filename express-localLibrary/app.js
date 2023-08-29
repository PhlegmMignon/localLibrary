var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const catalogRouter = require("./routes/catalog");

var app = express();

const mongoose = require("mongoose");
const { log } = require("console");
mongoose.set("strictQuery", false);
const mongoDB =
  "mongodb+srv://dmah:assdfg12S@cluster0.zyotdag.mongodb.net/?retryWrites=true&w=majority";

//Connects to mongoDB
// const mongoDB = "mongodb://73.48.170.77/32 /localLibrary";
main().catch((err) => console.log("asd" + err));
async function main() {
  await mongoose.connect(mongoDB);
}

//Defines schema
const Schema = mongoose.Schema;
const SomeModelSchema = new Schema({
  a_string: String,
  a_date: Date,
});

const SomeModel = mongoose.model("SomeModel", SomeModelSchema);

const breakfastSchema = new Schema({
  eggs: {
    type: Number,
    min: [6, "Too few eggs"],
    max: 12,
    required: [true, "Why no eggs?"],
  },
  drink: {
    type: String,
    enum: ["Coffee", "Tea", "Water"],
  },
});

// Create an instance of model SomeModel
// const awesome_isntance = new SomeModel({ name: "awesome" });
// Save the new model instance asynchronously
// await awesome_instance.save();

//Does both steps above at the same time

let awesome_instance = xyz();
console.log(awesome_instance.name);
async function xyz() {
  let thing = await SomeModel.create({ name: "also_awesome" });

  return thing;
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

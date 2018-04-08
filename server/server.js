require("dotenv").config();
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var cors = require("cors");
var http = require("http");
var socketio = require("socket.io");
var Clarifai = require("clarifai");

var logger = require("morgan");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt");

const clarifai = new Clarifai.App({
  apiKey: "f192eab32e494c4d892db3d0bc42e534"
});

var app = express();
app.use(cors());
app.use(
  logger(
    "[:date[iso]] :method :url :status :response-time ms - :res[content-length]"
  )
);

var server = http.Server(app);
var websocket = socketio(server);

var mongoose = require("mongoose");
var dbName = "MissionHack";

var response = function(res) {
  console.log(res);
};
var logError = function(err) {
  console.log(err);
};

console.log("Connecting to database " + dbName);

mongoose.connect(
  "mongodb://localhost:" + (process.env.DB_PORT || "27017") + "/" + dbName
);

var models = require("./rest/models/_models");
var genericControllers = require("./rest/controllers/_genericController");
var specificControllers = require("./rest/controllers/_specificControllers");

const writable = process.env.writable === "true" || true;

console.log(`${dbName} Database`);
console.log("Initializing ...");
console.log("Throwing in some middlewares .... ");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "uwotm8"
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("json spaces", 2);

let Members = models["members"];

passport.use(
  new LocalStrategy(function(username, password, done) {
    Members.findOne({ username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      } else {
        bcrypt.compare(password, user.userPassword(), function(err, res) {
          if (err) return done(null, false, { message: err });
          if (res === false) {
            return done(null, false);
          } else {
            return done(null, user);
          }
        });
      }
    });
  })
);

passport.serializeUser(Members.serializeUser());
passport.deserializeUser(Members.deserializeUser());

for (var model in models) {
  console.log("Registering model : " + model);
  app.use(
    "/json/" + model + "/",
    genericControllers.createRouter(model, models[model], writable, "json")
  );
}

app.use(
  "/member/",
  specificControllers.memberController(
    "members",
    models["members"],
    writable,
    "json"
  )
);

//Lets launch the service!
server.listen(process.env.PORT || 5000, () => {
  console.log(
    `------ Server is running on port ${process.env.PORT || 5000} ------`
  );
});

websocket.on("connection", socket => {
  console.log("a user connected");

  socket.emit("connection", "hello");

  socket.on("location", location => {
    console.log(location);
  });

  socket.on("notifName", notifName => {
    websocket.sockets.emit("notifName", notifName);
  });

  socket.on("photo", photo => {
    clarifai.models.predict(Clarifai.GENERAL_MODEL, { base64: photo }).then(
      response => {
        console.log("clarifai");
        setTimeout(() => {
          websocket.sockets.emit("clarifai", response.rawData.outputs[0].data);
        }, 1000);
      },
      err => {
        socket.emit("photo_error", err);
      }
    );
  });

  socket.on("notification", notification => {
    websocket.sockets.emit("notification", notification);
  });

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

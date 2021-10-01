const mongoose = require("mongoose");
mongoose.connect(
    "mongodb://localhost:27017/confetti_cuisine",
    {useNewUrlParser: true}
);
const db = mongoose.connection;
db.once("open", ()=>{
    console.log("Successfully connected to MongoDB using Mongoose!");
});
const layouts =require("express-ejs-layouts");
const subscribersController = require("./controllers/subscribersController");
const userController = require("./controllers/userController");
const methodOverride = require("method-override");

const express = require("express");
const app = express();
const errorController = require("./controllers/errorController");
const router = express.Router();

const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");

app.use(express.urlencoded({
    extended: false
}));

app.use(methodOverride("_method", {methods:["POST", "GET"]}));
router.use(cookieParser("secret_passcode"));
router.use(expressSession({
    secret: "secretPasscode",
    cookie: {
        maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
}));
router.use(connectFlash());
router.use((req, res, next) =>{
    res.locals.flashMessages = req.flash();
    next();
});

mongoose.Promise = global.Promise;

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(layouts);

app.use(express.json());
app.use(express.static("public"));
// app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);


app.get("/", (req, res)=>{res.send("Welcome to Confetti Cuisine!");});

router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post("/subscribers/create", subscribersController.create, subscribersController.redirectView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView);
router.delete("/subscribers/:id/delete", subscribersController.delete, subscribersController.redirectView);

router.get("/users", userController.index, userController.indexView);
router.get("/users/new", userController.new);
router.get("/users/login", userController.login);
router.post("/users/login", userController.authenticate, userController.redirectView);
router.post("/users/create", userController.create, userController.redirectView);
router.get("/users/:id", userController.show, userController.showView);
router.get("/users/:id/edit", userController.edit);
router.put("/users/:id/update", userController.update, userController.redirectView);
router.delete("/users/:id/delete", userController.delete, userController.redirectView);


app.use("/", router);




app.listen(app.get("port"), ()=>{
    console.log(`Server running at http://localhost:${app.get("port")}`);
});

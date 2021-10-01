const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const Course = require("./models/course");
var testSubscriber, testCourse;
mongoose.connect("mongodb://localhost:27017/confetti_cuisine",
    {useNewUrlParser: true});
mongoose.Promise = global.Promise;

Subscriber.remove({})
    .then(items=>console.log(`Remove ${items.n} records!`))
    .then(()=>{return Course.remove({})})
    .then(items=>console.log(`Remove ${items.n} records`))
    .then(()=>{return Subscriber.create({
        name: "tangqijun",
        email: "tangqijun@csvw.com",
        zipCode: "12575"
    });})
    .then(subscriber=>console.log(`Create Subscriber: ${subscriber.getInfo()}`))
    .then(()=>{return Subscriber.findOne({name: "tangqijun"})})
    .then(a=>{testSubscriber=a; console.log(`Found a subscriber: ${a.getInfo()}`)})
    .then(()=>{
        return Course.create({
            title: "Tomato land",
            description: "schinecjedih",
            zipCode: "18847",
            items: ["sshcn", "chienw"]
        });
    })
    .then(course=>{testCourse=course;console.log(`Create course ${course.title}`)})
    .then(()=>{
        testSubscriber.courses.push(testCourse);
        testSubscriber.save();
        console.log(testSubscriber);
    })
    .then(()=>{
        return Subscriber.populate(testSubscriber, "courses");
    })
    .then(subscriber=>console.log(subscriber))
    .then(()=>{return Subscriber.findOne({courses: mongoose.Types.ObjectId(testCourse._id)})})
    .then(subscriber=>console.log(subscriber));

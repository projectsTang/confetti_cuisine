const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true
    },
    maxStudents: {
        type: Number,
        default: 0,
        min: [0, "Course cannot have a negative number of students"]
    },
    cost: {
        type: Number,
        default: 0,
        min: [0, "Course cannot have a negative cost"]
    },
    // subscribers: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}]
},
    {timestamps: true}
);

module.exports = mongoose.model("Course", courseSchema);
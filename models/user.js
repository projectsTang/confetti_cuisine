const Subscriber = require("./subscriber");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose"),
    userSchema = mongoose.Schema({
    name: {
        first:{
            type: String,
            trim: true
        },
        last:{
            type: String,
            trim: true
        }
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true
    },
    zipCode: {
        type: Number,
        min: [10000, "Zip code too short"],
        max: [99999]
    },
    password: {
        type: String,
        require: true
    },
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: "Course"}],
    subscribedAccount: {type: mongoose.Schema.Types.ObjectId, ref: "Subscriber"}
},
    {timestamps: true}
);

userSchema.pre('save', function(next){
    let user = this;
    bcrypt.hash(user.password, 10).then()
});

userSchema.virtual("fullName")
    .get(function(){
        return `${this.name.first} ${this.name.last}`;
    });


userSchema.methods.passwordComparison = function(inputPassword) {
    let user = this;
    return bcrypt.compare(inputPassword, user.password);
};

module.exports = mongoose.model("User", userSchema);
const Subscriber = require("./subscriber");
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
    if (user.subscribedAccount === undefined) {
        Subscriber.findOne({email: user.email})
        .then(subscriber=>{user.subscribedAccount=subscriber;next();})
        .catch(error=>{
            console.log(`Error in connecting sunscriber: ${error.message}`);
            next(error);
        });
    }
    else {
        next();
    }
});

userSchema.virtual("fullName")
    .get(function(){
        return `${this.name.first} ${this.name.last}`;
    });

module.exports = mongoose.model("User", userSchema);
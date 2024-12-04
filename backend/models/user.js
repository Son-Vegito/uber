const mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 character long']
        },
        lastName:{
            type: String,
            minlength: [3, 'Last name must be at least 3 character long']
        }
    },
    email:{
        type: String,
        required: true,
        minlength: [5, 'Email must be at least 5 character long'],
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    socketID:{
        type: String
    }
})

const user = mongoose.model('user', userSchema)

module.exports = user

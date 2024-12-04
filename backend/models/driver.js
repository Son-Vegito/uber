const { default: mongoose } = require("mongoose");

const driverSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 character long']
        },
        lastName: {
            type: String,
            minlength: [3, 'Last name must be at least 3 character long']
        }
    },
    email: {
        type: String,
        required: true,
        minlength: [5, 'Email must be at least 5 character long'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketID: {
        type: String
    },
    status:{
        type: String,
        enum:['active', 'inactive'],
        default: 'inactive'
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minlength:[3, 'Vehicle color must be 3 or more characters long']
        },
        plate:{
            type: String,
            required: true,
            minlength:[3, 'Vehicle number must be 8 or more characters long']
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, 'Capacity must be 1 or more']
        },
        type:{
            type: String,
            enum: ['car', 'bike', 'auto'],
            required: true
        }
    },
    location:{
        lat:{
            type: Number
        },
        lng:{
            type: Number
        }
    }
})

const driverModel = mongoose.model('driver', driverSchema)

module.exports = driverModel
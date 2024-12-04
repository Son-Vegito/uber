const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const driverModel = require("../models/driver");

function generateAuthToken(driverID) {
    const token = jwt.sign({ id: driverID }, process.env.JWT_SECRET, { expiresIn: '24h' })
    return token
}

async function hashPassword(password){
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

async function comparePassword(password1, password2){
    return await bcrypt.compare(password1, password2);
}

async function createDriver({ firstName, lastName, email, password, color, plate, capacity, vehicleType}) {

    if( !firstName || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error('All fields required')
    }

    try{
        const driver = await driverModel.create({
            fullName:{
                firstName,
                lastName
            },
            email,
            password,
            vehicle:{
                color,
                plate,
                capacity,
                type: vehicleType
            }
        })
        return driver

    }
    catch(err){
        console.error(err);
        throw new Error('Something went wrong')
    }

    
}

module.exports = {
    generateAuthToken,
    hashPassword,
    comparePassword,
    createDriver
}
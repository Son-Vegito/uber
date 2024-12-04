const userModel = require("../models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function generateAuthToken(id){

    const token = jwt.sign({
        id: id
    }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    })

    return token;
}

async function hashPassword(password){
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword;
}

async function comparePassword(password1, password2){
    return await bcrypt.compare(password1, password2)
}

async function createUser({
    firstName, lastName, email, password
}){
    
    if(!firstName || !password || !email){
        throw new Error('All fields are required')
    }

    try{
        const user = await userModel.create({
            fullName: {
                firstName,
                lastName,
            },
            email,
            password
        })
        return user;
    }
    catch(err){
        console.E(err);
        throw new Error('Something went wrong')
    }

}

module.exports = {
    generateAuthToken,
    hashPassword,
    comparePassword,
    createUser
}
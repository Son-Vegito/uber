const userModel = require("../models/user");
const jwt = require('jsonwebtoken')

function generateAuthToken(id){

    const token = jwt.sign({
        id: id
    }, process.env.JWT_SECRET)

    return token;
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
    createUser
}
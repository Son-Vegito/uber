
const { z } = require('zod')
const bcrypt = require('bcrypt');
const { generateAuthToken, createUser } = require('../services/user');

const signupSchema = z.object({
    firstName: z.string({required_error: 'first name is required'}).min(3, { message: "First Name must be 3 or more characters long" }),
    lastName: z.string().min(3, { message: "Last name must be 3 or more characters long" }).optional(),
    email: z.string({ required_error:'email is required'}).min(5, { message: 'Email must be 5 or more characters long' }).email({ message: "Invalid email address" }),
    password: z.string({required_error:'password is required'}).min(6, { message: 'Password must be 6 or more characters long' })
})

async function registerUser(req, res){
    const {firstName, lastName, email, password} = req.body;

    const result = signupSchema.safeParse(req.body)

    if(!result.success){
        return res.status(400).json({
            error: result.error.errors[0].message
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try{

        const newUser = await createUser({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })
        
        const token = generateAuthToken(newUser._id);
        
        return res.status(200).json({
            message: 'User registered successfully',
            token, 
            user:newUser
        });
    }
    catch(err){
        return res.json({
            message:'Something went wrong',
            error: err
        })
    }

}

module.exports = {
    registerUser
}
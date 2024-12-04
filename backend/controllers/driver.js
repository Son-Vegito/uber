const { z } = require('zod');
const { hashPassword, createDriver, generateAuthToken } = require('../services/driver');
const driverModel = require('../models/driver');

const signupSchema = z.object({
    firstName: z.string({ required_error: 'first name is required' }).min(3, { message: "First Name must be 3 or more characters long" }),
    lastName: z.string().min(3, { message: "Last name must be 3 or more characters long" }).optional(),
    email: z.string({ required_error: 'Email is required' }).min(5, { message: 'Email must be 5 or more characters long' }).email({ message: "Invalid email address" }),
    password: z.string({ required_error: 'password is required' }).min(6, { message: 'Password must be 6 or more characters long' }),
    color: z.string({ required_error: 'Vehicle Color required' }).min(3, { message: 'Vehicle color must be 3 or more characters long' }),
    plate: z.string({ required_error: 'Vehicle Number required' }).min(8, { message: 'Vehicle Number must be 8 or more characters long' }).max(10, { message: 'Vehicle Number must not be more than 10 characters long' }),
    capacity: z.number({ required_error: 'Vehicle Capacity required' }).min(1, {message: 'Vehicle capacity must be 1 or more'}),
    vehicleType: z.enum(['car', 'bike', 'auto'], { required_error: 'Vehicle type required', message: 'Vehicle type required', invalid_type_error: 'Invalid vehicle type' })

})

async function registerDriver(req, res) {

    const {firstName, lastName, email, password, color, plate, capacity, vehicleType} = req.body;

    const result = signupSchema.safeParse(req.body)

    if(!result.success){
        return res.status(400).json({
            error: result.error.errors[0].message
        })
    }

    const driverExist = await driverModel.findOne({email});

    if(driverExist){
        return res.status(400).json({
            message: 'Email already taken'
        })
    }

    const hashedPassword = await hashPassword(password)

    try{
        const driver = await createDriver({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            color,
            plate,
            capacity,
            vehicleType
        })
        
        const token = generateAuthToken(driver._id)
        
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: driver
        })
    }
    catch(err){
        res.status(400).json({
            message: 'Something went wrong',
            error: err
        })
    }

}

module.exports = registerDriver;
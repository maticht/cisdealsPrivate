const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: false},
    password: {type: String, required: false},
    profilePoints: {type: Number, default: 0},
    role: {type: String, default: 'Sub'},
    image: [{type: String, required: false}],
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    nameOrCompany: { type: String, required: false },
    areasActivity: { type: String, required: false },
    workLocation: { type: String, required: false },
    street: { type: String, required: false },
    house: { type: String, required: false },
    apartment: { type: String, required: false },
    zip: { type: String, required: false },
    phone1: { type: String, required: false },
    phone2: { type: String, required: false },
    Facebook: { type: String, required: false },
    TikTok: { type: String, required: false },
    YouTube: { type: String, required: false },
    Instagram: { type: String, required: false },
    WhatsApp: { type: String, required: false },
    Telegram: { type: String, required: false },
    Viber: { type: String, required: false },
    LinkedIn: { type: String, required: false },
    savedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }],
    likes: { type: String, required: false },
    rating: [{
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false},
        value: {type: Number, default: 0, required: false},
        description: { type: String, required: false },
        firstName: { type: String, required: false },
        lastName: { type: String, required: false },
        commentatorId: { type: String, required: false },
    }],
    workingHoursMon: {type: {startHours1: String, startMinutes1: String, endHours1: String, endMinutes1: String,}, required: false,},
    workingHoursTue: {type: {startHours2: String, startMinutes2: String, endHours2: String, endMinutes2: String,}, required: false,},
    workingHoursWed: {type: {startHours3: String, startMinutes3: String, endHours3: String, endMinutes3: String,}, required: false,},
    workingHoursThu: {type: {startHours4: String, startMinutes4: String, endHours4: String, endMinutes4: String,}, required: false,},
    workingHoursFri: {type: {startHours5: String, startMinutes5: String, endHours5: String, endMinutes5: String,}, required: false,},
    workingHoursSat: {type: {startHours6: String, startMinutes6: String, endHours6: String, endMinutes6: String,}, required: false,},
    workingHoursSun: {type: {startHours7: String, startMinutes7: String, endHours7: String, endMinutes7: String,}, required: false,},
    city: { type: String, required: false },
    region: { type: String, required: false },
    description: { type: String, required: false },
    services: { type: String, required: false },
    price: { type: String, required: false },
    verified: { type: Boolean, default: true },

}, { toJSON: { virtuals: true } });

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id}, "key", {
        expiresIn: "21d",
    });
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("firstName").options({ allowUnknown: true }),
        lastName: Joi.string().required().label("lastName").options({ allowUnknown: true }),
        email: Joi.string().email().required().label("Email").options({ allowUnknown: true }),
        password: passwordComplexity().required().label("Password").options({ allowUnknown: true }),
        nameOrCompany:  Joi.string().required().label("Name Or Company").options({ allowUnknown: true }),
        areasActivity:  Joi.string().required().label("Areas Activity").options({ allowUnknown: true }),
        city: Joi.string().required().label("City").options({ allowUnknown: true }),
        region: Joi.string().required().label("Region").options({ allowUnknown: true }),
        street: Joi.string().required().label("street").options({ allowUnknown: true }),
        house: Joi.string().required().label("House").options({ allowUnknown: true }),
        apartment: Joi.string().required().label("Apartment").options({ allowUnknown: true }),
        zip: Joi.string().required().label("zip").options({ allowUnknown: true }),
        phone1: Joi.string().required().label("phone1").options({ allowUnknown: true }),
        phone2: Joi.string().required().label("phone2").options({ allowUnknown: true }),
        workingHoursMon: Joi.object({
            startHours1: Joi.string().required(),
            startMinutes1: Joi.string().required(),
            endHours1: Joi.string().required(),
            endMinutes1: Joi.string().required(),
        }).options({ allowUnknown: true }).label('workingHoursMon'),
        workingHoursTue: Joi.object({
            startHours2: Joi.string().required(),
            startMinutes2: Joi.string().required(),
            endHours2: Joi.string().required(),
            endMinutes2: Joi.string().required(),
        }).options({ allowUnknown: true }).label('workingHoursTue'),
        workingHoursWed: Joi.object({
            startHours3: Joi.string().required(),
            startMinutes3: Joi.string().required(),
            endHours3: Joi.string().required(),
            endMinutes3: Joi.string().required(),
        }).options({ allowUnknown: true }).label('workingHoursWed'),
        workingHoursThu: Joi.object({
            startHours4: Joi.string().required(),
            startMinutes4: Joi.string().required(),
            endHours4: Joi.string().required(),
            endMinutes4: Joi.string().required(),
        }).options({ allowUnknown: true }).label('workingHoursThu'),
        workingHoursFri: Joi.object({
            startHours5: Joi.string().required(),
            startMinutes5: Joi.string().required(),
            endHours5: Joi.string().required(),
            endMinutes5: Joi.string().required(),
        }).options({ allowUnknown: true }).label('workingHoursFri'),
        workingHoursSat: Joi.object({
            startHours6: Joi.string().required(),
            startMinutes6: Joi.string().required(),
            endHours6: Joi.string().required(),
            endMinutes6: Joi.string().required(),
        }).options({ allowUnknown: true }).label('workingHoursSat'),
        workingHoursSun: Joi.object({
            startHours7: Joi.string().label("startHours7").options({ allowUnknown: true }),
            startMinutes7: Joi.string().label("startMinutes7").options({ allowUnknown: true }),
            endHours7: Joi.string().label("endHours7").options({ allowUnknown: true }),
            endMinutes7: Joi.string().label("endMinutes7").options({ allowUnknown: true }),
        }).options({ allowUnknown: true }).label('workingHoursSun'),
        Facebook: Joi.string().required().label("Facebook").options({ allowUnknown: true }),
        TikTok: Joi.string().required().label("TikTok").options({ allowUnknown: true }),
        YouTube: Joi.string().required().label("YouTube").options({ allowUnknown: true }),
        Instagram: Joi.string().required().label("Instagram").options({ allowUnknown: true }),
        WhatsApp: Joi.string().required().label("WhatsApp").options({ allowUnknown: true }),
        Telegram: Joi.string().required().label("Telegram").options({ allowUnknown: true }),
        Viber: Joi.string().required().label("Viber").options({ allowUnknown: true }),
        LinkedIn: Joi.string().required().label("LinkedIn").options({ allowUnknown: true }),
        workLocation: Joi.string().required().label("workLocation").options({ allowUnknown: true }),
        description: Joi.string().required().label("Description").options({ allowUnknown: true }),
        services: Joi.string().required().label("Services").options({ allowUnknown: true }),
        price: Joi.string().required().label("Price").options({ allowUnknown: true }),
        image: Joi.array().items(Joi.string().uri().label('ImageURL').options({ allowUnknown: true })).max(5).label('Images').options({ allowUnknown: true }),
        savedUsers: Joi.array().items(Joi.string()).label("savedUsers").options({ allowUnknown: true }),
        likes: Joi.string().required().label("likes").options({ allowUnknown: true }),
        rating: Joi.array().items(Joi.object({
            user: Joi.string().label("User").options({ allowUnknown: true }),
            value: Joi.number().label("Value").options({ allowUnknown: true }),
            description: Joi.string().label("description").options({ allowUnknown: true }),
            firstName: Joi.string().label("firstName").options({ allowUnknown: true }),
            lastName: Joi.string().label("lastName").options({ allowUnknown: true }),
            commentatorId: Joi.string().label("commentatorId").options({ allowUnknown: true }),

        }).options({ allowUnknown: true }).label('rating')),
    });
    return schema.validate(data);
};

module.exports = { User, validate };

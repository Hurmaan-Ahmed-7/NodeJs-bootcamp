const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        unique: true,
        trim: true,
        maxlength: [40, 'A user name must have less or equal then 40 characters'],
        minlength: [10, 'A user name must have more or equal then 10 characters']
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'A user must have a password'],
        minlength: [8, 'A user password must have more or equal then 8 characters'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'A user must confirm his password'],
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: 'Passwords are not the same'
        },
    }
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    this.passwordConfirm = undefined;

    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
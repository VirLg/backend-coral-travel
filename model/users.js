import Joi from 'joi';
import { Schema, model } from 'mongoose';
import { runValidatorsAtUpdate, handleSaveError } from './hooke.js';

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // phone: {
    //   type: String,
    //   // match: /^\(\d{3}\) \d{3}-\d{4}$/,
    //   required: true,
    // },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    // password: {
    //   type: String,
    //   minlength: 6,
    //   required: true,
    // },
    // avatarURL: {
    //   type: String,
    //   required: false,
    // },
    // token: {
    //   type: String,
    //   default: null,
    // },
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    // verificationToken: {
    //   type: String,
    // },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post('save', handleSaveError);
userSchema.pre('findOneAndUpdate', runValidatorsAtUpdate);
userSchema.post('findOneAndUpdate', handleSaveError);

const User = model('user', userSchema);
export default User;

export const userJoiSignup = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string()
    // .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  password: Joi.string().min(6).required(),
});
export const userJoiSignin = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});
export const userJoiResendVerify = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

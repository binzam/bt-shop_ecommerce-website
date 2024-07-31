import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'http://localhost:5555/public/default-profile-picture/avatar.svg',
    },
    cart: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        taxRate: {
          type: Number,
          required: true,
          default: 0.15,
          min: 0,
          max: 1,
        },
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    address: {
      street: String,
      city: String,
      country: String,
      phoneNumber: String,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    resetToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.statics.signup = async function (email, password, username) {
  if (!email || !password || !username) {
    throw Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough');
  }
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hashedPassword, username });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Incorrect password');
  }

  return user;
};
export const User = model('User', userSchema);

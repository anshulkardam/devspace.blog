import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  firstName?: string;
  lastName?: string;
  socialLinks?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    x?: string;
    youtube?: string;
    linkedin?: string;
  };
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
      maxlength: [20, 'Username must be less than 20 characters'],
      unique: [true, 'Username must be unique'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      maxlength: [50, 'Email must be less than 50 characters'],
      unique: [true, 'Email must be unique'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not supported',
      },
      default: 'user',
    },
    firstName: {
      type: String,
      maxLength: [20, 'Firstname must be less than 20 characters'],
    },
    lastName: {
      type: String,
      maxLength: [20, 'lastname must be less than 20 characters'],
    },
    socialLinks: {
      website: {
        type: String,
        maxlength: [100, 'Website address must be less than 100 characters'],
      },
      facebook: {
        type: String,
        maxlength: [100, 'Facebook address must be less than 100 characters'],
      },
      youtube: {
        type: String,
        maxlength: [100, 'Youtube address must be less than 100 characters'],
      },
      x: {
        type: String,
        maxlength: [100, 'X address must be less than 100 characters'],
      },
      instagram: {
        type: String,
        maxlength: [100, 'Instagram address must be less than 100 characters'],
      },
      linkedin: {
        type: String,
        maxlength: [100, 'LinkedIn address must be less than 100 characters'],
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default model<IUser>('User', userSchema);

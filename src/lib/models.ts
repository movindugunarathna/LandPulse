import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser {
  username: string;
  email: string;
  password?: string;
  img?: string;
  isAdmin: boolean;
}

interface IPost {
  title: string;
  desc: string;
  img?: string;
  userId: string;
  slug: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export interface IUserDocument extends IUser, Document {}
export interface IPostDocument extends IPost, Document {}

export const User: Model<IUserDocument> =
  mongoose.models?.User || mongoose.model<IUserDocument>("User", userSchema);
export const Post: Model<IPostDocument> =
  mongoose.models?.Post || mongoose.model<IPostDocument>("Post", postSchema);

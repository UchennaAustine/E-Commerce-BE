import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authModel from "../model/authModel";

export const Register = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    const lock = await bcrypt.genSalt(10);
    const encrypt = await bcrypt.hash(password, lock);

    const user = await authModel.create({
      userName,
      email,
      password: encrypt,
    });

    return res.status(201).json({
      message: `Registration successful`,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: `Error Occured during registration: ${error.message}`,
      info: error,
    });
  }
};
export const SignIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await authModel.findOne({
      email,
    });

    if (user) {
      const validPassword = await bcrypt.compare(password, user?.password);

      if (validPassword) {
        const token = jwt.sign({ id: user?._id }, "password");

        return res.status(201).json({
          message: `Welcome Back ${user?.userName}`,
          data: token,
        });
      } else {
        return res.status(404).json({
          message: `Invalid Password`,
        });
      }
    } else {
      return res.status(404).json({
        message: `User Not Found`,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: `Error Occured during signing into the platform: ${error.message}`,
      info: error,
    });
  }
};

export const ViewUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await authModel.findOne({ userID });

    return res.status(201).json({
      message: `Registration successful`,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: `Error Occured during registration: ${error.message}`,
      info: error,
    });
  }
};

export const ViewAll = async (req: Request, res: Response) => {
  try {
    const user = await authModel.find();

    return res.status(20).json({
      message: `All Users`,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: `Error Occured during viewing all users: ${error.message}`,
      info: error,
    });
  }
};

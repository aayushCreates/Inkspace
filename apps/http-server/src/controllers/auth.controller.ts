import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthService } from "../services/auth.service";
import { regUserSchema } from '@repo/common/types';

const prisma = new PrismaClient();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = regUserSchema.safeParse(req.body);
    if (!data.success) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Input Fields",
      });
    }  

    const { name, email, password } = data.data;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter the required fields",
      });
    }  

    const { user, token } = await AuthService.register({
      name,
      email,
      password,
    });

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token,
    });
  } catch (err) {
    console.error("Error in register controller", err);
    res.status(500).json({
      success: false,
      message: "Server Error in registration of user",
    });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter the required fields",
      });
    }

    const { user, token } = await AuthService.login({ email, password });

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token,
    });
  } catch (err: any) {
    if (err.message === "INVALID_CREDENTIALS") {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    console.error("Error in login controller", err);
    res.status(500).json({
      success: false,
      message: "Server Error in login",
    });
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("token", cookieOptions);

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (err) {
    console.error("Error in logout controller", err);
    res.status(500).json({
      success: false,
      message: "Server Error in logout",
    });
  }
};

import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/prismaClient";
import { signToken } from "../utils/jwt";
import { AppError } from "../errors/AppError";
import { comparePassword, hashPassword } from "../utils/hash";
import { loginSchema, registerSchema } from "../validations/auth";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error, value } = registerSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errors = error?.details.reduce(
        (acc: Record<string, string>, detail) => {
          const key = detail.path[0] as string;
          acc[key] = detail.message;
          return acc;
        },
        {},
      );
      return res.status(400).json({
        code: 400,
        success: false,
        message: errors,
      });
    }

    const { username, fullname, email, password } = value;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new AppError("Email sudah terdaftar.", 422);
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        fullname,
        email,
        password: hashedPassword,
      },
    });

    const token = signToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      // maxAge: 24 * 60 * 60 * 1000,
      maxAge: 3 * 60 * 60 * 1000,
    });

    res.status(201).json({
      code: 200,
      status: "success",
      message: "Registrasi berhasil. Akun berhasil dibuat.",
      data: {
        user_id: user.id,
        username: user.username,
        name: user.fullname,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError("Invalid register", 500));
    }
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { error, value } = loginSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errors = error?.details.reduce(
        (acc: Record<string, string>, detail) => {
          const key = detail.path[0] as string;
          acc[key] = detail.message;
          return acc;
        },
        {},
      );
      return res.status(400).json({
        code: 400,
        success: false,
        message: errors,
      });
    }

    const { email, password } = value;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await comparePassword(password, user.password))) {
      throw new AppError("Email atau password salah.", 401);
    }

    const token = signToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
      // maxAge: 15 * 1000,
    });

    res.status(200).json({
      status: "success",
      message: "Login successful.",
      data: {
        user_id: user.id,
        username: user.username,
        name: user.fullname,
        email: user.email,
        avatar: user.photo_profile,
        token,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError("Invalid Login", 500));
    }
  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.user;
    // req.user sudah di-set oleh middleware authenticate
    return res.json({
      code: 200,
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token");
    return res.json({
      code: 200,
      status: "success",
      message: "Logout successful.",
    });
  } catch (error) {
    next(error);
  }
};

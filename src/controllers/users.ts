import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import prisma from "../prisma.js";
import bcrypt from "bcrypt";

export const getUsers: RequestHandler = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({ users });
};

export const getUser: RequestHandler = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  // Return custom error in middleware errors
  if (!user) {
    return next(new Error("404"));
  }

  res.json({ user });
};

export const updateUser: RequestHandler = async (req, res) => {
  const userId = req.user.userId;
  delete req.body.roles;
  console.log("from updateUser", req.user);
  const user = await prisma.user.update({
    where: { id: userId },
    data: req.body,
  });

  res.json({ user });
};

export const deleteUser: RequestHandler = async (req, res) => {
  const userId = req.user.userId;
  const result = await prisma.user.delete({
    where: { id: userId },
  });

  res.sendStatus(200);
};

export const adminDeleteUser: RequestHandler = async (req, res) => {
  const userId = parseInt(req.params.id);
  const result = await prisma.user.delete({
    where: { id: userId },
  });

  res.sendStatus(200);
};

export const getUserPosts: RequestHandler = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: {
      posts: true,
    },
  });

  // Return custom error in middleware errors
  if (!user) {
    return next(new Error("404"));
  }

  res.json({ posts: user.posts });
};

export const getUserLikedPosts: RequestHandler = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: {
      postsLiked: true,
    },
  });

  // Return custom error in middleware errors
  if (!user) {
    return next(new Error("404"));
  }

  res.json({ posts: user.postsLiked });
};

export const getUserFollowedPosts: RequestHandler = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: {
      postsFollowed: true,
    },
  });

  // Return custom error in middleware errors
  if (!user) {
    return next(new Error("404"));
  }

  res.json({ posts: user.postsFollowed });
};

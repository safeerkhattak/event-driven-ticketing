import { NextFunction, Request, Response } from "express";

export const errorHanlder = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
    console.log("somthihng went wrong",err);
    res.status(400).send({message: err.message})
};

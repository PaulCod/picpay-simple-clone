import "dotenv/config"

import express, { NextFunction, Request, Response } from "express";

import costumerRouter from "./routes/customer"

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(costumerRouter)


app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
})
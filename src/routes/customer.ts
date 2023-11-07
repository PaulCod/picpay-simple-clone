import { Router } from "express";

import customerController from "../controllers/customerController";

const routes = Router();

routes.post("/customer", customerController.create)
routes.get("/customer/:email", customerController.getByEmail)

export default routes
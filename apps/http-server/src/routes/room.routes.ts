import { Router } from "express";
import { isUserLoggedIn } from "../middlewares/auth.middleware";

const roomRouter = Router();

roomRouter.post('/create', isUserLoggedIn, createRoom);
// roomRouter.post('');

export default roomRouter;
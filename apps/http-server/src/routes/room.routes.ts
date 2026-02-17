import { Router } from "express";
import { isUserLoggedIn } from "../middlewares/auth.middleware";
import { createRoom } from "../controllers/room.controller";

const roomRouter: Router = Router();

roomRouter.post('/create', isUserLoggedIn, createRoom);
// roomRouter.post('');

export default roomRouter;
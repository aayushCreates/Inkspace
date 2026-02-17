import { Request, Response, NextFunction } from "express";
import RoomServices from "../services/room.service";

export const createRoom = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.body;
      const { roomName } = req.body;
      if(!roomName) {
        return res.status(400).json({
          success: false,
          message: "Please enter the required fields",
        });
      }

     const newRoom = await RoomServices.createRoom(roomName);
  
      res.status(200).json({
        success: true,
        message: "Room hasbeen successfully",
        data: {
          room: newRoom
        },
      });
    } catch (err) {
      console.log("Error in the room creation controller");
      return res.status(500).json({
        success: false,
        message: "Server Error in Room Creation",
      });
    }
  };
  
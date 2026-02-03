import { Request, Response, NextFunction } from "express";


export const createRoom = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {  } = req.body;
  

  
      res.status(200).json({
        success: true,
        message: "Room hasbeen successfully",
        data: {
          
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
  
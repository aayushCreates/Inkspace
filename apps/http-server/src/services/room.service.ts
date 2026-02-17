

const prisma = new PrismaClient();

export default class RoomServices {
    static async createRoom(roomName: string) {
        const isRoomExists = await prisma.room.findUnique({
            where: {
              slug: roomName
            }
          });
          if(isRoomExists) {
            throw new Error("Room is already exists");
          }
    
          const newRoom = await prisma.room.create({
            data: {
              slug: roomName
            }
          });


          return newRoom;
    }
}



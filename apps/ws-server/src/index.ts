import { WebSocket, WebSocketServer } from "ws";
import validateToken from "../utils/auth.utils";

const wss = new WebSocketServer({
  port: 8080,
});

interface JoinRoomType {
  rooms: string[];
  userId: string;
  ws: WebSocket;
}

const users: JoinRoomType[] = [];

wss.on("connection", (ws: WebSocket, req: Request) => {
  const url = req.url;
  if (!url) {
    return;
  }

  const queryParam = new URLSearchParams(url.split("?")[1]);
  const token = queryParam.get("token") as string;
  if (!token || token === "") {
    return;
  }

  const existedUser = validateToken(token);
  if (!existedUser) {
    ws.close();
    return;
  }

  users.push({
    userId: existedUser.id,
    rooms: [],
    ws
  })

  ws.on("message", (data) => {
    const parsedData = JSON.parse(data as unknown as string);

    if(parsedData.type === "join_room") {
        const user = users.find(u=> u.ws === ws);

        user?.rooms.push(parsedData.roomId);
    }

    if(parsedData.type === "leave_room") {
        const user = users.find(u=> u.ws === ws);
        if(!user) {
            return;
        }

        user.rooms = user?.rooms.filter(r=> r === parsedData.roomId);
    }

    if(parsedData.type === "chat") {
        const roomId = parsedData.roomId;
        const msg = parsedData.message;

        users.forEach(user=> {
            if(user.rooms.includes(roomId)) {
                user.ws.send(JSON.stringify({
                    type: "chat",
                    roomId: roomId,
                    message: msg
                }));
            }
        });
    }

  });
});
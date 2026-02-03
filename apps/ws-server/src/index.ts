import { WebSocket, WebSocketServer } from "ws";
import { validateToken } from "../utils/auth.utils";

const wss = new WebSocketServer({
    port: 8080
});

wss.on("connection", (ws: WebSocket, req: Request)=> {
    const url = req.url;
    if(!url) {
        return;
    }

    const queryParam = new URLSearchParams(url.split('?')[1]);
    const token = queryParam.get("token") as string;
    if(!token || token === "") {
        return;
    }

    const existedUser = validateToken(token);
    if(!existedUser) {
        ws.close();
        return;
    }

    ws.on("message", (data)=> {
        console.log("Coming data:", data);
    });

});



import http from "http";
import { WebSocketServer } from "ws";
import express from "express";
// express로 할 일: views를 설정해주고 render 해주기
// 나머지는 websocket에서 실시간으로 일어날예정

// ES 모듈로 간주되어 __dirname이 정의되지 않았기 때문에 발생
import { fileURLToPath } from "url";
import { dirname } from "path";
import { stripVTControlCharacters } from "util";

// ES 모듈에서는 __dirname 변수를 사용할 수 없습니다.
// 대신에 import.meta.url을 사용하여 현재 모듈의 경로를 얻을 수 있습니다.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set("view engine", "pug"); // Pug로 view engine 설정
app.set("views", __dirname + "/views"); // Express에 templates이 어디있는지 지정
app.use("/public", express.static(__dirname + "/public"));
// 유저가 /public으로 가게되면 __dirname + "/public" 폴더를 보여주게 함
// public url을 생성해서 유저에게 파일 공유
app.get("/", (req, res) => res.render("home"));
// 사용할 유일한 root 만들기, home으로 가면 request, response를 받고 res.render 하기
app.get("/*", (req, res) => res.redirect("/"));
// catchall url을 만들고 싶다면 위의 코드처럼 작성, 유저가 어떤 url로 이동하던지 홈으로 이동하도록 설정
const handleListen = () => console.log(`Listen on http://localhost:3000`);

// 여기서 서버만들기 createServer를 하려면 requestListener 경로가 있어야된다.
const server = http.createServer(app);
// 같은 서버에서 http, webSocket 둘 다 작동시키기
const wss = new WebSocketServer({ server });

function onSocketClose() {
  console.log("Disconnected from the Browser❌");
}

function onSocketMessage(message) {
  console.log(message.toString());
}

wss.on("connection", (socket) => {
  console.log("Connected to Browser✅");
  socket.on("close", onSocketClose);
  // "close"은 브라우저의 탭을 닫거나, 컴퓨터가 잠자기 모드에 들어갈때 실ㅇ
  socket.on("message", onSocketClose);
  socket.send("hello!!!");
});

server.listen(3000, handleListen);

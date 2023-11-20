import express from "express";
// express로 할 일: views를 설정해주고 render 해주기
// 나머지는 websocket에서 실시간으로 일어날예정

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
app.listen(3000, handleListen);

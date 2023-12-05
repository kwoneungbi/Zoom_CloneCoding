# Boom

Babel, Nodemon, Express을 활용해서 NodeJS 프로젝트 설정하기

Zoom Clone using Node.js, WebRTC and WebSockets

1. 개발 환경 구축하기
   Nodemon을 설정하기 위해 nodemon.json 생성
   nodemon은 변경 사항이 있을시 서버를 재시작 해주는 프로그램이다.
   서버를 재시작하는 대신에 babel-node를 실행하게 된다.
   babel은 작성한 코드를 일반 nodeJS코드로 컴파일 해주는데 그 작업을 src/server.js파일에 해준다.

2. 파일 설명
   server.js
   express를 import하고 express 어플리케이션을 구상한다.
   view engine을 Pug로 설정하고, views 디렉토리가 설정되고 public 파일들에 대해서도 똑같은 작업을 해준다.
   `app.use("/public", express.static(__dirname + "/public"));`
   위의 코드는 public 폴더를 유저에게 공개해준다. (유저는 서버 내 모든 폴더들을 볼수없지만 이렇게 폴더를 따로 지정해주어 공개해준다. /public 으로 이동할 시 public 폴더 내용을 볼수 있게 해준다.)
   `app.get("/", (req, res) => res.render("home"));`
   위의 코드는 홈페이지로 이동시 사용될 템플릿을 렌더해준다.
   `app.get("/*", (req, res) => res.redirect("/"));`
   위의 코드는 유저가 어떤 url로 이동하던지 홈으로 이동하도록 설정

   public의 파일들은 FrontEnd에서 구동되는 코드이다.
   server.js는 BackEnd에서 구동되고 app.js는 FrontEnd에서 구동된다.

   babel-node를 실행시키면 babel-node는 바로 babel.config.json을 찾고 코드에 적용돼야 하는 preset을 실행시킨다.

3. WS사용

   > npm i ws

   ReferenceError: \_\_dirname is not defined in ES module scope

이 오류는 ES 모듈로 간주되어 \_\_dirname이 정의되지 않았기 때문에 발생한다. 오류 메시지에 따르면 파일이 .js 확장자를 가지고 있고 package.json 파일에 "type": "module"이 설정되어 있어 ES 모듈로 처리되고 있다고 나와 있다.

ES 모듈에서는 \_\_dirname 변수를 사용할 수 없다. 대신에 import.meta.url을 사용하여 현재 모듈의 경로를 얻을 수 있다.

따라서, \_\_dirname을 사용하는 부분을 import.meta.url로 변경해야 한다. 예를 들면 다음과 같이 변경할 수 있다.

```js
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

위의 코드를 사용하면 ES 모듈에서도 \_\_dirname을 사용할 수 있게 된다. import.meta.url을 사용하여 현재 모듈의 URL을 얻고, fileURLToPath 함수를 사용하여 URL을 파일 경로로 변환한 다음, dirname 함수를 사용하여 디렉토리 경로를 얻는다.

이렇게 변경하여 \_\_dirname이 정의되어 오류가 해결되었다.

4. WebSocket()

   > `var aWebSocket = new WebSocket(url, [, protocols]);`

5. front와 backaddListener 
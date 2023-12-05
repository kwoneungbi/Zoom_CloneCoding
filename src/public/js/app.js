// npm run dev

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`);

function handleOpen() {
  console.log("Connected to Server ✅");
}

function handleMessage(message) {
  console.log("New message: ", message.data);
}

function handleClose() {
  console.log("Disconnected from Server ❌");
}

socket.addEventListener("open", handleOpen);

socket.addEventListener("message", handleMessage);

socket.addEventListener("close", handleClose);

// setTimeout(() => {
//   socket.send("hello from the browser!");
// }, 10000);

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);

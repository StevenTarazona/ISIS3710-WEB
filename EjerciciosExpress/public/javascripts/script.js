const ws = new WebSocket("ws://localhost:3000");
const http = new XMLHttpRequest();

ws.onmessage = (msg) => {
  const json = JSON.parse(msg.data);
  if (!json.length) {
    http.open("GET", "http://localhost:3000/chat/api/messages/", true);
    http.send();
    http.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        try {
          var myArr = JSON.parse(this.responseText);
          myArr.map((item) => {
            const msg = {
              message: item.message,
              author: item.author,
            };
            ws.send(JSON.stringify(msg));
          });
        } catch (error) {
          console.log(this.responseText);
        }
      } else if (this.readyState == 4 && this.status == 400)
        console.log(this.responseText);
    };
  } else renderMessages(json);
};

const renderMessages = (data) => {
  const html = data
    .map((item) => {
      try {
        const msg = JSON.parse(item);
        return `<p><b>${msg.author}:</b> ${msg.message}</p>`;
      } catch (error) {}
    })
    .join(" ");
  document.getElementById("messages").innerHTML = html;
};

const handleSubmit = (evt) => {
  document.getElementById("error").innerHTML = "";
  evt.preventDefault();
  const messageIn = document.getElementById("message");
  const authorIn = document.getElementById("author");
  const msg = {
    message: messageIn.value,
    author: authorIn.value,
  };
  const post = JSON.stringify(msg);
  http.open("POST", "http://localhost:3000/chat/api/messages/");
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  http.send(post);
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      ws.send(post);
      messageIn.value = "";
    } else if (this.readyState == 4 && this.status == 400) {
      document.getElementById("error").innerHTML = this.responseText;
      console.log(this.responseText);
    }
  };
};

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);

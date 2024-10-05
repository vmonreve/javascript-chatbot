const apiKey = "c9a66ff4c644994051057f1e4dc2c858";

// convert ti 12 hour format
function getCurrentTime() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let ampm = hours >= 12 ? " PM" : " AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // handle midnight (0 hours)

  // pad minutes with leading zero if neccessary
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // create the formatted time string
  const formattedTime = hours + ":" + minutes + "" + ampm;
  return formattedTime;
}
function sendMessage() {
  const userInput = document.getElementById("userInput");
  const message = userInput.value;

  if (message.trim() !== "") {
    appendMessage("You", message);
    userInput.value = "";
    processMessage(message);
  }
}

function appendMessage(sender, message) {
  let chatContainer = document.getElementById("chatContainer");
  let messageElement = document.createElement("p");
  messageElement.innerHTML = "<strong> " + sender + " </strong>" + message;
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function processMessage(message) {
  if (message.includes("hello")) {
    response = "I am a chatbot, so i don't feelings, but thank you for asking ";
  } else if (message.includes("time")) {
    let formattedTime = getCurrentTime();
    response = `The current time is: ${formattedTime}`;
  } else if (message.includes("weather")) {
    getWeather("Tondano");
  }

  setTimeout(function () {
    appendMessage("chatbot", response);
  }, 5000);
}

const getWeather = (city) => {
  let api = apiKey;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      let description = data.weather[0].description;
      response = `The weather today is ${description}`;
      // appendMessage("Chatbot", response);
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

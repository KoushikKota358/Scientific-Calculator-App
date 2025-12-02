let display = document.getElementById("display");

// --------------- Calculator Functions ---------------
function insert(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteChar() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    let expression = display.value;

    expression = expression.replace(/sin/g, "Math.sin");
    expression = expression.replace(/cos/g, "Math.cos");
    expression = expression.replace(/tan/g, "Math.tan");
    expression = expression.replace(/log/g, "Math.log");

    try {
        display.value = eval(expression);
    } catch {
        display.value = "Error";
    }
}

// --------------- Voice Recognition ---------------
let voiceBtn = document.getElementById("voiceBtn");
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    let recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;

    voiceBtn.onclick = () => {
        recognition.start();
        voiceBtn.innerText = "🎙 Listening...";
    };

    recognition.onresult = (event) => {
        voiceBtn.innerText = "🎤 Voice";

        let voiceText = event.results[0][0].transcript.toLowerCase();
        let processed = voiceText
            .replace(/plus/g, "+")
            .replace(/minus/g, "-")
            .replace(/into|multiply|multiplied/g, "*")
            .replace(/divide|divided/g, "/")
            .replace(/by/g, "/")
            .replace(/point/g, ".")
            .replace(/sin/g, "sin(")
            .replace(/cos/g, "cos(")
            .replace(/tan/g, "tan(")
            .replace(/log/g, "log(")
            .replace(/square root|sqrt/g, "Math.sqrt(")
            .replace(/pi/g, "3.14159")
            .replace(/equals|equal|result/g, "=");

        if (processed.includes("=")) {
            processed = processed.replace("=", "");
            display.value = processed;
            calculate();
        } else {
            display.value = processed;
        }
    };

    recognition.onerror = (event) => {
        voiceBtn.innerText = "🎤 Voice";
        alert("Voice Recognition Error: " + event.error);
    };
} else {
    alert("Your browser does not support voice recognition. Use Chrome or Edge.");
}

// --------------- Dark/Light Mode Toggle ---------------
let themeToggle = document.getElementById("themeToggle");
let themeLabel = document.getElementById("themeLabel");

themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
        document.body.classList.add("light-mode");
        themeLabel.innerText = "Dark Mode";
    } else {
        document.body.classList.remove("light-mode");
        themeLabel.innerText = "Light Mode";
    }
});
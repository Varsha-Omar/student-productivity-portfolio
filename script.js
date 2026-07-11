function showMessage() {
    alert("Welcome to Student Productivity & Portfolio Web Application");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

/* ---------------- CONTACT FORM ---------------- */

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let phone = document.getElementById("phone").value;
            let subject = document.getElementById("subject").value;
            let message = document.getElementById("message").value;

            if (!name || !email || !phone || !subject || !message) {
                alert("Please fill all fields!");
                return;
            }

            alert("Form submitted successfully!");
            this.reset();
        });
    }

    /* ---------------- TO DO LIST ---------------- */

    window.addTask = function () {

    let taskInput = document.getElementById("taskInput");

    if (!taskInput) return;

    let task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");

    li.innerHTML = `
        ${task}
        <button onclick="removeTask(this)">Delete</button>
    `;

    document.getElementById("taskList").appendChild(li);

    saveTasks();   // ✅ Local Storage Save

    taskInput.value = "";
};

window.removeTask = function (button) {

    button.parentElement.remove();

    saveTasks();   // ✅ Update Local Storage
};

function saveTasks() {

    let tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push(li.childNodes[0].textContent.trim());
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {

        let li = document.createElement("li");

        li.innerHTML = `
            ${task}
            <button onclick="removeTask(this)">Delete</button>
        `;

        document.getElementById("taskList").appendChild(li);

    });

}

if (document.getElementById("taskList")) {
    loadTasks();
}

    /* ---------------- QUIZ APP ---------------- */


    const questions = [
        {
            question: "HTML ka full form kya hai?",
            options: ["Hyper Text Markup Language", "High Text Makeup Language", "Home Tool Markup Language", "None"],
            answer: 0
        },
        {
            question: "CSS ka use kis liye hota hai?",
            options: ["Structure", "Styling", "Database", "Logic"],
            answer: 1
        },
        {
            question: "JS ka full form?",
            options: ["Java Style", "JavaScript", "Just Script", "None"],
            answer: 1
        },
        {
            question: "Tag for link in HTML?",
            options: ["<a>", "<link>", "<href>", "<p>"],
            answer: 0
        }
    ];

    let currentIndex = 0;
    let score = 0;
    let selected = false;
    let time = 10;
    let timer;

    const questionBox = document.getElementById("question");
    const optionsBox = document.querySelectorAll(".option");
    const nextBtn = document.getElementById("nextBtn");
    const resultBox = document.getElementById("result");
    const timerBox = document.getElementById("timer");
    const progressBar = document.getElementById("progressBar");

    function startTimer() {
        if (!timerBox) return;

        time = 10;
        timerBox.innerText = `⏱️ Time: ${time}`;

        timer = setInterval(() => {
            time--;
            timerBox.innerText = `⏱️ Time: ${time}`;

            if (time === 0) {
                clearInterval(timer);
                autoNext();
            }
        }, 1000);
    }

    function updateProgress() {
        if (!progressBar) return;

        let progress = (currentIndex / questions.length) * 100;
        progressBar.style.width = progress + "%";
    }

    function loadQuestion() {

        if (!questionBox || optionsBox.length === 0) {
            console.error("Quiz elements missing in HTML");
            return;
        }

        selected = false;
        nextBtn.style.display = "none";

        clearInterval(timer);
        startTimer();

        let q = questions[currentIndex];
        questionBox.innerText = q.question;

        optionsBox.forEach((btn, i) => {
            btn.innerText = q.options[i];
            btn.disabled = false;
            btn.style.background = "";
            btn.style.color = "";

            btn.onclick = () => checkAnswer(btn, i);
        });

        updateProgress();
    }

    function checkAnswer(btn, i) {

        if (selected) return;
        selected = true;

        clearInterval(timer);

        let correct = questions[currentIndex].answer;

        optionsBox.forEach((b, index) => {
            b.disabled = true;

            if (index === correct) {
                b.style.background = "green";
                b.style.color = "white";
            } else if (index === i) {
                b.style.background = "red";
                b.style.color = "white";
            }
        });

        if (i === correct) score++;

        nextBtn.style.display = "block";
    }

    function autoNext() {
        optionsBox.forEach(b => b.disabled = true);
        nextBtn.style.display = "block";
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            currentIndex++;

            if (currentIndex < questions.length) {
                loadQuestion();
            } else {
                showResult();
            }
        };
    }

    function showResult() {

        document.getElementById("quizBox").style.display = "none";
        resultBox.style.display = "block";

        let percent = (score / questions.length) * 100;

        let msg = "";
        if (percent >= 75) msg = "🔥 Excellent!";
        else if (percent >= 50) msg = "👍 Good Job!";
        else msg = "😅 Try Again!";

        resultBox.innerHTML = `
            🎉 Score: ${score} / ${questions.length} <br>
            ${msg}
        `;
    }

    window.restartQuiz = function () {

        currentIndex = 0;
        score = 0;

        document.getElementById("quizBox").style.display = "block";
        resultBox.style.display = "none";

        loadQuestion();
    };

    /* SAFE START */
    if (questionBox) {
        loadQuestion();
    }

});

/* =====WHeather app==== */

async function getWeather() {

    const city = document.getElementById("city").value;
    const card = document.getElementById("weatherCard");

    if (!city) {
        alert("Please enter city name!");
        return;
    }

    const apiKey = "2b37f25ee540b056896c60388783dce3";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.cod == 404) {
            card.innerHTML = "❌ City not found!";
            return;
        }

        card.innerHTML = `
            🌍 <b>City:</b> ${data.name} <br>
            🌡️ <b>Temperature:</b> ${data.main.temp} °C <br>
            ☁️ <b>Weather:</b> ${data.weather[0].description} <br>
            💨 <b>Wind Speed:</b> ${data.wind.speed} m/s
        `;

    } catch (error) {
        card.innerHTML = "⚠️ Error fetching weather data";
    }
}
/* ================= PRODUCT FILTER ================= */

function filterProducts() {

    let category = document.getElementById("categoryFilter").value;
    let products = document.querySelectorAll(".products .card");

    products.forEach(card => {

        if (category === "all") {
            card.style.display = "block";
        }

        else if (card.dataset.category === category) {
            card.style.display = "block";
        }

        else {
            card.style.display = "none";
        }

    });

}

/* ================= PRODUCT SORT ================= */

function sortProducts() {

    let option = document.getElementById("sortPrice").value;

    let container = document.getElementById("productContainer");

    let cards = Array.from(container.querySelectorAll(".card"));

    cards.sort((a, b) => {

        let priceA = Number(a.dataset.price);

        let priceB = Number(b.dataset.price);

        if (option === "low") {

            return priceA - priceB;

        }

        else if (option === "high") {

            return priceB - priceA;

        }

        else {

            return 0;

        }

    });

    cards.forEach(card => container.appendChild(card));

}

 // Scroll To Top Button

let topButton = document.getElementById("topBtn");

// Show button when user scrolls down
window.onscroll = function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
};

// Scroll smoothly to the top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

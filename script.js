function showMessage() {
alert("Welcome to Student Productivity & Portfolio Web Application");
}
function toggleDarkMode(){
    document.body.classList.toggle("dark");
}
 
document.getElementById("contactForm").addEventListener("submit", function(e) {
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
function addTask() {

    let taskInput = document.getElementById("taskInput");

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

    taskInput.value = "";
}

function removeTask(button) {

    button.parentElement.remove();

}

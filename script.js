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

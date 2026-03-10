const form = document.getElementById("form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");

const strength = document.getElementById("strength");


// NAME VALIDATION
nameInput.addEventListener("input", () => {
if(nameInput.value.length < 3){
document.getElementById("nameError").innerText = "Name must be 3 characters";
}else{
document.getElementById("nameError").innerText = "";
}
});


// EMAIL VALIDATION
emailInput.addEventListener("input", () => {

const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

if(!emailInput.value.match(pattern)){
document.getElementById("emailError").innerText="Invalid email";
}else{
document.getElementById("emailError").innerText="";
}

});


// PHONE VALIDATION
phoneInput.addEventListener("input", () => {

if(phoneInput.value.length != 10){
document.getElementById("phoneError").innerText="Phone must be 10 digits";
}else{
document.getElementById("phoneError").innerText="";
}

});


// PASSWORD STRENGTH
passwordInput.addEventListener("input", () => {

let pass = passwordInput.value;

if(pass.length < 6){
strength.innerText = "Weak Password";
strength.style.color="red";
}
else if(pass.length < 10){
strength.innerText = "Medium Password";
strength.style.color="orange";
}
else{
strength.innerText = "Strong Password";
strength.style.color="green";
}

});


// SHOW / HIDE PASSWORD
document.getElementById("toggle").addEventListener("click", () => {

if(passwordInput.type === "password"){
passwordInput.type="text";
}else{
passwordInput.type="password";
}

});


// FORM SUBMIT
form.addEventListener("submit", function(e){

e.preventDefault();

let submission = {

name: nameInput.value,
email: emailInput.value,
phone: phoneInput.value,
password: passwordInput.value

};

let data = JSON.parse(localStorage.getItem("submissions")) || [];

data.push(submission);

localStorage.setItem("submissions", JSON.stringify(data));

alert("Registration Saved!");

form.reset();

});
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

let opportunities = JSON.parse(localStorage.getItem("opportunities")) || [
{ id:1, title:"Frontend Job", type:"job", description:"HTML CSS JS" },
{ id:2, title:"Tech Event", type:"event", description:"Community event" },
{ id:3, title:"Medical Service", type:"service", description:"Free checkups" }
];

// RENDER
function render(data){
let container = document.getElementById("cardsContainer");
container.innerHTML = "";

data.forEach(i=>{
container.innerHTML += `
<div class="card">
<h3>${i.title}</h3>
<p>${i.type}</p>
<p>${i.description}</p>
</div>`;
});
}

// ADD
function addOpportunity(){
opportunities.push({
id:Date.now(),
title:title.value,
type:type.value,
description:description.value
});

localStorage.setItem("opportunities", JSON.stringify(opportunities));
render(opportunities);
}

// SEARCH
document.addEventListener("input",(e)=>{
if(e.target.id==="search"){
let v = e.target.value.toLowerCase();
render(opportunities.filter(i=>
i.title.toLowerCase().includes(v) ||
i.description.toLowerCase().includes(v)
));
}
});

// FILTER
function filterType(t){
if(t==="all") render(opportunities);
else render(opportunities.filter(i=>i.type===t));
}

// SIGN UP
function signup(){
if(su_password.value.length<8){
alert("Password must be 8+ chars");
return;
}

users.push({
name:su_name.value,
email:su_email.value,
phone:su_phone.value,
pass:su_password.value
});

localStorage.setItem("users", JSON.stringify(users));
alert("Account created");
}

// SIGN IN
function signin(){
let u = users.find(x=>x.email===si_email.value && x.pass===si_password.value);

if(!u){
alert("Wrong data");
return;
}

currentUser = u;
localStorage.setItem("currentUser", JSON.stringify(u));

document.getElementById("authSidebar").style.display="none";
document.getElementById("mainApp").style.display="block";

welcomeText.innerText = "Welcome " + u.name;
}

// LOGOUT
function logout(){
localStorage.removeItem("currentUser");
location.reload();
}

// SWITCH
function showSignUp(){
signupBox.style.display="block";
signinBox.style.display="none";
}

function showSignIn(){
signupBox.style.display="none";
signinBox.style.display="block";
}

// INIT
window.onload=function(){
render(opportunities);

if(currentUser){
document.getElementById("authSidebar").style.display="none";
document.getElementById("mainApp").style.display="block";
welcomeText.innerText = "Welcome " + currentUser.name;
}
};

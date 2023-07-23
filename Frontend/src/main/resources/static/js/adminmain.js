$('.support-wrap .support-service a').hover( function () {
    var index = $('.support-service a').index(this);
    $('.support-service a').not($(this)).removeClass('open');
    $(this).addClass('open');
    $('.support-wrap .support-info .support-detail').removeClass('open');
    $( ".support-wrap .support-info .support-detail" ).eq( index ).addClass("open");
});

function editpage(){
    // console.log("hide and show");
    document.getElementById('changePasswordModal').classList.toggle('show')
}

let captcha;
let usernamep=document.getElementById("usernamep");
let passwordp=document.getElementById("passwordp");
let captchap=document.getElementById("captchap");

function generate() {
  document.getElementById("captcha").value = "";
  captcha = document.getElementById("image");
  const random = Math.floor(Math.random() * 9000 + 1000);
  captcha.innerHTML = random;
}

function printmsg() {
  const captcha_input = document.getElementById("captcha").value;
  if(captcha_input === ""){
		captchap.innerHTML = "* Captcha must be required !";
    return;
	}
  else if (captcha_input !== captcha.innerHTML) {
    captchap.innerHTML = "* Captcha not Matched !";
    generate();
  }
}

function login(){
  let username=document.getElementById("username").value;
	if(username === "" || username === "null"){
		usernamep.innerHTML="* Username must be required !";
	}
  let password=document.getElementById("password").value;
	if(password === "" || password === "null"){
		passwordp.innerHTML="* Password must be required !";
	}
  printmsg();
  authorizeToHome();
}

function checkUsername(){
    usernamep.innerHTML="";
}
function checkPassword(){
    passwordp.innerHTML="";
}
function checkCaptcha(){
    captchap.innerHTML="";
}

function authorizeToHome(){
  let username=document.getElementById("username").value;
  let password=document.getElementById("password").value;
  const captcha = document.getElementById("captcha").value;
  if(username !== "" && username !== "null" && password !== "" && password !== "null" && captcha !=="" && captcha !== "null"){
    const data = { "username": `${username}`, "password": `${password}`};
    fetchLogin(data);
  }
}

async function fetchLogin(data) {
  try {
    const response = await fetch("http://localhost:7071/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if(result.message === "* Invalid Username !"){
      usernamep.innerHTML = "* Invalid Username !";
    }
    else if(result.message === "* Invalid Password !"){
      passwordp.innerHTML = "* Invalid Password !";
    }
    else if(result.message === "* Login Sucessful !"){
      const tokendata = {"userId":1, "username": `${data.username}`, "password": `${data.password}`,"expiryInMinutes":"10"};
      
      const response = await fetch("http://localhost:7073/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tokendata),
    });
    const result = await response.json();
    localStorage.setItem("token", result.token);
    if(localStorage.getItem("token") !== null){
      window.location.href = "http://localhost:7075/home";
    }
    else{
      window.location.href = "http://localhost:7075";
    }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function saveUser(){
  alert("User is created sucessfully!");
  const email=document.getElementById("email").value;
  const userName=document.getElementById("userName").value;
  const userPassword=document.getElementById("userPassword").value;
  const repeatPassword=document.getElementById("repeatPassword").value;
  const firstName=document.getElementById("firstName").value;
  const lastName=document.getElementById("lastName").value;
  const phone=document.getElementById("phone").value;
  const timezone=document.getElementById("timezone").value;
  saveUserInMongo(data);
}

async function saveUserInMongo(data) {
  try {
    const response = await fetch("http://localhost:7072/user/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result)
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getAllWebsites() {
  const response = await fetch("http://localhost:7074/user/allWebsite");
  const websites = await response.json();
  return websites;
}

async function  showAllWebsites() {
    let allWebsites = await  getAllWebsites();
    for (let i = 0; i < allWebsites.length; i++) {
      let website = allWebsites[i];
      let websites = document.getElementById("websites");
      websites.innerHTML+=`<option value="${website.name}">${website.name}</option>`;
    }
}

showAllWebsites();
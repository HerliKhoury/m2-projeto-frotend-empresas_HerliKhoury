import { login } from "./requests.js";
import { logUser, logOut } from "./localStorage.JS";


let auxRegisterBtnArr = document.querySelectorAll(".regsBtn");
let registerBtnArr = [...auxRegisterBtnArr];

registerBtnArr.forEach(btn =>{
    btn.addEventListener("click", () => {
        window.location.assign("../pages/register.html");
    })
})

let homeBtn = document.querySelector(".homeBtn");

homeBtn.addEventListener("click", () => {
    window.location.assign("../../index.html");
})

let loginBtn = document.querySelector("#loginBtn");

let userData = {
    email: "", password: ""
}

let inputEmail = document.querySelector("#inputEmail");
let inputPassword = document.querySelector("#inputPassword")

loginBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    userData.email = inputEmail.value;
    userData.password = inputPassword.value;

    let token = await login(userData); 
    userData.token = token.token;

    if(token){
        logUser({email: userData.email, token: userData.token});
    }
})

logOut();

import { toast } from "./toast.js";
import { requestCreateUser } from "./requests.js";

let homeBtn = document.querySelector(".home_btn");

homeBtn.addEventListener("click", () => {
    window.location.assign("../../index.html");
});
    
let loginBtn = document.querySelector(".login_btn");

loginBtn.addEventListener("click", () => {
    window.location.assign("../pages/login.html");
});

let returnBtn = document.querySelector(".return_btn");

returnBtn.addEventListener("click", () => {
    window.history.back();
});

function createUser(){
    let inputName = document.querySelector("#input_name");
    let inputEmail = document.querySelector("#input_email");
    let inputPassword = document.querySelector("#input_password");
    let selectProLvl = document.querySelector("select");
    let userInfo = {};

    userInfo.username = inputName.value;
    userInfo.email = inputEmail.value;
    userInfo.password  = inputPassword.value;
    userInfo.professional_level = selectProLvl.value;

    return userInfo;
}


let registerBtn = document.querySelector(".register_btn")

registerBtn.addEventListener("click", async (event) => {
    
    if(createUser().professional_level === "null"){
        toast("Nível profissional necessário", "#C20803");
    }else{   
        await requestCreateUser(createUser());
    }
    
    event.preventDefault();
});


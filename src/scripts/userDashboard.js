import { logOut, getUser } from "./localStorage.JS";
import { getLoggedUser, refreshUserData } from "./requests.js";
import { toast } from "./toast.js";

let logOutBtn = document.querySelector(".btn_logOut");

logOutBtn.addEventListener("click", () => {
    logOut();
    window.location.assign("../../index.html");
})

let token = getUser().token;
let loggedUser = await getLoggedUser(token);

function  refreshUserInfo(userInfo){
    let userName = document.querySelector("#user-name");
    let userEmail = document.querySelector("#user-email");
    let userProLvl = document.querySelector("#pro-lvl");
    let userKOW = document.querySelector("#kind-of-work");

    userName.innerText = userInfo.username;
    userEmail.innerText = userInfo.email;
    userProLvl.innerText = `${userInfo.professional_level.charAt(0).toUpperCase()}${userInfo.professional_level.slice(1)}`;

    userName.classList.add("title_5")
    userEmail.classList.add("text_2")
    userProLvl.classList.add("text_2")
    userKOW.classList.add("text_2")


    if(userInfo.kind_of_work === null){
        userKOW.innerText = "Desempregado"
    }else{
        userKOW.innerText = userInfo.kind_of_work;
    }
        
}

refreshUserInfo(loggedUser);


let closeModalBtn = document.querySelector("#close");
let modalWrapper = document.querySelector(".modal-wrapper");

closeModalBtn.addEventListener("click", () => {
    modalWrapper.classList.toggle("flex");
})

function achieveBtn(requestEdit, nome, email, password){
    

    requestEdit.addEventListener("click", async (event) => {
        console.log("click 23", nome, email, password)
        let userInfo = {};

        if(nome.value === "" && email.value === "" && password.value === ""){
         toast("Nenhum campo preenchido", "#C20803");
         }else{
            if(nome.value != ""){
                userInfo.username = nome.value;
            }
            if(email.value != ""){
             userInfo.email = email.value;
            }
            if(password.value != ""){
             userInfo.password = password.value;
            }

            let userPatch = await refreshUserData(userInfo);
            refreshUserInfo(userPatch);
        }
     event.preventDefault();
    }) 
}

function fillEditUser(){
    let editForm = document.createElement("form");
    let modalTitle = document.createElement("h2");
    let nome = document.createElement("input");
    let email = document.createElement("input");
    let password = document.createElement("input");
    let confirmEdit = document.createElement("button");

    modalTitle.innerText = "Editar perfil";
    nome.placeholder= "Seu nome";
    email.placeholder = "Seu e-mail";
    password.placeholder = "Sua senha";
    confirmEdit.innerText = "Editar perfil";

    modalTitle.classList.add("title_4", "modal_title");
    nome.classList.add("large_simple");
    email.classList.add("large_simple");
    password.classList.add("large_simple");
    confirmEdit.classList.add("large_purple", "title_2", "confirm_btn");

    achieveBtn(confirmEdit, nome, email, password);

    editForm.append(modalTitle, nome, email, password, confirmEdit);

    return editForm;
}



let receivingSpace = document.querySelector(".receiving_space");
receivingSpace.append(fillEditUser());

let editBtn = document.querySelector(".pen");

editBtn.addEventListener("click", () => {
    modalWrapper.classList.toggle("flex");
})


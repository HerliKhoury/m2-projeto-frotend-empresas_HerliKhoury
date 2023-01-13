import { checkIsAdm, checkUserType, getCompanies } from "./requests.js";
import {  getUser } from "./localStorage.js";


let homeDivJobs = document.querySelector(".home_div_jobs");
let arrowDown = document.querySelector(".arrow");

let toggleDivJobs = true;

arrowDown.addEventListener("click", () =>{

    if(toggleDivJobs){
        homeDivJobs.setAttribute("hidden","");
        /* homeDivJobs.classList.add("hide"); */
    }else{
        /* homeDivJobs.classList.remove("hide"); */
        homeDivJobs.removeAttribute("hidden");
    }
    console.log("click")
    toggleDivJobs = !toggleDivJobs;
})

let options = document.querySelector(".more");
let close = document.querySelector(".close");
let head = document.querySelector(".home_headder");

options.addEventListener("click", () => {

    head.insertAdjacentHTML("afterend", 
        '<div class="home_btns_toggle"><button class="small_white login_btn-toggle">Login</button><button class="small_purple register_btn-toggle">Cadastro</button></div>'
    )

    let loginBtnToggle = document.querySelector(".login_btn-toggle");

    loginBtnToggle.addEventListener("click", () => {
        window.location.assign("./src/pages/login.html");
    })

    let registerBtnToggle = document.querySelector(".register_btn-toggle");

    registerBtnToggle.addEventListener("click", () => {
        window.location.assign("./src/pages/register.html");
    })

    options.classList.add("hide");
    close.classList.remove("hide");
})

close.addEventListener("click", () => {
    let toggleDiv = document.querySelector(".home_btns_toggle");
    toggleDiv.remove();
    close.classList.add("hide");
    options.classList.remove("hide");
})

let registerBtn = document.querySelector(".register_btn");

registerBtn.addEventListener("click", () => {
    window.location.assign("./src/pages/register.html");
    console.log("click")
})
    
let loginBtn = document.querySelector(".login_btn");

loginBtn.addEventListener("click", () => {
    window.location.assign("./src/pages/login.html");
    console.log("click")
})    

function createCompanyCard(company){
    let companyCard = document.createElement("div");
    let companyName = document.createElement("h3");
    let companyHrs = document.createElement("span");
    let companySector = document.createElement("button");

    companyName.innerText = company.name;
    companyHrs.innerText = company.opening_hours;
    companySector.innerText = company.sectors.description;

   
    companyCard.classList.add("company_card", "flex_column")
    companyName.classList.add("title_6");
    companyHrs.classList.add("text_1", "block", "company_hrs");
    companySector.classList.add("company_sector");


    companyCard.append(companyName, companyHrs, companySector);

    return companyCard;
}

async function fillJobsDiv(){
    let jobsDiv = document.querySelector("#home_jobs");

    let jobsArr = await getCompanies();

    jobsArr.forEach(company => {
        jobsDiv.append(createCompanyCard(company));
    });
}

export function checkIsAdmIndex(isAdm){
    if(isAdm.is_admin === true){
        window.location.replace("./src/pages/admDashboard.html");
      }else{
        window.location.replace("./src/pages/userDashboard.html");
    }
    
}


async function checkLoggedUser(){
    console.log(getUser())
    if(getUser()){
        let userInfo = getUser();
        let typeInfo = await checkUserType(userInfo.token);
        checkIsAdmIndex(typeInfo);
        
    }

}

checkLoggedUser(); 
fillJobsDiv();





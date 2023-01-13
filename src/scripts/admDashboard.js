import { logOut } from "./localStorage.JS";
import { toast } from "./toast.js";
import { getCompaniesList, getDepartmentsList, getUsersList, requestCreateDptm, editDepartmentData } from "./requests.js";

let logOutBtn = document.querySelector(".btn_logOut");

logOutBtn.addEventListener("click", () => {
    logOut();
    window.location.assign("../../index.html");
})

async function refreshSelectCompany(){
    let selectCompanies = document.querySelector("#select_companies");

    let companiesArr = await getCompaniesList();

    companiesArr.forEach(company => {
        let option = document.createElement("option");

        option.value = company.uuid;
        option.innerText = company.name;

        selectCompanies.append(option);
    });

    return companiesArr;
}

refreshSelectCompany();

function createDptoCard(department){
    let cardDiv = document.createElement("div");
    let btnsDiv = document.createElement("div");
    let dpmtName = document.createElement("h2");
    let dpmtDescription = document.createElement("span");
    let companyName = document.createElement("span");
    let hireBtn = document.createElement("img");
    let editBtn = document.createElement("img");
    let deleteBtn = document.createElement("img");

    dpmtName.innerText = department.name;
    dpmtDescription.innerText = department.description;
    companyName.innerText = department.companies.name;
    hireBtn.src = "../assets/visibility_eye.svg";
    editBtn.src = "../assets/edit_black_pen.svg";
    deleteBtn.src = "../assets/delete_trash.svg";


    cardDiv.classList.add("card_div");
    btnsDiv.classList.add("btns_div");
    editBtn.classList.add("edit_pen");

    editBtn.setAttribute("uuid", department.uuid); 
    deleteBtn.setAttribute("uuid", department.uuid); 
    hireBtn.setAttribute("uuid", department.uuid); 
    

    cardDiv.append(dpmtName,dpmtDescription, companyName, btnsDiv);
    btnsDiv.append(hireBtn,editBtn,deleteBtn);
    return cardDiv;
}


async function refreshDptmDiv(){
    let departmentsDiv = document.querySelector("#dptmts");
    let departmentArr = await getDepartmentsList();

    departmentsDiv.innerHTML = " ";

    departmentArr.forEach((department) => {
        departmentsDiv.append(createDptoCard(department))
    })
}

refreshDptmDiv();


function createUserCard(user){
    let cardDiv = document.createElement("div");
    let btnsDiv = document.createElement("div");
    let userName = document.createElement("h2");
    let kindOfWork = document.createElement("span");
    let editBtn = document.createElement("img");
    let deleteBtn = document.createElement("img");

    userName.innerText = user.username; 

    if(!user.kind_of_work){
        kindOfWork.innerText = "Desempregado";
    }else{
        kindOfWork.innerText = user.kind_of_work;
    }
    

    editBtn.src = "../assets/edit_black_pen.svg";
    deleteBtn.src = "../assets/delete_trash.svg";

    cardDiv.classList.add("card_div");
    btnsDiv.classList.add("btns_div");

    cardDiv.append(userName, kindOfWork, btnsDiv);
    btnsDiv.append(editBtn,deleteBtn);

    return cardDiv;
}


async function refreshUsersDiv(){
    let usersDiv = document.querySelector("#users");
    let usersArr = await getUsersList();

    usersArr.forEach((user) => {
        usersDiv.append(createUserCard(user))
    })
}

refreshUsersDiv();

function achieveCreateBtn(createBtn, name, description, companyUid){
    createBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        let departmentInfo = {};

        if(name.value === "" && description.value === "" && companyUid.value === ""){
            toast("Nenhum campo preenchido", "#C20803");
            }else{
               if(name.value === ""){
                toast("Digite um nome", "#C20803");
               }else if(description.value === ""){
                toast("Digite uma descrição", "#C20803");
               } else if(companyUid.value === ""){
                toast("Selecione uma empresa", "#C20803");
               } else{
                    departmentInfo.name = name.value;
                    departmentInfo.description = description.value;
                    departmentInfo.company_uuid = companyUid.value;

                    let newDepartmen = await requestCreateDptm(departmentInfo);
                    refreshDptmDiv();
                    return newDepartmen;
               } 
           }
           
           
    })

}

async function fillCreateDepartment(){
    let createDpmtForm = document.createElement("form");
    let modalTitle = document.createElement("h2");
    let name = document.createElement("input");
    let description = document.createElement("input");
    let selectCompany = document.createElement("select");
    let createDpto = document.createElement("button");

    selectCompany.innerHTML = `<option value="null" hidden>Selecionar empresa</option>`;
    let companyArr = await refreshSelectCompany();
    companyArr.forEach((company) => {
        let option = document.createElement("option");

        option.value = company.uuid;
        option.innerText = company.name;

        selectCompany.append(option);
    })
    modalTitle.innerText = "Criar Departamento";
    name.placeholder = "Nomde do departamento";
    description.placeholder = "Descrição";
    createDpto.innerText = "Criar o departamento";

    achieveCreateBtn(createDpto, name ,description, selectCompany);

    modalTitle.classList.add("title_7", "small_modal_title");
    name.classList.add("large_simple");
    description.classList.add("large_simple");
    createDpto.classList.add("large_purple", "title_2");

    createDpmtForm.append(modalTitle, name, description, selectCompany, createDpto);

    return createDpmtForm;
}

let smallReceivingSpace = document.querySelector(".small_receiving_space");
let createDprmtBtn = document.querySelector("#create");
let smallModaWrapper = document.querySelector(".modal-wrapper");
let closeBtnSmall = document.querySelector(".close_small");

createDprmtBtn.addEventListener("click", async () =>{
    smallReceivingSpace.innerHTML = " "
    smallReceivingSpace.append(await fillCreateDepartment());

    smallModaWrapper.classList.toggle("flex");
})

closeBtnSmall.addEventListener("click", ()=>{
    smallModaWrapper.classList.toggle("flex");
})

function achieveEditBtn(editBtn, description){
    editBtn.addEventListener("click",  (event) => {
        event.preventDefault();
        let body = {};

        let elemento = event.target.parentElement;
        let elementoId = elemento.id;

        console.log(elementoId)

        if(!description.value){
            toast("Insira a nova descrição", "#C20803");
        }else{
            body.description = description.value;
        }
           
           
    })

}

function fillEditDepartment(){
    let editForm = document.createElement("form");
    let title =  document.createElement("h2");
    let descriptionInput = document.createElement("input");
    let editBtn =  document.createElement("button");

    title.innerText = "Editar Departamento";
    descriptionInput.placeholder = "Valores anteriores da descrição";
    editBtn.innerText = "Salvar alterações";

    title.classList.add("title_7");
    descriptionInput.classList.add("large_tall");
    editBtn.classList.add("large_purple", "title_2");


    achieveEditBtn(editBtn, descriptionInput)

    editForm.append(title, descriptionInput, editBtn);
    return editForm;
}

let nodeListPen = document.querySelectorAll(".edit_pen");
let editPenArr = [...nodeListPen];
console.log(editPenArr)
editPenArr.forEach((pen) => {
    pen.addEventListener("click",  ()=>{
        let uuid = pen.getAttribute("uuid");
        console.log(uuid)
        /* smallReceivingSpace.innerHTML = " "
        smallReceivingSpace.append(await fillEditDepartment());

        smallModaWrapper.classList.toggle("flex"); */
    })
})


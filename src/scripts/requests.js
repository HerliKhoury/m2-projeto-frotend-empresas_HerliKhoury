import { toast } from "./toast.js";
import { getUser } from "./localStorage.js";

const baseUrl = "http://localhost:6278/";
const red = "#C20803";
const green = "#08C203";
const user = getUser() || {};
const { token } = user;
const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`
};

export async function getLoggedUser(token){
  const loggedUserData = await fetch(`${baseUrl}users/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const loginDataJson = await loggedUserData.json();

  return loginDataJson;
}  

export function checkIsAdm(isAdm){

  if(isAdm.is_admin === true){
    setTimeout(window.location.replace("./admDashboard.html"),3000);
  }else{
    setTimeout(window.location.replace("./userDashboard.html"),3000);
  }
}


export async function checkUserType(token){
  const checkUserType = await fetch(`${baseUrl}auth/validate_user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const isAdm = await checkUserType.json();

  return isAdm;
}

export async function login(data) {
    const loginData = await fetch(`${baseUrl}auth/login`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(data),
    });
  
    const loginDataJson = await loginData.json();
    

    const isAdm = await checkUserType(loginDataJson.token);
    

    if (!loginData.ok) {
      toast("Credenciais incorretas", red);
    } else {
      toast("Login realizado com sucesso", green);
      checkIsAdm(isAdm);
    }
    
    return loginDataJson;
}

export async function getCompanies(){
  const allCompanies = await fetch(`${baseUrl}companies`, {
    method: "GET",
    headers: requestHeaders
  });

  const companiesArr = await allCompanies.json();

  return companiesArr;
}

export async function requestCreateUser(data) {
  const userData = await fetch(`${baseUrl}auth/register`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(data)
  });

  const newUserData = await userData.json();
    
    
  if (!userData.ok) {
    toast("Usuário inválido", red);
  } else {
    toast("Cadastro realizado com sucesso", green);
    setTimeout(window.location.replace("./login.html"),3000);
  }
    
  return newUserData;
}

export async function refreshUserData(data) {
  const aswer = await fetch(`${baseUrl}users`, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(data),
  });

  const loginDataJson = await aswer.json();

  if (!aswer.ok) {
    toast("Email inválido", red);
  } else {
    toast("Alteração realizada com sucesso", green);
    let modalWrapper = document.querySelector(".modal-wrapper");
    modalWrapper.classList.toggle("flex");
  }
  
  return loginDataJson;    
}

export async function getCompaniesList(){
  const companiesList = await fetch(`${baseUrl}companies`, {
    method: "GET",
    headers: requestHeaders
  });

  const companiesArr = await companiesList.json();

  return companiesArr;
}  

export async function getDepartmentsList(){
  const departmentsList = await fetch(`${baseUrl}departments`, {
    method: "GET",
    headers: requestHeaders
  });

  const departmentsArr = await departmentsList.json();

  return departmentsArr;
}  

export async function getUsersList(){
  const usersList = await fetch(`${baseUrl}users`, {
    method: "GET",
    headers: requestHeaders
  });

  const usersArr = await usersList.json();

  return usersArr;
}  

export async function requestCreateDptm(data) {
  const newDepartmen = await fetch(`${baseUrl}departments`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(data)
  });

  const departmentNew = await newDepartmen.json();
    
    
  if (!newDepartmen.ok) {
    toast("Departamento inválido", red);
  } else {
    toast("Departamento criado com sucesso", green);
  }
    
  return departmentNew;
}

export async function editDepartmentData(uuid, data) {
  const aswer = await fetch(`${baseUrl}/departments/${uuid}`, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(data),
  });

  const editDataJson = await aswer.json();

  if (!aswer.ok) {
    toast("Alteração inválida", red);
  } else {
    toast("Alteração realizada com sucesso", green);
    let modalWrapper = document.querySelector(".modal-wrapper");
    modalWrapper.classList.toggle("flex");
  }
  
  return editDataJson;    
}
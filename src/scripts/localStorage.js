export function logUser(userInfo){
    localStorage.setItem("logged-user", JSON.stringify(userInfo));
}

export function getUser() {
    const loggedUser = JSON.parse(localStorage.getItem("logged-user"));
  
    return loggedUser;
}

export function logOut(){
    let checkUser = localStorage.getItem("logged-user");

    if(checkUser){
        localStorage.removeItem("logged-user");
    }
}
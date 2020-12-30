var enteringData = document.getElementById("enteringData");
var welcome = document.getElementById("welcome");
var signInEmail = document.getElementById("signInEmail");
var signInPassword = document.getElementById("signInPassword");
var registName = document.getElementById("registName");
var registEmail = document.getElementById("registEmail");
var registPassword = document.getElementById("registPassword");
var mainButton = document.getElementById("signingButton");
var logOutButton = document.getElementById("logOut");
var warningMsg = document.getElementById("warningMsg");

// checking storage
if (localStorage.getItem('Users') == null) {
    var userContainer = [];
    welcome.style.display = "none"

} else {
    userContainer = JSON.parse(localStorage.getItem("Users"));
}
//  validation inputs
registName.addEventListener("blur", validUserName);
registEmail.addEventListener("blur", validUserEmail);
registPassword.addEventListener("blur", validUserPassword);

function validUserName() {
    var regexUserName = /^[A-Z][a-z]{2,}$/;

    if (regexUserName.test(registName.value) == true) {
        registName.classList.add("is-valid");
        registName.classList.remove("is-invalid");
        warningMsg.style.display = "none";

    } else {
        registName.classList.add("is-invalid");
        registName.classList.remove("is-valid");
        warningMsg.innerHTML = "Name must begin by A-Z and at least 3 letters";
        warningMsg.style.display = "inline";

    }


}

function validUserPassword() {
    var regexUserPassword = /^([A-Z]|[a-z]|[1-9]){1,}/;

    if ((regexUserPassword.test(registPassword.value) == true) && (registPassword.value.length >= 8)) {
        registPassword.classList.add("is-valid");
        registPassword.classList.remove("is-invalid");
        warningMsg.style.display = "none";


    } else {
        registPassword.classList.add("is-invalid");
        registPassword.classList.remove("is-valid");
        warningMsg.innerHTML = "Password must contain upper case , lower case and 8 characters minimum";
        warningMsg.style.display = "inline";


    }


}

function validUserEmail() {
    var regexUserEmail = /^([A-Z]|[a-z]|[1-9]){1,}@[a-z]{1,}\./;
    var emailIsValid;
    if (regexUserEmail.test(registEmail.value) == true) {
        registEmail.classList.add("is-valid");
        registEmail.classList.remove("is-invalid");
        warningMsg.style.display = "none";
        emailIsValid = true;

    } else {
        registEmail.classList.add("is-invalid");
        registEmail.classList.remove("is-valid");
        warningMsg.innerHTML = "invalid Email";
        warningMsg.style.display = "inline";
        emailIsValid = false;

    }

}

// end of validation
signingLink.addEventListener("click", function() {
    if (document.getElementById("signingLink").innerText == "login") {
        displayLogin();
    } else if (document.getElementById("signingLink").innerText = "sign up") {
        displaySignUp();
    }
    warningMsg.style.display = "none";

})

function displayLogin() {
    // dispalying inputs
    signInEmail.style.display = "inline";
    signInPassword.style.display = "inline";
    registName.style.display = "none";
    registEmail.style.display = "none";
    registPassword.style.display = "none";
    // changing button and link
    mainButton.innerHTML = "login";
    document.querySelector(".havingAccount").innerHTML = "Don't have an account ?";
    document.getElementById("signingLink").innerHTML = "sign up";
}

function displaySignUp() {
    // dispalying inputs
    signInEmail.style.display = "none";
    signInPassword.style.display = "none";
    registName.style.display = "inline";
    registEmail.style.display = "inline";
    registPassword.style.display = "inline";
    // changing button and link
    mainButton.innerHTML = "sign up";
    document.querySelector(".havingAccount").innerHTML = "you have an account ?";
    document.getElementById("signingLink").innerHTML = "login";
}

mainButton.addEventListener("click", function() {
    if (mainButton.innerText == "sign up") {
        if (registEmail.value == '' || registName.value == '' || registPassword.value == '') {
            warningMsg.innerHTML = "All inputs are required or invalid inputs";
            warningMsg.style.display = "inline";
        } else {
            addUser();
            warningMsg.style.display = "none";
            registName.classList.remove("is-valid");
            registEmail.classList.remove("is-valid");
            registPassword.classList.remove("is-valid");
            registName.classList.remove("is-invalid");
            registEmail.classList.remove("is-invalid");
            registPassword.classList.remove("is-invalid");
        }

    } else if (mainButton.innerText == "login") {
        checkUser();
    }
})

function addUser() {

    var user = {
        name: registName.value,
        email: registEmail.value,
        password: registPassword.value,
    }
    userContainer.push(user);
    localStorage.setItem('Users', JSON.stringify(userContainer));
    clearForm();

}

function clearForm() {
    registName.value = '';
    registEmail.value = '';
    registPassword.value = '';
}

function checkUser() {
    var member = {
        email: signInEmail.value,
        password: signInPassword.value,
    }
    for (var i = 0; i < userContainer.length; i++) {
        var index = 0;
        if ((member.password == userContainer[i].password) && (member.email == userContainer[i].email)) {
            index = i;
            dispalyWelcome(index);
        } else if ((member.password == '') || (member.email == '')) {
            warningMsg.innerHTML = "All inputs are required";
            warningMsg.style.display = "inline";
        } else {
            warningMsg.innerHTML = "incorrect email or password";
            warningMsg.style.display = "inline";

        }
    }
}

function dispalyWelcome(index) {
    document.getElementById("enteringData").style.display = "none";
    document.getElementById("welcome").style.display = "inline";
    var box = `<div class="d-flex justify-content-center align-items-center container text-center w-75 shading my-5 ">

    <h1 class="font-weight-bold p-5"> Welcome ${userContainer[index].name}</h1>

    </div>`;

    document.getElementById("welcomeCaption").innerHTML = box;

}

// log out 

logOutButton.addEventListener("click", function() {
    dispalyEnteringData();
})

function dispalyEnteringData() {
    enteringData.style.display = "inline";
    welcome.style.display = "none";
    warningMsg.style.display = "none"
}
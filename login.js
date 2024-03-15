const passwordInput= document.getElementById("password")
const usernameInput= document.getElementById("username")
const loginBtn= document.getElementById("loginBtn")


const users =[
    {
        username: "admin",
        password: "admin"
    }
]

loginBtn.addEventListener("click", (event)=>{
    event.preventDefault()

    const usernameValue = usernameInput.value
    const passwordValue = passwordInput.value
    console.log(usernameValue, passwordValue)

    const user = users.find((user)=> user.username== usernameValue && user.password == passwordValue)

    if (user) {
        alert("Login Succesful")
        localStorage.setItem("isLogged", true)
        window.location.href = "/pages/index.html"
    }
    else{
        usernameInput.value=""
        passwordInput.value=""
        alert("Wrong Credentials")
    }
})


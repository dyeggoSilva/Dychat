const login = document.querySelector(".login")
const loginForm = document.querySelector(".login__form")
const loginInput = document.querySelector(".login__input")

const chat = document.querySelector(".chat")
const chatForm = document.querySelector(".chat__form")
const chatInput = document.querySelector(".chat__input")


const colors = [
    "cabetblue",
    "darkgoldenrod",
    "cornflowerblue",
    "darkkhaki",
    "hotpink",
    "gold"
]

const user = {id: "", name: "", color: ""}

let websocket

const getRandonColor = ()=>{
    const randonIndex = Math.floor(Math.random()*colors.length)
    return colors[randonIndex]
}


const handleSubmit = (event)=>{
    event.preventDefault()
    user.id = crypto.randomUUID()
    user.name = loginInput.value
    user.color = getRandonColor()

    login.style.display = "none"
    chat.style.display = "flex"

    websocket = new WebSocket("ws://localhost:8080")

   websocket.onopen = ()=> websocket.send(`O usuário ${user.name} acabou de entrar!`)
    console.log(user)
   }

   loginForm.addEventListener("submit", handleSubmit)
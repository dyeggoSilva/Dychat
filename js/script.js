const login = document.querySelector(".login")
const loginForm = document.querySelector(".login__form")
const loginInput = document.querySelector(".login__input")

const chat = document.querySelector(".chat")
const chatForm = document.querySelector(".chat__form")
const chatInput = document.querySelector(".chat__input")
const chatMessages = document.querySelector(".chat__mensage")

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

const createMessageSelfElement = (content) => {
    const div = document.createElement("div")
    div.classList.add("message__self")
    div.innerHTML = content
    return div
}

function notification() {
    const x = document.getElementById("audio")
    x.play();
}

function cat() {
    const x = document.getElementById("audio2")
    x.play();
}

function dog() {
    const x = document.getElementById("audio3")
    x.play();
}

const createMessageOtherElement = (content, sender, senderColor) => {
    const div = document.createElement("div")
    const span = document.createElement("span")
    div.classList.add("message__other")

    span.classList.add("message__sender")
    span.style.color = senderColor

    span.innerHTML = sender
    div.appendChild(span)
    div.innerHTML += content
    notification()

    return div
}

const getRandonColor = () => {
    const randonIndex = Math.floor(Math.random() * colors.length)
    return colors[randonIndex]
}

const scrollScreen = () => {
    window.scrollTo({
        top: document.body.scrollHeight, behavior: "smooth"
    })
}

const handleViaCep = async (cep) => {
    const response = await fetch(`https://a1ef5589-e7d7-477c-9b49-baf847659e54-00-1ru9og2pg9818.worf.replit.dev/${cep}`)
    const data = await response.json()
    return `CEP: ${data.cep}, Logradouro: ${data.logradouro}, Bairro: ${data.bairro}, Cidade: ${data.localidade}, Estado: ${data.uf}`
}

const handleCrudPessoas = async (id) => {
    const response = await fetch(`https://d2ec98f2-c047-4b8f-aac4-ef46f817f822-00-13ndp6wmlr5us.kirk.replit.dev/pessoas/${id}`)
    const data = await response.json()
    return `Pessoa: ${data.nome}, Idade: ${data.idade}, Email: ${data.email}`
}

const handleApiProxy = async (url) => {
    const response = await fetch(`https://f8d5d234-762e-4e7b-b2e4-79887499e770-00-301ouu5jbkc79.riker.replit.dev/proxy?url=${encodeURIComponent(url)}`)
    const data = await response.json()
    return `Dados da API: ${JSON.stringify(data)}`
}

const processMessage = async ({ data }) => {
    const { userId, userName, userColor, content } = JSON.parse(data)
    let messageContent = content

    if (content.startsWith("/cep ")) {
        const cep = content.split(" ")[1]
        messageContent = await handleViaCep(cep)
    } else if (content.startsWith("/pessoa ")) {
        const id = content.split(" ")[1]
        messageContent = await handleCrudPessoas(id)
    } else if (content.startsWith("/proxy ")) {
        const url = content.split(" ")[1]
        messageContent = await handleApiProxy(url)
    } else if (content == "/dog") {
        dog()
    } else if (content == "/cat") {
        cat()
    }

    const message = userId == user.id
        ? createMessageSelfElement(messageContent)
        : createMessageOtherElement(messageContent, userName, userColor)

    chatMessages.appendChild(message)
    scrollScreen()
}

const handleLogin = (event) => {
    event.preventDefault()
    user.id = crypto.randomUUID()
    user.name = loginInput.value
    user.color = getRandonColor()

    login.style.display = "none"
    chat.style.display = "flex"

    websocket = new WebSocket("wss://dychat-beckend.onrender.com")
    websocket.onmessage = processMessage
}

const sendMessage = (event) => {
    event.preventDefault()

    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value
    }
    websocket.send(JSON.stringify(message))
    chatInput.value = ""
}

loginForm.addEventListener("submit", handleLogin)
chatForm.addEventListener("submit", sendMessage)

const login = document.querySelector(".login")
const loginForm = document.querySelector(".login__form")
const loginInput = document.querySelector(".login__input")

const chat = document.querySelector(".chat")
const chatForm = document.querySelector(".chat__form")
const chatInput = document.querySelector(".chat__input")
const chatMessage = document.querySelector(".chat__mensage")

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

const createMessageSelfElement = (content)=>{
const div = document.createElement("div")
div.classList.add("manssage__self")
div.innerHTML = content
return div
}

function notification(){

    const x = document.getElementById("audio")
    x.play();

}

function cat(){

    const x = document.getElementById("audio2")
    x.play();

}
function dog(){

    const x = document.getElementById("audio3")
    x.play();

}

    const createMessageOtherElement = (content, sender, senderColor)=>{
        const div = document.createElement("div")
        const span = document.createElement("span")
        div.classList.add("manssage__other")
    
        div.classList.add("manssage__self")
        span.classList.add("menssage__sender")
        span.style.color = senderColor
    
        div.appendChild(span)
    
        span.innerHTML = sender
        div.innerHTML += content
        notification()
    
        return div
        }
    
    const getRandonColor = ()=>{
        const randonIndex = Math.floor(Math.random()*colors.length)
        return colors[randonIndex]
    }
    
    const scrollScreen = ()=>{
        window.scrollTo({
            top: document.body.scrollHeight, behavior: "smooth"
        })
    }
    
    const processMessage = ({data})=>{
        const{userId, userName, userColor, content} = JSON.parse(data)
        if(content == "/dog"){
            dog()
        }else if(content == "/cat"){
            cat()
        }else if(content=="/via-cep"){


            fetch(`viacep.com.br/ws/${content}/json/`)
            .then(response => {
                if (!response.ok) {
                throw new Error('Erro ao executar a requisição HTTP: ' + response.status);
                }
                return response.json(); // Parseando a resposta JSON
            })
            .then(data => {
                // Manipular os dados recebidos
                console.log(data);
            })
            .catch(error => {
                console.error('Erro ao obter dados da API:', error);
            });

            console.log(`viacep.com.br/ws/${content}/json/`)



        }
        
            const message = userId == user.id
        ? createMessageSelfElement(content)
        : createMessageOtherElement(content, userName, userColor)
    
        chatMessage.appendChild(message)
        }
        scrollScreen()
        
    
    
    
    const handleLogin = (event)=>{
        event.preventDefault()
        user.id = crypto.randomUUID()
        user.name = loginInput.value
        user.color = getRandonColor()
    
        login.style.display = "none"
        chat.style.display = "flex"
    
        websocket = new WebSocket("wss://dychat-beckend.onrender.com")
        websocket.onmessage = processMessage
    
       }
    
       const sendMessage = (event)=>{
    
        event.preventDefault()
        
    
        const message = {
            userId: user.id,
            userName: user.name,
            userColor: user.color,
            content: chatInput.value
        }
        websocket.send(JSON.stringify(message))
        chatInput.value =""
    
       }
    
       loginForm.addEventListener("submit", handleLogin)
       
       chatForm.addEventListener("submit", sendMessage)
       



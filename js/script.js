const login = document.querySelector(".login");
const loginForm = document.querySelector(".login__form");
const loginInput = document.querySelector(".login__input");

const chat = document.querySelector(".chat");
const chatForm = document.querySelector(".chat__form");
const chatInput = document.querySelector(".chat__input");
const chatMessages = document.querySelector(".chat__mensage");

const colors = [
    "cadetblue",
    "darkgoldenrod",
    "cornflowerblue",
    "darkkhaki",
    "hotpink",
    "gold"
];

const user = { id: "", name: "", color: "" };

let websocket;

const createMessageSelfElement = (content) => {
    const div = document.createElement("div");
    div.classList.add("message__self");
    div.innerHTML = content;
    return div;
};

function notification() {
    const x = document.getElementById("audio");
    x.play();
}

function cat() {
    const x = document.getElementById("audio2");
    x.play();
}

function dog() {
    const x = document.getElementById("audio3");
    x.play();
}

const createMessageOtherElement = (content, sender, senderColor) => {
    const div = document.createElement("div");
    const span = document.createElement("span");
    div.classList.add("message__other");

    span.classList.add("message__sender");
    span.style.color = senderColor;

    span.innerHTML = sender;
    div.appendChild(span);
    div.innerHTML += content;
    notification();

    return div;
};

const getRandonColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};

const scrollScreen = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
};

const handleViaCep = async (cep) => {
    try {
        const response = await fetch(`https://8bcb8f47-1b28-4190-84d5-a4b9546ad039-00-fh1cf6785yyi.janeway.replit.dev/${cep}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar o CEP");
        }
        const data = await response.json();
        return `CEP: ${data.cep}, Logradouro: ${data.logradouro}, Bairro: ${data.bairro}, Cidade: ${data.localidade}, Estado: ${data.uf}`;
    } catch (error) {
        return `Erro: ${error.message}`;
    }
};

const handleCrudPessoas = async (nome) => {
    try {
        const response = await fetch(`https://96776135-305f-4fa0-8623-0438940dbe74-00-2rmbtf19ky1g3.worf.replit.dev/pessoas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome })
        });
        if (!response.ok) {
            throw new Error("Erro ao cadastrar pessoa");
        }
        const data = await response.json();

        // Aqui você pode retornar uma mensagem de confirmação ou os dados da pessoa cadastrada, se necessário
        return `Pessoa cadastrada com sucesso!`;
    } catch (error) {
        return `Erro: ${error.message}`;
    }
};

const handleApiProxy = async (command) => {
    try {
        let url;
        switch (command) {
            case "cat":
            case "dog":
            case "random":
                url = `https://f8d5d234-762e-4e7b-b2e4-79887499e770-00-301ouu5jbkc79.riker.replit.dev/api/${command}`;
                break;
            default:
                throw new Error(`Comando de imagem desconhecido: ${command}`);
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro ao buscar imagem ${command}`);
        }
        const data = await response.json();

        // Retorna a URL da imagem para ser exibida no chat
        return `<img src="${data.url}" alt="Imagem ${command}" style="max-width: 100%;">`;
    } catch (error) {
        return `Erro: ${error.message}`;
    }
};

const processMessage = async ({ data }) => {
    const { userId, userName, userColor, content } = JSON.parse(data);
    let messageContent = content;

    if (content.startsWith("/cep ")) {
        const cep = content.split(" ")[1];
        messageContent = await handleViaCep(cep);
    } else if (content.startsWith("/crud ")) {
        const nome = content.split(" ")[1];
        messageContent = await handleCrudPessoas(nome);
    } else if (content.startsWith("/img ")) {
        const command = content.split(" ")[1];
        messageContent = await handleApiProxy(command);
    } else if (content === "/dog") {
        dog();
    } else if (content === "/cat") {
        cat();
    }

    const message = userId === user.id
        ? createMessageSelfElement(messageContent)
        : createMessageOtherElement(messageContent, userName, userColor);

    chatMessages.appendChild(message);
    scrollScreen();
};

const handleLogin = (event) => {
    event.preventDefault();
    user.id = crypto.randomUUID();
    user.name = loginInput.value;
    user.color = getRandonColor();

    login.style.display = "none";
    chat.style.display = "flex";

    websocket = new WebSocket("wss://dychat-beckend.onrender.com");
    websocket.onmessage = processMessage;
};

const sendMessage = (event) => {
    event.preventDefault();

    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value
    };
    websocket.send(JSON.stringify(message));
    chatInput.value = "";
};

loginForm.addEventListener("submit", handleLogin);
chatForm.addEventListener("submit", sendMessage);

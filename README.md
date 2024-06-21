# Projeto de Chat

Este projeto consiste em desenvolver um sistema de chat integrado com a API da OpenAI, várias APIs 
externas para funcionalidades adicionais, e um backend para gerenciamento de usuários e outras operações CRUD.

# Funcionalidades Implementadas:

## Tela de login e chat

- Implementação de telas de login e chat utilizando HTML,
CSS(Bootstrap/Materialize) e JavaScript.
- Envio de mensagens ao pressionar Enter, com validação
para não enviar mensagens vazias.
- Organização das mensagens no chat: mensagens do usuário à esquerda
e de outros usuários à direita.
- Scroll automático para exibir novas mensagens quando o chat estiver cheio.

## Integração com APIs Externas

- Implementação de uma aplicação intermediária utilizando Express.js para
integrar três APIs públicas, como por exemplo, API de imagens de animais, API de sons de animais,
e API de dados geográficos.
- Utilização de chamadas REST para buscar e exibir resultados relevantes no chat.

## Web Service para Consulta de CEP

- Implementação de um serviço para consultar CEPs utilizando a API do VIA CEP.
- Uso do Express.js para mascarar as chamadas à API de consulta de CEP.

## CRUD de Pessoas

- Desenvolvimento de um sistema CRUD para gerenciar dados de pessoas (Nome, Idade, CPF, Email, Sexo).
- Documentação utilizando Swagger para detalhar os endpoints e seus parâmetros.

# Tecnologia usadas 

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js com Express.js
- API: APIs externas diversas (imagens, sons, dados geográficos)

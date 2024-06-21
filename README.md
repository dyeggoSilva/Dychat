# Projeto de Chat

Este projeto consiste em desenvolver um sistema de chat integrado com a API da OpenAI, várias APIs 
externas para funcionalidades adicionais, e um backend para gerenciamento de usuários e outras operações crud.

# Funcionalidades Implementadas:

## Tela de login e chat

- Implementação de telas de login e chat utilizando HTML,CSS e JavaScript.
- Registro e login de usuários: Os usuários podem se cadastrar e fazer login para acessar o chat.
- Chat em tempo real: Mensagens são enviadas e recebidas em tempo real usando WebSocket.
- Lista de usuários online: Mostra quais usuários estão atualmente online.
- Autenticação de usuários: Rotas para registro, login e autenticação de usuários.
- WebSocket: Comunicação em tempo real entre clientes usando Socket.io.
- Persistência de dados: Integração com banco de dados para armazenar informações de usuário e mensagens.

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

- Frontend: HTML, CSS, Vue.js, JavaScript
- Backend: Node.js com Express.js
- API: APIs externas diversas (imagens, sons, dados geográficos)
- Banco de dados: MongoDB

# Conclusão 

O projeto chat, representa uma solução robusta e eficiente para um sistema de chat em tempo real. Utilizando tecnologias modernas como Vue.js, Node.js, Socket.io e MongoDB, conseguimos criar uma aplicação escalável e de fácil integração.

## Realização de Objetivos

Durante o desenvolvimento, conseguimos alcançar os seguintes objetivos principais:

- Funcionalidade de Chat em Tempo Real: Implementamos um sistema de mensagens instantâneas utilizando WebSocket, garantindo uma experiência de usuário fluida e interativa.
- Autenticação e Segurança: Implementamos um sistema robusto de autenticação de usuários para garantir a segurança das informações e do acesso ao sistema.
- Persistência de Dados: Utilizamos MongoDB para armazenar e gerenciar os dados dos usuários e suas mensagens, garantindo escalabilidade e confiabilidade.

## Desafios Superados

- Gerenciamento de Estado e Sincronização: Gerenciar o estado da aplicação em tempo real e garantir a sincronização adequada das mensagens entre os usuários.
- Escalabilidade e Performance: Garantir que a aplicação fosse capaz de lidar com um grande número de usuários simultâneos de forma eficiente e sem comprometer o desempenho.

## Aprendizados

Este projeto proporcionou aprendizados valiosos em áreas como:

- Desenvolvimento Full-Stack: Integração entre frontend e backend, utilizando diferentes tecnologias e frameworks.
- Comunicação em Tempo Real: Entendimento profundo de como implementar comunicação em tempo real usando WebSocket e Socket.io.
- Segurança e Autenticação: Implementação de práticas de segurança e autenticação robustas para proteger dados e acessos não autorizados.

Em suma, o projeto chat não apenas demonstram nossas habilidades técnicas e capacidade de resolver problemas complexos, mas também oferecem uma base sólida para futuras iterações e expansões, visando sempre proporcionar a melhor experiência possível aos usuários finais.

# Cineflex | React

## Visão geral
- Uma Single-Page Application (SPA) para um cinema, usando React Router! 

### **Deploy**
Link: https://projeto10-cineflex-jdyy.vercel.app/

## Requisitos

- Escolha de Filme (rota `/`)
    -  Buscar as informações dos filmes pela API fornecida e exibir conforme layout fornecido.
    -  Ao clicar em um filme, o usuário deve ser redirecionado para a rota `/sessoes/:idFilme`, sendo `:idFilme` o id do filme clicado.
- Escolha de Sessão (rota `/sessoes/:idFilme`)
    -  A partir do id da URL, obtenha da API as sessões disponíveis para o filme e exiba conforme o *layout* fornecido.
    -  Ao clicar em uma sessão, o usuário deve ser redirecionado para a rota `/assentos/:idSessao`, onde `:idSessao` é o id da sessão escolhida.
- Escolha de Assento (rota `/assentos/:idSessao`)
    -  A partir do id da sessão, buscar os dados da sessão da API e exibir o layout conforme fornecido.
    -  Ao clicar em um assento disponível, o assento deve ser marcado como "Selecionado".
    -  Ao clicar novamente em um assento selecionado, este deve voltar para "Disponível".
    -  Ao clicar em um assento indisponível, deverá ser exibido um alerta de "Esse assento não está disponível".
    -  O usuário pode selecionar vários assentos.
    -  O usuário deve poder inserir o nome e o CPF do comprador.
    -  Ao clicar em "Reservar assento(s)", o pedido deve ser enviado para o servidor e o usuário deve ser redirecionado para a rota `/sucesso`.  Isso fará com os assentos marcados fiquem indisponíveis para outras marcações.
- Rodapé
    -  Ao longo das telas de Sessão e Assento, deve ser exibido um rodapé com as informações do filme selecionado. Estas informações virão das chamadas à API em cada tela.
- Sucesso (rota `/sucesso`)
    -  Implementar *layout* conforme fornecido, exibindo os dados do pedido feito.
    -  Ao clicar em "Voltar para Home" o usuário deve voltar para a rota inicial (`/`), com o pedido zerado.

## Tecnologias e Ferramentas
- React
- React-Router
- Styled-components
- Vite
- Axios

## Como rodar em desenvolvimento:
- Clonar o repositório;
- Baixar as dependências necessárias com o comando: `npm install`
- Executar o projeto: `npm start`
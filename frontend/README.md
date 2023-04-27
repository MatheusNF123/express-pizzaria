# Express Pizzaria

Este é um projeto fullstack de uma pizzaria fictícia que tem como objetivo possibilitar a realização de pedidos online de pizzas.

No backend, foi utilizado o TypeScript em conjunto com o framework Express.js para a criação de uma API RESTful. Para acessar e manipular os dados da aplicação, foi utilizado o TypeORM, um ORM que permite a manipulação de bancos de dados relacionais. Além disso, foram utilizadas as bibliotecas Bcrypt.js e JsonWebToken para autenticação e autorização de usuários, e o Cors para habilitar o acesso da aplicação a partir de diferentes origens. Para garantir a segurança da aplicação, as variáveis de ambiente foram configuradas utilizando o Dotenv e as validações de dados foram realizadas utilizando a biblioteca Zod.

No frontend, foi utilizado o TypeScript em conjunto com o framework Next.js e o MaterialUI para a construção de uma interface de usuário moderna e responsiva. Para gerenciamento de formulários e validações, foi utilizado o Formik e o Yup. Além disso, para realização de requisições HTTP foi utilizada a biblioteca Axios, e para gerenciamento de cookies foi utilizada a biblioteca Nookies.

O sistema permite que os usuários visualizem o cardápio de pizzas disponíveis, possam adicionar, editar e excluir pizzas no carrinho de compras e finalizar o pedido. O projeto inclui também um painel de administração para gerenciamento das pizzas e usuários.

## Tecnologias

#### Backend

- [TypeScript](https://www.typescriptlang.org/) - Linguagem de programação utilizada.
- [Express.js](https://expressjs.com/pt-br/) - Framework utilizado para construção de APIs.
- [TypeORM](https://typeorm.io/) - ORM utilizado para a conexão com banco de dados.
- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js) - Biblioteca para criptografia de senhas.
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - Biblioteca para autenticação com tokens JWT.
- [CORS](https://github.com/expressjs/cors) - Middleware para habilitar o CORS na API.
- [dotenv](https://github.com/motdotla/dotenv) - Biblioteca para carregar variáveis de ambiente.
- [Zod](https://github.com/colinhacks/zod) - Biblioteca para validação de dados.

### Frontend

- [TypeScript](https://www.typescriptlang.org/) - Linguagem de programação utilizada.
- [Next.js](https://nextjs.org/) - Framework utilizado para construção do frontend.
- [Material-UI](https://material-ui.com/) - Biblioteca de componentes para o React.
- [Yup](https://github.com/jquense/yup) - Biblioteca para validação de dados no frontend.
- [nookies](https://github.com/maticzav/nookies) - Biblioteca para trabalhar com cookies no Next.js.
- [Formik](https://formik.org/) - Biblioteca para gerenciar formulários no React.
- [Axios](https://axios-http.com/) - Biblioteca para realizar requisições HTTP.

## Instalação

Para instalar e executar este projeto localmente, siga estas etapas:

1. Clone este repositório.
2. Navegue para o diretório do backend `cd backend`.
3. Execute `npm install` para instalar as dependências do backend.
4. Crie um arquivo `.env` na raiz do diretório do backend e defina as variáveis de ambiente.
5. Execute `npm run migration:generate && npm run db:reset` para criar tabelas e popular o banco de dados.
6. Execute `npm run dev` para executar o servidor backend em modo de desenvolvimento.
7. Navegue para o diretório do frontend `cd frontend`.
8. Execute `npm install` para instalar as dependências do frontend.
9. Execute `npm run dev` para executar o servidor frontend em modo de desenvolvimento.
10. Abra o navegador e acesse `http://localhost:3000` para ver o aplicativo.

## Observação

Este projeto possui um docker-compose na raiz do backend que sobe um contêiner com um banco de dados em postgres e um contêiner com um servidor Node.js. Para utilizá-lo, é necessário ter o docker-compose instalado em sua máquina.

```bash
  docker-compose up -d
```

## Rotas do Backend

### Rotas do admin

- DELETE /admin/user/:id - Deleta um usuário
- GET /admin/user - Busca todos os usuários
- DELETE /admin/pizza/:id - Deleta uma pizza
- POST /admin/pizza - Cria uma pizza
- PUT /admin/pizza - Atualiza uma pizza
- GET /admin/pizzas - Busca todas as pizzas

### Rotas do Usuário

- POST - Loga um usuário
- POST /register - Registra um usuário
- PUT /update - Atualiza dados do usuário
- DELETE /delete - Deleta o usuário
- GET /user - Busca o usuário

### Rotas da Pizza

- GET /pizzas/:id - Busca por uma pizza
- GET /pizzas - Busca todas as pizzas

### Rotas do Pedido

- POST /order - Cria um pedido
- GET /order - Busca todos os pedidos
- PATCH /order/:id - Cancela um pedido

### Rotas do Carrinho

- POST /cart - Cria um carrinho
- GET /cart - Busca por um carrinho
- DELETE /cart/:id - Deleta o carrinho
- DELETE /cart/:cartId/item/:cartItemId - Deleta um item do carrinho
- PUT /cart/:cartId/item/:cartItemId - Atualiza um item do carrinho
- POST /cart/item - Adiciona um item no carrinho

## Autores

- [github.com/Pedro-28](https://github.com/Pedro-28)
- [github.com/MatheusNF123](https://github.com/MatheusNF123)

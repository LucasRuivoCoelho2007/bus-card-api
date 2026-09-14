# Bus Card API

API REST para gerenciamento de cartões de transporte, usuários e transações.

## Documentação

A documentação completa da API está disponível no Postman:

[Documentação pública — Bus Card API](https://documenter.getpostman.com/view/53276811/2sBYAyu9h2#88aa779a-97e8-4c17-b68f-834c8914acde)

## Tecnologias

* Deno
* TypeScript
* Express
* Mongoose
* JWT
* Postman

## Como executar

### Pré-requisitos

* Deno instalado
* MongoDB Atlas
* Variáveis de ambiente configuradas

Caso precise instalar o Deno, execute:

#### macOS e Linux

```bash
curl -fsSL https://deno.land/install.sh | sh
```

#### Windows (PowerShell)

```powershell
irm https://deno.land/install.ps1 | iex
```

### Instalação

Clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/LucasRuivoCoelho2007/bus-card-api

cd bus-card-api
```

Configure as variáveis de ambiente criando o arquivo `.env` com base no `.env.example`.

Preencha a variável `ATLAS_URI` com a URI de conexão do MongoDB Atlas e defina uma senha segura para `JWT_SECRET`.

### Postman

No Postman, importe os arquivos:

* `bus-card-api.postman_collection.json`
* `bus-card-api.postman_environment.json`

localizados na pasta `postman`.

Para importar os arquivos, utilize:

`Ctrl + Shift + P` → `Import data into Workspace`

Depois, deixe o Environment ativo para permitir que o token JWT seja armazenado e utilizado corretamente nas requisições autenticadas.

### Executar

Para iniciar o servidor, utilize:

```bash
deno task dev
```

Após iniciar, a API estará disponível em:

- API: http://localhost:8000
- Swagger: http://localhost:8000/docs

## Endpoints

A API disponibiliza endpoints para gerenciamento de usuários, autenticação, cartões e transações.

Os endpoints marcados com **✅** exigem autenticação JWT.

Para acessar os endpoints protegidos, primeiro realize o login através do endpoint público `POST /auth/login`.

### Usuários

| Método | Rota        | Descrição                    | Auth | Exemplo de Request                                                      |    Response   |
| :----: | ----------- | ---------------------------- | :--: | ----------------------------------------------------------------------- | :-----------: |
| `POST` | `/users`    | Registro de usuário          |   —  | `{ "name": "Lucas", "email": "lucas@email.com", "password": "123456" }` | `201 Created` |
|  `GET` | `/users/me` | Dados do usuário autenticado |   ✅  | —                                                                       |    `200 OK`   |
|  `PUT` | `/users/me` | Atualização do perfil        |   ✅  | `{ "name": "Lucas", "email": "novo@email.com" }`                        |    `200 OK`   |

### Autenticação

| Método | Rota          | Descrição                    | Auth | Exemplo de Request                                     | Response |
| :----: | ------------- | ---------------------------- | :--: | ------------------------------------------------------ | :------: |
| `POST` | `/auth/login` | Login e geração do token JWT |   —  | `{ "email": "lucas@email.com", "password": "123456" }` | `200 OK` |
|  `GET` | `/users/me`   | Dados do usuário autenticado |   ✅  | —                                                      | `200 OK` |

### Cartões

|  Método  | Rota                 | Descrição                       | Auth | Exemplo de Request       |     Response     |
| :------: | -------------------- | ------------------------------- | :--: | ------------------------ | :--------------: |
|  `POST`  | `/cards`             | Criar cartão                    |   ✅  | `{ "type": "student" }`  |   `201 Created`  |
|   `GET`  | `/cards`             | Listar meus cartões             |   ✅  | —                        |     `200 OK`     |
|   `GET`  | `/cards/:id`         | Detalhes do cartão              |   ✅  | —                        |     `200 OK`     |
|   `PUT`  | `/cards/:id`         | Atualizar cartão                |   ✅  | `{ "type": "standard" }` |     `200 OK`     |
| `DELETE` | `/cards/:id`         | Excluir cartão                  |   ✅  | —                        | `204 No Content` |
|  `POST`  | `/cards/:id/deposit` | Recarregar saldo                |   ✅  | `{ "amount": 50 }`       |     `200 OK`     |
|  `POST`  | `/cards/:id/charge`  | Realizar cobrança de uma viagem |   ✅  | —                        |     `200 OK`     |

### Transações

| Método | Rota                         | Descrição                      | Auth | Exemplo de Request | Response |
| :----: | ---------------------------- | ------------------------------ | :--: | ------------------ | :------: |
|  `GET` | `/transactions`              | Listar minhas transações       |   ✅  | —                  | `200 OK` |
|  `GET` | `/transactions/card/:cardId` | Listar transações de um cartão |   ✅  | —                  | `200 OK` |

### Health Check

Para verificar se a API está disponível:

```http
GET /health
```

Esse endpoint não requer autenticação.

**Response:**

`200 OK`

**Legenda:** `✅` = endpoint protegido por autenticação | `—` = endpoint público

## Testes

### Auth

Para testar o `auth.test.ts`:

```bash
deno test tests/auth.test.ts
```

### Users

Para testar o `users.test.ts`:

```bash
deno test tests/users.test.ts
```

### Cards

Para testar o `cards.test.ts`:

```bash
deno test tests/cards.test.ts
```

### Transactions

Para testar o `transaction.test.ts`:

```bash
deno test tests/transaction.test.ts
```

---

<div align="center">

**Bus Card API**

Desenvolvido por **Lucas Ruivo Coelho - AGX Software**

</div>

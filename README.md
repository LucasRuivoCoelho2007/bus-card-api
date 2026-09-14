# Bus Card API

API REST para gerenciamento de cartões de transporte, usuários e transações.

## Tecnologias

- Deno
- TypeScript
- Express
- Mongoose
- JWT
- Postman

## Como executar

### Pré-requisitos

- Deno instalado
- MongoDB Atlas
- Variáveis de ambiente configuradas

Caso precise instalar o deno, execute: 
macOS e Linux:
```bash
 curl -fsSL https://deno.land/install.sh | sh
 ```
Windows (PowerShell): 
```bash
irm https://deno.land/install.ps1 | iex
```

### Instalação

Clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/LucasRuivoCoelho2007/bus-card-api
cd bus-card-api
```

Configure as variáveis de ambiente, criando o arquivo `.env` com base no `.env.example` e altere coloque sua ATLAS_URI e crie uma senha segura para o JWT_SECRET.

### Postman
No Postman, importe os arquivos `bus-card-api.postman_collection.json` e `bus-card-api.postman_environment.json` da pasta **/postman** (ctrl + shift + p > Import data into Workspace) e deixe o enviroment ativo, para permitir que o token seja armazenado corretamente no ambiente.

### Executar

Para iniciar o ***servidor***, utilize o comando:

```bash
deno task dev
```



## Endpoints

A API disponibiliza endpoints para gerenciamento de usuários, autenticação, cartões e transações.

### Autenticação

Os endpoints marcados com **✅** exigem autenticação. Para acessá-los, utilize o endpoint público **POST	/auth/login** via postman.



### Usuários

| Método | Rota        | Descrição             | Auth |
| :----: | ----------- | --------------------- | :--: |
| `POST` | `/users`    | Registro de usuário   |   —  |
|  `PUT` | `/users/me` | Atualização do perfil |   ✅  |

### Autenticação

| Método | Rota          | Descrição                    | Auth |
| :----: | ------------- | ---------------------------- | :--: |
| `POST` | `/auth/login` | Login e geração do token     |   —  |
|  `GET` | `/auth/me`    | Dados do usuário autenticado |   ✅  |

### Cartões

|  Método  | Rota                 | Descrição                       | Auth |
| :------: | -------------------- | ------------------------------- | :--: |
|  `POST`  | `/cards`             | Criar cartão                    |   ✅  |
|   `GET`  | `/cards`             | Listar meus cartões             |   ✅  |
|   `GET`  | `/cards/:id`         | Detalhes do cartão              |   ✅  |
|   `PUT`  | `/cards/:id`         | Atualizar cartão                |   ✅  |
| `DELETE` | `/cards/:id`         | Excluir cartão                  |   ✅  |
|  `POST`  | `/cards/:id/deposit` | Recarregar saldo                |   ✅  |
|  `POST`  | `/cards/:id/charge`  | Realizar cobrança de uma viagem |   ✅  |

### Transações

| Método | Rota                         | Descrição                      | Auth |
| :----: | ---------------------------- | ------------------------------ | :--: |
|  `GET` | `/transactions`              | Listar minhas transações       |   ✅  |
|  `GET` | `/transactions/card/:cardId` | Listar transações de um cartão |   ✅  |

### Health Check

Para verificar se a API está disponível:

```http
GET /health
```

Esse endpoint não requer autenticação.

> **Legenda:** `✅` = endpoint protegido por autenticação | `—` = endpoint público



## Testes
1. **auth**: Para testar o `auth.test.ts`, utilize o comando:
```bash
deno test tests/auth.test.ts
```

2. **users**: Para testar o `users.test.ts`, utilize o comando:
```bash
deno test tests/users.test.ts
```

3. **users**: Para testar o `cards.test.ts`, utilize o comando:
```bash
deno test tests/cards.test.ts
```

4. **transaction**: Para testar o `transaction.test.ts`, utilize o comando:
```bash
deno test tests/transaction.test.ts
```


---

<div align="center">

**Bus Card API**

Desenvolvido por **Lucas Ruivo Coelho - AGX Software**

</div>

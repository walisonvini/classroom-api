#  Classroom API

## Descrição

API em Node.js com AdonisJS para gerenciar alunos, professores e alocação de salas, permitindo cadastro, consultas e controle de capacidade.

## 💻 Pré-requisitos

### Opção 1: Desenvolvimento Local
* **Node** `^22`
* **npm** `^10.0` ou **yarn** `^1.22`
* **MySQL** `^8.0`

### Opção 2: Desenvolvimento com Docker
* **Docker** `^24.0`
* **Docker Compose** `^2.0`

## 🐋 Instalação com Docker

1. Copie o arquivo .env
```bash
cp .env.example .env
```

2. Construa as imagens Docker
```bash
docker compose build
```

3. Inicie os containers
```bash
docker compose up -d
```

4. Acesse o container da aplicação
```bash
docker exec -it classroom-api sh
```

5. Gerar a chave da aplicação
```bash
node ace generate:key
```

6. Execute as migrações
```bash
node ace migration:run
```

7. Execute as seeders
```bash
node ace db:seed
```

8. Acesse a aplicação
```bash
http://localhost:3333
```

## ⚙️ Instalação sem Docker

1. Instalar dependências Node
```bash
npm install
```

2. Copiar o arquivo .env e gerar a chave da aplicação
```bash
cp .env.example .env
node ace generate:key
```

3. Configurar seu arquivo .env
```bash
# Host onde a aplicação será executada
HOST=localhost

# Configure as variáveis de ambiente para MySQL
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_DATABASE=classroom_api
```

4. Execute as migrações
```bash
node ace migration:run
```

5. Execute as seeders
```bash
node ace db:seed
```

6. Iniciar a aplicação
```bash
npm run dev
```

7. Acesse a aplicação
```bash
http://localhost:3333
```

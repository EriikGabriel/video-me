# 🎬 VideoMe

Aplicação web para gerenciar e organizar seus vídeos. Faça upload de arquivos de vídeo direto para o Cloudinary com armazenamento seguro e CDN. Edite, visualize e exclua vídeos com uma interface moderna e intuitiva.

## 🌐 Acesso em Produção

**Frontend**: https://video-me-erik.vercel.app/

**API**: https://video-me-2ntc.onrender.com

**API Docs (Swagger)**: https://video-me-2ntc.onrender.com/docs

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**

- **React 19** - Biblioteca escolhida por ser simples e de fácil uso, se comparada com frameworks como o Next.js
- **Vite** - Build tool ultrarrápido, escolhido por hot reload instantâneo e otimizações nativas
- **Tailwind CSS 4** - Utility-first CSS para desenvolvimento ágil
- **Axios** - Cliente HTTP robusto e com melhor tratamento de erros do que o fetch nativo
- **TypeScript** - Type safety em tempo de desenvolvimento, reduzindo bugs em produção
- **Phosphor Icons** - Biblioteca de ícones moderna

#### **Decisões de Arquitetura Frontend:**

- **Custom Hook (useVideos)**: Encapsula toda lógica de estado e chamadas à API, separando as responsabilidades
- **Componentes Modulares**: Modais e itens de lista isolados para maior reutilização
- **Feedback Visual**: Loading states e spinners em todas operações assíncronas para melhor UX

### **Backend**

- **Fastify** - Framework escolhido por ser mais rápido e mais atualizado do que o Express, com suporte nativo a TypeScript e validação de schemas
- **@fastify/multipart** - Plugin para upload de arquivos com suporte a streams e validação de tamanho
- **TypeScript** - Garante type safety entre camadas e facilita refatoração
- **Prisma ORM** - ORM type-safe com migrations automáticas e geração de types. Optei por usar um ORM, pois assim desacopla a lógica, assim facilitando caso o banco de dados venha a mudar.
- **PostgreSQL (Neon)** - Banco relacional robusto em versão serverless com scaling automático
- **Cloudinary** - Serviço de armazenamento e CDN para vídeos, oferecendo upload, transformação e entrega otimizada
- **Zod** - Validação de schemas com inferência de tipos, integrado ao Fastify para validação automática de request/response
- **Swagger** - Documentação gerada automaticamente dos schemas Zod, mantendo docs sempre atualizadas

#### **Decisões de Arquitetura Backend:**

- **Validação em Camada de Rota**: Schemas Zod nas rotas para validação imediata e documentação automática
- **Multipart Upload**: Usando `@fastify/multipart` para receber arquivos de vídeo com limite de 100MB
- **Cloudinary Integration**: Upload direto para Cloudinary com armazenamento de `public_id`
- **Arquitetura Simples**: Rotas -> Cloudinary Upload -> Prisma -> DB. Sem camadas extras, já que a lógica é direta
- **UUID como ID**: Mais seguro que IDs sequenciais, evita enumeration attacks
- **Porta Dinâmica**: Suporta PORT do ambiente para deploy em plataformas como Render

### **Infraestrutura**

- **Vercel (Frontend)** - Deploy automático e funciona bem com o ecossistema React
- **Render (Backend API)** - Free tier com auto-sleep e de fácil uso
- **Neon (Banco de Dados)** - PostgreSQL serverless

---

## 🚀 Executando Localmente

### **Pré-requisitos**

- **Node.js** 20+ instalado
- **npm**
- **Git**

### **1. Clone o Repositório**

```bash
git clone https://github.com/EriikGabriel/video-me.git
cd video-me
```

---

### **2. Configurar Backend**

#### 2.1. Instalar Dependências

```bash
cd backend
npm install
```

#### 2.2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend/`:

```env
DATABASE_URL="postgresql://sua-string-de-conexão"

# Cloudinary Configuration (obrigatório para upload de vídeos)
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
```

#### 2.3. Aplicar Migrations no Banco

```bash
npx prisma migrate deploy
```

Isso criará a tabela `videos` no banco de dados.

#### 2.4. Iniciar o Servidor

```bash
npm run dev
```

✅ O backend estará rodando em: **http://localhost:3000**

📚 E a documentação Swagger da API em: **http://localhost:3000/docs**

---

### **3. Configurar Frontend**

#### 3.1. Instalar Dependências

```bash
cd ../frontend
npm install
```

#### 3.2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na pasta `frontend/`:

```env
VITE_API_URL=http://localhost:3000
```

#### 3.3. Iniciar a Aplicação

```bash
npm run dev
```

✅ O frontend estará rodando em: **http://localhost:5173**

---

## 📁 Estrutura do Projeto

```
video-app/
├── backend/                 # API REST com Fastify
│   ├── prisma/             # Schema e migrations do Prisma
│   │   ├── schema.prisma   # Definição do modelo de dados
│   │   └── migrations/     # Histórico de migrations
│   ├── src/
│   │   ├── lib/            # Configurações de bibliotecas
│   │   ├── routes.ts       # Rotas da API
│   │   ├── server.ts       # Configuração do servidor
│   │   └── types.ts        # Tipos TypeScript
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/               # Interface React
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   │   ├── FormModal.tsx       # Modal de formulário
│   │   │   ├── MessageModal.tsx    # Modal de mensagens
│   │   │   ├── VideoListItem.tsx   # Item da lista
│   │   │   └── Modal.tsx           # Modal base
│   │   ├── hooks/          # Custom hooks
│   │   │   └── useVideos.ts        # Lógica de gerenciamento
│   │   ├── types/          # Tipos TypeScript
│   │   ├── App.tsx         # Componente principal
│   │   └── main.tsx        # Entry point
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

## 🎯 Funcionalidades

- ✅ **Upload de vídeos** direto para o Cloudinary com validação de tipo e tamanho (até 100MB)
- ✅ **Editar vídeos** incluindo substituição de arquivo com feedback visual durante o salvamento
- ✅ **Excluir vídeos** com modal de confirmação e remoção automática do Cloudinary
- ✅ **Visualizar vídeos** com player integrado usando URLs otimizadas do Cloudinary CDN
- ✅ **Feedback visual** com spinners e estados de loading/error em todas operações assíncronas
- ✅ **Validação robusta** com Zod tanto no frontend quanto backend (double validation)
- ✅ **Documentação Swagger** gerada automaticamente dos schemas Zod
- ✅ **Armazenamento seguro** com IDs do Cloudinary para gerenciamento de assets

---

## 📡 Endpoints da API

| Método   | Endpoint      | Descrição                            |
| -------- | ------------- | ------------------------------------ |
| `GET`    | `/videos`     | Lista todos os vídeos                |
| `POST`   | `/videos`     | Faz upload de um novo vídeo          |
| `PATCH`  | `/videos/:id` | Atualiza vídeo (incluindo o arquivo) |
| `DELETE` | `/videos/:id` | Exclui vídeo e remove do Cloudinary  |
| `GET`    | `/docs`       | Documentação Swagger                 |

### Exemplo de Requisição

**POST /videos** (multipart/form-data)

```bash
curl -X POST http://localhost:3000/videos \
  -F "title=Meu Vídeo" \
  -F "description=Descrição do vídeo" \
  -F "file=@./video.mp4"
```

**Campos do formulário:**

- `title` (string, obrigatório) - Título do vídeo
- `description` (string, obrigatório) - Descrição do vídeo
- `file` (arquivo, obrigatório) - Arquivo de vídeo (máx 100MB)

---

## 🗄️ Modelo de Dados

```prisma
model Video {
  id           String   @id @default(uuid())
  title        String
  description  String
  url          String
  cloudinaryId String
  createdAt    DateTime @default(now())

  @@map("videos")
}
```

**Decisões de Modelagem:**

- **UUID como Primary Key**: Mais seguro que auto-increment, evita exposição de registros
- **cloudinaryId**: Armazena o public_id do Cloudinary para gerenciamento e exclusão de assets
- **url**: URL otimizada do CDN do Cloudinary para entrega rápida do vídeo
- **Campos Required**: Todos campos obrigatórios para garantir integridade dos dados
- **@@map("videos")**: Nome da tabela no plural para convenção SQL padrão

---

## 📊 Diagrama de Sequência - Fluxo de Cadastro de Vídeos

O diagrama abaixo ilustra o fluxo completo desde a interação do usuário até a persistência no banco de dados:

![Diagrama de Sequência UML](.github/uml.png)

**Fluxo:**

1. Usuário preenche formulário com título, descrição e seleciona arquivo de vídeo
2. Frontend valida e envia requisição multipart/form-data para o backend
3. Backend valida dados com Zod, faz upload para o Cloudinary e persiste no banco
4. Após sucesso, frontend busca lista atualizada de vídeos
5. Interface é atualizada exibindo o novo vídeo com URL do Cloudinary CDN

---

## 🚢 Deploy

### Backend (Render)

1. Crie um Web Service no [Render](https://render.com)
2. Conecte seu repositório GitHub
3. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`
   - **Start Command**: `npm start`
4. Adicione a variável de ambiente:
   - `DATABASE_URL`: Connection string do Neon
   - `CLOUDINARY_CLOUD_NAME`: Nome da nuvem na Cloudinary
   - `CLOUDINARY_API_KEY`: Chave de API da Cloudinary
   - `CLOUDINARY_API_SECRET`: Secret de API da Cloudinary

### Frontend (Vercel)

1. Importe o projeto no [Vercel](https://vercel.com)
2. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
3. Adicione a variável de ambiente:
   - `VITE_API_URL`: URL do backend no Render

---

## 👨‍💻 Autor

**Erik Gabriel**
GitHub: [@EriikGabriel](https://github.com/EriikGabriel)

# CineMatch 🎬

Aplicação para descobrir filmes populares e organizar uma lista pessoal
do que assistir.

Projeto de portfólio desenvolvido com React, JavaScript, Tailwind CSS
e Node.js, com integração à API do The Movie Database (TMDB).

## Funcionalidades

- Landing page responsiva.
- Catálogo de filmes populares do TMDB.
- Pôsteres com alternativa para imagens indisponíveis.
- Busca por título sem diferenciar maiúsculas ou acentos.
- Filtro por gênero.
- Contagem de resultados.
- Modal com título, sinopse, gênero, ano e nota.
- Lista “Quero assistir” com adição e remoção de filmes.
- Persistência da lista no navegador com localStorage.
- Estados de carregamento, erro e nenhum resultado.
- Botão para tentar novamente após uma falha.

## Tecnologias

- React
- JavaScript
- Tailwind CSS
- Vite
- Node.js
- Fetch API
- localStorage
- Git e GitHub
- API do TMDB

## Como funciona

O React solicita os filmes pela rota `/api/movies`.

Durante o desenvolvimento, o proxy do Vite encaminha essa solicitação
ao servidor Node. O servidor consulta o TMDB e converte os dados para
o formato utilizado pelos componentes.

O token do TMDB permanece no servidor e não é enviado ao navegador.

A busca e os filtros são aplicados localmente aos filmes carregados.

## Estrutura do projeto

- `src/main.jsx`: inicialização do React.
- `src/app.jsx`: landing page e organização da interface.
- `src/components/MovieCatalog.jsx`: catálogo, busca e filtros.
- `src/components/MovieCard.jsx`: cartão de filme.
- `src/components/MovieModal.jsx`: modal de detalhes.
- `src/hooks/useWatchlist.js`: lista pessoal e persistência.
- `src/services/movies.js`: requisição ao servidor.
- `src/index.css`: estilos globais e do modal.
- `server/index.js`: conexão com o TMDB.
- `public/data/movies.json`: dados fictícios usados nas etapas iniciais.
- `public/tmdb-logo.svg`: logotipo de atribuição do TMDB.
- `.env.example`: modelo de configuração local.

## Requisitos

- Node.js 22.12 ou superior.
- npm.
- Conta no TMDB com acesso à API.

## Executar localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/yasgoDev/CineMatch.git
cd CineMatch
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar o token

Crie um arquivo `.env` na raiz do projeto, usando
`.env.example` como modelo:

```dotenv
TMDB_TOKEN=SEU_TOKEN_DE_LEITURA
```

Use o **API Read Access Token** disponível nas configurações
de API da sua conta TMDB.

Não inclua a palavra `Bearer` no valor e não envie o `.env`
para o GitHub.

### 4. Iniciar o servidor Node

Em um terminal:

```bash
npm run server
```

O servidor local estará disponível em:

```text
http://localhost:3001
```

### 5. Iniciar o frontend

Em outro terminal:

```bash
npm run dev
```

Abra o endereço informado pelo Vite, normalmente:

```text
http://localhost:5173
```

Mantenha os dois terminais em execução.

Depois de alterar o `.env`, reinicie o servidor Node.

## Comandos disponíveis

| Comando | Função |
|---|---|
| `npm run dev` | Iniciar o frontend em desenvolvimento |
| `npm run server` | Iniciar o servidor de integração com o TMDB |
| `npm run build` | Gerar o build do frontend |
| `npm run preview` | Visualizar o build do frontend localmente |

O proxy de API está configurado para o servidor de desenvolvimento.
O comando `preview` não substitui uma configuração de hospedagem
do frontend e do backend.

## Lista “Quero assistir”

A lista armazena os IDs dos filmes no localStorage.

Os dados pertencem ao navegador e ao endereço em que a aplicação
é executada. Não há login nem sincronização entre dispositivos.

Limpar os dados do site pode apagar a lista.

Nesta versão, a lista exibe apenas os filmes salvos que estão
presentes no catálogo carregado. Se um filme deixar de aparecer
entre os populares, ele também poderá deixar de aparecer na
visualização da lista.

## Limitações atuais

- O catálogo carrega somente a primeira página de filmes populares.
- A busca não consulta toda a base do TMDB.
- Cada filme usa o primeiro gênero informado pela API.
- O modal utiliza os dados recebidos no catálogo, sem consultar
  elenco, duração ou trailers.
- Não há reprodução de filmes.
- A aplicação contempla filmes; séries ainda não estão implementadas.
- O servidor Node está configurado para desenvolvimento local.
- Publicar o código no GitHub não hospeda a aplicação completa.

## Evolução do projeto

1. Estrutura React e landing page responsiva.
2. Catálogo JSON carregado com Fetch.
3. Busca por título e filtro por gênero.
4. Modal com detalhes dos filmes.
5. Lista pessoal com localStorage.
6. Integração com o TMDB por servidor Node.

## Próximas melhorias

- Pesquisa de títulos diretamente na API.
- Paginação do catálogo.
- Lista pessoal independente dos filmes populares.
- Consulta de elenco, duração e trailers.
- Inclusão de séries.
- Testes automatizados.
- Hospedagem do frontend e do backend.

## Verificação manual

- Conferir o carregamento dos filmes e pôsteres.
- Testar busca e filtro combinados.
- Abrir e fechar o modal pelo botão e pela tecla Escape.
- Adicionar e remover filmes da lista.
- Atualizar a página e conferir a persistência.
- Interromper o servidor e verificar a mensagem de erro.
- Conferir a interface em telas pequenas e com navegação por teclado.

Para verificar a compilação do frontend:

```bash
npm run build
```

## Créditos

Dados e imagens fornecidos pelo
[The Movie Database (TMDB)](https://www.themoviedb.org/).

This product uses the TMDB API but is not endorsed or certified by TMDB.

## Autora

Desenvolvido por [yasgoDev](https://github.com/yasgoDev)
como projeto de estudo e portfólio.
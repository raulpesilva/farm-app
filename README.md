# Farm FIAP - Aplicativo Mobile

## Contexto do projeto

O Farm FIAP é uma aplicação desenvolvida no contexto da pós-graduação em Front-end Engineering da FIAP, com o objetivo de aplicar conceitos modernos de arquitetura front-end, componentização, integração de micro front-end e boas práticas de desenvolvimento.

O sistema foi pensado para gestão agrícola e de fazendas, permitindo organizar vendas, estoques, metas e produtos de forma simples e escalável.

&nbsp;

## Composição do projeto

O sistema é composto por diferentes aplicações que se integram entre si:

[Projeto Back-End](https://github.com/raulpesilva/fiap-back): Responsável pela API e regras de negócio, fornecendo os dados para os aplicativos web e mobile.

[Aplicativo Mobile](https://github.com/raulpesilva/farm-app): Interface voltada para dispositivos móveis, consumindo os serviços do back-end.

[Aplicativo Web - Container](https://github.com/raulpesilva/fiap-farm-container): Projeto principal que centraliza o micro front-end, gerencia rotas e autenticação e consome os serviços do back-end.

[Aplicativo Web - Micro front-end](https://github.com/raulpesilva/fiap-farm-mfe): Funcionalidade específica dividida em um módulo independente, que é carregado dinamicamente no container.

&nbsp;

## Tecnologias utilizadas

### Front-end

React: Biblioteca JavaScript para construção de interfaces de usuário.

React Native: Framework que permite criar aplicativos nativos para Android e iOS utilizando React.

Expo: Conjunto de ferramentas e SDKs para desenvolvimento mobile rápido e simplificado com React Native.

Expo Router: Sistema de rotas baseado em arquivos, que simplifica a navegação em projetos Expo.

React Navigation (Stack, Tabs, Drawer): Biblioteca para navegação entre telas, oferecendo diferentes padrões de navegação.

React Native Gifted Charts: Biblioteca para criação de gráficos e visualizações de dados em React Native.

React Native SVG: Suporte a gráficos vetoriais escaláveis (SVG) no React Native.

React Native WebView: Componente para exibir conteúdo web dentro do app nativo.

Re-State: Biblioteca para gerenciamento de estado global de forma simples e reativa.

&nbsp;

### Back-end e segurança

Axios: Cliente HTTP baseado em Promises para consumo de APIs.

Socket.io Client: Cliente WebSocket para comunicação em tempo real com o servidor.

Jose: Biblioteca para manipulação de tokens JWT (JSON Web Tokens), utilizada em autenticação e autorização.

Async Storage: Armazenamento assíncrono e persistente de dados no dispositivo.

&nbsp;

### Documentação e qualidade de código

ESLint: Ferramenta de linting para identificar e corrigir problemas no código.

Prettier: Formatador de código para manter a consistência e padronização.

&nbsp;

### Ferramentas de desenvolvimento

TypeScript: Superconjunto tipado do JavaScript, trazendo mais segurança ao código durante o desenvolvimento.

Babel: Transpilador JavaScript que permite o uso de recursos modernos em diferentes ambientes.

cross-env: Utilitário para definir variáveis de ambiente de forma consistente em diferentes sistemas operacionais.

&nbsp;

## Como Executar o Projeto

### Variáveis de ambiente

Para executar a aplicação, é preciso criar um arquivo `.env` seguindo o `.example.env` localizado na raiz do projeto

&nbsp;

### Para rodar o projeto localmente, siga os passos abaixo

1. Clone o repositório:

```shell
git clone https://github.com/raulpesilva/farm-app
```

2. Acesse o diretório do projeto:

```shell
cd farm-app
```

3. Instale as dependências:

```shell
pnpm install
```

4. Execute a aplicação:

```shell
pnpm dev:prod
```
 
5. Abra o aplicativo com o Expo Go no seu celular ou use um emulador.

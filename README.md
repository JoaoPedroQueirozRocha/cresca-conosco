# Cresça Conosco
Nosso objetivo é criar um sistema de gerênciamento para uma pequena propriedade rural focada na criação de gado leiteiro.
As principais questões abordadas, que serão desenvolvidas no sistema, são o gerênciamento da inseminação do gado e das questões financeiras da propriedade.
Em relação à inseminação, serão desenvolvidas funcionalidades para cadastrar os animais, agendar a inseminação, calcular o período de gestação do animal e notificar o usuário.
As questões financiras por sua vez serão organizadas de forma que o administrador possa lanças seus gastos e receitas, fornecendo dados para gerar relatórios de lucro e prejuízo.

## Alunos integrantes da equipe

* Ana Carolina Caldas de Mello
* Gabriel Alejandro Figueiro Galindo
* Gustavo Menezes Barbosa
* João Pedro Queiroz Rocha
* Pedro Henrique Dias Camara

## Professores responsáveis

* Eveline Alonso Veloso
* Juliana Amaral Baroni de Carvalho

## Instruções de utilização

### Tecnologias necessárias

-   Node.js
-   Yarn

1. Caso não possua o node.js, seu download se encontra [nessa página](https://nodejs.org/pt/blog/release/v18.12.0)
2. Caso não possua o yarn, instale-o em sua máquina com o comando `npm i -g yarn`

### Front-end

#### Documentação dos componentes

A documentação dos componentes se encontrada em `Codigo/client/src/components/README.md`

#### Instruções

1. Troque para o diretório `Codigo/client`
2. Instale as dependências com o comando `yarn`
3. Crie um arquivo chamado `.env` no diretório `Codigo/client`
4. Copie o conteudo do arquivo `.env.example` para `.env`
5. Inicie o projeto com o comando `yarn dev`
6. Sempre que for iniciar o projeto, é indicado rodar o comando `yarn && yarn dev`

### Back-end

#### IMPORTANTE

Para desenvolvimento, por favor, utilizem as variáveis disponíveis no arquivo `.env.develop`

#### Documentação da rotas

A documentação da API foi feita com o Swagger, para acessar a documentação acesse [`http://localhost:3000/api-docs/`](http://localhost:3000/api-docs/)

#### Instruções

1. Troque para o diretório `Codigo/server`
2. Instale as dependências com o comando `yarn`
3. Crie um arquivo chamado `.env` no diretório `Codigo/server`
4. Copie o conteudo do arquivo `.env.develop` para `.env`
5. Inicie o projeto com o comando `yarn dev`
6. Sempre que for iniciar o projeto, é indicado rodar o comando `yarn && yarn dev`

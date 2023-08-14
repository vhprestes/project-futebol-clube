# Projeto-TFC
Primeiro projeto fullstack feito na trybe
Feito utilizando NodeJS, Typescript, Express, Mocha, Chai, Docker
É um simulador de um campeonato de futebol, onde podemos inserir e alterar partidas e ver a classificação dos times na tabela. Todo backend e os endpoints consumidos pelo front foram de minha autoria, realizados no curso da Trybe

## Para rodar o projeto em sua máquina ##

Clone o repositório
```bash
git clone git@github.com:vhprestes/Projeto-TFC.git
```

Entre na pasta do projeto
```bash
 cd Projeto-TFC
```

Suba os containers
```bash
npm run compose:up ou docker-compose up -d --build
```

O front roda na porta 3000, o back na 3001. Para entrar, eis as credenciais:
```bash
login: admin@admin.com
senha: secret_admin
```

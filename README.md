# API-SERVICE

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

Provide OpenAI API for services, and subsequently access more AI-related API
## Currently Implemented Functions
[API-DOC](https://github.com/Jarvan-via/api-service/blob/master/API.md)


## Table of Contents
- [Prerequisites](#Prerequisites)
- [Install](#install)
- [Usage](#usage)
- [Deploy On Unix Platform](#deploy-on-unix-platform)
- [Check Your Service](#check-your-service)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites
```
Node >= 16
Recommend Node 18
```
## Install

```
npm i 
npm i nodemon -g
npm i typescript -g
```

## Usage

```
touch .env
```
```
#.env
PORT=8080
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```
```
npm run start
```
## Deploy On Unix Platform
```
touch .env
```
```
#.env
PORT=8080
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```
```
npm i pm2 -g
tsc
NODE_ENV=prod pm2 start build/main.js --name=api-service
```
## Check Your Service
```
curl --location --request GET 'http://host:8080/ping'
```
## Maintainers

[@Jarvan-via](https://github.com/Jarvan-via)

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT © 2023 Jarvan-via

# Device-Api

Device-Api foi desenvolvida com o uso do NestJs como framework, MongoDB como sua base de dados e CQRS como seu padrão arquitetural. A aplicação possui um listener em um tópico MQTT para atualizações em tempo real no MongoDB. Essas atualização são enviadas via websocket para um collection no postman onde é possível ver o resultado das alterações sem a necessidade de consultar a base.

## Instalação

Ao baixar o projeto, abra a pasta no Visual Studio Code e navegue pelo terminal até a pasta devices-api. Utilize o comando 'npm i' para instalar todas as dependências do projeto.

```bash
$ npm i
```
Com as dependências instaladas, chegou a hora de iniciar o projeto. No terminal, use o comando "npm run start" para inicializar a aplicação.
```bash
$ npm run start
```
É necessário fazer o download do [MQTTX](https://mqttx.app/) para o envio de mensagens no tópico MQTT. Ao instalar o MQTTX, crie uma conexão com as seguintes configurações:

![Image](https://i.ibb.co/tBtXRgc/Captura-de-tela-2023-02-26-055003.png)

Após isso se conecte ao client e insira o nome do tópico "iotTestTopic" no campo tópico para se conectar a aplicação.

Como não é possível exportar requests websocket no Postman ainda, será necessário criar uma request seguindo o caminho: File > New > Websocket Request.

Configurar a request seguindo a imagem abaixo

![Image](https://i.ibb.co/4ptTLV1/Captura-de-tela-2023-02-26-070912.png)

## Uso

É possível acessar o [Swagger](http://localhost:5003/#/) da aplicação pelo navegador após inicializar o projeto. A API permite a criação, atualização, leitura e exclusão dos dados relacionados a dispositivos.

Após a criação de um dispositivo utilizando o método POST, retorne ao MQTTX para poder enviar uma mensagem para aplicação.

Envie um payload com qualquer atualização via MQTTX.
![Image](https://i.ibb.co/bN5pjnN/Captura-de-tela-2023-02-26-060844.png)


Ao enviar a mensagem, a aplicação irá ler a mensagem e automaticamente executar a atualização no banco de dados caso os dados enviados estejam de acordo.

É possível ver o resultado da atualização via Postman na collection websocket devices-api
![Image](https://i.ibb.co/R2nC4Xp/Captura-de-tela-2023-02-26-061134.png)

## License

Nest is [MIT licensed](LICENSE).

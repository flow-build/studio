# Como iniciar a aplicação

Faça um clone do repositório e execute o comando `yarn install` para instalar as dependencias do projeto.

Com as dependencias instaladas, crie um arquivo `.env` e insira nele as variáveis de ambiente listadas abaixo com seu respectivos valores:

- REACT_APP_BASE_URL
- REACT_APP_URL_PORT
- REACT_APP_MQTT_HOST
- REACT_APP_MQTT_PORT

Execute o comando `yarn start` e se tudo estiver correto a aplicação irá iniciar, exibindo a tela de login. Caso não seja configurado um .env, será exibida uma tela de configuração para inserir os dados necessários.

## Atualização de SSL

Em alguns casos, é possível que a seguinte mensagem de erro seja retornada ```ERR_OSSL_EVP_UNSUPPORTED```.

Caso isso ocorra, execute um desses comandos:

Linux & Mac OS (windows git bash)-
```export NODE_OPTIONS=--openssl-legacy-provider```
Windows command prompt-
```set NODE_OPTIONS=--openssl-legacy-provider```
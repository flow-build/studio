# Como iniciar a aplicação

Faça um clone do repositório e execute o comando `yarn install` para instalar as dependencias do projeto.

Com as dependencias instaladas, crie um arquivo `.env` e insira nele as variaves de ambiente listadas abaixo com seu respectivos valores:

- REACT_APP_BASE_URL

Execute o comando `yarn start` e se tudo estiver correto a aplicação irá iniciar, carregando a lista de workflows disponíveis na barra lateral.

## Atualização de SSL

Em alguns casos, é possível que a seguinte mensagem de erro seja retornada ```ERR_OSSL_EVP_UNSUPPORTED```.

Caso isso ocorra, execute um desses comandos:

Linux & Mac OS (windows git bash)-
```export NODE_OPTIONS=--openssl-legacy-provider```
Windows command prompt-
```set NODE_OPTIONS=--openssl-legacy-provider```
# Como iniciar a aplicação

Faça um clone do repositório e execute o comando `yarn install` para instalar as dependencias do projeto.

Com as dependencias instaladas, crie um arquivo `.env` e insira nele as variaves de ambiente listadas abaixo com seu respectivos valores:
- REACT_APP_BASE_URL
- REACT_APP_MQTT_HOST
- REACT_APP_MQTT_PORT

Execute o comando `yarn start` e se tudo estiver correto a aplicação irá iniciar, carregando a lista de workflows disponíveis na barra lateral.

CHANGE LOG

0.2.1
- Adicionado a biblioteca bpnm.js para criação de diagramas com base em um devido xml
- Criado componentes e lógica para ler o xml e carregar o diagrama
- Criado opções para ler o xml via url ou via upload de arquivo
- Corrigido um erro no componente de mensagem.
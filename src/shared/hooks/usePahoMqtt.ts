import { Client } from 'paho-mqtt';
import { v4 as uuidv4 } from 'uuid';

export type TConnectOptions = {
  username?: string;
  password?: string;
  onSuccess?: () => void;
  onFailure?: () => void;
};

export function usePahoMqtt() {
  function validateConnection(url: string, port: number, options?: TConnectOptions) {
    const id = uuidv4();

    const mqttConfig = {
      host: url,
      port: port,
      clientId: id
    };

    const client = new Client(mqttConfig.host, mqttConfig.port, mqttConfig.clientId);

    const securityOptions: { [key: string]: string | boolean } = {};

    if (options?.username && options?.password) {
      securityOptions.userName = options.username;
      securityOptions.password = options.password;
      securityOptions.useSSL = true;
    }

    return new Promise<boolean>((resolve) => {
      client.connect({
        ...securityOptions,
        timeout: 2,
        onSuccess: async () => {
          client.disconnect();

          if (options?.onSuccess) {
            options.onSuccess();
          }

          resolve(true);
        },
        onFailure: () => {
          if (options?.onFailure) {
            options.onFailure();
          }

          resolve(false);
        }
      });
    });
  }

  return { validateConnection };
}

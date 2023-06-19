import { Client, Message } from "paho-mqtt";
import { v4 as uuidv4 } from "uuid";

import { TConnectOptions } from "shared/hooks/paho-mqtt/types/TConnectOptions";
import { useCallback, useRef } from "react";

export function usePahoMqtt() {
  const clientMqttRef = useRef<Client>();

  function validateConnection(
    url: string,
    port: number,
    options?: TConnectOptions
  ) {
    const id = uuidv4();

    const mqttConfig = {
      host: url,
      port: port,
      clientId: id,
    };

    const client = new Client(
      mqttConfig.host,
      mqttConfig.port,
      mqttConfig.clientId
    );

    const securityOptions: { [key: string]: string | boolean } = {};

    if (options?.username && options?.password) {
      securityOptions.userName = options.username;
      securityOptions.password = options.password;
      securityOptions.useSSL = true;
    }

    return new Promise<boolean>((resolve, reject) => {
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

          reject("Falha de conexão com MQTT");
        },
      });
    });
  }

  const getMqttClient = useCallback((host: string, port: number) => {
    const id = uuidv4();

    const mqttConfig = { host, port, clientId: id };

    return new Client(mqttConfig.host, mqttConfig.port, mqttConfig.clientId);
  }, []);

  const getMqttSecurityOptions = useCallback(
    (securityOptions?: { username: string; password: string }) => {
      if (!securityOptions) {
        return {};
      }

      return {
        userName: securityOptions.username,
        password: securityOptions.password,
        useSSL: true,
      };
    },
    []
  );

  function onMessageArrived(
    message: Message,
    callback?: (payload: string) => void
  ) {
    if (callback) {
      callback(message.payloadString);
    }
  }

  function connect(
    host: string,
    port: number,
    options?: {
      topics?: string[];
      security?: { username: string; password: string };
      onMessageArrived?: (payload: string) => void;
      onSuccess?: () => void;
      onFailure?: () => void;
    }
  ) {
    const clientMqtt = getMqttClient(host, port);

    const securityOptions = getMqttSecurityOptions(options?.security);

    clientMqttRef.current = clientMqtt;

    clientMqttRef.current.connect({
      ...securityOptions,
      timeout: 2,
      onSuccess: () => {
        if (options?.onSuccess) {
          options?.onSuccess();
        }

        if (clientMqttRef?.current) {
          options?.topics?.forEach((topic) =>
            clientMqttRef.current?.subscribe(topic)
          );
        }
      },
      onFailure: options?.onFailure ?? (() => {}),
    });

    clientMqttRef.current.onMessageArrived = (message: Message) =>
      onMessageArrived(message, options?.onMessageArrived);
  }

  function disconnect() {
    if (clientMqttRef.current?.isConnected()) {
      clientMqttRef.current?.disconnect();
    }
  }

  return {
    client: clientMqttRef,
    validateConnection,
    connect,
    disconnect,
  };
}

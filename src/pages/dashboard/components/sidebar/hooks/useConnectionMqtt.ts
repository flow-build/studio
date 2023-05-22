import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Client, Message } from "paho-mqtt";
import cryptoJs from "crypto-js";
import jwtDecode from "jwt-decode";
import _isEqual from "lodash/isEqual";

import { TUser } from "models/user";

import { LocalStorage } from "shared/utils/base-storage/local-storage";
import { SessionStorage } from "shared/utils/base-storage/session-storage";
import { healthcheckMqtt } from "services/resources/engine-mqtt";
import { RootState } from "store";
import { useSelector } from "react-redux";

const localStorageInstance = LocalStorage.getInstance();
const sessionStorageInstance = SessionStorage.getInstance();

enum StatusConnection {
  ERROR = "error",
  WARNING = "warning",
  SUCCESS = "success",
}

export function useConnectionMqtt() {
  const lastMqttUpdate = useSelector(
    (state: RootState) => state.settings.mqtt.lastUpdate
  );

  const lastMqttUpdateRef = useRef<Date>();

  const clientRef = useRef<Client>();
  const [statusConnection, setStatusConnection] = useState<StatusConnection>(
    StatusConnection.ERROR
  );

  const getMqttDomain = useCallback(() => {
    const envHost = process.env.REACT_APP_MQTT_HOST ?? "";
    const envPort = process.env.REACT_APP_MQTT_PORT ?? "";

    const localHost = localStorageInstance.getValueByKey<string>("MQTT_URL");
    const localPort = localStorageInstance.getValueByKey<string>("MQTT_PORT");

    const hostMqtt = localHost ?? envHost;
    const portMqtt = localPort ?? envPort;

    return { hostMqtt, portMqtt };
  }, []);

  const getMqttClient = useCallback((host: string, port: number) => {
    const id = uuidv4();

    const mqttConfig = { host, port, clientId: id };

    return new Client(mqttConfig.host, mqttConfig.port, mqttConfig.clientId);
  }, []);

  const getMqttSecurityOptions = useCallback(() => {
    const username =
      localStorageInstance.getValueByKey<string>("MQTT_USERNAME");
    const hashedPassword =
      localStorageInstance.getValueByKey<string>("MQTT_PASSWORD") ?? "";

    const secretKey = process.env.REACT_APP_CRYPTO_SECRET_KEY ?? "";
    const passwordBytes = cryptoJs.AES.decrypt(hashedPassword, secretKey);

    const password = passwordBytes.toString(cryptoJs.enc.Utf8);

    const securityOptions: { [key: string]: string | boolean } = {};

    if (username && password) {
      securityOptions.userName = username;
      securityOptions.password = password;
      securityOptions.useSSL = true;
    }

    return securityOptions;
  }, []);

  const getToken = useCallback((decode?: boolean) => {
    const token = sessionStorageInstance.getValueByKey<string>("TOKEN");

    if (!token || !decode) {
      return { token };
    }

    const decoded = jwtDecode(token) as TUser;

    return { token, decoded };
  }, []);

  const getTopic = useCallback((actorId: string) => {
    const namespace =
      localStorageInstance.getValueByKey<string>("MQTT_NAMESPACE") ?? "";

    return `${namespace}/beacon/${actorId}`;
  }, []);

  const connectToMqtt = useCallback(async () => {
    const { hostMqtt, portMqtt } = getMqttDomain();

    if (!hostMqtt || !portMqtt) {
      return;
    }

    const clientMqtt = getMqttClient(hostMqtt, Number(portMqtt));

    const securityOptions = getMqttSecurityOptions();

    clientRef.current = clientMqtt;

    clientRef.current.connect({
      ...securityOptions,
      timeout: 2,
      onSuccess: async () => {
        setStatusConnection(StatusConnection.WARNING);

        const { token, decoded } = getToken(true);

        if (!token || !decoded) {
          return;
        }

        if (clientRef.current) {
          const topic = getTopic(decoded.actor_id);
          clientRef.current.subscribe(topic);
        }

        await healthcheckMqtt({ token });
      },
      onFailure: () => {
        setStatusConnection(StatusConnection.ERROR);
      },
    });

    clientRef.current.onMessageArrived = (message: Message) => {
      const { token } = getToken();

      const payload = JSON.parse(message.payloadString);

      if (_isEqual(token, payload?.token)) {
        setStatusConnection(StatusConnection.SUCCESS);
      }
    };
  }, [
    getMqttClient,
    getMqttDomain,
    getMqttSecurityOptions,
    getToken,
    getTopic,
  ]);

  useEffect(() => {
    if (!_isEqual(lastMqttUpdate, lastMqttUpdateRef.current)) {
      const { token, decoded } = getToken(true);

      if (!token || !decoded) {
        return;
      }

      const topic = getTopic(decoded.actor_id);
      clientRef.current?.unsubscribe(topic);

      clientRef.current?.disconnect();
      connectToMqtt();
      lastMqttUpdateRef.current = lastMqttUpdate;
    }
  }, [lastMqttUpdate, connectToMqtt, getToken, getTopic]);

  useEffect(() => {
    return () => {
      if (clientRef.current?.isConnected()) {
        clientRef.current?.disconnect();
      }
    };
  }, []);

  return { connectToMqtt, statusConnection };
}

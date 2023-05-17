import { useState } from "react";
import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";

/* Local - Types */
import { TPayload } from "pages/settings/components/mqtt-panel/form/types/TPayload";

/* Shared - Hooks */
import { TConnectOptions } from "shared/hooks/paho-mqtt/types/TConnectOptions";
import { usePahoMqtt } from "shared/hooks/paho-mqtt/usePahoMqtt";
import { useSnackbar } from "shared/hooks/snackbar/useSnackbar";

/* Shared - Utils */
import { LocalStorage } from "shared/utils/base-storage/local-storage";

type TProps = {
  initialPayload: TPayload;
};

export function useForm({ initialPayload }: TProps) {
  const pahoMqtt = usePahoMqtt();
  const snackbar = useSnackbar();

  const [form, setForm] = useState({
    loading: false,
    payload: initialPayload,
  });

  const isValid = getIsFormValid(form.payload);

  const hasChange = getHasFormChange(initialPayload, form.payload);

  function getIsFormValid(payload: TPayload) {
    const requiredValues = [payload.url, payload.port];

    if (payload.isConnectionSecurity) {
      const username = payload.username as string;
      const password = payload.password as string;

      requiredValues.push(...[username, password]);
    }

    return requiredValues.every((value) => !_isEmpty(value));
  }

  function getHasFormChange(initialPayload: TPayload, payload: TPayload) {
    return !_isEqual(initialPayload, payload);
  }

  function onInputChange(text: string, field: keyof TPayload) {
    setForm((prev) => ({
      ...prev,
      payload: { ...prev.payload, [field]: text },
    }));
  }

  function onSwitchSslProtocol(checked: boolean) {
    const resetValue = checked ? "" : undefined;

    setForm((prev) => ({
      ...prev,
      payload: {
        ...prev.payload,
        isConnectionSecurity: checked,
        username: resetValue,
        password: resetValue,
      },
    }));
  }

  async function onSubmit(payload: TPayload) {
    setForm((prev) => ({ ...prev, loading: true }));

    const connectOptions: TConnectOptions = {
      username: payload.username,
      password: payload.password,

      onSuccess: () => {
        const mqttUrl = `${payload.url}:${payload.port}`;

        LocalStorage.getInstance().setValue("MQTT_URL", mqttUrl);
        LocalStorage.getInstance().setValue("MQTT_PORT", payload.port);

        snackbar.success("Sucesso ao conectar com o servidor");
      },

      onFailure: () => {
        setForm((prev) => ({ ...prev, loading: false }));
        snackbar.error("Falha de conexão com MQTT");
      },
    };

    await pahoMqtt.validateConnection(
      payload.url,
      Number(payload.port),
      connectOptions
    );

    setForm((prev) => ({ ...prev, loading: false }));
  }

  return {
    payload: form.payload,
    loading: form.loading,
    isValid,
    hasChange,

    onInputChange,
    onSwitchSslProtocol,
    onSubmit,
  };
}

import { useState } from "react";
import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";
import _cloneDeep from "lodash/cloneDeep";

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
    const newPayload = _cloneDeep(form.payload);

    if (!newPayload.namespace) {
      delete newPayload.namespace;
    }

    if (!checked) {
      delete newPayload.username;
      delete newPayload.password;
    } else {
      newPayload.username = "";
      newPayload.password = "";
    }

    setForm((prev) => ({
      ...prev,
      payload: { ...newPayload, isConnectionSecurity: checked },
    }));
  }

  async function onSubmit(payload: TPayload) {
    try {
      if (form.loading) {
        return;
      }

      setForm((prev) => ({ ...prev, loading: true }));

      const connectOptions: TConnectOptions = {
        username: payload.username,
        password: payload.password,

        onSuccess: () => {
          LocalStorage.getInstance().setValue("MQTT_URL", payload.url);
          LocalStorage.getInstance().setValue("MQTT_PORT", payload.port);

          snackbar.success("Sucesso ao conectar com o servidor");
        },
      };

      await pahoMqtt.validateConnection(
        payload.url,
        Number(payload.port),
        connectOptions
      );
    } catch (error) {
      snackbar.error("Falha de conexão com MQTT");
    } finally {
      setForm((prev) => ({ ...prev, loading: false }));
    }
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

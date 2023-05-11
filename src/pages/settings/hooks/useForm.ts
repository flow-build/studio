import jwtDecode from "jwt-decode";
import { VariantType, useSnackbar } from "notistack";

import { SessionStorage } from "shared/utils/base-storage/session-storage";

import { createToken } from "services/resources/token";

export function useForm() {
  const { enqueueSnackbar } = useSnackbar();

  function showNotification(message: string, variant: VariantType) {
    enqueueSnackbar(message, {
      autoHideDuration: 4000,
      variant,
    });
  }

  function getUserId() {
    const token = SessionStorage.getInstance().getValueByKey<string>("TOKEN");

    if (!token) {
      return "";
    }
    const decoded = jwtDecode(token);
    SessionStorage.getInstance().setValue("TOKEN", token);
    return decoded;
  }
  async function onSetToken() {
    const userId = getUserId() as string;
    const token = await createToken(userId);

    if (!token) {
      const message = "Erro no retorno do Token. Por favor tentar novamente!";
      showNotification(message, "error");
      return;
    }

    SessionStorage.getInstance().setValue("TOKEN", token);
  }

  return { showNotification, onSetToken };
}

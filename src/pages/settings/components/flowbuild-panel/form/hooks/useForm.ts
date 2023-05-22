import jwtDecode from "jwt-decode";

import { SessionStorage } from "shared/utils/base-storage/session-storage";

import { createToken } from "services/resources/token";
import { useSnackbar } from "shared/hooks/snackbar/useSnackbar";

export function useForm() {
  const snackbar = useSnackbar();

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
      snackbar.error(message);
      return;
    }

    SessionStorage.getInstance().setValue("TOKEN", token);
  }

  return { onSetToken };
}

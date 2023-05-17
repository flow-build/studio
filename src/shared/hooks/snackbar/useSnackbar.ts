import { VariantType, useSnackbar as useNotistack } from "notistack";

export function useSnackbar() {
  const { enqueueSnackbar } = useNotistack();

  function show(
    message: string,
    options?: { variant?: VariantType; duration?: number }
  ) {
    enqueueSnackbar(message, {
      autoHideDuration: options?.duration ?? 1500,
      variant: options?.variant ?? "info",
    });
  }

  function error(message: string, options?: { duration?: number }) {
    show(message, { ...options, variant: "error" });
  }

  function success(message: string, options?: { duration?: number }) {
    show(message, { ...options, variant: "success" });
  }

  return { show, error, success };
}

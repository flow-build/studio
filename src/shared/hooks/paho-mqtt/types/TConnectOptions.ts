export type TConnectOptions = {
  username?: string;
  password?: string;
  onSuccess?: () => void;
  onFailure?: () => void;
};

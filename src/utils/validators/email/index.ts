/* eslint-disable max-len */
export function validateEmail(email: string): boolean {
  const regex =
    /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*(\.[A-Za-z]{2,})$/;
  return regex.test(email);
}

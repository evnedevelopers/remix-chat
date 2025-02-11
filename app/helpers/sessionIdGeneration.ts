export const sessionIdGeneration = () => {
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const passwordLength = 16;
  let password = '';

  for (let i = 0; i <= passwordLength; i++) {
    const randomNumber =
      crypto.getRandomValues(new Uint32Array(1))[0] % chars.length;
    password += chars[randomNumber];
  }

  return password;
};

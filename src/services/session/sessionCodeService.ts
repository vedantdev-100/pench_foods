export const sessionCodeService = {
  generateCode: (): string => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  },
  validateCode: (code: string): boolean => {
    return /^[A-Z0-9]{6}$/.test(code);
  },
};

export const hasUpperCase = (str) => /[A-Z]/.test(str);
export const hasSymbol = (str) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(str);
export const hasLowerCase = (str) => /[a-z]/.test(str);
export const hasNumber = (str) => /[0-9]/.test(str);
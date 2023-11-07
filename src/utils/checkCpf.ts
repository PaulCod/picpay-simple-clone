export function checkCpf(cpf: string) {
  cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

  if (cpf.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais (caso contrário, o CPF é inválido)
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf[i]) * (10 - i);
  }
  const digit1 = 11 - (sum % 11);

  // Calcula o segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf[i]) * (11 - i);
  }
  const digit2 = 11 - (sum % 11);

  // Verifica se os dígitos verificadores calculados são iguais aos dígitos reais
  if (digit1 === parseInt(cpf[9]) && digit2 === parseInt(cpf[10])) {
    return true;
  }

  return false;
}
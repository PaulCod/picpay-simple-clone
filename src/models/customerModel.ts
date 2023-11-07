export class CustomerModel {
  private _id?: string;
  private _name?: string;
  private _email?: string;
  private _password?: string;
  private _cpf?: string;
  private _saldo?: number;

  constructor(name?: string, email?: string, cpf?: string, password?: string, saldo?: number) {
    this._name = name;
    this._email = email;
    this._password = password;
    this._cpf = cpf;
    this._saldo = saldo;
  }

  set setName(name: string) {
    this._name = name;
  }

  get getName() {
    return this._name;
  } 

  set setEmail(email: string) {
    this._email = email;
  }

  get getEmail() {
    return this._email;
  }

  set setPassword(password: string) {
    this._password = password;
  }

  get getPassword() {
    return this._password;
  }

  set setSaldo(saldo: number) {
    this._saldo = saldo;
  }

  get getSaldo() {
    return this._saldo;
  }

  get getCpf() {
    return this._cpf;
  }
}
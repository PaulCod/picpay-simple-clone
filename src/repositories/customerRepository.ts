import db from "../database/database";

import { CustomerModel } from "../models/customerModel";

import * as consts from "../constants/constants"

export class CustomerRepository {
  async create(customer: CustomerModel) {
    const connection = await db.getConnection();
    try {

      const queryVerify = "SELECT * FROM Customer WHERE customer_email = ? or customer_cpf = ?";
      const [user] = await connection.execute(queryVerify, [customer.getEmail, customer.getCpf] )

      if (user.length > 0) {
        throw new Error("Usuario já existe")
      }

      const query = `INSERT INTO Customer (${consts.CUSTOMER_NAME}, ${consts.CUSTOMER_EMAIL}, ${consts.CUSTOMER_CPF}, ${consts.CUSTOMER_PASSWORD}) values (?,?,?,?)`;
      const [rows] = await connection.execute(query, [customer.getName, customer.getEmail, customer.getCpf, customer.getPassword])

      return "Usuario criado com sucesso"
    } catch (err: any) {
      throw new Error('Erro ao criar cliente: ' + err.message);
    } finally {
      connection.release()
    }
  }

  async getByEmail(email: string) {
    const connection = await db.getConnection();

    try {
      const query = `select ${consts.CUSTOMER_NAME}, ${consts.CUSTOMER_EMAIL}, ${consts.CUSTOMER_CPF} from Customer where ${consts.CUSTOMER_EMAIL} like ?`
      const [result] = await connection.execute(query, [email + "%"])

      return result;
    } catch(err: any){
      throw new Error("Erro ao buscar usuario " + err.message)
    } finally {
      connection.release()
    }
  }
}
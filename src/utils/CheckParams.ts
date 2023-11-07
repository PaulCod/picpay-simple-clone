import { ShopkeeperModel } from "../models/shopkeeperModel";
import { checkCpf } from "./checkCpf";
import { CustomerModel } from "../models/customerModel";

import {ZodError, z} from "zod"

export class CheckParams {
  checkForRegistration(dataCheck: CustomerModel | ShopkeeperModel) {
    if (dataCheck instanceof CustomerModel) {
      this.checkCustomer(dataCheck)
    } 

    if(dataCheck instanceof ShopkeeperModel) {
      this.checkShopkeeper(dataCheck)
    }
  }

  checkCustomer(customer: CustomerModel) {
    const customerSchema = z.object({
      name: z.string({
        required_error: "Nome é obrigatorio",
        invalid_type_error: "Nome tem que ser um texto",
      }).min(3, {
        message: "Nome deve ter no minimo 3 letras"
      }),
      email: z.string({
        required_error: "Email é Obrigatorio",
      }).email({
        message: "Email invalido"
      }),
      password: z.string({
        required_error: "Password é obrigatorio"
      }).min(8, {
        message: "Senha deve ter no minimo 8 caracteres"
      }),
      // cpf: z.string({
      //   required_error: "CPF é obrigatorio",
      // }).refine(checkCpf)
    })

    try {
      customerSchema.parse({
        name: customer.getName,
        email: customer.getEmail,
        password: customer.getPassword,
        // cpf: customer.getCpf
      })

      return {
        message: "Validado com sucesso"
      }
    } catch(err: any) {
      // console.log("Erro **************** " + err.message)
      throw new ZodError(err.issues)
    }
  }

  checkShopkeeper(shopkeeperModel: ShopkeeperModel) {}
}
import { Request, Response } from "express";
import { CheckParams } from "../utils/CheckParams";
import { CustomerModel } from "../models/customerModel";
import { CustomerRepository } from "../repositories/customerRepository";
import { ZodError } from "zod";

class CustomerController {
  async create(req: Request, res: Response) {
    const body = req.body as CustomerType;

    const customer = new CustomerModel(body.name, body.email, body.cpf, body.password)

    try{

      const checkparams = new CheckParams();
      checkparams.checkForRegistration(customer);
      const customerRepository = new CustomerRepository()

      try {
        

        const result = await customerRepository.create(customer)

        return res.json({
          result
        })
      } catch (err: any) {
        return res.status(400).json({
          error: err.message
        })
      }

    } catch (err: any) {

      if(err instanceof ZodError) {
        return res.status(400).json({
          error: err.issues.map((errors: any )=> errors.message)
        })
      }

      return res.status(400).json({
        error: err.message
      }) 
    } 
  }

  async getByEmail(req: Request, res: Response) {
    const email = req.params.email

    console.log(email)

    const customerRepository = new CustomerRepository();
    try {
      const result = await customerRepository.getByEmail(email)
      return res.json({
        result
      })
    } catch (err: any) {
      return res.status(400).json({
        error: err.message
      })
    }
  }
}

export default new CustomerController();
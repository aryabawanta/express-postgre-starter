import { Request, Response } from 'express';
import { authenticationService } from "../services";
import { controllerUtil } from '../utils';
import { errorUtil } from "../utils"

export const login = async (req: Request<any, any, { username: string, password: string }>, res: Response) => {
  const { username, password } = req.body;
  try {
    const validate: controllerUtil.FieldValidator[] = [
      {
        key: "username",
        value: username,
        validators: ["required"]
      },
      {
        key: "password",
        value: password,
        validators: ["required"]
      }
    ];

    const { valid, errors } = controllerUtil.validateFields(validate)
    if (!valid) {
      throw errorUtil.createError(422, errors)
    }

    const data = await authenticationService.login(username, password);
    return res.header('Authorization', `Bearer ${data.token}`).status(200).json(data);
  } catch (error: any) {
    return res.status(error.status || 500).json({ message: `An error occurred processing the request. Please try again later`, error: error.message, ...error.response });
  }
};
import { Request, Response } from "express";
import { userService } from "../services"
import { controllerUtil, errorUtil } from '../utils';
import { ExtendedRequest, UserCreate, UserRoles } from '../interfaces'

export async function getAll(req: Request, res: Response) {
  try {
    const data = await userService.getAll();
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(error.status || 500).json({ message: `An error occurred processing the request. Please try again later`, error: error.message, ...error.response });
  }
}

export async function current(req: Request, res: Response) {
  const { user } = req.body

  try {
    const [data] = await userService.getAll({ id: user.id });
    if (!data) throw errorUtil.createError(404, `Current user not found`)
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(error.status || 500).json({ message: `An error occurred processing the request. Please try again later`, error: error.message, ...error.response });
  }
}

export async function create(req: ExtendedRequest, res: Response) {
  try {
    const validate: controllerUtil.FieldValidator[] = [
      {
        key: "name",
        value: req.body.name,
        validators: ["required"]
      },
      {
        key: "username",
        value: req.body.username,
        validators: ["required"]
      },
      {
        key: "password",
        value: req.body.password,
        validators: ["required"]
      },
      {
        key: "role",
        value: req.body.role,
        validators: ["required", "enum"],
        options: Object.values(UserRoles)
      },
    ];

    let { valid, errors } = controllerUtil.validateFields(validate)
    if (!valid) {
      throw errorUtil.createError(422, errors)
    }

    const values: UserCreate = {
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      name: req.body.name,
    }

    const data = await userService.create(values);
    return res.status(201).json(data)
  } catch (error: any) {
    return res.status(error.status || 500).json({ message: `An error occurred processing the request. Please try again later`, error: error.message, ...error.response });
  }
}

export async function update(req: Request, res: Response) {
  const username = req.body.user.username
  const id = req.params.id

  const { valid, errors } = controllerUtil.validateFields([{ key: "id", value: id, validators: ["required"] }])
  if (!valid) {
    throw errorUtil.createError(422, errors)
  }

  const payload = req.body
  const user = req.body.user

  const updatePayload: any = {}
  const updateKeys = ["password", "name"]
  if (user.role === "admin") updateKeys.push("role")
  for (const key in payload) {
    if (!updateKeys.includes(key)) continue // handle invalid payload property

    updatePayload[key] = payload[key]
  }

  try {
    const data = await userService.update(id, updatePayload);
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(error.status || 500).json({ message: `An error occurred processing the request. Please try again later`, error: error.message, ...error.response });
  }
}

export async function remove(req: Request, res: Response) {
  const id = req.params.id
  const { valid, errors } = controllerUtil.validateFields([{ key: "id", value: id, validators: ["required"] }])
  if (!valid) {
    throw errorUtil.createError(422, errors)
  }

  try {
    await userService.remove(id);
    return res.status(200).json({ message: `User successfully removed` });
  } catch (error: any) {
    return res.status(error.status || 500).json({ message: `An error occurred processing the request. Please try again later`, error: error.message, ...error.response });
  }
}


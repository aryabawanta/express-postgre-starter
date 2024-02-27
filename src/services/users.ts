import bcrypt from "bcrypt";
import { pick } from "lodash";
import database from "../database";
import { errorUtil } from "../utils";
import { UserCreate } from "../interfaces";
import { v4 as uuidv4 } from "uuid";

const PASSWORD_SALT = 10;

export async function getAll(filters: { id?: string } = {}) {
  try {
    const where = {} as any
    if (filters.id) {
      where["id"] = filters.id;
    }
    const data = await database.users.findAll({
      attributes: { exclude: ["password"] },
      where
    });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getUser(id: string) {
  const data = await database.users.findOne({
    where: { id },
    attributes: { exclude: ["password"] },
  });
  if (!data) {
    throw errorUtil.createError(404, `User with id '${id}' not found`);
  }
  return data;
}

export async function create(payload: UserCreate) {
  const newUser = {
    ...payload,
    id: uuidv4(),  
    password: await bcrypt.hash(payload.password, PASSWORD_SALT),
  }

  try {
    const data = await database.users.create(newUser);

    return {
      message: "User created successfully",
      user: pick(data, ["id", "username", "role", "name"]),
    };
  } catch (error: any) {
    throw errorUtil.createError(400, `${error.message}`);
  }
}

export async function update(id: string, payload: any) {
  try {
    const data = await database.users.findOne({ where: { id } });
    if (!data) {
      throw errorUtil.createError(404, `User with id '${id}' not found`);
    }
    if (payload.hasOwnProperty("password")) {
      payload.password = await bcrypt.hash(payload.password, PASSWORD_SALT);
    }

    await data?.update(payload);
    return pick(data, [
      "id",
      "name",
      "username",
      "role",
    ]);
  } catch (error: any) {
    throw errorUtil.createError(400, `${error.message}`);
  }
}

export async function remove(id: string) {
  try {
    const data = await database.users.findOne({ where: { id } });
    if (!data) {
      throw errorUtil.createError(404, `User with id '${id}' not found`);
    }

    await data?.destroy();
  } catch (error: any) {
    throw errorUtil.createError(400, `${error.message}`);
  }
}

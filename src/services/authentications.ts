import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import database from "../database";
import { errorUtil } from '../utils';
import { pick } from 'lodash';

export const login = async (username: string, password: string) => {
    const user = await database.users.findOne({
        where: {
            username,
        },
    });
    if (!user) { throw errorUtil.createError(401) }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) { throw errorUtil.createError(401); }

    const token = jwt.sign(pick(user, ["id", "username", "role", "name"]), process.env.JWT_SECRET as string, { expiresIn: "1w" });
    return { user: pick(user, ["id", "username", "role", "name", "createdAt", "updatedAt"]), token };
};
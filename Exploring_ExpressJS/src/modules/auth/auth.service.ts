import { error } from "node:console";
import { pool } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { config } from "../../config";
const loginUserIntoDB = async (payload: { email: string; password: string }) => {
    const { email, password } = payload;
    //1.check if the user exist
    //2.compare the password
    //3.generate token

    const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1`, [email]);
    if (userData.rows.length === 0) {
        throw new Error("Invalid Credentials!");
    }
    const user = userData.rows[0];
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
        throw new Error("Invalid Credentials!");
    }
    //generate token
    const jwtPayload = {
        id: user.id,
        name: user.name,
        is_active: user.is_active
    }
    const accessToken = jwt.sign(jwtPayload, config.secret as string, { expiresIn: '1d' });
    return { accessToken };
    // console.log(user);
}

export const authService = { loginUserIntoDB }
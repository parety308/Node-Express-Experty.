import type { Request, Response } from "express"
import { authService } from "./auth.service"

const loginUser = async (req: Request, res: Response) => {
    try {
        const result = await authService.loginUserIntoDB(req.body);
        return res.status(200).json({
            success: true,
            message: "User retrieve SUccessfully",
            data: result
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }
}
export const authController = { loginUser }
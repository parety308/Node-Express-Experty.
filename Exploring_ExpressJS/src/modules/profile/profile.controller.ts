import type { Request, Response } from "express";
import { createProfileIntoDB } from "./profile.service";

export const createProfile = async (req: Request, res: Response) => {
    // console.log(req.body);
    try {
        const result = await createProfileIntoDB(req.body);
        // console.log(result);
        return res.status(201).json({
            message: "Profile Created Successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        })
    }
};
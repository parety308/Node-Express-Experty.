import type { Request, Response } from "express";
import { pool } from "../../db";
import { createUserIntoDB, deleteUserFromDB, getAllUserFromDB, getSingleUserFromDB, updateUserIntoDB } from "./user.service";

export const createUser = async (req: Request, res: Response) => {
    // console.log(req.body);
    try {
        const result = await createUserIntoDB(req.body);
        // console.log(result);
        return res.status(201).json({
            message: "User Created Successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        return res.status(500).json({
            message: error.message,
            error
        })
    }
};

export const getAllUSers = async (req: Request, res: Response) => {
    try {
        const result = await getAllUserFromDB();
        return res.status(200).json({
            success: true,
            message: "Users retrieve SUccessfully",
            data: result.rows
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }
};

export const getSingleUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    // console.log(id)
    try {
        const result = await getSingleUserFromDB(Number(id));
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                // data: result.rows[0]
            })
        }
        return res.status(200).json({
            success: true,
            message: "User retrieve SUccessfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await updateUserIntoDB(req.body, Number(id));
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                // data: result.rows[0]
            })
        }
        return res.status(200).json({
            success: true,
            message: "User modified Successfully",
            data: result.rows[0]
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await deleteUserFromDB(Number(id));
        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                // data: result.rows[0]
            })
        }
        return res.status(200).json({
            success: true,
            message: "User Deleted SUccessfully"
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error
        })
    }


};
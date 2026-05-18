import { Router } from "express";
import { createUser, deleteUser, getAllUSers, getSingleUser, updateUser } from "./user.controller";

const router = Router();

//create user api
router.post('/', createUser);

//get all user api
router.get('/', getAllUSers);

//get single user byv their id
router.get('/:id', getSingleUser);

//update user api
router.put('/:id',updateUser);

//delete user api
router.delete('/:id',deleteUser);
export const userRoute = router
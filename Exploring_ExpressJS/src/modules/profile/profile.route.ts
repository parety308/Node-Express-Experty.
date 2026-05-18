import { Router } from "express";
import { createProfile } from "./profile.controller";

const router = Router();

router.post('/', createProfile);

export const profileRoute = router;
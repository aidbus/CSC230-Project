import {Signup} from "../Controllers/AuthController.js";
import { Router } from "express";

const router = Router();

router.post("/signup", Signup);

export default router; /////////////////////////////////////// THIS STUFF MIGHT CAUSE ERRORS, BECAUSE THE IMPORT ON GUIDE IS 
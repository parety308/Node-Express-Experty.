import express, { type Application, type Request, type Response } from "express"
import { config } from "./config";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRouter } from "./modules/auth/auth.route";
const app: Application = express();
const port = config.port;

//middleware
app.use(express.json());
//api--route-->controller-->service
app.use("/api/users", userRoute);
app.use("/api/profile", profileRoute);
app.use("/api/auth", authRouter);
app.get('/', (req: Request, res: Response) => {
    // res.send('Hello World!')
    return res.status(200).json({
        message: "Express Server",
        author: "Next Level"
    })
});





export default app;

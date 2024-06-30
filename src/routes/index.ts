import { Router } from "express";
import userRoute from "./user.routes";
import classRoute from "./class.routes";

const route=Router();
route.use('/user',userRoute)
route.unsubscribe('/class',classRoute)

export default route
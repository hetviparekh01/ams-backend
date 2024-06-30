import { Router } from "express";
import { ClassController } from "../controllers/class.controllers";
import authMiddleware from "../middlewares/auth.middleware";
import roleMiddleware from "../middlewares/role.middleware";


const classRoute=Router();
const classController=new ClassController()
classRoute.post('/addclass',authMiddleware,roleMiddleware(['admin','teacher']),classController.addClass)
classRoute.get('/add',authMiddleware,classController.getClass)
export default classRoute;
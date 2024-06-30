import { Router } from "express";
import { UserController } from "../controllers/user.controllers";
import upload, { multerErrorHandling } from "../middlewares/multer.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import roleMiddleware from "../middlewares/role.middleware";

const userRoute = Router();
const userController = new UserController();
userRoute.post(
  "/signup",
  upload.fields([{ name: "filePath", maxCount: 1 }]),
  multerErrorHandling,
  userController.signup
);
userRoute.post("/login", userController.login);
userRoute.get(
  "/getalluser",
  // authMiddleware,
  // roleMiddleware(["admin", "teacher"]),
  userController.getUser
);
userRoute.get("/getuserbyid/:id", authMiddleware, userController.getUserById);
userRoute.put(
  "/updateuser/:id",
  authMiddleware,
  roleMiddleware(["admin", "teacher"]),
  upload.fields([{ name: "filePath", maxCount: 1 }]),
  multerErrorHandling,
  userController.updateUser
);
userRoute.post("/deleteuser/:id", authMiddleware,roleMiddleware(['admin','teacher']), userController.deleteUser);
userRoute.get("/getallstudent", authMiddleware,roleMiddleware(['admin','teacher']), userController.getStudents);

export default userRoute;

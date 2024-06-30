import config from "config"
import { IUser } from "../interfaces"
import User from "../models/user.model"
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken";
import fs from "fs"
export class UserService {
    async signup(userData: IUser) {
        try {
            // console.log(userData);
            const response = await User.create(userData)
            if (response) {
                return { status: true, message: "USER SIGNED UP SUCCESSFULLY" }
            } else {
                throw new Error("ERROR IN SIGNUP USER")
            }
        } catch (error: any) {
            return { status: false, message: error.message }
        }
    }
    async login(userData: IUser) {
        try {
            const user = await User.findOne({ uniqueSchId: userData.uniqueSchId })
            if (!user) {
                throw new Error("USER NOT FOUND")
            }
            let isValidate = await bcrypt.compare(userData.password, user.password)
            if (!isValidate) {
                throw new Error("INVALID CREDENTIALS");
            }
            const payload: JwtPayload = {
                userId: user._id,
                uniqueId: user.uniqueSchId,
                role: user.role,
            }
            const token = jwt.sign(payload, config.get("secretKey") as string, { expiresIn: "24h" })
            const response = {
                accessToken: token,
                name: user.name,
                role: user.role,
                uniqueId: user.uniqueSchId
            }
            return { status: true, message: response }
        } catch (error: any) {
            return { status: true, message: error.message }
        }
    }
    async getUser() {
        try {
            const response = await User.find({});
            if (response) {
                return { status: true, message: response,length:response.length }
            } else {
                throw new Error("ERROR IN GETTING USER")
            }
        } catch (error: any) {
            return { status: false, message: error.message }
        }
    }
    async getUserById(userId: string) {
        try {
            const response = await User.findById(userId);
            if (response) {
                return { status: true, message: response }
            } else {
                throw new Error("ERROR IN GETTING USER")
            }
        } catch (error: any) {
            return { status: false, message: error.message }
        }
    }
    async updateUser(userId: string, userData: IUser) {
        try {
            const user = await User.findById(userId);
            if (user) {
                fs.unlink(user.filePath,
                    (err => {
                        if (err) console.log(err);
                        else {
                            console.log("\nDeleted file: example_file.txt");
                        }
                    }));
            }
            const response = await User.findByIdAndUpdate(userId,userData);
            if (response) {
                return { status: true, message: "USER SUCESSFULLY UPDATED" }
            } else {
                throw new Error("ERROR IN UPDATING USER")
            }
        } catch (error: any) {
            return { status: false, message: error.message }
        }
    }
    async deleteUser(userId:string){
        try {
            const user = await User.findById(userId);
            if (user) {
                fs.unlink(user.filePath,
                    (err => {
                        if (err) console.log(err);
                        else {
                            console.log("\nDeleted file: example_file.txt");
                        }
                    }));
            }
            const response = await User.findByIdAndDelete(userId);
            if (response) {
                return { status: true, message: "USER SUCESSFULLY DELETED" }
            } else {
                throw new Error("ERROR IN DELETING USER")
            }
        } catch (error:any) {
            return { status: false, message: error.message }
        }
    }
    async getStudents(){
        try {
            const response = await User.find({role:"student"});
            if (response) {
                return { status: true, message: response, length:response.length }
            } else {
                throw new Error("ERROR IN GETTING USER")
            }
        } catch (error: any) {
            return { status: false, message: error.message }
        } 
    }
}
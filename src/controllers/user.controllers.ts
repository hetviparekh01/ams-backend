import { UserService } from "../services/user.service";
import { Request,Response } from "express";
import bcrypt from "bcrypt"
const userService=new UserService()
export class UserController{
    async signup(req:Request,res:Response){
        try {
        const userData=req.body;
        console.log(req.body.address);
        userData.address=JSON.parse(req.body.address)
        userData.password=await bcrypt.hash(userData.password,10);
        const file=req.files as { [fieldname: string]: Express.Multer.File[]; }
        const newFilePath=file?.filePath[0]?.path
        userData.filePath=newFilePath
        console.log(req.files);
        const response=await userService.signup(userData);
        if(response.status){
            return res.json({status:true,message:response.message})
        }else{
            return res.json({status:false,message:response.message})
        }
        } catch (error:any) {
            console.log(error);
            return res.json({status:false,message:error.message})
        } 
    }
    async login(req:Request,res:Response){
        try {
        const userData=req.body;
      
        const response=await userService.login(userData);
        if(response.status){
            return res.json({status:true,message:response.message})
        }else{
            return res.json({status:false,message:response.message})
        }
        } catch (error:any) {
            return res.json({status:false,message:"INTERNAL SERVER ERROR!!"})
        } 
    }
    async getUser(req:Request,res:Response){
        try {
            const response=await userService.getUser();
            if(response.status){
                return res.json({status:true,message:response.message,length:response.length})
            }else{
                return res.json({status:false,message:response.message})
            }  
        } catch (error:any) {
            return res.json({status:false,message:"INTERNAL SERVER ERROR!!"})
            
        }
    }
    async getUserById(req:Request,res:Response){
        try {
            const userId=req.params.id
            const response=await userService.getUserById(userId);
            if(response.status){
                return res.json({status:true,message:response.message})
            }else{
                return res.json({status:false,message:response.message})
            }  
        } catch (error:any) {
            return res.json({status:false,message:"INTERNAL SERVER ERROR!!"})
            
        }
    }
    async updateUser(req:Request,res:Response){        
        try {
            console.log("hello");
            const userId=req.params.id
            const userData=req.body;
            userData.address=JSON.parse(req.body.address)
            userData.password=await bcrypt.hash(userData.password,10);
            const file=req.files as { [fieldname: string]: Express.Multer.File[]; }
            const newFilePath=file?.filePath[0]?.path
            userData.filePath=newFilePath;
            console.log(req.files);
            const response=await userService.updateUser(userId,userData);
            if(response.status){
                return res.json({status:true,message:response.message})
            }else{
                return res.json({status:false,message:response.message})
            }  
        } catch (error:any) {
            return res.json({status:false,message:"INTERNAL SERVER ERROR!!"})
            
        }
    }
    async deleteUser(req:Request,res:Response){
        try {
            const userId=req.params.id
            const response=await userService.deleteUser(userId);
            if(response.status){
                return res.json({status:true,message:response.message})
            }else{
                return res.json({status:false,message:response.message})
            }  
        } catch (error:any) {
            return res.json({status:false,message:"INTERNAL SERVER ERROR!!"})
            
        }
    }
    async getStudents(req:Request,res:Response){
        try {
            const response=await userService.getStudents();
            if(response.status){
                return res.json({status:true,message:response.message,length:response.length})
            }else{
                return res.json({status:false,message:response.message})
            }  
        } catch (error:any) {
            return res.json({status:false,message:"INTERNAL SERVER ERROR!!"})
            
        }
    }
}
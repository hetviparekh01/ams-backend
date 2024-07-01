import { Request,Response } from "express";
import Class from "../models/class.model";
import { ClassService } from "../services/class.service";
const classService=new ClassService()
export class ClassController{
    async addClass(req:Request,res:Response){
        try {
            const classData=req.body;
            classData.teacherId=req.user.userId
            const response=await classService.addClass(classData);
            if(response.status){
                return res.json({status:true,message:response.message})
            }else{
                return res.json({status:false,message:response.message})
            }  
        } catch (error:any) {
            return res.json({status:false,message:error.message}) 
        }
    }
    async getClass(req:Request,res:Response){
        try {
            const response=await classService.getClass();
            if(response.status){
                return res.json({status:true,message:response.message})
            }else{
                return res.json({status:false,message:response.message})
            } 
        } catch (error:any) {
            return res.json({status:false,message:error.message})         
        }
    }
    async getClassId(req:Request,res:Response){
        try {
            const classId=req.params.id
            const response=await classService.getClassById(classId);
            if(response.status){
                return res.json({status:true,message:response.message})
            }else{
                return res.json({status:false,message:response.message})
            } 
        } catch (error:any) {
            return res.json({status:false,message:error.message})         
        }
    }
  
}

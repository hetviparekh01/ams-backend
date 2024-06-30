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
            return res.json({status:false,message:"INTERNAL SERVER ERROR!!"}) 
        }
    }
    async getClass(){
        try {
            console.log("hetvi");
        } catch (error:any) {
            console.log(error.message);
        }
    }
}

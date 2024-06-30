import { Request,Response,NextFunction } from "express"

const roleMiddleware=(roles:string[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        try {
            const role=req.user.role;
            if(!roles.includes(role)){
                throw new Error("UNAUTHORIZED ACCESS")
            }
            next();
        } catch (error:any) {
            return res.json({status:false,message:error.message})
        }
    }
}
export default roleMiddleware;
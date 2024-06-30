import { IClass } from "../interfaces";
import Class from "../models/class.model";

export class ClassService{
    async addClass(classData:IClass){
        try {
            const response=await Class.create(classData);
            if (response) {
                return { status: true, message: `CLASS SUCCESSFULLY CREATED FOR DATE ${classData.date}` }
            } else {
                throw new Error(`ERROR IN CRATING CLASS FOR DATE ${classData.date}`)
            }
        } catch (error: any) {
            return { status: false, message: error.message }
        }
    }
}
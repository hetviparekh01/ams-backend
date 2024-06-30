import mongoose, { ObjectId } from "mongoose";

export interface IClass{
    date:Date,
    teacherId?:ObjectId,
    studentAbsent: mongoose.Types.ObjectId[],
    StudentPresent: mongoose.Types.ObjectId[]
}
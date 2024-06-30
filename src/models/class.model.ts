import mongoose, { Schema, mongo } from "mongoose";
import { IClass } from "../interfaces/IClass";
import User from "./user.model";

const ClassSchema = new Schema<IClass>({
    date: {
        type: Date,
        required: [true, "date is required"],
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "teacherId is required"],
        ref: "user"
    },
    studentAbsent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }

    ],
    StudentPresent: [
        {

            type: mongoose.Schema.Types.ObjectId,
            ref: "user"

        }
    ]
}, { timestamps: true })

ClassSchema.pre('save', async function (next){
    const students = await User.find({ role: "student" })
    for (const stu of students) {
        if (!this.studentAbsent.includes(stu._id)) {
            this.StudentPresent.push(stu._id)
        }
    }
})


const Class = mongoose.model("class", ClassSchema)
export default Class
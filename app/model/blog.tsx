import { Schema } from "mongoose";
import { BlogInterface } from "~/components/interface";
import mongoose from "~/mongoose.server";

const BlogSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    subject: {
        required: true,
        type: String,
    },
    image: {
        required: true,
        type: String,
    },
    category: {
        ref: "category",
        required: true,
        type: Schema.Types.ObjectId,
    },
    admin: {
        ref: "registration",
        required: true,
        type: Schema.Types.ObjectId,
    },
}, {
    timestamps: true
})

let Blog: mongoose.Model<BlogInterface>

try {
    Blog = mongoose.model<BlogInterface>("blog")
} catch (error) {
    Blog = mongoose.model<BlogInterface>("blog", BlogSchema)

}

export default Blog
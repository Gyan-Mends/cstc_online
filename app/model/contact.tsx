import mongoose from "mongoose";
import { ContactInterface } from "~/components/interface";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

let Contact: mongoose.Model<ContactInterface>;

try {
    Contact = mongoose.model<ContactInterface>("Contact");
} catch (error) {
    Contact = mongoose.model<ContactInterface>("Contact", contactSchema);
}



export default Contact;

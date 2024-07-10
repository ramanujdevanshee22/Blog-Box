import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true
        },
        email:{
            type:String,
            required: true
        },
        password:{
            type:String,
            required:true
        },
        occupation:{
            type:String,
            default:""
        },
        avatar:{
            type:Object,
            default:{}
        },
        age:{
            type:String,
            default:""
        },
        location:{
            type:String,
            default:""
        },
        about:{
            type:String,
            default:""
        },

    },
    {timestamps:true}
)
export default mongoose?.models?.User || mongoose.model("User", UserSchema);
// module.exports = mongoose.model("User", UserSchema);
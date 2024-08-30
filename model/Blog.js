import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        description:{
            type:String,
            required: true
        },
        quote:{
            type:String,
            required:true,
            min: 6
        },
        image_url:{
                type:String,
                required:true
        },
        category:{
            type: String,
            required:true,
            enum:["Environment","Lifestyle","Education","Technology","Food","Sports","Music","Politics","Movie","Fitness","Travel","Beauty","Fashion","Books","Religion","Photography","Business","Art","News"]
        },
        author_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        likes:{
           type:Array,
           default:[]
        },
        comments:[
            {
                id:{
                    type:mongoose.Schema.Types.ObjectId,
                    requred: true,
                },
                user:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"User",
                 
                },
                text:{
                    type:String, 
                    required:true
                },
                date:{
                    type:Date,
                    default:Date.now,
                }
            }
        ]
            

    },
    {timestamps:true}
)
export default mongoose?.models?.Blog || mongoose.model("Blog", BlogSchema);
// module.exports = mongoose.model("User", UserSchema);
import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    items: [
        {
            product: { 
                _id :{
                    type: mongoose.Schema.Types.ObjectId,
                    required:true
                },
                name:{
                    type:String,
                    required:true,
                    unque:true
                },
                category:{
                    type:String,
                    required:true
                },
                price:{
                    type:String,
                    required:true
                },
                img:{
                    type:String,
                    required:true
                },
                description:{
                    type:String,
                    required:true
                }
            
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    total:{
        type:Number,
        required:true
    }
})

const ordersModel = mongoose.model('order',ordersSchema);
export default ordersModel
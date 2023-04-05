import mongoose from "mongoose";

const engine = mongoose.Schema({
  // _id:String,
  Motor_OK:{
    type: Number,
    required: true,
    min: 0,
    max: 1,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  },
})

const engineSchema = mongoose.model("engineSchema", engine)

export default engineSchema
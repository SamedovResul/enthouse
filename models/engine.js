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
  Motor_ON:{
    type: Number,
    required: true,
    min: 0,
    max: 1,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  },
  time:{
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

const engineSchema = mongoose.model("engineSchema", engine)

export default engineSchema
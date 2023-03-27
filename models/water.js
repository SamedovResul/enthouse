import mongoose from "mongoose";

const Water = mongoose.Schema({
  level:{
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

const WaterSchema = mongoose.model("Water", Water)

export default WaterSchema
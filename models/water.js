import mongoose from "mongoose";

const Water = mongoose.Schema({
  Water_Level:{
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  },
})

const WaterSchema = mongoose.model("Water", Water)

export default WaterSchema
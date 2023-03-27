import mongoose from "mongoose";

const SensorThree = mongoose.Schema({
  Air:{
    AirTemp:Number,
    AirWet:Number,
  },
  Soil:{
    SoilTemp:Number,
    SoilWet:Number,
  },
  Water:{
    WaterLevel:Number,
    WaterTemp:Number,
    WaterFlowrate:Number,
  },
  OxygenMoto:{
    OxygenMoto:Number,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

const SensorThreeDataSchema = mongoose.model("SoilData", SensorThree)

export default SensorThreeDataSchema
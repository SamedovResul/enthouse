import mongoose from "mongoose";

const SensorTwo = mongoose.Schema({
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
    OxygenMoto:Number,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

const SensorTwoDataSchema = mongoose.model("SensorTwo", SensorTwo)

export default SensorTwoDataSchema
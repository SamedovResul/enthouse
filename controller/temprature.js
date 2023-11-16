import mongoose from 'mongoose';
import WaterSchema from '../models/water.js';
import EngineSchema from '../models/engine.js';
import Joi from 'joi';


export const temperatureGet = async (req, res) => {
  try {
    let water = await WaterSchema.findOne();
    let engine = await EngineSchema.findOne();
    

    res.status(200).json({
      water,
      engine
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// {
//   "Motor_OK":1,
//   "time":5
// }

export const temperatureForArduino = async (req, res) => {
  try {
    const {Motor_ON,Water_Level} = req.body
    // console.log(Motor_OK,Water_Level)
    let engine = await EngineSchema.findOne();
    let water = await WaterSchema.findOne();
    
    await EngineSchema.findByIdAndUpdate(
      engine._id,
      { 
        Motor_ON
      },
      { new: true }
    );

    if(engine.Motor_OK === 1){
      await EngineSchema.findByIdAndUpdate(
        engine._id,
        { 
          Motor_OK:0
        },
        { new: true }
      );
    }

    if (!water) {
      water = await new WaterSchema({
        Water_Level,
      }).save();
    } else {
      await WaterSchema.findByIdAndUpdate(
        water._id,
        { 
          Water_Level,
        },
        { new: true }
      );
    }


    
    res.status(200).json({
      engine
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};


export const temperaturePost = async (req, res) => {
  try {
    const { Motor_OK, time } = req.body;
    console.log(Motor_OK, time)
    let engine = await EngineSchema.findOne();
    

    if (!engine) {
      engine = await new EngineSchema({
        Motor_OK,
        time
      }).save();
    } else {
      engine = await EngineSchema.findByIdAndUpdate(
        engine._id,
        { 
          Motor_OK,
          time,
          createdAt:new Date()
        },
        { new: true }
      );
    }
    console.log(engine)
    return res.status(201).json({
      engine,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



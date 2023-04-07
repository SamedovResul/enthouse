import mongoose from 'mongoose';
import WaterSchema from '../models/water.js';
import EngineSchema from '../models/engine.js';
import Joi from 'joi';


export const temperatureGet = async (req, res) => {
  try {
    let water = await WaterSchema.findOne();
    let engine = await EngineSchema.findOne();
    
    console.log(engine)
    const rightNow = new Date();
    const timeDifferenceInMillis = rightNow - engine.createdAt;
    const timeDifferenceInSeconds = timeDifferenceInMillis / 1000;
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    const seconds = Math.floor(timeDifferenceInSeconds % 60);

    // console.log(`${minutes} minute(s) and ${seconds} second(s) have`);

    if(minutes <= engine.time - 1){
      engine = {
        Motor_OK:1,
        time:engine.createdAt,
        timer:engine.time
      }
    }else{
      engine = {
        Motor_OK:0,
        time:0,
      }
    }

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
    const { Su_Level } = req.body
    console.log(Su_Level)
    let water = await WaterSchema.findOne();
    if (!water) {
      water = await new WaterSchema({
        Water_Level:Su_Level
      }).save();
    } else {
      water = await WaterSchema.findByIdAndUpdate(
        water._id,
        { Water_Level:Su_Level },
        { new: true }
      );
    }
    let engine = await EngineSchema.findOne();
    await EngineSchema.findByIdAndUpdate(
      engine._id,
      { 
        Motor_OK:0
      },
      { new: true }
    );
    res.status(200).json({
      engine,
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

    return res.status(201).json({
      engine,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



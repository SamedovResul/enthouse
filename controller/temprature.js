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


export const temperaturePost = async (req, res) => {
  try {
    const { status, problem, level } = req.body;
    let water = await WaterSchema.findOne();
    let engine = await EngineSchema.findOne();
    if (!water) {
      water = await new WaterSchema({
        level
      }).save();
    } else {
      water = await WaterSchema.findByIdAndUpdate(
        water._id,
        { level },
        { new: true }
      );
    }

    if (!engine) {
      engine = await new EngineSchema({
        status,
        problem
      }).save();
    } else {
      engine = await EngineSchema.findByIdAndUpdate(
        engine._id,
        { 
          status,
          problem 
        },
        { new: true }
      );
    }

    return res.status(201).json({
      engine,
      water
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



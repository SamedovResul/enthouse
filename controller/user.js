import mongoose from "mongoose";
import userData from '../models/user.js';
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

export const signUp = async (req,res) =>{
  const {name,email,password} = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await userData.create({email, password: hashedPassword, name});
    const token = jwt.sign({email:email, user:user._id,}, process.env.SECRET, {expiresIn: '1h'} );

    res.status(200).json({token,user})
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

export const signIn = async (req,res) =>{
  const {email, password} = req.body
  try {
    
    const user = await userData.findOne({email})
    console.log(user)
    if(!user) return res.status(400).send("invalid email")

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect) return res.status(400).send("invalid password")

    const token = jwt.sign({email:email, user:user._id,}, process.env.SECRET, {expiresIn: '1h'} );

    res.status(200).json({token,user})
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}
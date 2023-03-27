import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

const userData = mongoose.model('userData', UserSchema)

export default  userData
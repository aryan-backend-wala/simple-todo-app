import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
}, { timestamps: true })

export const Todo = mongoose.model("Todo", TodoSchema);
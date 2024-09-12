import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://deveshagnihotri03:agnihotri123@cluster0.hx9g5.mongodb.net/CampusBite').then(()=>{console.log("DB Connected")});
}
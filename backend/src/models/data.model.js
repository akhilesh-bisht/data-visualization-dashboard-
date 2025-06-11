import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Define the schema for data model
export const dataSchema = new Schema(
  {
    end_year: {
      type: String,
         },
    intensity: {
      type: Number,
      required: true,
      min: [0, 'Intensity must be a positive number'],
    },
    sector: {
      type: String,
      enum: ['Energy', 'Agriculture', 'Technology', 'Healthcare', 'Finance'],
      required: true,
    },
    topic: String,
    insight: String,
    url: String,
    region: {
      type: String,
      enum: ['Northern America', 'Europe', 'Asia', 'Africa', 'Australia'], 
    },
    start_year: {
      type: String,
    
    },
    impact: String,
    added: { 
      type: Date,
      required: true,
    },
    published: { 
      type: Date, 
      required: true,
    },
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number,
  },
  { timestamps: true } 
);

// Create and export the model
export const Data = model("Data", dataSchema);

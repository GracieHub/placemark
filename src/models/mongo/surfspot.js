import Mongoose from "mongoose";

const { Schema } = Mongoose;

const surfspotSchema = new Schema({
  name: String,
  location: String,
  typeOfWave: String,
  collectionid: {
    type: Schema.Types.ObjectId,
    ref: "Collection",
  },
});

export const Surfspot = Mongoose.model("Surfspot", surfspotSchema);
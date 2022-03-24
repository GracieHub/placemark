import { Surfspot } from "./surfspot.js";

export const surfspotMongoStore = {
  async getAllSurfspots() {
    const Surfspots = await Surfspot.find().lean();
    return Surfspots;
  },

  async addSurfspot(collectionId, surfspot) {
    surfspot.Collectionid = collectionId;
    const newSurfspot = new Surfspot(surfspot);
    const surfspotObj = await newSurfspot.save();
    return this.getSurfspotById(surfspotObj._id);
  },

  async getSurfspotsByCollectionId(id) {
    const surfspots = await Surfspot.find({ Collectionid: id }).lean();
    return surfspots;
  },

  async getSurfspotById(id) {
    if (id) {
      const surfspot = await Surfspot.findOne({ _id: id }).lean();
      return surfspot;
    }
    return null;
  },

  async deleteSurfspot(id) {
    try {
      await Surfspot.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllSurfspots() {
    await Surfspot.deleteMany({});
  },

  async updateSurfspot(surfspot, updatedSurfspot) {
    surfspot.name = updatedSurfspot.name;
    surfspot.location = updatedSurfspot.location;
    surfspot.typeOfWave = updatedSurfspot.typeOfWave;
    await surfspot.save();
  },
};
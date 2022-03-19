import { Surfspot } from "./surfspot.js";

export const surfspotMongoStore = {
  async getSurfspotsByCollectionId(id) {
    const surfspots = await Surfspot.find({ collectionid: id }).lean();
    return surfspots;
  },
};
import { v4 } from "uuid";

let surfspots = [];

export const surfspotMemStore = {
  async getAllSurfspots() {
    return surfspots;
  },

  async addSurfspot(collectionId, surfspot) {
    surfspot._id = v4();
    surfspot.collectionid = collectionId;
    surfspots.push(surfspot);
    return surfspot;
  },

  async getSurfspotsByCollectionId(id) {
    return surfspots.filter((surfspot) => surfspot.collectionid === id);
  },

  async getSurfspotById(id) {
    return surfspots.find((surfspot) => surfspot._id === id);
  },

  async getCollectionSurfspots(collectionId) {
    return surfspots.filter((surfspot) => surfspot.collectionid === collectionId);
  },

  async deleteSurfspot(id) {
    const index = surfspots.findIndex((surfspot) => surfspot._id === id);
    surfspots.splice(index, 1);
  },

  async deleteAllSurfspots() {
    surfspots = [];
  },

  async updateSurfspot(surfspot, updatedSurfspot) {
    surfspot.name = updatedSurfspot.name;
    surfspot.latitude = updatedSurfspot.latitude;
    surfspot.longitude = updatedSurfspot.longitude;
    surfspot.typeOfWave = updatedSurfspot.typeOfWave;
  },
};

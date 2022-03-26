import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/surfspots.json"));
db.data = { surfspots: [] };

export const surfspotJsonStore = {
  async getAllSurfspots() {
    await db.read();
    return db.data.surfspots;
  },

  async addSurfspot(collectionId, surfspot) {
    await db.read();
    surfspot._id = v4();
    surfspot.collectionid = collectionId;
    db.data.surfspots.push(surfspot);
    await db.write();
    return surfspot;
  },

  async getSurfspotsByCollectionId(id) {
    await db.read();
    return db.data.surfspots.filter((surfspot) => surfspot.collectionid === id);
  },

  async getSurfspotById(id) {
    await db.read();
    return db.data.surfspots.find((surfspot) => surfspot._id === id);
  },

  async deleteSurfspot(id) {
    await db.read();
    const index = db.data.surfspots.findIndex((surfspot) => surfspot._id === id);
    db.data.surfspots.splice(index, 1);
    await db.write();
  },

  async deleteAllSurfspots() {
    db.data.surfspots = [];
    await db.write();
  },

  async updateSurfspot(surfspot, updatedSurfspot) {
    surfspot.name = updatedSurfspot.name;
    surfspot.latitude = updatedSurfspot.latitude;
    surfspot.longitude = updatedSurfspot.longitude;
    surfspot.typeOfWave = updatedSurfspot.typeOfWave;
    await db.write();
  },
};
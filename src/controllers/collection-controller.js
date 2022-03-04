import { SurfspotSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const collectionController = {
  index: {
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      const viewData = {
        title: "Collection",
        collection: collection,
      };
      return h.view("collection-view", viewData);
    },
  },

  addSurfspot: { 
    
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      const newSurfspot = {
        name: request.payload.name,
        location: request.payload.location,
        typeOfWave: request.payload.typeOfWave,
      };
      await db.surfspotStore.addSurfspot(collection._id, newSurfspot);
      return h.redirect(`/collection/${collection._id}`);
    },
  },

  deleteSurfspot: {
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      await db.surfspotStore.deleteSurfspot(request.params.surfspotid);
      return h.redirect(`/collection/${collection._id}`);
    },
  },
};

import { SurfspotSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

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
    validate: {
      payload: SurfspotSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const collection = await db.collectionStore.getCollectionById(request.params.id);
        return h.view("collection-view", { name: "Add Surfspot error", collection, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      const newSurfspot = {
        name: request.payload.name,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
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

  uploadImage: {
    handler: async function(request, h) {
      try {
        const collection = await db.collectionStore.getCollectionById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          collection.img = url;
          db.collectionStore.updateCollection(collection);
        }
        return h.redirect(`/collection/${collection._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/collection/${collection._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true
    }
  }
};

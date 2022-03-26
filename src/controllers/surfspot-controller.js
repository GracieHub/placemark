import { SurfspotSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const surfspotController = {
  index: {
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      const surfspot = await db.surfspotStore.getSurfspotById(request.params.surfspotid);
      const viewData = {
        name: "Edit SurfSpot",
        collection: collection,
        surfspot: surfspot,
      };
      return h.view("surfspot-view", viewData);
    },
  },

  update: {
    validate: {
      payload: SurfspotSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("surfspot-view", { title: "Edit surfspot error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const surfspot = await db.surfspotStore.getSurfspotById(request.params.surfspotid);
      const newSurfspot = {
        name: request.payload.name,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        typeOfWave: request.payload.typeOfWave,
      };
      await db.surfspotStore.updateSurfspot(surfspot, newSurfspot);
      return h.redirect(`/collection/${request.params.id}`);
    },
  },
};

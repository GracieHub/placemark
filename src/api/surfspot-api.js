import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, SurfspotSpec, SurfspotSpecPlus, SurfspotArraySpec } from "../models/joi-schemas.js";
import { Surfspot } from "../models/mongo/surfspot.js";
import { validationError } from "./logger.js";

export const surfspotApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const surfspots = await db.surfspotStore.getAllSurfspots();
        return surfspots;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    
    tags: ["api"],
    response: { schema: SurfspotArraySpec, failAction: validationError },
    description: "Get all surfspotApi",
    notes: "Returns all surfspotApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const surfspot = await db.surfspotStore.getSurfspotById(request.params.id);
        if (!surfspot) {
          return Boom.notFound("No surfspot with this id");
        }
        return surfspot;
      } catch (err) {
        return Boom.serverUnavailable("No surfspot with this id");
      }
    },
    tags: ["api"],
    description: "Find a surfspot",
    notes: "Returns a surfspot",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: SurfspotSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const surfspot = await db.surfspotStore.addSurfspot(request.params.id, request.payload);
        if (surfspot) {
          return h.response(surfspot).code(201);
        }
        return Boom.badImplementation("error creating surfspot");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a surfspot",
    notes: "Returns the newly created surfspot",
    validate: { payload: SurfspotSpec },
    response: { schema: SurfspotSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.surfspotStore.deleteAllSurfspots();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all surfspotApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const surfspot = await db.surfspotStore.getSurfspotById(request.params.id);
        if (!surfspot) {
          return Boom.notFound("No surfspot with this id");
        }
        await db.surfspotStore.deleteSurfspot(surfspot._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No surfspot with this id");
      }
    },
    tags: ["api"],
    description: "Delete a surfspot",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  addSurfspot: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      if (!collection) {
        return Boom.notFound("No Collectoin with this id");
      }
      const surfspot = await db.surfspotStore.addSurfspot(
        request.payload.name,
        request.payload.latitude,
        request.payload.longitude,
        request.payload.typeOfWave,
        request.auth.credentials,
        collection,
      );
      return surfspot;
    },
  },

  findByCollection: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      const collectionId = request.params.id
      try{
        const surfspots = await db.surfspotStore.getSurfspotsByCollectionId(request.params.id);
        console.log(request.params.id)
        return surfspots;
      } catch (err) {
        return Boom.serverUnavailable("Databse Error");;
      }
    },
  }, 

  /* findByCollection: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        const surfspots = await Surfspot.find({collectionid: request.params.id })
        return surfspots;
//      } catch (err) {
//        return Boom.serverUnavailable("Databse Error");;
      },
    }, */
  
}

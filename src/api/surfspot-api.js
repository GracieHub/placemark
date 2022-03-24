import Boom from "@hapi/boom";
import { db } from "../models/db.js";


export const surfspotApi = {
    find: {
      auth: false,
      handler: async function (request, h) {
        try {
          const surfspots = await db.surfspotStore.getAllSurfspots();
          return surfspots;
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
    },
  
    findOne: {
      auth: false,
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
    },
  
    create: {
      auth: false,
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
    },
  
    deleteAll: {
      auth: false,
      handler: async function (request, h) {
        try {
          await db.surfspotStore.deleteAllSurfspots();
          return h.response().code(204);
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
    },
  
    deleteOne: {
      auth: false,
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
    },
  };
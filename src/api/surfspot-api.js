import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, SurfspotSpec, SurfspotSpecPlus, SurfspotArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

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
    tags: ["api"],
    response: { schema: SurfspotArraySpec, failAction: validationError },
    description: "Get all SurfspotApi",
    notes: "Returns all SurfspotApi",
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const surfspot = await db.surfspotStore.getSurfspotById(request.params.id);
        if (!surfspot) {
          return Boom.notFound("No Surfspot with this id");
        }
        return surfspot;
      } catch (err) {
        return Boom.serverUnavailable("No Surfspot with this id");
      }
    },
    tags: ["api"],
    description: "Find a Surfspot",
    notes: "Returns a Surfspot",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: SurfspotSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const surfspot = await db.surfspotStore.addSurfspot(request.params.id, request.payload);
        if (surfspot) {
          return h.response(surfspot).code(201);
        }
        return Boom.badImplementation("error creating Surfspot");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Surfspot",
    notes: "Returns the newly created Surfspot",
    validate: { payload: SurfspotSpec },
    response: { schema: SurfspotSpecPlus, failAction: validationError },
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
    tags: ["api"],
    description: "Delete all SurfspotApi",
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const surfspot = await db.surfspotStore.getSurfspotById(request.params.id);
        if (!surfspot) {
          return Boom.notFound("No Surfspot with this id");
        }
        await db.surfspotStore.deleteSurfspot(surfspot._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Surfspot with this id");
      }
    },
    tags: ["api"],
    description: "Delete a Surfspot",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
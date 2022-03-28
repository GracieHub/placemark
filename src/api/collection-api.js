import Boom from "@hapi/boom";
import { CollectionSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const collectionApi = {
    find: {
            auth: {
      strategy: "jwt",
    },
        handler: async function (request, h) {
          try {
            const collections = await db.collectionStore.getAllCollections();
            return collections;
          } catch (err) {
            return Boom.serverUnavailable("Database Error");
          }
        },
      },

  findOne: {
        auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const collection = await db.collectionStore.getCollectionById(request.params.id);
        if (!collection) {
          return Boom.notFound("No collection with this id");
        }
        return collection;
      } catch (err) {
        return Boom.serverUnavailable("No collection with this id");
      }
    },
  },

  create: {
        auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const collection = request.payload;
        const newCollection = await db.collectionStore.addCollection(collection);
        if (newCollection) {
          return h.response(newCollection).code(201);
        }
        return Boom.badImplementation("error creating collection");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
        auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const collection = await db.collectionStore.getCollectionById(request.params.id);
        if (!collection) {
          return Boom.notFound("No collection with this id");
        }
        await db.collectionStore.deleteCollectionById(collection._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No collection with this id");
      }
    },
  },

  deleteAll: {
        auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.collectionStore.deleteAllCollections();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
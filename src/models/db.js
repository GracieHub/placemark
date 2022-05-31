import { userMemStore } from "./mem/user-mem-store.js";
import { collectionMemStore } from "./mem/collection-mem-store.js";
import { surfspotMemStore } from "./mem/surfspot-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { collectionJsonStore } from "./json/collection-json-store.js";
import { surfspotJsonStore } from "./json/surfspot-json-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { collectionMongoStore } from "./mongo/collection-mongo-store.js";
import { surfspotMongoStore } from "./mongo/surfspot-mongo-store.js";


export const db = {
  userStore: null,
  collectionStore: null,
  surfspotStore: null,

  init(storeType) {
    switch (storeType) {
/*      case "json":
        this.userStore = userJsonStore;
        this.collectionStore = collectionJsonStore;
        this.surfspotStore = surfspotJsonStore;
        break; */
      case "mongo":
        this.userStore = userMongoStore;
        this.collectionStore = collectionMongoStore;
        this.surfspotStore = surfspotMongoStore;
        connectMongo();
        break;
        default:
 /*       this.userStore = userMemStore;
        this.collectionStore = collectionMemStore;
        this.surfspotStore = surfspotMemStore; */
    }
  },
};

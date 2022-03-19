import { userMemStore } from "./mem/user-mem-store.js";
import { collectionMemStore } from "./mem/collection-mem-store.js";
import { surfspotMemStore } from "./mem/surfspot-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { collectionJsonStore } from "./json/collection-json-store.js";
import { surfspotJsonStore } from "./json/surfspot-json-store.js";

export const db = {
  userStore: null,
  collectionStore: null,
  surfspotStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.collectionStore = collectionJsonStore;
        this.surfspotStore = surfspotJsonStore;
        break;
      default:
        this.userStore = userMemStore;
        this.collectionStore = collectionMemStore;
        this.surfspotStore = surfspotMemStore;
    }
  },
};

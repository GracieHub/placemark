import { assert } from "chai";
import { geosurfService } from "./geosurf-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, waterford, testCollections } from "../fixtures.js";


suite("Collection API tests", () => {

    let user = null;
  
    setup(async () => {
      await geosurfService.deleteAllCollections();
      await geosurfService.deleteAllUsers();
      user = await geosurfService.createUser(maggie);
      waterford.userid = user._id;
    });

  teardown(async () => {});

  test("create Collection", async () => {
    const returnedCollection = await geosurfService.createCollection(waterford);
    assert.isNotNull(returnedCollection);
    assertSubset(waterford, returnedCollection);
  });

  test("delete a Collection", async () => {
    const collection = await geosurfService.createCollection(waterford);
    const response = await geosurfService.deleteCollection(collection._id);
    assert.equal(response.status, 204);
    try {
      const returnedCollection = await geosurfService.getCollection(collection.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No collection with this id", "Incorrect Response Message");
    }
  });

  test("create multiple Collections", async () => {
    for (let i = 0; i < testCollections.length; i += 1) {
      testCollections[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await geosurfService.createCollection(testCollections[i]);
    }
    let returnedLists = await geosurfService.getAllCollections();
    assert.equal(returnedLists.length, testCollections.length);
    await geosurfService.deleteAllCollections();
    returnedLists = await geosurfService.getAllCollections();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant collection", async () => {
    try {
      const response = await geosurfService.deleteCollection("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No collection with this id", "Incorrect Response Message");
    }
  });
});
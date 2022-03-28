import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { geosurfService } from "./geosurf-service.js";
import { maggie, maggieCredentials, waterford, testCollections, testSurfspots, donegal, sligo } from "../fixtures.js";
import { db } from "../../src/models/db.js";


suite("Surfspot API tests", () => {
  let user = null;
  let easkey = null;

  setup(async () => {
    geosurfService.clearAuth();
    user = await geosurfService.createUser(maggie);
    await geosurfService.authenticate(maggieCredentials);
    await geosurfService.deleteAllCollections();
    await geosurfService.deleteAllSurfspots();
    await geosurfService.deleteAllUsers();
    user = await geosurfService.createUser(maggie);
    await geosurfService.authenticate(maggieCredentials);
    waterford.userid = user._id;
    easkey = await geosurfService.createCollection(waterford);
  });

  teardown(async () => {});

  test("create surfspot", async () => {
    const returnedSurfspot = await geosurfService.createSurfspot(easkey._id, sligo);
    assertSubset(sligo, returnedSurfspot);
  });

  test("create Multiple Surfspots", async () => {
    for (let i = 0; i < testSurfspots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await geosurfService.createSurfspot(easkey._id, testSurfspots[i]);
    }
    const returnedSurfspots = await geosurfService.getAllSurfspots();
    assert.equal(returnedSurfspots.length, testSurfspots.length);
    for (let i = 0; i < returnedSurfspots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const surfspot = await geosurfService.getSurfspot(returnedSurfspots[i]._id);
      assertSubset(surfspot, returnedSurfspots[i]);
    }
  });

  test("delete SurfspotApi", async () => {
    for (let i = 0; i < testSurfspots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await geosurfService.createSurfspot(easkey._id, testSurfspots[i]);
    }
    let returnedSurfspots = await geosurfService.getAllSurfspots();
    assert.equal(returnedSurfspots.length, testSurfspots.length);
    for (let i = 0; i < returnedSurfspots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const surfspot = await geosurfService.deleteSurfspot(returnedSurfspots[i]._id);
    }
    returnedSurfspots = await geosurfService.getAllSurfspots();
    assert.equal(returnedSurfspots.length, 0);
  });

  test("denormalised collection", async () => {
    for (let i = 0; i < testSurfspots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await geosurfService.createSurfspot(easkey._id, testSurfspots[i]);
    }
    const returnedCollection = await geosurfService.getCollection(easkey._id);
    assert.equal(returnedCollection.surfspots.length, testSurfspots.length);
    for (let i = 0; i < testSurfspots.length; i += 1) {
      assertSubset(testSurfspots[i], returnedCollection.surfspots[i]);
    }
  });
});
import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCollections, testSurfspots, waterford, sligo, donegal, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Surfspot Model tests", () => {

  let northwestList = null;

  setup(async () => {
    db.init("mongo");
    await db.collectionStore.deleteAllCollections();
    await db.surfspotStore.deleteAllSurfspots();
    northwestList = await db.collectionStore.addCollection(donegal);
    for (let i = 0; i < testSurfspots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testSurfspots[i] = await db.surfspotStore.addSurfspot(northwestList._id, testSurfspots[i]);
    }
  });

  test("create single surfspot", async () => {
    const sligoList = await db.collectionStore.addCollection(sligo);
    const surfspot = await db.surfspotStore.addSurfspot(sligoList._id, sligo)
    assert.isNotNull(surfspot._id);
    assertSubset (sligo, surfspot);
  });

  test("create multiple Surfspots", async () => {
    const surfspots = await db.collectionStore.getCollectionById(northwestList._id);
    assert.equal(testSurfspots.length, testSurfspots.length)
  });

  test("delete all Surfspots", async () => {
    const surfspots = await db.surfspotStore.getAllSurfspots();
    assert.equal(testSurfspots.length, surfspots.length);
    await db.surfspotStore.deleteAllSurfspots();
    const newSurfspots = await db.surfspotStore.getAllSurfspots();
    assert.equal(0, newSurfspots.length);
  });

  test("get a surfspot - success", async () => {
    const sligoList = await db.collectionStore.addCollection(sligo);
    const surfspot = await db.surfspotStore.addSurfspot(sligoList._id, sligo)
    const newSurfspot = await db.surfspotStore.getSurfspotById(surfspot._id);
    assertSubset (sligo, newSurfspot);
  });

  test("delete One Surfspot - success", async () => {
    await db.surfspotStore.deleteSurfspot(testSurfspots[0]._id);
    const surfspots = await db.surfspotStore.getAllSurfspots();
    assert.equal(surfspots.length, testCollections.length - 1);
    const deletedSurfspot = await db.surfspotStore.getSurfspotById();
    assert.isNull(deletedSurfspot);
  });

  test("get a surfspot - bad params", async () => {
    assert.isNull(await db.surfspotStore.getSurfspotById(""));
    assert.isNull(await db.surfspotStore.getSurfspotById());
  });

  test("delete one surfspot - fail", async () => {
    await db.surfspotStore.deleteSurfspot("bad-id");
    const surfspots = await db.surfspotStore.getAllSurfspots();
    assert.equal(surfspots.length, testCollections.length);
  });
});
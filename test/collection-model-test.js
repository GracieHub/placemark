import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testCollections, waterford } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";


suite("Collection Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.collectionStore.deleteAllCollections();
    for (let i = 0; i < testCollections.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testCollections[i] = await db.collectionStore.addCollection(testCollections[i]);
    }
  });

  test("create a Collection", async () => {
    const Collection = await db.collectionStore.addCollection(waterford);
    assertSubset(waterford, Collection);
    assert.isDefined(Collection._id);
  });

  test("delete all Collections", async () => {
    let returnedCollections = await db.collectionStore.getAllCollections();
    assert.equal(returnedCollections.length, 3);
    await db.collectionStore.deleteAllCollections();
    returnedCollections = await db.collectionStore.getAllCollections();
    assert.equal(returnedCollections.length, 0);
  });

  test("get a Collection - success", async () => {
    const Collection = await db.collectionStore.addCollection(waterford);
    const returnedCollection = await db.collectionStore.getCollectionById(Collection._id);
    assertSubset(waterford, Collection);
  });

  test("delete One Playist - success", async () => {
    const id = testCollections[0]._id;
    await db.collectionStore.deleteCollectionById(id);
    const returnedCollections = await db.collectionStore.getAllCollections();
    assert.equal(returnedCollections.length, testCollections.length - 1);
    const deletedCollection = await db.collectionStore.getCollectionById(id);
    assert.isNull(deletedCollection);
  });

  test("get a Collection - bad params", async () => {
    assert.isNull(await db.collectionStore.getCollectionById(""));
    assert.isNull(await db.collectionStore.getCollectionById());
  });

  test("delete One Collection - fail", async () => {
    await db.collectionStore.deleteCollectionById("bad-id");
    const allCollections = await db.collectionStore.getAllCollections();
    assert.equal(testCollections.length, allCollections.length);
  });
}); 
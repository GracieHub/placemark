import { assert } from "chai";
import { geosurfService } from "./geosurf-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";


const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    geosurfService.clearAuth();
    await geosurfService.createUser(maggie);
    await geosurfService.authenticate(maggieCredentials);
    await geosurfService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await geosurfService.createUser(testUsers[i]);
    }
    await geosurfService.createUser(maggie);
    await geosurfService.authenticate(maggieCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await geosurfService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await geosurfService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await geosurfService.deleteAllUsers();
    await geosurfService.createUser(maggie);
    await geosurfService.authenticate(maggieCredentials);
    returnedUsers = await geosurfService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });
  test("get a user - success", async () => {
    const returnedUser = await geosurfService.getUser(testUsers[0]._id);
    assert.deepEqual(testUsers[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await geosurfService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await geosurfService.deleteAllUsers();
    await geosurfService.createUser(maggie);
    await geosurfService.authenticate(maggieCredentials);
    try {
      const returnedUser = await geosurfService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});
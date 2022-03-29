import { db } from "../models/db.js";

export const adminController = {
    index: {
        auth: {strategy: "session"},
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const collections = await db.collectionStore.getAllCollections();
            const surfspots = await db.surfspotStore.getAllSurfspots();
            const users = await db.userStore.getAllUsers();
            const viewData = {
                title: "Geo Surf Admin Dashboard",
                users: users,
                user: loggedInUser,
                listAllSurfspots: surfspots.length,
                listAllCollections: collections.length,
            };
            return h.view("admin-view", viewData);
        },
    },

    deleteUser: {
        handler: async function (request, h) {
            const user = await db.userStore.getUserById(request.params.id);
            await db.userStore.deleteUserById(user._id);
            return h.redirect("/admin");
        },
    },
};
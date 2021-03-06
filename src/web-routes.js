import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { collectionController } from "./controllers/collection-controller.js";
import { surfspotController } from "./controllers/surfspot-controller.js";
import { adminController } from "./controllers/admin-controller.js";


export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addcollection", config: dashboardController.addCollection },
  { method: "GET", path: "/dashboard/deletecollection/{id}", config: dashboardController.deleteCollection },

  { method: "GET", path: "/collection/{id}", config: collectionController.index },
  { method: "POST", path: "/collection/{id}/addsurfspot", config: collectionController.addSurfspot },
  { method: "GET", path: "/collection/{id}/deletesurfspot/{surfspotid}", config: collectionController.deleteSurfspot },
  { method: "GET", path: "/surfspot/{id}/editsurfspot/{surfspotid}", config: surfspotController.index },
  { method: "POST", path: "/surfspot/{id}/updatesurfspot/{surfspotid}", config: surfspotController.update },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },

  { method: "GET", path: "/admin", config: adminController.index },
  { method: "GET", path: "/admin/deleteuser/{id}", config: adminController.deleteUser },
  { method: "GET", path: "/admin/{id}", config: adminController.userDetails },

  { method: "POST", path: "/collection/{id}/uploadimage", config: collectionController.uploadImage },

];
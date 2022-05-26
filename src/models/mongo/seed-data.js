export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "$2a$10$7Y2Pl180ZWCVBkdpAXLMmeW6Htajvmqqoc64EWUpLaE1ZNLhvHDLS",
      scope: "admin"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "$2a$10$nqi1oSlJMc8HVkZxfu2PH.ywawCJohqT8YE.WmKQYIE8aJVL3VRja",
      scope: "user"

    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "$$2a$10$UiE02Ooizq.GFl3wdb/uA.eXoU06xYbjQ1.HcB3u4obOAC8MNVMx6",
      scope: "user"

    }
  },
  collections: {
    _model: "Collection",
    waterford: {
      title: "Waterford Surf Spots",
      userid: "->users.homer"
    }
  },
  surfspots: {
    _model : "Surfspot",
    surfspot_1 : {
      name: "Tramore Beach",
      latitude: 52.1614,
      longitude: 7.1493,
      typeOfWave: "Beginner Beach Break",
      collectionid: "->collections.waterford"
    },
    surfspot_2 : {
      name: "Bunmahon",
      latitude: 52.1406,
      longitude: 7.3652,
      typeOfWave: "Intermediate Beach Break",
      collectionid: "->collections.waterford"
    },
    surfspot_3 : {
      name: "Annestown Reef",
      latitude: 52.1406,
      longitude: 7.2719,
      typeOfWave: "Advanced only Reef Break",
      collectionid: "->collections.waterford"
    },
  }
};
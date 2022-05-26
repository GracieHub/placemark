export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "$2a$10$qWyjroVZ2yUNA6p/JyxzQOGnGUWQ12YXlwjtywsCVZJbIsjALxS8u",
      scope: "admin"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "$2a$10$W1WSyz7MYM0W.6v2LyC2JeHuQ0M9nohsGzALYNMm0.aDTN0PhXN7e",
      scope: "user"

    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "$2a$10$VJ35bL.4C7zoDMumud8KWuT61f5hkDqBZVIZUQopFDqsoLdwszlsa",
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
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
    },
    kerry: {
      title: "Kerry Surf Spots",
      userid: "->users.marge"
    },

    sligo: {
      title: "Sligo Surf Spots",
      userid: "->users.lisa"
    }
  },
  surfspots: {
    _model : "Surfspot",
    surfspot_1 : {
      name: "Tramore Beach",
      latitude: 52.1585,
      longitude: -7.1444,
      typeOfWave: "Beginner",
      collectionid: "->collections.waterford"
    },
    surfspot_2 : {
      name: "Bunmahon",
      latitude: 52.1406,
      longitude: -7.3652,
      typeOfWave: "Intermediate",
      collectionid: "->collections.waterford"
    },
    surfspot_3 : {
      name: "Annestown Reef",
      latitude: 52.141312,
      longitude: -7.276490,
      typeOfWave: "Intermediate",
      collectionid: "->collections.waterford"
    },
    surfspot_4 : {
      name: "Castlegregory",
      latitude: 52.253464,
      longitude: -10.020722,
      typeOfWave: "Beginner",
      collectionid: "->collections.kerry"
    },
    surfspot_5 : {
      name: "Gowlane",
      latitude: 52.253464,
      longitude: -10.020722,
      typeOfWave: "Beginner",
      collectionid: "->collections.kerry"
    },
    surfspot_6 : {
      name: "Waterville",
      latitude: 51.8295,
      longitude: -10.1745,
      typeOfWave: "Intermediate",
      collectionid: "->collections.kerry"
    },
    surfspot_7 : {
      name: "Gary William Point",
      latitude: 52.261870,
      longitude: -10.148387,
      typeOfWave: "Pro",
      collectionid: "->collections.kerry"
    },
    surfspot_8 : {
      name: "Enniscrone",
      latitude: 54.2137,
      longitude: -9.0908,
      typeOfWave: "Pro",
      collectionid: "->collections.sligo"
    },
    surfspot_9 : {
      name: "Easkey",
      latitude: 54.2863,
      longitude: -8.9624,
      typeOfWave: "Advanced",
      collectionid: "->collections.sligo"
    },
  }
};
export const aboutController = {
    index: {
      handler: function (request, h) {
        const viewData = {
          title: "About GeoSurf",
        };
        return h.view("about-view", viewData);
      },
    },
  };
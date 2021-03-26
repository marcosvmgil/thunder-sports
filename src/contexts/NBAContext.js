var axios = require("axios").default;

  function getLeagues() {
    var options = {
      method: "GET",
      url: "https://api-nba-v1.p.rapidapi.com/leagues/",
      headers: {
        "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
        "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
      },
    };
    axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  }

export const getLigas = getLeagues()

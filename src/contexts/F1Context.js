var axios = require("axios").default;

export async function getNextRace() {
  //date in the format YYYY-MM-DD
  let date = new Date();

  let day = date.getDay();

  let auxDate = 7 - day;

  if (auxDate !== 7) {
    date.setDate(date.getDate() + auxDate);
  }

  date = date.toISOString().split("T")[0];

  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/races/`,
    params: { season: "2021", date: `${date}` },
    headers: {
      "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  //   console.log(response);

  return response[0];
}

export async function getLastRace(season = "2021") {
  //date in the format YYYY-MM-DD
  let date = new Date();

  let day = date.getDay();

  date.setDate(date.getDate() - day);

  date = date.toISOString().split("T")[0];

  //   console.log(date)

  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/races/`,
    params: { season: `${season}`, date: `${date}` },
    headers: {
      "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  console.log(response[0]);

  return response[0];
}

export async function getLastRaceByDate(date, season = "2021") {
  //date in the format YYYY-MM-DD
  let dateAux = date;

  dateAux = dateAux.toISOString().split("T")[0];

  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/races/`,
    params: { season: `${season}`, date: `${date}` },
    headers: {
      "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  //   console.log(response[0]);

  return response[0];
}

export async function getTeamByName(name) {
  // If you want, you can search for a name too
  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/teams`,
    params: { search: `${name}` },
    headers: {
      "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  //   console.log(response);

  return response;
}

export async function getTeamById(id) {
  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/teams`,
    params: { id: `${id}` },
    headers: {
      "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  //   console.log(response);

  return response[0];
}

export async function getTeams() {
  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/teams`,
    headers: {
      "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  //   console.log(response);

  return response;
}

export async function getTeamsRanking(season = "2021") {
  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/rankings/teams`,
    params: { season: `${season}` },
    headers: {
      "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  console.log(response);

  return response;
}

export async function getTeamRankingByTeamId(teamId, season = "2021") {
  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/rankings/teams`,
    params: { season: `${season}`, team: `${teamId}` },
    headers: {
      "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  //   console.log(response[0]);

  return response[0];
}

export async function getDriverRankingByTeamId(teamId, season = "2021") {
  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/rankings/drivers`,
    params: { season: `${season}`, team: `${teamId}` },
    headers: {
      "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  //console.log(response);

  return response;
}

export async function getDriverRankingByDriverId(driverId, season = "2021") {
  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/rankings/drivers`,
    params: { season: `${season}`, driver: `${driverId}` },
    headers: {
      "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  //console.log(response);

  return response[0];
}

export async function getDriverRankingByRaceId(raceId) {
  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/rankings/races`,
    params: { race: `${raceId}` },
    headers: {
      "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  //console.log(response);

  return response;
}

export async function getDriverByName(name) {
  // If you want, you can search for a name too
  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/drivers`,
    params: { search: `${name}` },
    headers: {
      "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  //console.log(response);

  return response;
}

export async function getCompetitionByName(name) {
  // If you want, you can search for a name too
  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/competitions`,
    params: { search: `${name}` },
    headers: {
      "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  //console.log(response);

  return response;
}

export async function getCompetitionByCountry(country) {
  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/competitions`,
    params: { country: `${country}` },
    headers: {
      "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  //console.log(response);

  return response;
}

export async function getCompetitionByCity(city) {
  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/competitions`,
    params: { city: `${city}` },
    headers: {
      "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  //console.log(response);

  return response;
}

export async function getCircuitByName(name) {
  // If you want, you can search for a name too
  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/circuits`,
    params: { search: `${name}` },
    headers: {
      "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  //console.log(response);

  return response;
}

export async function getCircuitById(circuitId) {
  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/circuits`,
    params: { id: `${circuitId}` },
    headers: {
      "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  //console.log(response);

  return response;
}

export async function getCircuitByCompetitionId(competitionId) {
  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/circuits`,
    params: { competition: `${competitionId}` },
    headers: {
      "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  //console.log(response);

  return response[0];
}



async function getFromApi(options) {
  let responseData;
  await axios
    .request(options)
    .then(function (response) {
      //   console.log(response.response);
      responseData = response.data.response;
    })
    .catch(function (error) {
      console.error(error);
    });
  return responseData;
}

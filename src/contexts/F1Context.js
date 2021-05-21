var axios = require("axios").default;

export async function getNextRace(next = 1, season = '2021') {
  //date in the format YYYY-MM-DD
  // let date = new Date();

  // let day = date.getDay();

  // let auxDate = 7 - day;

  // if (auxDate !== 7) {
  //   date.setDate(date.getDate() + auxDate);
  // }

  // date = date.toISOString().split("T")[0];

  // console.log('proxima: '+ date)

  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/races/`,
    // params: { season: "2021", date: `${date}` },
    params: { season: `${season}`, next: `${next}` },
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      // "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  //   console.log(response);
  console.log(response)
  return response[0];
}

export async function getLastRace(last = 1, season = "2021") {
  //date in the format YYYY-MM-DD
  // let date = new Date();

  // let day = date.getDay();

  // date.setDate(date.getDate() - day);

  // date = date.toISOString().split("T")[0];

  // //   console.log(date)
  // console.log('anterior: '+ date)

  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/races/`,
    // params: { season: `${season}`, date: `${date}` },
    params: { season: `${season}`, last: `${last}` },
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      // "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  // console.log(response[0]);
  console.log(response)
  return response[0];
}

export async function getRaces(season) {
  let last = '99';
  // console.log(last);
  // console.log(season);
  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/races/`,
    // params: { season: `${season}`, date: `${date}` },
    params: { season: `${season}`,  last: `${last}` },
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      // "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  // console.log(response[0]);
  // console.log(response)

  return response
}

export async function getLastRaceByDate(date, season = "2021") {
  //date in the format YYYY-MM-DD
  let dateAux = date;

  dateAux = dateAux.toISOString().split("T")[0];

  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/races/`,
    params: { season: `${season}`, date: `${dateAux}` },
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      // "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
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
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      // "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
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
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      // "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  console.log(typeof response[0]);

  if (response[0] !== undefined) {
    if (response[0].id.toString() !== id){
      return {}
    }
    else{
      return response[0]
    }
  }
  else {
    return {}
  }
}

export async function getTeams() {
  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/teams`,
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      // "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
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
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      // "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
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
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      // "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options);
  //   console.log(response[0]);

  return response[0];
}

export async function getDriverRankings(season = "2021") {
  const options = {
    method: 'GET',
    url: 'https://api-formula-1.p.rapidapi.com/rankings/drivers',
    params: {season: `${season}`},
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      // "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      'x-rapidapi-host': 'api-formula-1.p.rapidapi.com'
    }
  };
  
  let response = await getFromApi(options);
  console.log(response);

  return response;
}

export async function getDriverRankingByTeamId(teamId, season = "2021") {
  var options = {
    method: "GET",
    url: `https://api-formula-1.p.rapidapi.com/rankings/drivers`,
    params: { season: `${season}`, team: `${teamId}` },
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      // "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
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
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      // "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
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
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      // "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
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
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      // "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
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
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      // "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
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
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      // "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
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
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      // "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
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
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      // "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
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
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      // "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
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
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      // "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
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
      // console.log(response);
      responseData = response.data.response;
    })
    .catch(function (error) {
      console.error(error);
    });
  return responseData;
}

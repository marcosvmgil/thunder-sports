var axios = require("axios").default;

export async function getLeagues() {
  var options = {
    method: "GET",
    url: "https://api-nba-v1.p.rapidapi.com/leagues/",
    headers: {
      //Marcos
      //  "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      //'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options)

  return response.leagues
}

export async function getTeamsByLeague(league) {
  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/teams/league/${league}`,
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      //'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  // console.log(response.teams)

  return response.teams
}

export async function getTeamsById(teamId) {
  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/teams/teamId/${teamId}`,
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      //'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)

  if (response.teams[0] !== undefined) {
    if (response.teams[0].teamId !== teamId) {
      return {}
    }
    else {
      return response.teams[0]
    }
  }
  else {
    return {}
  }

}


export async function getPlayersByTeamId(teamId) {
  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/players/teamId/${teamId}`,
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      //'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  // console.log(response.players)

  return response.players
}

export async function getPlayersByLeague(league) {
  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/players/league/${league}`,
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      //'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  // console.log(response.players)

  return response.players
}

export async function getTodayGames() {
  //date in the format YYYY-MM-DD
  let date = new Date();
  console.log(date.toLocaleDateString())

  //

  function FormataStringData(data) {
    var dia = data.toLocaleDateString('pt-BR').split("/")[0];
    var mes = data.toLocaleDateString('pt-BR').split("/")[1];
    var ano = data.toLocaleDateString('pt-BR').split("/")[2];

    return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
  }

  function dataDiaHora(data) {
    let temp = FormataStringData(data)
    temp += "T" + data.toTimeString().slice(0, 8) + ".000Z"
    return temp;
  }


  // date = date.toISOString().split('T')[0]
  date = FormataStringData(date)
  console.log(date)

  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/games/date/${date}`,
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      //'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let startDateBrazil = date + 'T03:00:00.000Z';
  console.log(startDateBrazil)
  let today = new Date(startDateBrazil)

  let response = await getFromApi(options)
  let responseGames = [];
  response.games.forEach(game => {
    let dateGameBrazil = new Date(game.startTimeUTC)
    // dateGameBrazil.setHours(dateGameBrazil.getHours() - 3)

    if (dateGameBrazil >= today) {
      // game.startTimeUTC = dateGameBrazil.toISOString();
      // console.log(dateGameBrazil.toISOString())
      game.startTimeUTC = dataDiaHora(dateGameBrazil);
      console.log("Hoje: " + dataDiaHora(dateGameBrazil))
      responseGames.push(game)
    }
  })
  
  let dateTomorrow = new Date()
  dateTomorrow.setDate(dateTomorrow.getDate() + 1)
  console.log("amanhã: " + dataDiaHora(dateTomorrow))
    // dateTomorrow = dateTomorrow.toISOString().split('T')[0]
  dateTomorrow = FormataStringData(dateTomorrow);

  let url = `https://api-nba-v1.p.rapidapi.com/games/date/${dateTomorrow}`
  options.url = url

  response = await getFromApi(options)

  let endDateBrazil = dateTomorrow + 'T02:59:00.000Z';
  let tomorrow = new Date(endDateBrazil)

  response.games.forEach(game => {
    let dateBrazil = new Date(game.startTimeUTC)
    // dateBrazil.setHours(dateBrazil.getHours() - 3)

    if (dateBrazil < tomorrow) {
      // game.startTimeUTC = dateBrazil.toISOString();
      game.startTimeUTC = dataDiaHora(dateBrazil);
      responseGames.push(game)
    }
  })

  return responseGames

}

export async function getGamesByDate(date) {
  //date in the format YYYY-MM-DD

  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/games/date/${date}`,
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      //'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  // console.log(response.games)
  return response.games

}

export async function getGamesByDateCalendar(date) {
  //date in the format YYYY-MM-DD

  // console.log(date.toLocaleDateString())

  //

  function FormataStringData(data) {
    var dia = data.toLocaleDateString('pt-BR').split("/")[0];
    var mes = data.toLocaleDateString('pt-BR').split("/")[1];
    var ano = data.toLocaleDateString('pt-BR').split("/")[2];

    return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
  }

  function dataDiaHora(data) {
    let temp = FormataStringData(data)
    temp += "T" + data.toTimeString().slice(0, 8) + ".000Z"
    return temp;
  }


  // date = date.toISOString().split('T')[0]
  date = FormataStringData(date)
  console.log(date)

  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/games/date/${date}`,
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      // 'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let startDateBrazil = date + 'T03:00:00.000Z';
  console.log(startDateBrazil)
  let today = new Date(startDateBrazil)

  let response = await getFromApi(options)
  let responseGames = [];
  response.games.forEach(game => {
    let dateGameBrazil = new Date(game.startTimeUTC)
    // dateGameBrazil.setHours(dateGameBrazil.getHours() - 3)

    if (dateGameBrazil >= today) {
      // game.startTimeUTC = dateGameBrazil.toISOString();
      // console.log(dateGameBrazil.toISOString())
      game.startTimeUTC = dataDiaHora(dateGameBrazil);
      console.log("Hoje: " + dataDiaHora(dateGameBrazil))
      responseGames.push(game)
    }
  })
  
  let dateTomorrow = new Date(date)
  dateTomorrow.setDate(dateTomorrow.getDate() + 1)
  console.log("amanhã: " + dataDiaHora(dateTomorrow))
    // dateTomorrow = dateTomorrow.toISOString().split('T')[0]
  dateTomorrow = FormataStringData(dateTomorrow);

  let url = `https://api-nba-v1.p.rapidapi.com/games/date/${dateTomorrow}`
  options.url = url

  response = await getFromApi(options)

  let endDateBrazil = dateTomorrow + 'T02:59:00.000Z';
  let tomorrow = new Date(endDateBrazil)

  response.games.forEach(game => {
    let dateBrazil = new Date(game.startTimeUTC)
    // dateBrazil.setHours(dateBrazil.getHours() - 3)

    if (dateBrazil < tomorrow) {
      // game.startTimeUTC = dateBrazil.toISOString();
      game.startTimeUTC = dataDiaHora(dateBrazil);
      responseGames.push(game)
    }
  })

  return responseGames

}

export async function getGamesByLeague(league, year = 2020) {
  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/games/league/${league}/${year}`,
    headers: {
      //Marcos
      //  "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      //'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  // console.log(response.games)
  return response.games
}

export async function getLiveGames() {
  var options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/games/live/',
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      //'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  // console.log(response.games)
  return response.games
}

export async function getLiveGameByGameId(gameId) {
  var options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/games/live/',
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
     "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      //'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  let match

  response.games.forEach((game) => {
    if (game.gameId == gameId) {
      match = game
    }
  })
  // console.log(response.games)
  return match
}

export async function getGameDetailsByGameId(gameId) {
  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/gameDetails/${gameId}`,
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      //'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };
  let response = await getFromApi(options)
  // console.log(response.game)
  return response.game

}

export async function getStandingsByLeague(league = "standard", year = 2020) {
  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/standings/${league}/${year}`,
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      //'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  //console.log(response.standings)
  return response.standings

}

export async function getStandingsByLeagueAndTeamId(league, teamId, year = 2020) {
  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/standings/${league}/${year}/teamId/${teamId}`,
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      //'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  //console.log(response.standings)
  return response.standings

}

export async function getGameStatistics(gameId) {
  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/statistics/games/gameId/${gameId}`,
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      //'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  // console.log(response.statistics)
  return response.statistics

}

export async function getGamesByTeamId(teamId) {
  const options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/games/teamId/${teamId}`,
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      //'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  // console.log(response.games)
  return response.games

}

export async function getPlayersStatisticsByGame(gameId) {
  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/statistics/players/gameId/${gameId}`,
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      //'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  // console.log(response.statistics)
  return response.statistics

}
export async function getPlayerStatistics(playerId) {
  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/statistics/players/playerId/${playerId}`,
    headers: {
      //Marcos
      // "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      //Breno
      "x-rapidapi-key": "9da0bcbfccmshfae2407a424a674p1094c2jsnb5a7ffefeda3",
      //Jansen
      //'x-rapidapi-key': '494e8098dfmsh2ef5d42795ac609p1f597djsn25b24adb5322',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };



  let response = await getFromApi(options)
  // console.log(response.statistics)
  return response.statistics

}

async function getFromApi(options) {
  let responseData
  await axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      responseData = response.data.api
    })
    .catch(function (error) {
      console.error(error);
    });
  return responseData
}

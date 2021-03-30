var axios = require("axios").default;

export async function getLeagues() {
  var options = {
    method: "GET",
    url: "https://api-nba-v1.p.rapidapi.com/leagues/",
    headers: {
      "x-rapidapi-key": "7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858",
      "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
    },
  };

  let response = await getFromApi(options)

  return response.leagues
}

export async function getTeamsByLeague(league){
  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/teams/league/${league}`,
    headers: {
      'x-rapidapi-key': '7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  // console.log(response.teams)

  return response.teams
}

export async function getTeamsById(teamId){
  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/teams/teamId/${teamId}`,
    headers: {
      'x-rapidapi-key': '7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  console.log(response.teams[0])
  console.log(response.teams[0] !== undefined)
  if (response.teams[0] !== undefined) {
    if (response.teams[0].teamId !== teamId){
      console.log("else 1")
      return {}
    }
    else{
      console.log("certo")
      return response.teams[0]
    }
  }
  else {
    console.log("else 2")
    return {}
  }
  
}


export async function getPlayersByTeamId(teamId){
  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/players/teamId/${teamId}`,
    headers: {
      'x-rapidapi-key': '7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  // console.log(response.players)

  return response.players
}

export async function getPlayersByLeague(league){
  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/players/league/${league}`,
    headers: {
      'x-rapidapi-key': '7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  // console.log(response.players)

  return response.players
}

export async function getTodayGames(){
  //date in the format YYYY-MM-DD
  let date = new Date;

  date = date.toISOString().split('T')[0]

  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/games/date/${date}`,
    headers: {
      'x-rapidapi-key': '7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  // console.log(response.games)

  return response.games

}

export async function getGamesByDate(date){
  //date in the format YYYY-MM-DD

  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/games/date/${date}`,
    headers: {
      'x-rapidapi-key': '7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  // console.log(response.games)
  return response.games

}

export async function getGamesByLeague(league, year = 2020){
  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/games/league/${league}/${year}`,
    headers: {
      'x-rapidapi-key': '7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  // console.log(response.games)
  return response.games
}

export async function getLiveGames(){
  var options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/games/live/',
    headers: {
      'x-rapidapi-key': '7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  // console.log(response.games)
  return response.games
}

export async function getGameDetailsByGameId(gameId){
  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/gameDetails/${gameId}`,
    headers: {
      'x-rapidapi-key': '7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };
  let response = await getFromApi(options)
  // console.log(response.game)
  return response.game

}

export async function getStandingsByLeague(league, year = 2020){
  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/standings/${league}/${year}`,
    headers: {
      'x-rapidapi-key': '7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  //console.log(response.standings)
  return response.standings

}

export async function getStandingsByLeagueAndTeamId(league,teamId, year = 2020){
  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/standings/${league}/${year}/teamId/${teamId}`,
    headers: {
      'x-rapidapi-key': '7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  //console.log(response.standings)
  return response.standings

}

export async function getGameStatistics(gameId){
  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/statistics/games/gameId/${gameId}`,
    headers: {
      'x-rapidapi-key': '7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  // console.log(response.statistics)
  return response.statistics

}

export async function getPlayersStatisticsByGame(gameId){
  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/statistics/players/gameId/${gameId}`,
    headers: {
      'x-rapidapi-key': '7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858',
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  let response = await getFromApi(options)
  // console.log(response.statistics)
  return response.statistics

}
export async function getPlayerStatistics(playerId){
  var options = {
    method: 'GET',
    url: `https://api-nba-v1.p.rapidapi.com/statistics/players/playerId/${playerId}`,
    headers: {
      'x-rapidapi-key': '7e06e2fe93msh93a651f74b7e29fp17c6e7jsna95be08dc858',
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

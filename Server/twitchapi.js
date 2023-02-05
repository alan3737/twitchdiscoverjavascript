import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

let accessToken;

async function initialize() {
  let url = 'https://id.twitch.tv/oauth2/token';
  const options = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: process.env.GRANT_TYPE
  }
  const response = await axios({
    method: 'post',
    url: url,
    data: options
  });
  accessToken = response.data.access_token;
}


async function GetStreamer(quantity, gameid, next) {
  let url = `https://api.twitch.tv/helix/streams?first=${quantity}&game_id=${gameid}&type=${'live'}`;
  if (next != null) {
    url = `https://api.twitch.tv/helix/streams?game_id=${gameid}&type=${'live'}&after=${next}&first=${quantity}`;
  }
  const headers = {
    'CLIENT-ID': process.env.CLIENT_ID,
    Authorization: 'Bearer ' + accessToken,
  }
  const response = await axios({
    method: 'get',
    url: url,
    headers: headers
  });
  //console.log(response.data.data);
  return response.data;
}

async function GetGame(game) {
  let url = `https://api.twitch.tv/helix/games?name=${game}`;
  const headers = {
    'CLIENT-ID': process.env.CLIENT_ID,
    Authorization: 'Bearer ' + accessToken,
  }
  const response = await axios({
    method: 'get',
    url: url,
    headers: headers
  });

  // console.log(response.data);
  return response.data.data;
}

async function GetTopGames(quantity) {
  let url = `https://api.twitch.tv/helix/games/top?first=${quantity}`;
  const headers = {
    'CLIENT-ID': process.env.CLIENT_ID,
    Authorization: 'Bearer ' + accessToken,
  }
  const response = await axios({
    method: 'get',
    url: url,
    headers: headers,
  });
  // console.log(response.data.data);
}

async function GetStreamerByGameAndViewers(game, quantity, viewers) {
  let listofgames = await GetGame(game);
  let gameid = listofgames[0].id;
  let nextpage = null;
  let result = {data:[1]};
  let allStreamers = [];
  while (result != null && result.data.length > 0 && allStreamers.length <= 5) {
    result = await GetStreamer(quantity, gameid, nextpage);
    nextpage = result.pagination.cursor;
    let data = result.data.filter((r) => r.viewer_count <= viewers);
    allStreamers = allStreamers.concat(data);
  }
  //console.log(allStreamers);
  return allStreamers;
}

// setTimeout(() => {
//   GetStreamerByGameAndViewers('Minecraft', 10, 1000);
// }, 1000)



export default GetStreamerByGameAndViewers;


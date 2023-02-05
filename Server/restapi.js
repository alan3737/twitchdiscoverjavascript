import GetStreamerByGameAndViewers from "./twitchapi.js";
import * as chat from "./forum.js";
import * as vote from "./streamervote.js";
import * as db from "./database.js";
import express from 'express';

const app = express();
const client = db.initialize();

app.listen('3000', () => {
    console.log("listening at port 3000");
});

// returns the list of streamers who play x game with y or less viewers
app.post(`/GetStreamerBy`, async (req, res) => {
    const result = await GetStreamerByGameAndViewers(req.game, 10, req.viewer);
    res.send(result);
});

// upvote or downvote streamers
app.post(`/GetVotes`, async (req, res) => {
    const result = await vote.GetVote();
    res.send(result);
});

// upvote a streamer
app.post(`/Upvote`, async (req, res) => {
    const result = await vote.Upvote(req.Streamer, req.Vote);
    res.send(result);
});
// downvote a streamer
app.post(`/Downvotes`, async (req, res) => {
    const result = await vote.Downvote(req.Streamer, req.Vote);
    res.send(result);
});

// get the top upvotes streams for the week
app.get(`/GetTopUpvotes`, async (req, res) => {
    const result = await vote.GetTopUpvote();
    res.send(result);
});

// post on forum to discover new streams
app.post(`/PostOnForum`, async (req, res) => {
    const result = await chat.PostForum();
    res.send(result);
});

// get content of forum
app.get(`/GetForum`, async (req, res) => {
    const result = await chat.GetForum(client);
    res.send(result);
});



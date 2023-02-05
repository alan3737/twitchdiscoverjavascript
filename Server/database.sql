CREATE DATABASE IF NOT EXISTs twitchDiscover
CREATE TABLE IF NOT EXISTS Streamer (StreamerID int, Upvote int, Downvote int, Mentioned int)
CREATE TABLE IF NOT EXISTS User (UserID int, Viewer bool, Streamer bool, Chatter bool)
CREATE TABLE IF NOT EXISTS Viewer (ViewerID int, Totalvotes int);
CREATE TABLE IF NOT EXISTS Forum (ChatterID int, Comment varchar(255))
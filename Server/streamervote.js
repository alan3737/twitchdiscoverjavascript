//make sql that saves number of upvotes and downvotes
//show the top upvoted streamers
//reset every week

async function Upvote(client, id, upvote) {
    let sql = `INSERT INTO streamerVote (StreamerID, Upvote) VALUES (${id}, ${upvote})`;
    await client.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}

async function Downvote(client, id, downvote) {
    let sql = `INSERT INTO streamerVote (StreamerID, Downvote) VALUES (${id}, ${downvote})`;
    await client.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}

async function GetTopUpvote(client) {
    let sql = `SELECT StreamerID, Upvote FROM streamerVote ORDER BY Upvote DESC LIMIT 20`;
    await client.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}

async function GetVote(client, ids) {
    let res = [];
    await ids.forEach(async (id) => {
        let sql = `SELECT StreamerID, Upvote, Downvote FROM streamerVote WHERE StreamerID = ${id}`;
        await client.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.push(  );
            }
        });
    });
    return res;
}

async function Resetvote() {
    let sql = `DROP TABLE streamerVote`;
    await client.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}

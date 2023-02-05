//forum that discuss / promote streams
//resets every week

function GetForum(client) {
    client.query("SELECT * FROM Forum", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
});
}

async function PostonForum(client, id, content) {
    await client.query(`INSERT INTO Forum VALUES (${id}, ${content})`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        } 
    });
}

async function ResetForum(client) {
    await client.query("DELETE FROM Forum", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}

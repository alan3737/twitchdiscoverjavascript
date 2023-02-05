import pg from 'pg';

const pool = pg.Pool;
export async function initialize() {
    const client = new pool({
        host: "localhost",
        user: "postgres",
        port: 5432,
        password: "12345$",
        database: "TwitchDiscover",
    })
    client.connect((err, result) => {
        if (err) {
            console.log(`there is an error ${err}`);
        } else {
            console.log("connected to database" + result);
        }
    });
    return client;
}
const get_random_song = require("./ug-get-random-song");
const app = require("express")();

app.get("/random-song", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "http://gabirat.pl");
    res.send(await get_random_song(req.query.type, false, req.query.order));
});

app.listen(3000);
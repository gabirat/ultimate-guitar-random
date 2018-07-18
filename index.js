const get_random_song = require("./ug-get-random-song");
const app = require("express")();

app.get("/random", async (req, res) => {
    res.send(await get_random_song(req.query.type, false, req.query.order));
});

app.listen(3000);
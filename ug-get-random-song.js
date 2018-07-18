const cheerio = require("cheerio");
const fetch = require("node-fetch");

async function get_songs_page(type, page_num, order = "rating_desc") {
    if (type != "Chords" && type != "Tabs") return false;
    if (page_num < 1 && page_num > 20) return false;
    if (order != "rating_desc" && order != "hitsdaily_desc" && order != "hitstotal_desc") return false;
    const body = await (await fetch(`https://www.ultimate-guitar.com/explore?order=${order}&page=${page_num}&type[]=${type}`)).text();
    return body;
}

async function get_random_song(type, page_num, order) {
    page_num = page_num || Math.floor(Math.random() * 20) + 1;
    order = order || "rating_desc";
    const page_body = await get_songs_page(type, page_num, order);
    if(!page_body) return {error: "Wrong parameters!"};
    const $ = cheerio.load(page_body);
    const UGAPP = JSON.parse($("body script").html().trim().substring(26, $("body script").html().trim().length-1));
    const songs_list = UGAPP.data.data.tabs;
    return songs_list[Math.floor(Math.random() * (songs_list.length-1))];
}

module.exports = get_random_song;

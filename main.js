const host = "localhost";
const port = "1337";

// https://stackoverflow.com/a/12042843
// tl;dr about:config && network.websocket.allowInsecureFromHTTPS = true
let socket = new WebSocket(`ws://${host}:${port}`);

///////////////////////////////// END WEBSOCKET /////////////////////////////////

function scroll(pixels) {
    window.scrollBy({
        top: pixels,
        left: 0,
        behavior: "smooth",
    });
}

function rip_urls() {
    let a_elems = document.querySelectorAll('div._aabd._aa8k._al3l a');

    for (child of reel_grid.children) {
        child.id = "PARSED";
    }

    return Array.from(a_elems, (a) => a.href);
}

async function refresh_reels() {
    while (reel_grid.children[0].id == "PARSED") {
        scroll(200);
        await new Promise(r => setTimeout(r, 420));
    }
}

let reel_grid = document.querySelector('article div div');

async function main() {
    reel_grid.id = "reel_grid";
    
    let link_limit = 50;

    // Grab initially loaded links & refresh
    let links = rip_urls();
    await refresh_reels();
    

    // Force insta to load new reels
    // and grab then when we have a 
    // full new grid.
    while(links.length < link_limit) {
        links = links.concat(rip_urls());
        await refresh_reels();
    }

    console.log(`Links grabbed: ${links.length}`);
    return JSON.stringify(links);
}
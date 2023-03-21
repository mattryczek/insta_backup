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
        await new Promise(r => setTimeout(r, 200));
    }
}

async function pull_links() {
    let links = rip_urls();
    await refresh_reels();

    return links;
}

async function main() {
    let reel_grid = document.querySelector('article div div');
    reel_grid.id = "reel_grid";

    await console.log(JSON.stringify(pull_links()));
}
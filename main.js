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
let reel_grid = document.querySelector('article div div');
reel_grid.id = "reel_grid";

async function pull_links() {
    let a_elems = document.querySelectorAll('div._aabd._aa8k._al3l a');
    let urls = Array.from(a_elems, (a) => a.href);

    console.log(JSON.stringify(urls));

    reel_grid.children[reel_grid.childElementCount - 1].id = "LAST";

    while(reel_grid.children[0].id != "LAST") {
        scroll(200);
        await new Promise(r => setTimeout(r, 300));
    }

    scroll(300);
}

pull_links();
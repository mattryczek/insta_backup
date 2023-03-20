const host = "localhost";
const port = "1337";

// https://stackoverflow.com/a/12042843
// tl;dr about:config && network.websocket.allowInsecureFromHTTPS = true
let socket = new WebSocket(`ws://${host}:${port}`);

///////////////////////////////// END WEBSOCKET /////////////////////////////////

let reel_grid = document.querySelector('article div div');

let scroll = function(pixels){
    window.scrollBy({
        top: pixels,
        left: 0,
        behavior: "smooth",
      });
}
let row_counter = 0;

let trio = [];

let get_urls = async function() {
    for(row of reel_grid.children){
        console.log(`Parsing row ${row_counter++}...`);

        for(reel of row.children){
            trio.push(reel.children[0].href);
            // console.log(reel.children[0].href);
        }

        console.log(trio);
        trio = [];

        // We can hide it instead to monitor progress
        // and it will get autonuked
        row.style.display = 'none';

        scroll(300);

        // Wait 2.5s for content to load
        await new Promise(r => setTimeout(r, 3000));
    }
}

get_urls();
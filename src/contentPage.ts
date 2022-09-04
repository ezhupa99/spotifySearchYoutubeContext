// `const observer = new MutationObserver((mutations, observer) => {

//     const mutation = mutations
//         .find(mutation => {

//             //  filter all mutations that are not tooltips
//             if (!(mutation.target as HTMLDivElement).id.includes('tippy'))
//                 return false;

//             const tippyElement = mutation.target as HTMLDivElement;

//             // filter all mutations that their tooltip is empty
//             if (tippyElement.childNodes.length === 0)
//                 return false;

//             // filter all mutations that might have elements but no context element
//             if (!tippyElement.querySelector('#context-menu'))
//                 return false;

//             const contextMenu = tippyElement.querySelector('#context-menu') as HTMLDivElement;

//             // filter all mutations that have context menu but don't have elements
//             if (contextMenu.childNodes.length === 0)
//                 return false;

//             const isSong = Array.from(contextMenu.querySelectorAll('li[role=presentation]')).find((li) =>
//                 li.outerHTML.toLowerCase().includes("go to song radio") === true
//             );

//             if (!isSong)
//                 return false;

//             return true;
//         });

//     if (!mutation)
//         return;

//     const target = mutation.target as HTMLDivElement;

//     const contextMenuElement = target.querySelector('#context-menu ul') as HTMLDivElement;

//     const liItemsElement = contextMenuElement.querySelectorAll('li[role=presentation]');

//     // remmove all existing youtube music elements
//     Array.from(liItemsElement).filter((li) => {
//         const span = li.querySelector('span') as HTMLSpanElement;

//         if (span.textContent === 'Copy Youtube Search Link') {
//             return true;
//         }

//         return false;
//     }).forEach(element => {
//         element.remove();
//     });

//     const showCreditsElement = Array.from(liItemsElement).find((li) => li.outerHTML.toLowerCase().includes("show credits") === true);

//     const youtubeSearchLinkElement = showCreditsElement?.cloneNode(true) as HTMLLIElement;

//     if (!youtubeSearchLinkElement) return;

//     const spanElement = youtubeSearchLinkElement.querySelector('span');

//     if (!spanElement) return;

//     spanElement.textContent = "Copy Youtube Search Link";

//     contextMenuElement.appendChild(youtubeSearchLinkElement);

//     youtubeSearchLinkElement.querySelector('button')?.addEventListener('click', () => {

//         const nowPlayingWidgetElement = document.querySelectorAll('[data-testid="now-playing-widget"]')

//         if (!songName || !artistName) return;

//         // log info
//         console.log(`%c${songName} - ${artistName}`, 'background-color:blue;color: white;font-size:20px;');
//         console.log("Emanuel");

//         const youtubeSearchLink = `https://www.youtube.com/results?search_query=${artistName}+${songName}`;

//         navigator.clipboard.writeText(youtubeSearchLink);
//     });
// });

// observer.observe(document, {
//     attributes: true,
//     subtree: true,
// });

window.addEventListener('DOMContentLoaded', (event) => {
    const nowPlayingWidgetElement = document.querySelector('[data-testid*="now-playing-widget"]');

    if (nowPlayingWidgetElement) {
        const elementsToAddTheListener = nowPlayingWidgetElement.querySelectorAll('a');

        elementsToAddTheListener.forEach(element => {
            element.addEventListener('contextMenu', () => {
                const dataElements = Array.from(elementsToAddTheListener).map(element => element.textContent ? element.textContent : '');

                console.log(dataElements);


                console.log("%cEmanuel", 'background-color:blue;color: white;font-size:20px;');

                // const youtubeSearchLink = `https://www.youtube.com/results?search_query=${artistName}+${songName}`;

                // navigator.clipboard.writeText(youtubeSearchLink);
            });
        });
    }
});



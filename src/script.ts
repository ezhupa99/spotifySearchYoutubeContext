const observer = new MutationObserver((mutations, observer) => {

    const mutation = mutations
        .find(mutation => {

            //  filter all mutations that are not tooltips
            if (!(mutation.target as HTMLDivElement).id.includes('tippy'))
                return false;

            const tippyElement = mutation.target as HTMLDivElement;

            // filter all mutations that their tooltip is empty
            if (tippyElement.childNodes.length === 0)
                return false;

            // filter all mutations that might have elements but no context element
            if (!tippyElement.querySelector('#context-menu'))
                return false;

            const contextMenu = tippyElement.querySelector('#context-menu') as HTMLDivElement;

            // filter all mutations that have context menu but don't have elements
            if (contextMenu.childNodes.length === 0)
                return false;

            const isSong = Array.from(contextMenu.querySelectorAll('li[role=presentation]')).find((li) =>
                li.outerHTML.toLowerCase().includes("go to song radio") === true
            );

            if (!isSong)
                return false;

            return true;
        });

    if (!mutation)
        return;

    const target = mutation.target as HTMLDivElement;

    const contextMenuElement = target.querySelector('#context-menu') as HTMLDivElement;

    const ulElementElement = contextMenuElement.querySelector('ul') as HTMLUListElement;

    const liItemsElement = ulElementElement.querySelectorAll('li[role=presentation]');

    // remmove all existing youtube music elements
    Array.from(liItemsElement).filter((li) => {
        const span = li.querySelector('span') as HTMLSpanElement;

        if (span.textContent === 'Open Youtube Search Link') {
            return true;
        }

        return false;
    }).forEach(element => {
        element.remove();
    });

    const showCreditsElement = Array.from(liItemsElement).find((li) => li.outerHTML.toLowerCase().includes("show credits") === true);

    const youtubeSearchLinkElement = showCreditsElement?.cloneNode(true) as HTMLLIElement;

    if (!youtubeSearchLinkElement) return;

    const spanElement = youtubeSearchLinkElement.querySelector('span');

    if (!spanElement) return;

    spanElement.textContent = "Open Youtube Search Link";

    ulElementElement.appendChild(youtubeSearchLinkElement);

    youtubeSearchLinkElement.querySelector('button')?.addEventListener('click', () => {

        const nowPlayingWidgetElement = document.querySelector('[data-testid="now-playing-widget"]');

        if (!nowPlayingWidgetElement) return;

        const dataItems = nowPlayingWidgetElement?.querySelectorAll('a');

        if (!dataItems) return;

        const songInfo = Array.from(dataItems)
            // first link is the image which doesn't have a text/title
            .slice(1)
            // get only element text
            .map(element => element.textContent)
            // aggregate all text into one string
            .reduce((acc, curr) => { return acc + " " + curr; });

        if (!songInfo) return;

        const youtubeSearchLink = `https://www.youtube.com/results?search_query=${songInfo}`;

        // open youtube search link in new tab
        window.open(youtubeSearchLink, '_blank');

        const tippyContext = document.querySelector('[data-tippy-root]') as any;

        if (!tippyContext) return;

        tippyContext._tippy.destroy();
    });
});

observer.observe(document, {
    attributes: true,
    subtree: true,
});
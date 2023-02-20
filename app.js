const hamBtn = document.querySelector('.hamburger-btn');
const menu = document.querySelector('.header-menu');

const input = document.querySelector('.to-shorten-links input');
const linksList = document.querySelector('.to-short-link-list');

const shortLinkBtn = document.querySelector('.to-shorten-links button');

function toggleMenu(event) {
    menu.classList.toggle('active-menu');
}

async function toShortLink(event) {

    let shortLink = await fetch(`https://api.shrtco.de/v2/shorten?url=${input.value}`)
    .then(response => response.json())
    .then(data => data.result.full_short_link2);

    linksList.innerHTML += `
        <div class="shorted-link">

            <div class="input-link">
            ${input.value}
            </div>  

            <div class="output-link">

            <span>${shortLink}</span>

            <button onclick="copyShortedLink(event)">Copy</button>

            </div>

        </div>
    `;
}

function copyShortedLink(event) {

    let previousCopiedLink = document.querySelector('.active-link-btn');

    if(previousCopiedLink) {
        previousCopiedLink.classList.remove('active-link-btn');
        previousCopiedLink.innerText = 'Copy';
    }

    event.target.innerHTML = "Copied!"
    event.target.classList.add('active-link-btn');

    let shortedLink = event.target.parentNode.querySelector('span').innerText;
    navigator.clipboard.writeText(shortedLink);
}

hamBtn.addEventListener('click', event => toggleMenu(event));
shortLinkBtn.addEventListener('click', event => toShortLink(event));
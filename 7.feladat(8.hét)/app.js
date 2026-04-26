const GH_ACCESS_TOKEN = 'github token ide';


function loadNavigation() {
    fetch('./navbar.html')
        .then(res => {
            if (!res.ok) throw Error('Nem sikerült betölteni a menüt.');
            return res.text();
        })
        .then(navbarHtml => {
            document.body.insertAdjacentHTML('afterbegin', navbarHtml);
        })
        .catch(err => {
            console.error(err);
            console.log('Hiba a menürendszer betöltésekor. Ellenőrizd a navbar.html fájlt!');
        });
}

loadNavigation();
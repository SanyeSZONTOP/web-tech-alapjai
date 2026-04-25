async function loadUsers(searchText) {
    if (!searchText.trim()) {
        alert('Keresni kívánt felhasználónevet adj meg');
        return;
    }

    try {
        const res = await fetch('https://api.github.com/search/users?q='
            + encodeURIComponent(searchText), {
            headers: {
                'Authorization': 'Bearer ' + GH_ACCESS_TOKEN
            }
        });

        if (!res.ok) {
            throw Error('Hibás válasz, státuszkód: ' + res.status);
        }

        const data = await res.json();
        const resultDiv = document.querySelector('#result');
        resultDiv.innerHTML = '';
        for (const user of data.items) {
            const userHtml = `
                <div class="card user-card">
                    <img src="${user.avatar_url}" alt="${user.login}" class="user-avatar">
                    <h3>${user.login}</h3>
                    <a href="${user.html_url}" target="_blank" class="btn btn-secondary">Profil megnyitása</a>
                </div>
            `;
            resultDiv.innerHTML += userHtml;
        }

        if (data.items.length === 0) {
            resultDiv.innerHTML = '<p>Nincs találat a megadott névre.</p>';
        }

    } catch (err) {
        console.error(err);
        alert('Hiba történt a keresés során.');
    }
}

const searchBtn = document.querySelector('#search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const inputElem = document.querySelector('#user-search-input');
        const searchText = inputElem.value;
        loadUsers(searchText);
    });
}
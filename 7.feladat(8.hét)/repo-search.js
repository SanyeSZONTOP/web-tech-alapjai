async function loadRepositories(searchText) {
    if (!searchText.trim()) {
        alert('Keresni kívánt repositoryt adj meg!');
        return;
    }

    try {
        const res = await fetch('https://api.github.com/search/repositories?q='
            + encodeURIComponent(searchText), {
            headers: {
                'Authorization': 'Bearer ' + GH_ACCESS_TOKEN
            }
        });

        if (!res.ok) {
            throw Error('Hibás válasz, státuszkód:' + res.status);
        }

        const data = await res.json();
        const resultDiv = document.querySelector('#result');
        resultDiv.innerHTML = '';

        for (const repo of data.items) {
            const repoHtml = `
                <div class="card">
                    <p><strong>${repo.full_name}</strong></p>
                    <p>${repo.description || 'Nincs leírás'}</p>
                    <p>Language: ${repo.language || 'N/A'}</p>
                </div>
            `;
            resultDiv.innerHTML += repoHtml;
        }

        if (data.items.length === 0) {
            resultDiv.innerHTML = '<p>Nincs találat.</p>';
        }

    } catch (err) {
        console.error(err);
        alert('Hiba történt a keresés során.');
    }
}

const searchBtn = document.querySelector('#search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const inputElem = document.querySelector('#repo-search-input');
        const searchText = inputElem.value;
        loadRepositories(searchText);
    });
}
async function loadUserDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('id');

    if (!username) {
        document.getElementById('user-details').innerHTML = "<p>Nincs megadva felhasználó!</p>";
        return;
    }

    try {
        const res = await fetch(`https://api.github.com/users/${username}`, {
            headers: { 'Authorization': 'Bearer ' + GH_ACCESS_TOKEN }
        });

        if (!res.ok) throw Error("Felhasználó nem található.");

        const user = await res.json();
        const detailsDiv = document.getElementById('user-details');

        let html = `
            <img src="${user.avatar_url}" class="big-avatar" alt="${user.login}">
            <h1>${user.name || user.login}</h1>
        `;

        const fields = [
            { label: "Bio", value: user.bio },
            { label: "Blog", value: user.blog, isLink: true },
            { label: "Helyszín", value: user.location },
            { label: "Publikus repók", value: user.public_repos },
            { label: "Követők", value: user.followers }
        ];

        fields.forEach(field => {
            if (field.value && field.value !== "") {
                html += `
                    <div class="info-row">
                        <span class="label">${field.label}:</span> 
                        ${field.isLink ? `<a href="${field.value}" target="_blank">${field.value}</a>` : field.value}
                    </div>
                `;
            }
        });

        html += `<br><a href="user-search.html" class="btn btn-primary">Vissza a kereséshez</a>`;
        detailsDiv.innerHTML = html;

    } catch (err) {
        console.error(err);
        document.getElementById('user-details').innerHTML = `<p>Hiba: ${err.message}</p>`;
    }
}

loadUserDetails();
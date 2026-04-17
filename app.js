import supabase from './supabase-client.js';

const apkGrid = document.getElementById('apkGrid');
const searchInput = document.getElementById('searchInput');

async function fetchApks() {
    const { data, error } = await supabase
        .from('apks')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Erro ao buscar APKs:', error);
        return [];
    }
    return data;
}

function renderApks(apks) {
    apkGrid.innerHTML = '';
    if (apks.length === 0) {
        apkGrid.innerHTML = '<p>Nenhum aplicativo encontrado.</p>';
        return;
    }

    apks.forEach(apk => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${apk.image_url}" alt="${apk.name}">
            <div class="card-content">
                <h3>${apk.name}</h3>
                <a href="${apk.apk_url}" download>Baixar APK</a>
            </div>
        `;
        apkGrid.appendChild(card);
    });
}

async function main() {
    const allApks = await fetchApks();
    renderApks(allApks);

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredApks = allApks.filter(apk => 
            apk.name.toLowerCase().includes(searchTerm)
        );
        renderApks(filteredApks);
    });
}

main();

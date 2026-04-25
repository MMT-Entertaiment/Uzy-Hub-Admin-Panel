// ⚠️ REMPLACE CECI PAR TON CLIENT ID
const CLIENT_ID = 'METS_TON_CLIENT_ID_ICI';
const REDIRECT_URI = 'https://MMT-Entertaiment.github.io/callback.html';
const SERVER_ID = 'METS_TON_SERVER_ID_ICI'; // ID de ton serveur Discord

// Au chargement de la page
window.addEventListener('load', () => {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('dashboard')) {
        loadDashboard();
    }
});

// Login avec Discord
function loginDiscord() {
    const scopes = 'identify guilds';
    const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(scopes)}`;
    window.location.href = url;
}

// Charger le dashboard
async function loadDashboard() {
    const token = localStorage.getItem('discord_token');
    
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    try {
        // Récupérer les infos utilisateur
        const userResponse = await fetch('https://discord.com/api/v10/users/@me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const user = await userResponse.json();
        document.getElementById('username').textContent = user.username;

    } catch (error) {
        console.error('Erreur:', error);
        logout();
    }
}

// Déconnexion
function logout() {
    localStorage.removeItem('discord_token');
    window.location.href = 'index.html';
}

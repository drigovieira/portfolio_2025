// data/githubStats.js
export async function getGitHubCommits() {
    try {
        const username = 'drigovieira'; // Substitua pelo seu username
        const response = await fetch(`https://api.github.com/users/${username}/events/public`);

        if (!response.ok) {
            throw new Error('Falha ao buscar dados do GitHub');
        }

        const events = await response.json();
        const pushEvents = events.filter(event => event.type === 'PushEvent');

        return pushEvents.reduce((total, event) => {
            return total + event.payload.commits.length;
        }, 0);

    } catch (error) {
        console.error('Erro ao buscar commits:', error);
        return 151; // Retorna o valor padrão em caso de erro
    }
}
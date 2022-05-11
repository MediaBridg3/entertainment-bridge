import { reactive } from 'vue'

export const store = reactive({
  twitchToken: false,
  maxAge: false,
  games: [],
  setToken(value) {
    this.twitchToken = value?.['access_token'];
    this.maxAge = value?.['expires_in'];
  },
  async getToken() {
    const tokenData = await fetch('api/twitch-token');
      if (tokenData) {
        const twitchJson = await tokenData.json();
        if (twitchJson && twitchJson?.['access_token']) {
          this.twitchToken = twitchJson?.['access_token'];

          let timestamp = new Date().getTime();

          this.maxAge = twitchJson?.['expires_in'] ? timestamp + twitchJson['expires_in'] : false;
        }
      }
  },
  setGames(value) {
    this.games = value;
  },
  gameIndex(id) {
    if (id && this.games.length) {
      return this.games.find((game) => game.id === id);
    }
  }
})
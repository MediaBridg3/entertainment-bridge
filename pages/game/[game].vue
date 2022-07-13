<template>
  <div v-if="game">
    <transition appear name="fade">
      <div class="media-info-page">
        <div
          class="media-info-page__backdrop"
          :style="
            game.posterPath
              ? `background-image: url(https:${game.posterPath})`
              : ''
          "
        >
          <div class="container">
            <div class="media-info-block">
              <div class="media-info-block__image">
                <img v-if="game.posterPath" :src="`https:${game.posterPath}`" />
              </div>

              <div class="media-info-block__text">
                <h2>{{ game.title }}</h2>

                <p>{{ game.summary ? game.summary : '-' }}</p>

                <span>{{ game.date ? game.date : '' }}</span>
                <div v-if="game.genreIds">
                  {{ getGenres(game.genreIds) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { store } from '~~/store/store.js';

export default {
  data() {
    return {
      pending: true,
      store,
      game: false,
      gameGenres: [
        { id: 4, name: 'Fighting' },
        { id: 5, name: 'Shooter' },
        { id: 7, name: 'Music' },
        { id: 8, name: 'Platform' },
        { id: 9, name: 'Puzzle' },
        { id: 10, name: 'Racing' },
        { id: 11, name: 'Real Time Strategy (RTS)' },
        { id: 12, name: 'Role-playing (RPG)' },
        { id: 13, name: 'Simulator' },
        { id: 14, name: 'Sport' },
        { id: 15, name: 'Strategy' },
        { id: 16, name: 'Turn-based strategy (TBS)' },
        { id: 24, name: 'Tactical' },
        { id: 26, name: 'Quiz/Trivia' },
        { id: 25, name: 'Hack and slash' },
        { id: 30, name: 'Pinball' },
        { id: 31, name: 'Adventure' },
        { id: 33, name: 'Arcade' },
        { id: 34, name: 'Visual Novel' },
        { id: 32, name: 'Indie' },
        { id: 35, name: 'Card & Board Game' },
        { id: 36, name: 'MOBA' },
        { id: 2, name: 'Point-and-click' },
      ],
    };
  },
  mounted() {
    if (this.$route.params.game) {
      this.getGameById(this.$route.params.game);
    }
  },
  methods: {
    getGameById(id) {
      const game = store.gameIndex(id);
      if (game) {
        this.game = game;
      }
      console.log('GAME: ', JSON.parse(JSON.stringify(game)));
    },
    releaseDate(mediaDate) {
      if (mediaDate) {
        let parsed = Date.parse(mediaDate);
        let newDate = new Date(parsed);
        return newDate.getFullYear();
      }
      return '-';
    },
    getGenres(itemsGenres) {
      let payload = '';
      itemsGenres.forEach((id) => {
        this.gameGenres.find((genre) => {
          if (genre.id === id) {
            payload += payload === '' ? genre.name : `, ${genre.name}`;
          }
        });
      });
      return payload;
    },
  },
};
</script>

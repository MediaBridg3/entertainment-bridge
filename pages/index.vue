<template>
  <div>
    <div class="main-search">
      <div class="container">
        <h1>Hej</h1>
        <form @submit.prevent="mediaSearch" class="main-search__form">
          <div>
            <input type="text" v-model="searchTerm" />
            <button><Icon name="search" /></button>
          </div>
          <div class="search-icons">
            <Icon name="movie" />
            <Icon name="game" />
            <Icon name="tv" />
          </div>
        </form>
      </div>
    </div>
    <template v-if="pending">
      <Spinner />
    </template>
    <template v-if="media">
      <transition appear name="fade" mode="out-in">
        <MediaSearchResultList class="container" :data="media" />
      </transition>
    </template>
  </div>
</template>
<script>
import { store } from '~~/store/store.js';
import MediaSearchResultList from '~~/components/MediaSearchResultList.vue';
import Spinner from '~~/components/skeleton/Spinner.vue';
import Icon from '~~/components/Icon.vue';

export default {
  layout: 'default',
  components: {
    MediaSearchResultList,
    Spinner,
    Icon,
  },
  data() {
    return {
      searchTerm: '',
      mediaPayload: [],
      games: [],
      pending: false,
      token: false,
      store,
    };
  },
  computed: {
    media() {
      if (!this.pending) {
        const media = this.mediaPayload.concat(this.games);
        media.sort((a, b) => {
          return b.rating - a.rating;
        });
        return media;
      }
      return [];
    },
  },
  async mounted() {
    if (!store.twitchToken) {
      store.getToken();
    } else if (store.twitchToken && store.maxAge) {
      if (store.maxAge < new Date().getTime()) {
        store.getToken();
      }
    }
  },
  methods: {
    async mediaSearch() {
      console.log('hej i mediaSearch innan ifen');
      if (this.searchTerm && this.searchTerm.length > 1 && store.twitchToken) {
        this.pending = true;
        this.games = [];
        this.mediaPayload = [];
        console.log('hej i mediaSearch');

        // Games search
        const gamesData = await fetch(
          `/api/game-search?token=${store.twitchToken}&searchTerm=${this.searchTerm}`
        );
        if (gamesData) {
          const gamesJson = await gamesData.json();
          if (gamesJson.length) {
            gamesJson.forEach((game) => {
              this.games.push({
                id: game.id,
                posterPath: game.cover?.url
                  ? game.cover.url.replace('t_thumb', 't_cover_big')
                  : false,
                mediaType: 'game',
                title: game.name,
                genreIds: game.genres,
                date: game['first_release_date']
                  ? this.getGameYear(game['first_release_date'])
                  : '-',
                rating: game['total_rating'] ? game['total_rating'] : 0,
                summary: game.summary,
              });
            });
            store.setGames(JSON.parse(JSON.stringify(this.games)));
            console.log('Games: ', gamesJson);
          }
        }

        // Movie and TV-search
        const data = await fetch(`/api/multi-search?search=${this.searchTerm}`);
        if (data) {
          const json = await data.json();
          if (json.results.length) {
            console.log('tv/film: ', json.results);
            json.results.forEach((media) => {
              if (
                media?.['media_type'] === 'tv' ||
                media?.['media_type'] === 'movie'
              ) {
                this.mediaPayload.push({
                  id: media.id,
                  posterPath: media['poster_path']
                    ? `https://image.tmdb.org/t/p/original${media['poster_path']}`
                    : false,
                  mediaType: media['media_type'],
                  title:
                    media['media_type'] === 'movie' ? media.title : media.name,
                  genreIds: media['genre_ids'],
                  date:
                    media['media_type'] === 'movie'
                      ? media['release_date']
                      : media['first_air_date'],
                  rating: media['vote_average']
                    ? media['vote_average'] * 10
                    : 0,
                });
              }
            });
          }
        }

        this.pending = false;
      }
    },
    getGameYear(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.getFullYear();
    },
  },
};
</script>

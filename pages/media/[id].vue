<template>
  <div v-if="mediaPayload">
    <transition appear name="fade">
      <div class="media-info-page">
        <div
          class="media-info-page__backdrop"
          :style="`background-image: url(https://image.tmdb.org/t/p/original${mediaPayload.backdrop_path})`"
        >
          <div class="container">
            <div class="media-info-block">
              <div class="media-info-block__image">
                <img
                  v-if="mediaPayload.poster_path"
                  :src="`https://image.tmdb.org/t/p/original${mediaPayload.poster_path}`"
                />
              </div>

              <div class="media-info-block__text">
                <h2>{{ mediaPayload.title }}</h2>

                <p>{{ mediaPayload.overview ? mediaPayload.overview : '-' }}</p>

                <span>{{ releaseDate(mediaPayload.release_date) }}</span>
                <div v-if="mediaPayload.genres">
                  <span
                    v-for="(genre, index) in mediaPayload.genres"
                    :key="`media-genre-${index}`"
                  >
                    {{ `${genre.name} ` }}
                  </span>
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
      mediaPayload: false,
      pending: true,
      store,
      genres: [
        { id: 28, name: 'Action' },
        { id: 10759, name: 'Action & Adventure' },
        { id: 12, name: 'Adventure' },
        { id: 16, name: 'Animation' },
        { id: 35, name: 'Comedy' },
        { id: 80, name: 'Crime' },
        { id: 99, name: 'Documentary' },
        { id: 18, name: 'Drama' },
        { id: 10751, name: 'Family' },
        { id: 14, name: 'Fantasy' },
        { id: 36, name: 'History' },
        { id: 27, name: 'Horror' },
        { id: 10762, name: 'Kids' },
        { id: 10402, name: 'Music' },
        { id: 9648, name: 'Mystery' },
        { id: 10763, name: 'News' },
        { id: 10764, name: 'Reality' },
        { id: 10749, name: 'Romance' },
        { id: 878, name: 'Science Fiction' },
        { id: 10765, name: 'Sci-Fi & Fantasy' },
        { id: 10766, name: 'Soap' },
        { id: 10767, name: 'Talk' },
        { id: 10770, name: 'TV Movie' },
        { id: 53, name: 'Thriller' },
        { id: 10752, name: 'War' },
        { id: 10768, name: 'War & Politics' },
        { id: 37, name: 'Western' },
      ],
    };
  },
  mounted() {
    if (this.$route.params.id) {
      if (this.$route.query.type !== 'game') {
        this.mediaSearch(this.$route.params.id);
      }
    }
  },
  methods: {
    async mediaSearch(id) {
      const data = await fetch(
        `/api/id-search?search=${id}&type=${this.$route.query.type}`
      );
      if (data) {
        const json = await data.json();
        if (json) {
          this.mediaPayload = json;
          this.pending = false;
        }
      }
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
        this.genres.find((genre) => {
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

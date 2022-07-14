<template>
  <div class="media-search-result-list">
    <div class="container">
      <div class="row media-search-result-list__wrapper">
        <NuxtLink
          v-for="(media, index) in mediaList"
          :key="`media-result${Number(index)}`"
          class="media-list-item col-lg-3"
          :to="`/${path(media)}/${media.id}?type=${media.mediaType}`"
        >
          <div class="media-list-item__image">
            <img v-if="media.posterPath" :src="media.posterPath" />
            <template v-else>
              <Icon v-if="media?.mediaType === 'tv'" name="tv" class="icon" />
              <Icon
                v-if="media?.mediaType === 'movie'"
                name="movie"
                class="icon"
              />
              <Icon
                v-if="media?.mediaType === 'game'"
                name="game"
                class="icon"
              />
            </template>
          </div>
          <div class="media-list-item__title">
            <span class="d-flex align-items-baseline">
              <Icon v-if="media?.mediaType === 'tv'" name="tv" class="icon" />
              <Icon
                v-if="media?.mediaType === 'movie'"
                name="movie"
                class="icon"
              />
              <Icon
                v-if="media?.mediaType === 'game'"
                name="game"
                class="icon"
              />
              {{ media.title }}
            </span>
            <p class="date">{{ releaseDate(media) }}</p>
            <p v-if="media.genreIds" class="genre">
              {{ getGenres(media.genreIds, media.mediaType) }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '~~/components/Icon.vue';

export default {
  name: 'MediaSearchResultList',
  components: {
    Icon,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
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
  computed: {
    mediaList() {
      if (this.data && this.data.length > 0) {
        return this.data;
      }
      return [];
    },
  },
  methods: {
    path(media) {
      if (media.mediaType === 'game') {
        return 'game';
      }
      return 'media';
    },
    releaseDate(media) {
      if (media.date && media.mediaType !== 'game') {
        let parsed = Date.parse(media.date);
        let newDate = new Date(parsed);
        return newDate.getFullYear();
      } else if (media.date && media.mediaType === 'game') {
        return media.date;
      }
      return '-';
    },
    getGenres(itemsGenres, type) {
      let payload = '';
      if (type !== 'game') {
        itemsGenres.forEach((id) => {
          this.genres.find((genre) => {
            if (genre.id === id) {
              payload += payload === '' ? genre.name : `, ${genre.name}`;
            }
          });
        });
      } else if (type === 'game') {
        itemsGenres.forEach((id) => {
          this.gameGenres.find((genre) => {
            if (genre.id === id) {
              payload += payload === '' ? genre.name : `, ${genre.name}`;
            }
          });
        });
      }
      return payload;
    },
  },
};
</script>

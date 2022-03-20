<template>
    <div class="media-search-result-list">
      <div class="container">
        <div class="row media-search-result-list__wrapper">
          <NuxtLink
            v-for="(media, index) in mediaList"
            :key="`media-result${Number(index)}`"
            class="media-list-item col-lg-3"
            :to="`/media/${media.id}`"
          >
            <div class="media-list-item__image">
              <img v-if="media.poster_path" :src="`https://image.tmdb.org/t/p/original/${media.poster_path}`" />
              <Icon v-else name="film" />
            </div>
            <div class="media-list-item__title">
              <span class="d-flex align-items-baseline"><Icon name="film" />{{ media.title }}</span>
              <p class="date">{{ releaseDate(media.release_date) }}</p>
              <p v-if="media.genre_ids" class="genre">{{ getGenres(media.genre_ids) }}</p>
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
        {id: 28, name: 'Action'},
        {id: 12, name: 'Adventure'},
        {id: 16, name: 'Animation'},
        {id: 35, name: 'Comedy'},
        {id: 80, name: 'Crime'},
        {id: 99, name: 'Documentary'},
        {id: 18, name: 'Drama'},
        {id: 10751, name: 'Family'},
        {id: 14, name: 'Fantasy'},
        {id: 36, name: 'History'},
        {id: 27, name: 'Horror'},
        {id: 10402, name: 'Music'},
        {id: 9648, name: 'Mystery'},
        {id: 10749, name: 'Romance'},
        {id: 878, name: 'Science Fiction'},
        {id: 10770, name: 'TV Movie'},
        {id: 53, name: 'Thriller'},
        {id: 10752, name: 'War'},
        {id: 37, name: 'Western'},
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
      itemsGenres.forEach(id => {
        this.genres.find(genre => {
          if (genre.id === id) {
            payload += payload === '' ? genre.name : `, ${genre.name}`;
          }
        })
      });
      return payload;
    },
  },
};
</script>

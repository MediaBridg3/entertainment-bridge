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
              <p>{{ media.title }}</p>
              <span class="date">{{ releaseDate(media.release_date) }}</span>
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
  },
};
</script>

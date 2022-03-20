<template>
<div>
  <div class="main-search">
    <div class="container">

    <form @submit.prevent="mediaSearch" class="main-search__form">
      <div>
        <input type="text" v-model="searchTerm" />
        <button><Icon name="search" /></button>
      </div>
      <div class="search-icons">
        <Icon name="film" />
        <Icon name="keyboard" />
        <Icon name="screen" />
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
      pending: false,
    };
  },
  computed: {
    media() {
      if (this.mediaPayload && this.mediaPayload.length > 0) {
        return this.mediaPayload;
      }
      return [];
    },
  },
  methods: {
    async mediaSearch() {
      if (this.searchTerm && this.searchTerm.length > 1) {
        this.pending = true;
        const data = await fetch(`/api/media-search?search=${this.searchTerm}`);
        if (data) {
          const json = await data.json();
          if (json) {
            this.mediaPayload = json.results;
            this.pending = false;
          }
        }
      }
    },
  },
};
</script>

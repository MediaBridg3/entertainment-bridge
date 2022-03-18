<template>
    <div v-if="mediaPayload">
      <transition appear name="fade">
          <div class="media-info-page">
            <div class="media-info-page__backdrop" :style="`background-image: url(https://image.tmdb.org/t/p/original${mediaPayload.backdrop_path})`">
              <div class="container">
                <p>Movie id: {{ $route.params.id }} </p>
                <div class="media-info-block">
                  <div class="media-info-block__image">
                    <img v-if="mediaPayload.poster_path" :src="`https://image.tmdb.org/t/p/original${mediaPayload.poster_path}`" />
                  </div>

                  <div class="media-info-block__text">
                    <h2>{{ mediaPayload.title }}</h2>
                    
                    <p>{{ mediaPayload.overview ? mediaPayload.overview : '-' }}</p>

                    <span>{{ releaseDate(mediaPayload.release_date) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </transition>
    </div>
</template>

<script>
export default {
  data() {
    return {
        mediaPayload: false,
        pending: true,
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.mediaSearch(this.$route.params.id);
    }
  },
  methods: {
    async mediaSearch(id) {
        const data = await fetch(`/api/id-search?search=${id}`);
        if (data) {
          const json = await data.json();
          if (json) {
            this.mediaPayload = json;
            console.log(json);
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
    }
  },
}
</script>

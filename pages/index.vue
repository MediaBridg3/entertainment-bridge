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
            <Icon name="movie" />
            <Icon name="keyboard" />
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
      token: false,
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
  async mounted() {
    // const timeObject = new Date();
    // console.log(timeObject);
    // console.log(timeObject.getTime());
    // timeObject.setSeconds(timeObject.getSeconds() + 10);
    // console.log(timeObject);
    // console.log(timeObject.getTime());
    // Get Twitch token
    // const tokenData = await fetch('api/twitch-token');
    // console.log('tokenData: ', tokenData);
  },
  methods: {
    async mediaSearch() {
      if (this.searchTerm && this.searchTerm.length > 1) {
        this.pending = true;

        // Get Twitch token
        if (!this.token) {
          const tokenData = await fetch('api/twitch-token');
          if (tokenData) {
            const twitchJson = await tokenData.json();
            if (twitchJson && twitchJson?.['access_token']) {
              console.log('tokenData: ', twitchJson);
              this.token = twitchJson['access_token'];
            }
          }
        }

        console.log('this.token: ', typeof this.token);

        // Games search
        if (this.token) {
          const gamesData = await fetch(
            `/api/game-search?token=${this.token}&searchTerm=${this.searchTerm}`
          );
          if (gamesData) {
            const gamesJson = await gamesData.json();
            if (gamesJson) {
              console.log('Games: ', gamesJson);
            }
          }
        }

        // Movie and TV-search
        // const data = await fetch(`/api/multi-search?search=${this.searchTerm}`);
        // if (data) {
        //   const json = await data.json();
        //   if (json) {
        //     this.mediaPayload = json.results;
        //     this.pending = false;
        //   }
        // }

        this.pending = false;
      }
    },
  },
};
</script>

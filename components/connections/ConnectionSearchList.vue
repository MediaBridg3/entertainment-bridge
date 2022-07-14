<template>
  <div class="list">
    <div
      v-for="(media, index) in data"
      :key="`connection-search-${index}`"
      class="connection-list-item"
    >
      <div class="connection-list-item__image">
        <img v-if="media.posterPath" :src="media.posterPath" />
        <template v-else>
          <Icon :name="media.mediaType" class="icon" />
        </template>
      </div>
      <div class="connection-list-item__title">
        <span class="d-flex align-items-baseline">
          <Icon :name="media.mediaType" class="icon" />
          {{ media.title }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
};
</script>

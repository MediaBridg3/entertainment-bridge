<template>
<div>
  <div class="eBridgeHeader-default">
    <div class="container menu-row">
    <Icon name="thumbtack" />
    <NuxtLink to="/">Home</NuxtLink>
    </div>
  </div>
  <div>
    <slot></slot>
  </div>
</div>
</template>

<script>
import Icon from '~~/components/Icon.vue';

export default {
  components: { 
    Icon, 
  },
};
</script>


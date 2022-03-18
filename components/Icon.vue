<template>
        <div v-if="name" class="icon">
            <InlineSvg :src="`assets/icons/${String(name)}.svg`"></InlineSvg>
        </div>
</template>

<script>
import InlineSvg from 'vue-inline-svg';
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
    },
    components: {
        InlineSvg,
    }
}

</script>

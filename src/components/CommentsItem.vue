<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import Loader from '@/components/Loader.vue'

const store = useStore()
const route = useRoute()

const comments = computed(() => store.state.comments)
const loading = computed(() => store.state.loading)

onMounted(() => {
  store.dispatch('fetchComments', String(route.params.id))
})
</script>
<template>
  <div>
    <Loader v-if="loading" />
    <div class="columns is-multiline" v-else>
      <div class="column is-12" v-for="(item, index) in comments" :key="index">
        <span>{{ item.bodyText }}</span
        ><br />
        <span>{{ item.createdAt }}</span>
      </div>
      <span v-if="!comments.length">No comments....</span>
    </div>
  </div>
</template>
<style lang="less" scoped></style>

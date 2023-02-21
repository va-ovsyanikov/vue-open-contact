<script setup>
import { RouterLink } from 'vue-router'
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import Loader from '@/components/Loader.vue'
const store = useStore()
// const repoItem = ref('Hello-World')
const issues = computed(() => store.getters.getIssues)
const loading = computed(() => store.state.loading)

onMounted(() => {
  // if (!issues.value.length) {
  // store.dispatch('getRepositories')
  // }
  // store.dispatch('getIssues', repoItem.value)
})
</script>

<template>
  <Loader v-if="loading" />
  <div v-else>
    <div
      class="content columns is-multiline"
      v-for="(elem, i) of issues"
      :key="i"
    >
      <div
        class="column is-6 item"
        v-for="(item, index) in elem.issues.nodes"
        :key="index"
      >
        <router-link :to="`${$route.params.repo}/${item.number}`" replace>
          <div class="card">
            <div class="card-content">
              <h3>{{ item.title }}</h3>
              <span>State: {{ item.state }}</span> <br />
              <span class="has-text-primary">{{ item.bodyText }}</span
              ><br />
              {{ item.number }}
            </div>
          </div>
        </router-link>
      </div>
      <span v-if="!elem.issues.nodes.length">No issues....</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.aside {
  width: 280px;
}
.content {
  width: 1000px;
}
.card {
  height: 200px;
  overflow: hidden;
}
</style>

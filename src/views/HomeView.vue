<script setup>
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const active = ref('Hello-World')
const isActive = ref(false)
const router = useRouter()
const route = useRoute()

const repositories = computed(() => store.state.repositories)

onMounted(() => {
  store.dispatch('getRepositories')
  store.commit('selectRepository', active.value)
  if (route.path === '/') {
    router.push(active.value)
  }
})

const selectRepo = item => {
  active.value = item
  store.commit('selectRepository', item)
}
</script>

<template>
  <div class="columns">
    <div class="column aside">
      <div class="wrapper">
        <div class="dropdown is-active">
          <div class="dropdown-trigger">
            <button
              class="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              @click="isActive = !isActive"
            >
              <span>Dropdown button</span>
              <span class="icon is-small">
                <i class="fa-solid fa-angle-down"></i>
              </span>
            </button>
          </div>
          <div
            class="dropdown-menu"
            id="dropdown-menu"
            role="menu"
            v-if="isActive"
          >
            <div class="dropdown-content">
              <router-link
                :to="`/${item.name}`"
                replace
                class="dropdown-item"
                :class="{ 'is-active': item.name === active }"
                v-for="(item, index) in repositories"
                :key="index"
                @click="selectRepo(item.name)"
              >
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-10">
      <router-view />
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

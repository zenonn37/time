<template>
  <div>
    <ul class="filter-projects">
      <li class="cursor" v-if="!complete" @click="toggleStatus()">
        <i class="fas fa-check-circle"></i>
        Completed
      </li>
      <li class="cursor" v-if="complete" @click="toggleStatus()">
        <i class="far fa-check-circle"></i>
        On Going
      </li>

      <li class="cursor" @click="onSearchToggle()">
        <i class="fas fa-search"></i>
        Search
      </li>

      <li class="cursor" @click="onRefresh()">
        <i class="fas fa-sync-alt"></i>
        Refresh
      </li>
    </ul>
    <transition name="fade" mode="in-out">
      <div class="search-container" v-if="search">
        <div>
          <i class="fas fa-search cursor" @click="onSearch()"></i>
          <input class="search-input" placeholder="Search Projects" type="text" v-model="term" />
        </div>
        <!-- <button @click="onSearch()">Send</button> -->
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      complete: false,
      term: "",
      search: false
    };
  },
  methods: {
    toggleStatus() {
      this.complete = !this.complete;
      this.$emit("status", this.complete);
    },
    onSearch() {
      if (this.term === "") {
        return;
      }
      this.$store.dispatch("projects/search", this.term);
      this.term = "";
    },
    onSearchToggle() {
      this.search = !this.search;
    },
    onRefresh() {
      this.$emit("refresh", this.complete);
    }
  }
};
</script>


<template>
  <div>
    <h2>{{!complete ? 'Projects in Progress' : 'Completed Projects'}}</h2>
    <ul class="filter-projects">
      <li class="cursor" @click="toggleStatus(false)">
        <i class="far fa-check-circle"></i>
        In-Progress
      </li>

      <li class="cursor" @click="toggleStatus(true)">
        <i class="fas fa-check-circle"></i>
        Completed
      </li>

      <li class="cursor" @click="onSearchToggle()">
        <i class="fas fa-search"></i>
        Search
      </li>
      <transition name="fade" mode="in-out">
        <li class="cursor" v-if="search" @click="onRefresh()">
          <i class="fas fa-sync-alt"></i>
          Refresh
        </li>
      </transition>
    </ul>
    <transition name="fade" mode="in-out">
      <div class="search-container" v-if="search">
        <div>
          <i class="fas fa-search cursor" @click="onSearch()"></i>
          <input
            class="search-input"
            v-on:keyup.enter="onSearch()"
            placeholder="Search Projects"
            type="text"
            v-model="term"
          />
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
      //complete: false,
      term: "",
      search: false
    };
  },
  computed: {
    complete() {
      // return
      return this.$store.getters["projects/toggle"];
    }
  },
  methods: {
    toggleStatus(bool) {
      //this.$emit("status");
      console.log(bool);

      this.$store.dispatch("projects/toggleComplete", bool);
      this.$store.dispatch("projects/get_projects", bool);
    },
    onSearch() {
      console.log("called");

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


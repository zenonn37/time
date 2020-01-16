<template>
  <div class="time-entry">
    <input type="text" @keyup.enter="sendEntry" v-model.trim="entry" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      entry: ""
    };
  },

  methods: {
    sendEntry() {
      this.$emit("entry", this.entry);
    }
  }
};
</script>



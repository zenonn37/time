<template>
  <div>
    <ul>
      <li v-for="entry in entrys" :key="entry.id">
        <div class="entry-line">
          <div class="start-end">{{entry.start}} - {{entry.end}}</div>
          <div class="entry-time">{{entry.seconds |hours}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["entrys"],
  name: "EntryList"
};
</script>


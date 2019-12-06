<template>
  <div class="panel-parent">
    <div class="panel-container">
      <div class="panel-top">
        <div class="panel-date">
          <h3>{{hour.date | date}}</h3>
        </div>
        <div class="panel-time">{{hour.time | hours}}</div>
      </div>
      <div class="panel-bottom">
        <div class="panel-task"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hour"]
};
</script>

 
<template>
  <div class="panel-parent">
    <transition name="slide-fade">
      <div class="edit-project" v-if="edit">
        <EditProject :data="project" @cancel="onEdit" />
      </div>
    </transition>
    <div class="panel-container">
      <div class="panel-top">
        <div class="panel-date">
          <h6>
            Project
            <i @click="onEdit()" class="fas fa-edit cursor"></i>
            <i @click="onDelete(project.id)" class="fas fa-trash cursor"></i>
            <i
              @click="onComplete(project)"
              class="cursor"
              :class="[
                !project.completed
                  ? 'far fa-check-circle'
                  : 'fas fa-check-circle'
              ]"
            ></i>
          </h6>

          <h3 class="title cursor" @click="onProject(project.id)">
            <i class="fas fa-project-diagram"></i>
            {{ project.name }}
          </h3>
          <h6>
            Status:
            <span class="complete" v-if="project.completed">Completed</span>
            <span class="incomplete" v-else>On Going</span>
          </h6>
        </div>
        <div class="panel-time">
          <h6>Total Hours</h6>
          <span class="hours">{{ project.seconds | hours }}</span>
        </div>
      </div>
      <div class="panel-bottom">
        <div class="panel-task">
          <h6>Project Tasks</h6>
          <div class="box-task">
            <span class="hours">{{ project.tasks }}</span>
          </div>
        </div>

        <div class="panel-goal">
          <h6>Time Goal</h6>
          <span class="hours">{{ project.goal | hours }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditProject from "@/components/forms/EditProject";
export default {
  props: ["project"],
  components: {
    EditProject
  },

  data() {
    return {
      edit: false
    };
  },

  computed: {},
  methods: {
    onProject(id) {
      this.$router.push(`/projects/${id}/task`);
    },
    onEdit() {
      this.edit = !this.edit;
    },
    onDelete(id) {
      const ids = parseInt(id);
      this.$store.dispatch("projects/delete_project", ids).then(() => {});
    },
    onComplete(p) {
      this.$store
        .dispatch("projects/edit_projects", {
          name: p.name,
          goal: p.goal,
          completed: (p.completed = !p.completed),
          id: p.id
        })
        .then(() => {});
    }
  }
};
</script>

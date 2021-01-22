<template>
  <div class="container-post">
    <form @submit.prevent="onUpdate">
      <div class="container-header">
        <div class="header-title">
          <input
            type="text"
            v-model="todos.title"
            class="form-control-plaintext"
          />
        </div>
        <div class="header-options">
          <button class="btn btn-link" type="submit">Update</button>
          <button class="btn btn-link" type="button" @click="onDelete">
            Delete
          </button>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="container-body">
        <textarea
          rows="6"
          v-model="todos.body"
          class="form-control-plaintext"
        ></textarea>
      </div>
      <div class="container-footer">
        {{ humanizeTodoDate }}
      </div>
    </form>
  </div>
</template>
<script>
import moment from "moment";
import { mapActions } from "vuex";
export default {
  props: {
    todos: Object,
  },
  computed: {
    humanizeTodoDate() {
      return moment(this.todos.created_at).format("MMM d h:mm a");
    },
  },
  methods: {
    ...mapActions(["updateTodo", "deleteTodo"]),
    onUpdate() {
      this.updateTodo(this.todos);
    },
    onDelete() {
      this.deleteTodo(this.todos);
    },
  },
};
</script>
<style scoped>
.container-post {
  padding: 20px;
  margin: auto;
  margin-bottom: 10px;
  width: 40%;
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  box-shadow: 5px 5px 5px 3px rgba(68, 68, 68, 0.6);
}

form {
  width: 100%;
}

textarea {
  resize: none;
}

.container-header {
  border-bottom: 1px solid black;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.container-header .header-options {
  flex: 1;
}

.container-header .header-options button {
  margin: 5px;
}

.container-header .header-title {
  flex: 1;
}

.container-footer {
  float: left;
  font-style: italic;
}

.container-body {
  padding: 20px;
}
</style>
<template>
  <div class="container">
    <form @submit.prevent="onAddTodo">
      <div class="form-group">
        <div class="row">
          <div class="col">
            <label>Title</label>
            <input class="form-control" type="text" v-model="todo.title" />
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col">
            <label>Body</label>
            <textarea
              class="form-control"
              rows="3"
              v-model="todo.body"
            ></textarea>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-sm btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      todo: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    ...mapActions(["addTodo"]),
    onAddTodo() {
      this.addTodo(this.todo);
      this.todo = "";
    },
  },
};
</script>
<style scoped>
.container {
  width: 50% !important;
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 10px;
}
</style>
<template>
  <div class="home">
    <div class="spinner-border" role="status" v-if="getStatus == 'loading'">
      <span class="visually-hidden">Loading...</span>
    </div>
    <h4>{{ getUser }}</h4>
    <AddTodo />
    <div class="todo-container">
      <Todo v-for="todo in getTodos" :key="todo.id" :todos="todo" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Todo from "@/components/Todo";
import { mapGetters, mapActions } from "vuex";
import AddTodo from "@/components/AddTodo";
import store from "@/store/index";
export default {
  name: "Home",
  components: {
    Todo,
    AddTodo,
  },
  methods: mapActions(["fetchTodos"]),
  created() {
    this.fetchTodos();
  },
  computed: mapGetters(["getTodos", "getUser", "getStatus"]),
};
</script>

<style scoped>
</style>








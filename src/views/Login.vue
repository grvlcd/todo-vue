<template>
  <div class="about">
    <div class="spinner-border" role="status" v-if="getStatus == 'loading'">
      <span class="visually-hidden">Loading...</span>
    </div>
    <form @submit.prevent="onLogin">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input
          type="text"
          v-model="user.username"
          class="form-control"
          id="username"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          v-model="user.password"
          class="form-control"
          id="password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  computed: mapGetters(["getStatus"]),
  methods: {
    ...mapActions(["loginUser"]),
    onLogin() {
      this.loginUser(this.user).then((resp) => {
        if (resp) {
          this.$router.push({ name: "Home" });
        }
      });
    },
  },
};
</script>
<style scoped>
.about {
  margin: auto;
  width: 50%;
}
</style>
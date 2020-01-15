<template>
  <div class="auth-container">
    <div class="form-container">
      <div class="container">
        <div class="auth">
          <div class="logo ani">
            <img src="@/assets/logo.png" alt="Logo" />
          </div>
          <div class="cover ani">
            <img src="@/assets/images/cover_timer.svg" alt="time management" />
          </div>
          <div class="auth-parent ani">
            <transition name="fade" mode="out-in">
              <h3 v-if="!auth" key="login">Login</h3>

              <h3 v-else key="register">Register</h3>
            </transition>
            <span class="errors">{{errors !== null ? errors : ""}}</span>
            <transition name="fade" mode="out-in">
              <Register @register="register" v-if="auth" :error="errors" />
              <Login @login="login" v-else :error="errors" />
            </transition>
          </div>

          <button
            class="toggle-btn ani"
            @click="toggleAuth()"
          >{{auth ? 'I already have an Account.':'I need an Account.' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Register from "@/components/auth/Register";
import Login from "@/components/auth/Login";
import GSAP from "gsap";
export default {
  name: "Auth",
  components: {
    Register,
    Login
  },
  data() {
    return {};
  },
  computed: {
    errors() {
      return this.$store.getters["base/get_errors"];
    },
    auth() {
      return this.$store.getters["base/get_auth"];
    }
  },
  methods: {
    toggleAuth() {
      this.$store.dispatch("base/toggle_auth");
      this.$store.dispatch("base/clear_errors");
    },
    login(value) {
      //console.log(value);

      this.$store.dispatch("LOGIN", value).then(() => {
        //console.log("you are in");
        this.$store.dispatch("USER");
        this.$router.push("/home");
      });
    },
    register(value) {
      // console.log(value);

      this.$store.dispatch("REGISTER", value).then(() => {
        // console.log("you are in");
        // this.$store.dispatch("USER");
        //this.$router.push("/");
        this.$store.dispatch("base/set_auth_login");
      });
    }
  },
  mounted() {
    GSAP.from(".ani", {
      opacity: 0,
      duration: 0.3,
      y: -70,
      stagger: 0.5
    });
  }
};
</script>


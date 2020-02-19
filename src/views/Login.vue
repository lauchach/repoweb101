<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img src="../images/img-01.png" alt="IMG" />
        </div>

        <!-- <div class="card-body"> -->
        <form @submit.prevent="loginUser" class="login100-form validate-form">
          <span class="login100-form-title">
            Login
          </span>

          <div class="wrap-input100 validate-input">
            <input
              id="email"
              type="text"
              placeholder="Email"
              name="email"
              v-model="email"
              class="input100"
            />
          </div>
          <div class="wrap-input100 validate-input">
            <input
              type="password"
              class="input100"
              placeholder="Password"
              name="password"
              id="password"
              v-model="password"
            />
          </div>

          <div class="container-login100-form-btn">
            <button class="login100-form-btn">Login</button>
          </div>
          <div class="text-center p-t-27">
            <a class="txt2" href="#">
              <router-link to="/register" class="card-link"
                >Already have an account?</router-link
              >
              <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
            </a>
          </div>
        </form>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
// eslint-disable-next-line no-console
console.log("views/login>>>>");
// import { mapActions } from "vuex";                                                                      // methods V.2.0
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  // methods V.1.0
  methods: {
    loginUser() {
      let uri = "http://localhost:4000/login/login";
      this.axios
        .post(uri, {
          email: this.email,
          password: this.password
        })
        .then(res => {
          // eslint-disable-next-line no-console
          console.log(res);
          if (res.data.success) {
            alert("สำเร็จ  >>");
            let user = JSON.stringify(res.data);
            let type = JSON.stringify(res.data.type);
            // eslint-disable-next-line no-console
            console.log("user", user);
            localStorage.setItem("userData", user);
            // localStorage.setItem("userData", JSON.stringify(user));
            localStorage.setItem("userData2", JSON.stringify(type));
            // eslint-disable-next-line no-console
            console.log("localStorage ", localStorage);
            // eslint-disable-next-line no-console
            console.log("localStorage>>> ", JSON.parse(localStorage.userData));
            // eslint-disable-next-line no-console
            console.log("localStorage222>>> ", JSON.parse(localStorage.userData2));
            // commit('auth_success', user);
            this.$router.push("/Chatroom");
          }
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  }
};
</script>

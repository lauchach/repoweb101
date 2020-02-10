<template>
  <div class="Login2">
    <div id="app">
      <div class="limiter">
        <div class="container-login100">
          <div class="wrap-login100">
            <div class="login100-pic js-tilt" data-tilt>
              <img src="../images/img-01.png" alt="IMG" />
            </div>

            <form class="login100-form validate-form">
              <span class="login100-form-title">
                Member Login
              </span>

              <div
                class="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  v-model="email"
                  class="input100"
                  type="text"
                  name="email"
                  placeholder="Email"
                />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>

              <div
                class="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <input
                  v-model="password"
                  class="input100"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>
              <div>
                <div class="container-login100-form-btn" tag="button">
                  <div class="login100-form-btn" @click="login">Login</div>
                </div>

                <!-- <div class="container-login100-form-btn" tag="button">
                  <div class="login100-form-btn" @click="get">GET</div>
                </div>

                <div class="container-login100-form-btn" tag="button">
                  <div class="login100-form-btn" @click="post">POST</div>
                </div> -->
              </div>
              <div class="container-login100-form-btn">
                <router-link
                  to="/Chatroom"
                  tag="button"
                  class="login100-form-btn"
                  >Login</router-link
                >
              </div>

              <div class="container-login100-form-btn">
                <router-link
                  to="/testaxios"
                  tag="button"
                  class="login100-form-btn"
                  >testaxios</router-link
                >
              </div>

              <div class="text-center p-t-20">
                <router-link to="/register">Create Your Account</router-link>
              </div>

              <div class="text-center p-t-136">
                <router-link to="/register"></router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import jQuery2 from "../vendor/jquery/jquery-3.2.1.min.js";
export default {
  name: "Login2",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    // login() {
    //   let uri = "http://localhost:4000/Login/";
    //   this.axios.get(uri, this.username).then(response => {
    //     // eslint-disable-next-line no-console
    //     console.log(response);
    //   });
    // }

    login() {
      let uri = "http://localhost:4000/indexx/";
      this.axios
        .post(uri, {
          email: this.email
          // ,password: this.password
        })
        .then(response => {
          // eslint-disable-next-line no-console
          console.log(response);
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }

    // login() {
    //   let uri = "http://localhost:4000/Login/login";
    //   this.axios
    //     .post(uri, {
    //       email: this.email,
    //       password: this.password
    //     })
    //     .then(response => {
    //       // eslint-disable-next-line no-console
    //       console.log(response);
    //       // eslint-disable-next-line no-console
    //       console.log(this.email);
    //     });
    // }
  }
};
</script>

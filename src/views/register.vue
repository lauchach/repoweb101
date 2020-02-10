<template>
  <div class="register">
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
                  class="input100"
                  type="text"
                  name="username"
                  placeholder="User Name"
                  v-model="username"
                />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>

              <div
                class="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  class="input100"
                  type="text"
                  name="email"
                  placeholder="Email"
                  v-model="email"
                />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>

              <div
                class="wrap-input100 validate-input"
                data-validate="Password2 is required"
              >
                <input
                  class="input100"
                  name="pass2"
                  placeholder="Password"
                  v-model="password2"
                />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>

              <div
                class="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <input
                  class="input100"
                  name="pass"
                  placeholder="Confirm Password"
                  v-model="password"
                />
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>

              <div class="container-login100-form-btn">
                <button class="login100-form-btn" @click="register">
                  Submit
                </button>
              </div>

              <div class="text-center p-t-37">
                <span class="txt1">
                  Forgot
                </span>
                <a class="txt2" href="#">
                  Username / Password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let _data = {};
// @ is an alias to /src

export default {
  name: "register",
  components: {},
  data() {
    return {
      username: "",
      email: "",
      password: "",
      password2: ""
    };
  },
  methods: {
    register() {
      let uri = "http://localhost:4000/indexx/";
      this.axios
        .post(uri, {
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(response => {
          response.forEach(doc => {
            // eslint-disable-next-line no-console
            console.log(doc.id, "=>", doc.data());
            _data = doc.data();
          });
          // eslint-disable-next-line no-console
          console.log(">>>", response);
          // eslint-disable-next-line no-console
          console.log("_data ", _data);
          localStorage.setItem("response", JSON.stringify(_data));
          let res = JSON.parse(localStorage.getItem("response"));
          // eslint-disable-next-line no-console
          console.log("res ", res);
          if (res.status === 200) {
            this.$router.replace("home");
          } else {
            // eslint-disable-next-line no-console
            console.log("err");
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

<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img src="../images/img-01.png" alt="IMG" />
        </div>

        <!-- <div class="card-body"> -->
        <form
          @submit.prevent="registerUser"
          class="login100-form validate-form"
        >
          <span class="login100-form-title">
            Register
          </span>
          <div class="wrap-input100 validate-input">
            <input
              id="username"
              type="text"
              placeholder="Username"
              name="username"
              v-model="username"
              class="input100"
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-envelope" aria-hidden="true"></i>
            </span>
          </div>

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
          <div class="form-group">
            <input
              type="password"
              class="input100"
              placeholder="Confirm Password"
              name="confirm_password"
              id="confirm_password"
              v-model="confirm_password"
            />
          </div>
          <div class="container-login100-form-btn">
            <button class="login100-form-btn">Register</button>
          </div>
          <div class="text-center p-t-27">
            <a class="txt2" href="#">
              <router-link to="/" class="card-link"
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
// import { mapActions } from "vuex";                                                                      // methods V.2.0
export default {
  name: 'register',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      type: 'member'
    }
  },
  // methods V.1.0
  methods: {
    registerUser() {
      let uri = 'http://localhost:4000/indexx/'
      this.axios
        .post(uri, {
          username: this.username,
          email: this.email,
          password: this.password,
          confirm_password: this.confirm_password,
          type: this.type
        })
        .then(res => {
          if (res.data.success) {
            alert('สำเร็จ  >>')
            this.$router.push('/login')
          }
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    }
  }
  // methods V.2.0
  // methods: {
  //   ...mapActions(["register"]),
  //   registerUser() {
  //     let user = {
  //       username: this.username,
  //       email: this.email,
  //       password: this.password,
  //       confirm_password: this.confirm_password
  //     };
  //     this.register(user).then(res => {
  //       if (res.data.success) {
  //         alert("register success");
  //         this.$router.push("/");
  //       }
  //     });
  //   }
  // }
}
</script>

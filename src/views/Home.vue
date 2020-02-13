<template>
  <div class="home">
    <!-- <Login></Login> -->
    <!-- <Login2></Login2> -->
    <div class="text-center p-t-27">
      <a class="txt2" href="#">
        <router-link to="/login" class="card-link"
          >Already have an account?</router-link
        >
        <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
      </a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Login from "../components/Login";
// import Login2 from "../components/Login2";
export default {
  name: "home",
  components: {
    // Login,
    //Login2 // HelloWorld
  }
};
</script>

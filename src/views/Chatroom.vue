<template>
  <div class="Chatroom">
    Chatroom
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Chatroom",
  components: {},
  computed: mapGetters(["user"]),
  data() {
    return {
      username: JSON.parse(localStorage.getItem("userData")),
      type: JSON.parse(localStorage.getItem("userData2"))
      // type: JSON.parse(localStorage.getItem("typeData"))
    };
  },
  created() {
    // eslint-disable-next-line no-console
    console.log("username", this.username);
    // eslint-disable-next-line no-console
    // console.log("JSON.stringify ", JSON.stringify(localStorage.getItem("userData")));
    // eslint-disable-next-line no-console
    console.log("type", this.type);
  }
};
</script>

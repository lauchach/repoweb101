<template>
  <div id="app">
    <div class="header">
      <h1>Chatroom</h1>
      <p class="username">Username: {{ username }}</p>
      <p class="online">Online: {{ users.length }}</p>
      <p class="online">Online: {{ users }}</p>
    </div>
    <ChatRoom v-bind:messages="messages" v-on:sendMessage="this.sendMessage" />
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
// import jQuery from "jquery";
import io from "socket.io-client";
import ChatRoom from "../components/CompoChatroom";
export default {
  name: "Chatroom",
  components: {
    ChatRoom
  },
  // computed: mapGetters(["user"]),
  data() {
    return {
      username: JSON.parse(localStorage.getItem("userData")),
      type: JSON.parse(localStorage.getItem("userData2")),
      // type: JSON.parse(localStorage.getItem("typeData"))
      socket: io("http://localhost:3000"),
      messages: [],
      users: this.username
    };
  },
  created() {
    // eslint-disable-next-line no-console
    console.log("username", this.username);
    // eslint-disable-next-line no-console
    // console.log("JSON.stringify ", JSON.stringify(localStorage.getItem("userData")));
    // eslint-disable-next-line no-console
    console.log("type", this.type);
  },
  methods: {
    joinServer: function() {
      this.socket.on("loggedIn", data => {
        this.messages = data.messages;
        this.users = data.users;
        // eslint-disable-next-line no-console
        console.log('data>>>.',data)
        this.socket.emit("newuser", this.username);
      });

      this.listen();
    },
    listen: function() {
      this.socket.on("userOnline", user => {
        this.users.push(user);
      });
      this.socket.on("userLeft", user => {
        this.users.splice(this.users.indexOf(user), 1);
      });
      this.socket.on("msg", message => {
        this.messages.push(message);
      });
    },
    sendMessage: function(message) {
      this.socket.emit("msg", message);
    }
  },
  mounted: function() {
    //   // this.username = prompt("What is your username>>?", "Anonymous");
    //   // this.username = prompt("What is your username>>?", "Anonymous");

    //   if (!this.username) {
    //     this.username = "Anonymous";
    //   }

    this.joinServer();
  }
};
</script>

<style lang="scss">
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding: 15px;
  box-sizing: border-box;
}
</style>

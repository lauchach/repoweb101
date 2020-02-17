<template>
  <div class="container py-5 px-4">
    <!-- For demo purpose-->
    <header class="text-center">
      <h1 class="display-4 text-white">ChatRoom</h1>
      <p class="text-white lead mb-0">
        <!-- An elegant chat widget compatible with Bootstrap 4 -->
      </p>
      <p class="text-white lead mb-4">
         by
        <a href="https://bootstrapious.com" class="text-white">
          <u>Tarnapot</u></a
        >
      </p>
    </header>

    <div class="row rounded-lg overflow-hidden shadow">
      <!-- Users box-->
      <div class="col-8 px-0">
        <div class="bg-white">
          <div class="bg-gray px-4 py-2 bg-light">
            <p class="h5 mb-0 py-1">Recent</p>
          </div>

          <div class="messages-box">
            <ChatRoom
              v-bind:messages="messages"
              v-on:sendMessage="this.sendMessage"
            />
          </div>
        </div>
      </div>
      <!-- Chat Box-->
      <div class="col-4 px-0">
        <div class="px-4 py-5 chat-box bg-white">
          @chat-box
          <p class="online">Online: {{ users.length }}</p>
          <!-- Sender Message online users-->
          <div
            class="testitem"
            v-for="(testitem, user) in users"
            :key="'ing' + user"
          >
            <div class="users-box">🟢{{ testitem }}</div>
          </div>
          <!-- <div class="media w-50 mb-3">
            <img
              src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
              alt="user"
              width="50"
              class="rounded-circle"
            />
            <div class="media-body ml-3">
              <div class="bg-light rounded py-2 px-3 mb-2">
                <p class="text-small mb-0 text-muted">
                  Test which is a new approach all solutions
                </p>
              </div>
              <p class="small text-muted">12:00 PM | Aug 13</p>
            </div>
          </div> -->

          <!-- Reciever Message-->
          <!-- <div class="media w-50 ml-auto mb-3">
            <div class="media-body">
              <div class="bg-primary rounded py-2 px-3 mb-2">
                <p class="text-small mb-0 text-white">
                  Test which is a new approach to have all solutions
                </p>
              </div>
              <p class="small text-muted">12:00 PM | Aug 13</p>
            </div>
          </div> -->

          <!-- Sender Message-->
          <!-- <div class="media w-50 mb-3">
            <img
              src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
              alt="user"
              width="50"
              class="rounded-circle"
            />
            <div class="media-body ml-3">
              <div class="bg-light rounded py-2 px-3 mb-2">
                <p class="text-small mb-0 text-muted">
                  Test, which is a new approach to have
                </p>
              </div>
              <p class="small text-muted">12:00 PM | Aug 13</p>
            </div>
          </div> -->

          <!-- Reciever Message-->
          <!-- <div class="media w-50 ml-auto mb-3">
            <div class="media-body">
              <div class="bg-primary rounded py-2 px-3 mb-2">
                <p class="text-small mb-0 text-white">
                  Apollo University, Delhi, India Test
                </p>
              </div>
              <p class="small text-muted">12:00 PM | Aug 13</p>
            </div>
          </div> -->

          <!-- Sender Message-->
          <!-- <div class="media w-50 mb-3">
            <img
              src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
              alt="user"
              width="50"
              class="rounded-circle"
            />
            <div class="media-body ml-3">
              <div class="bg-light rounded py-2 px-3 mb-2">
                <p class="text-small mb-0 text-muted">
                  Test, which is a new approach
                </p>
              </div>
              <p class="small text-muted">12:00 PM | Aug 13</p>
            </div>
          </div> -->

          <!-- Reciever Message-->
          <!-- <div class="media w-50 ml-auto mb-3">
            <div class="media-body">
              <div class="bg-primary rounded py-2 px-3 mb-2">
                <p class="text-small mb-0 text-white">
                  Apollo University, Delhi, India Test
                </p>
              </div>
              <p class="small text-muted">12:00 PM | Aug 13</p>
            </div>
          </div> -->
        </div>

        <!-- Typing area -->
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import ChatRoom from "../components/CompoChatroom";
export default {
  name: "Chatroom",
  components: {
    ChatRoom
  },
  data() {
    return {
      datauser: JSON.parse(localStorage.getItem("userData")),
      localuser: [
        {
          username: "",
          type: ""
        }
      ],
      socket: io("http://localhost:3000"),
      messages: [],
      users: [],
      subjectName: "",
      loopSubjectId: ""
    };
  },
  mounted: function() {
    this.joinServer();
  },
  methods: {
    joinServer: function() {
      this.socket.on("loggedIn", data => {
        this.messages = data.messages;
        this.users = data.users;
        this.socket.emit("newuser", this.datauser.username);
      });
      // eslint-disable-next-line no-console
      console.log("users", this.users);
      this.listen();
    },
    listen: function() {
      this.socket.on("userOnline", user => {
        this.users.push(user);
      });
      this.socket.on("userOut", user => {
        this.users.splice(this.users.indexOf(user), 1);
      });
      this.socket.on("msg", message => {
        this.messages.push(message);
      });
    },
    sendMessage: function(message) {
      this.socket.emit("msg", message);
    }
  }
  // <div class="header">
  // <h1>Chatroom</h1>
  // <p class="datauser">Username: {{ datauser.username }}</p>
  // <p class="online">Online: {{ users.length }}</p>
  // <p class="online">Online: {{ users }}</p>
  // </div>
  // <ChatRoom v-bind:messages="messages" v-on:sendMessage="this.sendMessage" />
  // <div class="testitem" v-for="(testitem, user) in users" :key="'ing' + user">
  //   <div class="message">{{ testitem }}</div>
  // </div>
};
</script>

<style lang="scss">
/*
*
* ==========================================
* FOR DEMO PURPOSES
* ==========================================
*
*/
body {
  background-color: #74ebd5;
  background-image: linear-gradient(90deg, #74ebd5 0%, #9face6 100%);

  min-height: 100vh;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  width: 5px;
  background: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  width: 1em;
  background-color: #ddd;
  outline: 1px solid slategrey;
  border-radius: 1rem;
}

.text-small {
  font-size: 0.9rem;
}

.messages-box,
.chat-box {
  width: auto;
  height: 510px;
  // overflow-y: scroll;
}

.users-box {
  width: auto;
  height: 25px;
  // overflow-y: scroll;
}

.rounded-lg {
  border-radius: 0.5rem;
}

input::placeholder {
  font-size: 0.9rem;
  color: #999;
}
</style>

<template>
  <div id="app">
    <div class="topright">
      <button type="button" class="btn-btn-link" @click="logout">Logout</button>
    </div>
    <div class="container py-5 px-4">
      <div class="topright">
        <!-- <button type="button" class="btn-btn-link" @click="logout">Logout</button> -->
      </div>
      <header class="text-center">
        <h1 class="display-4 text-white">ChatRoom</h1>
        <p class="text-white lead mb-0"></p>
        <p class="text-white lead mb-4">
          by
          <a
            href="https://www.facebook.com/tarnapot.baikulab"
            class="text-white"
          >
            <u>Tarnapot</u></a
          >
        </p>
      </header>
      <!-- <ChatRoom
        v-bind:messages="messages"
        v-on:sendMessage="this.sendMessage"
      /> -->
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
            <p class="username">Username: {{ username }}</p>
            <p class="online">Online: {{ users.length }}</p>
            <!-- <p class="online">Online: {{ createdAt }}</p> -->
            <p class="online">test time: {{ timex }}</p>
            <!-- Sender Message online users-->
            <div
              class="testitem"
              v-for="(testitem, user) in users"
              :key="'ing' + user"
            >
              <div class="users-box">🟢{{ testitem }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import io from 'socket.io-client'
import ChatRoom from '../components/CompoChatroom'
var moment = require('moment')

export default {
  name: 'app',
  components: {
    ChatRoom
  },
  data() {
    return {
      datauser: JSON.parse(localStorage.getItem('userData')),
      // socket: io('http://localhost:3000'),
      messages: [],
      users: [],
      time: [],
      timex: moment().format('LTS')
    }
  },
  sockets: {
    connect: function() {
      // this.joinServer()
      // eslint-disable-next-line no-console
      console.log('socket connected//connection')
    }
    // ,
    // loggedIn: function() {
    //   data => {
    //     this.messages = data.messages
    //     this.users = data.users
    //   }
    // }
    // ,
    // customEmit: function(data) {
    //   console.log(
    //     'this method was fired by the socket server. eg: io.emit("customEmit", data)'
    //   )
    // }
  },
  mounted: function() {
    this.username = this.datauser.username

    if (!this.username) {
      this.$router.push('/')
      // eslint-disable-next-line no-console
      console.log('erro')
    } else {
      this.socket.on('loggedIn', data => {
        this.messages = data.messages
        this.users = data.users
      })
      this.socket.on('userOnline', user => {
        this.users.push(user)
      })
      this.socket.on('userLeft', user => {
        this.users.splice(this.users.indexOf(user), 1)
      })
      this.socket.on('msg', message => {
        this.messages.push(message)
      })
      this.joinServer()
    }
  },
  methods: {
    joinServer: function() {
      this.$socket.emit('newuser', this.username)
    }
    ,
    sendMessage: function(message) {
      this.socket.emit('msg', message)
    },
    notnulljoinServer: function() {
      // eslint-disable-next-line no-console
      console.log('notnulljoinServer/function')
      this.$router.push('/')
    },
    logout: function() {
      localStorage.clear()
      this.$router.push('/')
      this.socket.emit('logOut')
    }
  }
}
</script>

<style lang="scss">
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

.btn-btn-link {
  // padding: 9px;
  background: rgb(248, 248, 248);
  border-radius: 0.5rem;
  width: 75px;
  height: 40px;
}

.topright {
  position: relative;
  margin-left: 92%;
}
</style>

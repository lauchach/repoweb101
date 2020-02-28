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
                v-bind:username="username"
              />
            </div>
          </div>
        </div>
        <!-- Chat Box-->
        <div class="col-4 px-0">
          <div class="px-4 py-5 chat-box bg-white">
            @chat-box
            <p class="username">Username: {{ username }}</p>
            <p class="online">test time: {{ timex }}</p>
            <!-- Sender Message online users-->
            <div class="testitem" v-for="user in users" :key="user">
              <div class="users-box">🟢{{ user }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      messages: [],
      users: [],
      time: [],
      timex: moment().format('LTS'),
      username: JSON.parse(localStorage.getItem('userData')).username,
      type: JSON.parse(localStorage.getItem('userData')).type,
      data: [],
      testOut: [],
      ischackmathusername: false
    }
  },
  created() {
    this.joinServer()
    // eslint-disable-next-line no-console
    console.log('a')
    this.users = []
  },
  sockets: {
    connection: function() {
      // eslint-disable-next-line no-console
      console.log('socket connected//connection////////////////////////')
    },
    // userOneOnline: function(user) {
    //   this.users = user.users
    //   this.joinServer()
    //   // eslint-disable-next-line no-console
    //   console.log('userOneOnline: function()', this.users, this.users.length)
    // },
    userOnline: function(user) {
      // ต้องสร้างห้อง bไปหาคนอื่นยกเว็นตัวเอง
      this.users = user.users
      this.messages = user.messages
    },
    userLeft: function(user) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i] !== this.users.splice(user, 1)) {
          this.testOut.push(this.users[i])
          this.users = user.users
        }
      }
    },
    msg: function(message) {
      this.messages.push(message)
      this.$scrollToEnd
    },
    connectionone: function(user) {
      // eslint-disable-next-line no-console
      console.log('connectionone>>>data>>>>>>', user)
    }
  },
  methods: {
    // firstJoin: function() {
    //   this.$socket.emit('firstJoinemit')
    //   // eslint-disable-next-line no-console
    //   console.log('firstJoin', this.users)
    // },
    joinServer: function() {
      // eslint-disable-next-line no-console

      // eslint-disable-next-line no-console
      console.log('joinServer: function()', this.users.length)

      if (this.users.length > 0) {
        // eslint-disable-next-line no-console
        console.log('if', this.users.length)
        for (let i = 0; i < this.users.length; i++) {
          if (this.username === this.users[i]) {
            alert('มีการใช้งานอยู่')
            this.logout()
          } else {
            // eslint-disable-next-line no-console
            console.log('else1')
            this.$socket.emit('newuser', {
              username: this.username,
              type: this.datauser.type
            })
          }
        }
      } else {
        if (this.ischackmathusername === false) {
          this.$socket.emit('newuser', {
            username: this.username,
            type: this.datauser.type
          })
          // eslint-disable-next-line no-console
          console.log('///////if emit', this.ischackmathusername)
        } else {
          // eslint-disable-next-line no-console
          console.log('///////else not/emit', this.ischackmathusername)
        }
      }
    },
    sendMessage: function(message) {
      this.$socket.emit('msg', message)
    },
    notnulljoinServer: function() {
      // eslint-disable-next-line no-console
      console.log('notnulljoinServer/function')
      this.$router.push('/')
    },
    logout: function() {
      localStorage.clear()
      this.$router.push('/')
      this.$socket.emit('logOut', this.username)
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

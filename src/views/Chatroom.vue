<template>
  <div class="container py-5 px-4">
    <div class="topright">
      <button type="button" class="btn-btn-link" @click="logout">Logout</button>
    </div>
    <header class="text-center">
      <h1 class="display-4 text-white">ChatRoom</h1>
      <p class="text-white lead mb-0"></p>
      <p class="text-white lead mb-4">
        by
        <a href="https://www.facebook.com/tarnapot.baikulab" class="text-white">
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
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import ChatRoom from '../components/CompoChatroom'
var moment = require('moment')

// let time = new Date();
export default {
  name: 'Chatroom',
  components: {
    ChatRoom
  },
  data() {
    return {
      datauser: JSON.parse(localStorage.getItem('userData')),
      socket: io('http://localhost:3000'),
      messages: [],
      users: [],
      time: [],
      timex: moment(this.time).format('h:mm a')
    }
  },
  mounted: function() {
    if (!this.datauser) {
      this.notnulljoinServer()
      // eslint-disable-next-line no-console
      console.log('erro')
    } else {
      this.joinServer()
      this.socket.on('userOnline', user => {
        this.users.push(user)
        // eslint-disable-next-line no-console
        // console.log('listen/messages>>>', JSON.parse(this.messages))
        // eslint-disable-next-line no-console
        console.log('userOnline//this.users', this.users)
      })
      this.socket.on('userOut', user => {
        this.users.splice(this.users.indexOf(user), 1)
      })
      this.socket.on('msg', message => {
        this.messages.push(message)
      })
      this.socket.on('getResult', message => {
        this.messages.push(message)
        // eslint-disable-next-line no-console
        console.log('getResult', this.messages)
      })
      // eslint-disable-next-line no-console
      console.log('mounted/this.username', this.datauser.username)
    }
  },
  methods: {
    joinServer: function() {
      this.socket.emit('newuser', this.datauser.username)
      // eslint-disable-next-line no-console
      console.log(moment(this.createdAt).format('h:mm a'))
      // eslint-disable-next-line no-console
      console.log('s.username', this.data)
      // eslint-disable-next-line no-console
      console.log('users>>>', this.users)
      // eslint-disable-next-line no-console
      console.log('messages>>>', JSON.stringify(this.messages))
      // eslint-disable-next-line no-console
      console.log('arr1>>>', JSON.stringify(this.messages.arr1))
    },
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

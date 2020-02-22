<template>
  <div class="chat-window">
    <div class="messages">
      <div class="message" v-for="message in messages" :key="message.id">
        <div class="username">{{ message.username }}</div>
        <div v-if=" message.username  === 'lauchach'" class="message-type">@👨‍💻</div>
        <div v-else class="message-type2"></div>
        <div class="message-text">{{ message.msg }}</div>
        <div class="message-time">{{ message.time }}</div>
      </div>
    </div>
    <form class="input-container" v-on:submit="sendMessage">
      <p type="text">{{ this.datauser.username }}:</p>

      <input type="text" v-model="msg" />
      <button v-on:click="sendMessage" v-bind:disabled="!msg">Send</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'compoChatroom',
  props: ['messages'],
  data: function() {
    return {
      msg: '',
      datauser: JSON.parse(localStorage.getItem('userData'))
      // type: this.datauser.type
    }
  },
  methods: {
    sendMessage: function() {
      if (!this.datauser.username) {
        alert('time out')
      }
// eslint-disable-next-line no-console
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.')
      this.$emit('sendMessage', this.msg)
      this.msg = ''
    }
  },
  created() {
    // eslint-disable-next-line no-console
    console.log('message.msg', this.messages)
        // eslint-disable-next-line no-console
    console.log('type>>>>>>>>>>>>>>>>>>>>>>>>.  ', this.datauser.type)

  }
}
</script>

<style lang="scss" scoped>
.chat-window {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  box-shadow: 1px 1px 6px 0px rgba(0, 0, 0, 0.15);
  padding: 3px;
  border-radius: 0.7rem;

  .messages {
    height: 510px;
    overflow: scroll;

    .message {
      display: flex;
      border-bottom: 1px solid #efefef;
      padding: 10px;

      &:last-of-type {
        border-bottom: none;
      }

      .username {
        width: 100px;
        margin-right: 15px;
      }

      .message-type {
        // text-shadow: red;
        // flex: 1;
        // background: rgb(196, 196, 255);
        // width: 50px;
        // background: red;
      }

      .message-text {
        flex: 1;
        // width: 50px;
        // background: red;
      }
      .message-time {
        // flex: 1;
        // background: yellow;
        padding-right: 0;
      }
    }
  }
  .input-container {
    display: flex;

    input {
      flex: 1;
      height: 35px;
      font-size: 18px;
      // margin-left: 90px;
      box-sizing: border-box;
    }

    button {
      width: 75px;
      height: 35px;
      box-sizing: border-box;
    }
  }
}
</style>

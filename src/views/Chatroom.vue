<template>
  <div class="main">
    <link rel="stylesheet" href="../css/style.css" />
    <div class="">
      <div class="header">
        <h1>Chatroom</h1>
        <p class="datauser">Username: {{ datauser.username }}</p>
        <p class="online">Online: {{ users.length }}</p>
        <p class="online">Online: {{ users }}</p>
      </div>
      <!-- <div>
      <td v-if="item.length - 1 === i">
        <input
          type="text-on-table-ids"
          v-model="subjectid"
          placeholder="3000-XXXX"
        />
      </td>
      <td v-else>
        <input
          type="text-on-table-ids"
          v-model="item.subjectid"
          placeholder="3000-XXXX"
        />
      </td>
    </div> -->
      <ChatRoom
        v-bind:messages="messages"
        v-on:sendMessage="this.sendMessage"
      />
      <div>>>>>{{ users }}</div>

      <div
        class="profiletaggroup"
        v-for="(testitem, user) in users"
        :key="'ing' + user"
      >
        <div class="message">{{ testitem }}</div>
      </div>
      <section class="our-story" id="our-story">
        <div class="conteiner">
          <div class="center second">
            <div
              class="profiletaggroup"
              v-for="(testitem, user) in users"
              :key="'ing' + user"
            >
              <div class="message">{{ testitem }}</div>
            </div>
          </div>
          <div class="image-group add-flex add-padding-right first">
            <img src="src/img/9.jpg" alt="" />
            <img src="src/img/10.jpg" alt="" />
            <img src="src/img/6.png" alt="" />
            <img src="src/img/12.jpg" alt="" />
          </div>
        </div>
      </section>
    </div>
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
      datauser: JSON.parse(localStorage.getItem("userData")),
      localuser: [
        {
          username: "",
          type: ""
        }
      ],
      // type: JSON.parse(localStorage.getItem("userData2")),
      // type: JSON.parse(localStorage.getItem("typeData"))
      socket: io("http://localhost:3000"),
      messages: [],
      users: [],
      subjectName: "",
      loopSubjectId: ""
      // testitem: [{ message: "Foo" }, { message: "Bar" }, { message: "Barxx" }]
    };
  },
  mounted: function() {
    //   // this.datauser = prompt("What is your datauser>>?", "Anonymous");
    //   // this.datauser = prompt("What is your datauser>>?", "Anonymous");

    //   if (!this.datauser) {
    //     this.datauser = "Anonymous";
    //   }

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

#appx {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding: 15px;
  box-sizing: border-box;
}

/*************** fn ************************************************************************/
.slider {
  width: 100%;
  height: 320px;
  background-color: cadetblue;
  margin: 0 auto;
  animation: slide 20s infinite;
}

/* Global style* */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 10px;
  font-family: "Roboto", sans-serif;
}

:root {
  --main-font-color: #f2b632;
  --main-white: rgb(255, 255, 255);
  --main-font-dark-gray: #4d4d4d;
  --main-font-bg-color: #141414;
  --main-font-family: "Cheddar Jack", cursive;
  --main-font-blue: rgb(0, 89, 255);
}

section {
  padding: 6rem 0;
}

p {
  line-height: 1.5;
  font-size: 1.8rem;
  font-weight: 300;
  color: var(--main-font-dark-gray);
}

a {
  text-decoration: none;
  color: var(--main-white);
}

/* Reusable classes */
.btn {
  display: inline-block;
  transition: all 650ms;
  border-radius: 3px;
  text-transform: uppercase;
}

.btn-info {
  font-size: 1.2rem;
  padding: 1rem;
  color: var(--main-font-blue);
  border-bottom: 2px solid var(--main-font-blue);
  margin: 2rem 0 4rem 0;
}

.btn-info2 {
  font-size: 3rem;
  padding: 1rem;
  color: var(--main-white);
  border-bottom: 2px solid var(--main-white);
  margin: 2rem 0 4rem 0;
}

.btn-info2:hover {
  background-color: var(--main-font-family);
  color: var(--main-white);
  font-size: 6.5rem;
  text-align: center;
  line-height: 1;
  font-weight: 100;
}

.custom-font {
  font-family: var(--main-font-family);
  color: var(--main-font-color);
  font-size: 6.5rem;

  line-height: 1;
  font-weight: 100;
}

.custom-font-secondary {
  text-transform: uppercase;
  letter-spacing: 5px;
  margin-right: -5px;
  font-size: 2.5rem;
  line-height: 0.2;
  color: var(--main-font-dark-gray);
  margin-bottom: 5rem;
  text-align: center;
}

.custom-font-center {
  text-transform: uppercase;
  letter-spacing: 5px;
  margin-right: -5px;
  font-size: 2.5rem;
  line-height: 0.2;
  color: rgb(255, 255, 255);
  margin-bottom: 5rem;
  text-align: center;
}

/* header */

header {
  width: 100%;
  height: 100vh;
  // background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent),
    // url("src/img/hero.jpeg") bottom no-repeat;
  // background-size: cover;
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
}

.header2 {
  width: 100%;
  height: 5vh;
  // background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent),
    // url("src/img/hero.jpeg") bottom no-repeat;
  // background-size: cover;
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
}

.conteiner {
  margin: 0 auto;
  width: 90%;
  text-align: center;
}

.between-sec {
  padding: 20rem 0;
  text-align: center;
}

.between-sec2 {
  padding: 1rem 0;
}

.between-sec-color {
  color: var(--main-white);
}

/* ็ Header - Nav Toggle */

.menu {
  padding: 6rem 6.5rem;
  position: fixed;
  top: 3rem;
  right: 3rem;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  border-radius: 7px;
  cursor: pointer;
  height: 4rem;
  width: 4rem;
}

/* menu */
.menu .bar,
.menu .bar::before,
.menu .bar::after {
  content: "";
  position: absolute;
  height: 5px;
  width: 6rem;
  background-color: var(--main-white);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  transform: 650ms;
}

.menu .bar:before {
  top: -2rem;
}
.menu .bar::after {
  top: 2rem;
}

.active .bar {
  background-color: transparent;
}

.active .bar::before {
  transform: rotate(45deg);
}

.active .bar::after {
  transform: rotate(-45deg);
}

.active .bar::before,
.active .bar::after {
  top: 0;
}

/* Header - Nav */

.nav {
  width: 100%;
  height: 6rem;
  line-height: 6rem;
  position: relative;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.95);
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  transition: opacity 650ms;
  transition: scale(0);
  opacity: 0;
}

.overlay.menu-open {
  transform: scale(1);
  opacity: 1;
}

.nav .overlay ul {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.nav .overlay ul li {
  text-transform: uppercase;
}

.nav .overlay ul li a {
  display: block;
  font-size: 2rem;
  transition: all 650ms;
}

.nav .overlay ul li a:hover,
.nav .overlay ul li a .active:hover {
  color: var(--main-font-color);
}

/* *Header - Main Text*/
.main-text {
  line-height: 0;
  margin: auto;
  color: var(--main-white);
  user-select: none;
}

.main-text h1 {
  font-family: var(--main-font-family);
  color: var(--main-font-color);
  font-size: 8rem;
  font-weight: 100;
  margin-bottom: 5rem;
}

.main-text h2::before,
.main-text h2::after {
  counter: "";
  width: 5rem;
  height: 3px;
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  background-color: var(--main-white);
  border-radius: 8px;
}

.main-text h2::before {
  left: -6rem;
}

.main-text h2::after {
  right: -6rem;
}

.main-textbar {
  line-height: 0;
  margin: auto;
  margin-top: 1rem;
  color: var(--main-white);
  user-select: none;
}

.main-btn {
  font-size: 1.5rem;
  border: 2px solid var(--main-font-color);
  padding: 2rem 2.5rem;
  letter-spacing: 3px;
  margin-right: -3px;
  position: relative;
  margin-top: 3rem;
}

.main-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
}

.main-btn:active {
  transform: translateY(0);
  box-shadow: none;
}

/* Section - Our Menu */

.image-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}

.image-group img {
  width: 100%;
  height: auto;
}

.image-group2 {
  display: grid;
  grid-template-columns: 1fr;
}

.image-group2 img {
  width: 100%;
  height: auto;
}

/* section */

.pfile {
  width: 100%;
  min-height: 40rem;
  // background: url("src/img/6.png") center no-repeat;
  // background-size: cover;
}

.pfiles {
  width: 100%;
  min-height: 30rem;
  // background: url("src/img/5.png") center no-repeat;
  // background-size: cover;
}

.VDO {
  width: 100%;
}

.t1 {
  width: 100%;
  // background: linear-gradient(
  //     to bottom,
  //     rgba(0, 0, 0, 0.5),
  //     rgba(102, 102, 102, 0.116)
  //   ),
    // url("src/img/bb.jpeg") center no-repeat;
  // background-size: cover;
}

.t2 {
  width: 100%;
  // background: linear-gradient(
  //     to bottom,
  //     rgba(0, 0, 0, 0.5),
  //     rgba(102, 102, 102, 0.116)
  //   ),
    // url("src/img/bb.jpeg") center no-repeat;
  // background-size: cover;
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
@media screen and (min-width: 1090px) {
  header,
  .between-sec {
    background-attachment: fixed;
  }

  .header2 {
    height: 10vh;
  }

  .menu {
    display: none;
  }

  .nav {
    display: flex;
    padding: 2rem 10rem 0;
    justify-content: space-between;
  }
  #logo {
    display: block;
  }

  .nav .overlay {
    position: initial;
    background: none;
    opacity: initial;
    transform: initial;
  }

  .nav .overlay ul {
    flex-direction: row;
    list-style: none;
    margin: 2px;
  }

  .nav .overlay ul li a {
    font-size: 1.5rem;
    letter-spacing: 1px;
    margin-right: -1px;
    padding: 0 2rem;
  }

  .conteiner {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .center {
    flex: 1;
  }

  .add-flex {
    flex: 1;
  }

  .add-flex2 {
    flex: 2;
  }

  .add-padding-right {
    padding-right: 3rem;
  }

  .add-padding-left {
    padding-left: 10rem;
  }

  .first {
    order: 1;
  }

  .second {
    order: 2;
  }

  .store {
    min-height: 40rem;
  }
  /* Reusable classes */
  .btn {
    display: inline-block;
    transition: all 650ms;
    border-radius: 3px;
    text-transform: uppercase;
  }

  .btn-info {
    font-size: 1.2rem;
    padding: 1rem;
    color: var(--main-font-color);
    border-bottom: 2px solid var(--main-font-color);
    margin: 2rem 0 4rem 0;
  }

  .btn-info:hover {
    background-color: var(--main-font-family);
    color: var(--main-font-color);
    font-size: 6.5rem;
    text-align: center;
    line-height: 1;
    font-weight: 100;
  }

  .btn-info2 {
    font-size: 3rem;
    padding: 1rem;
    color: var(--main-white);
    border-bottom: 2px solid var(--main-white);
    margin: 2rem 0 4rem 0;
  }

  .btn-info2:hover {
    background-color: var(--main-font-family);
    color: var(--main-white);
    font-size: 6.5rem;
    text-align: center;
    line-height: 1;
    font-weight: 100;
  }

  .main-text h1 {
    transform: translateY(4rem);
    opacity: 0;
    animation: 0.5s fadeup 0.5s forwards;
  }
  .main-text h2 {
    transform: scale(2);
    opacity: 0;
    animation: fadeIn 0.5s forwards;
  }
  .main-text .main-btn {
    opacity: 0;
    animation: 0.5s fade 1s forwards;
  }

  .main-textbar {
    line-height: 0;
    margin: auto;
    color: var(--main-white);
    user-select: none;
  }

  .image-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }

  .image-group img {
    width: 100%;
    height: 30rem;
  }

  .image-group2 {
    display: grid;
    grid-template-columns: 1fr;
  }

  .image-group2 img {
    width: 70%;
    height: auto;
  }

  @keyframes fadeIn {
    0% {
      transform: scale(2);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes fadeup {
    0% {
      transform: translateY(4rem);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .slider {
    width: 90%;
    height: 320px;
    background-color: cadetblue;
    margin: 0 auto;
    animation: slide 20s infinite;
  }
}

/* +++++++++++++21:9++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
@media screen and (min-width: 1921px) {
  header,
  .between-sec {
    background-attachment: fixed;
  }

  .header2 {
    height: 10vh;
  }

  .menu {
    display: none;
  }

  .nav {
    display: flex;
    padding: 2rem 10rem 0;
    justify-content: space-between;
  }
  #logo {
    display: block;
  }

  .nav .overlay {
    position: initial;
    background: none;
    opacity: initial;
    transform: initial;
  }

  .nav .overlay ul {
    flex-direction: row;
    list-style: none;
    margin: 2px;
  }

  .nav .overlay ul li a {
    font-size: 1.5rem;
    letter-spacing: 1px;
    margin-right: -1px;
    padding: 0 2rem;
  }

  .conteiner {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .center {
    flex: 1;
  }

  .add-flex {
    flex: 1;
  }

  .add-flex2 {
    flex: 2;
  }

  .add-padding-right {
    padding-right: 3rem;
  }

  .add-padding-left {
    padding-left: 10rem;
  }

  .first {
    order: 1;
  }

  .second {
    order: 2;
  }

  .store {
    min-height: 40rem;
  }
  .btn-info {
    font-size: 1.8rem;
  }
  .main-text h1 {
    transform: translateY(4rem);
    opacity: 0;
    animation: 0.5s fadeup 0.5s forwards;
  }
  .main-text h2 {
    transform: scale(2);
    opacity: 0;
    animation: fadeIn 0.5s forwards;
  }
  .main-text .main-btn {
    opacity: 0;
    animation: 0.5s fade 1s forwards;
  }

  .main-textbar {
    line-height: 0;
    margin: auto;
    color: var(--main-white);
    user-select: none;
  }

  .image-group {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .image-group img {
    width: 70%;
    height: auto;
  }

  .image-group2 {
    display: grid;
    grid-template-columns: 1fr;
  }

  .image-group2 img {
    width: 50%;
    height: auto;
  }

  @keyframes fadeIn {
    0% {
      transform: scale(2);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes fadeup {
    0% {
      transform: translateY(4rem);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>

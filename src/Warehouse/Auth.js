const state = {
  user: {},
  status: "",
  error: null
};

const getters = {
  isLoggedIn: state => !!state.token,
  authState: state => state.status,
  user: state => state.user,
  error: state => state.error
};

const mutations = {
  auth_request(state) {
    state.error = null;
    state.status = "loading";
  },
  auth_success(state, user) {
    state.user = user;
    state.status = "success";
    state.error = null;
  },
  auth_error(state, err) {
    state.error = err.response.data.msg;
  },
  register_request(state) {
    state.error = null;
    state.status = "loading";
  },
  register_success(state) {
    state.error = null;
    state.status = "success";
  },
  register_error(state, err) {
    state.error = err.response.data.msg;
  },
  logout(state) {
    state.error = null;
    state.status = "";
    state.token = "";
    state.user = "";
  },
  profile_request(state) {
    state.status = "loading";
  },
  user_profile(state, user) {
    state.user = user;
  }
};

export default {
  state,
  getters,
  mutations
};

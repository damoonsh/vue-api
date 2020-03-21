import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import _ from "lodash";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    songs: [],
    currentSong: null
  },
  mutations: {
    SET_SONGS(state, payload) {
      state.songs = payload;
    },
    CHANGE_CURRENT_SONG(state, payload) {
      state.currentSong = payload;
    }
  },
  actions: {
    fetchSongs({ commit }) {
      axios({
        method: "GET",
        url: "https://orangevalleycaa.org/api/music",
        params: {
          order: "name"
        }
      })
        .then(res => commit("SET_SONGS", res.data))
        .catch(err => console.log(err));
    },
    changeSong({ commit }, payload) {
      commit("CHANGE_CURRENT_SONG", payload);
    },
    deleteSong({ commit }, payload) {
      let songs = _.without(this.state.songs, payload);
      commit("SET_SONGS", songs);
    }
  }
});

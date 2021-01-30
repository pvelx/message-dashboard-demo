import Vue from "vue";
import {
  MessageService
} from "../service/api.service";
import {
  FETCH_MESSAGES,
  CANCEL_SENDING_MESSAGE,
  SCHEDULE_MESSAGE
} from "./actions.type";
import {
  RESET_STATE,
  ADD_MESSAGE,
  SET_MESSAGES,
  UPDATE_MESSAGE_IN_LIST
} from "./mutations.type";

const initialState = {
  messages: []
};

const state = {...initialState};

const getters = {
  messages(state) {
    return state.messages;
  }
};

const actions = {
  async [FETCH_MESSAGES](context, prevArticle) {
    if (prevArticle !== undefined) {
      return context.commit(SET_MESSAGES, prevArticle);
    }
    const {data} = await MessageService.get();
    context.commit(SET_MESSAGES, data);
    return data;
  },

  async [CANCEL_SENDING_MESSAGE](context, id) {
    const {data} = await MessageService.cancelSending(id);
    context.commit(UPDATE_MESSAGE_IN_LIST, data);
  },

  async [SCHEDULE_MESSAGE](context, payload) {
    const {data} = await MessageService.create(payload);
    context.commit(ADD_MESSAGE, data.comments);
    return data;
  },
};

const mutations = {
  [SET_MESSAGES](state, messages) {
    state.messages = messages;
  },
  [UPDATE_MESSAGE_IN_LIST](state, message) {
    state.messages = state.messages.map((currentValue) => {
      if (currentValue.id === message.id) {
        return message
      }
      return currentValue
    })
  },
  [ADD_MESSAGE](state, message) {
    state.messages = state.messages.concat([message]);
  },
  [RESET_STATE]() {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

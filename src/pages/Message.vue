<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Message dashboard</q-toolbar-title>
        <q-space/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="row q-pa-md q-py-md">
        <div class="col-7 q-pr-md">
          <q-card>
            <q-card-section>
              <div class="text-h6 text-grey-8">
                List
                <q-btn @click="reloadMessages" dense round class="float-right" icon="cached"/>
              </div>
            </q-card-section>
            <q-card-section class="q-pa-none">
              <q-table
                :data="messages"
                :columns="columns"
                row-key="name"
              >
                <template v-slot:body-cell-status="props">
                  <q-td key="status" :props="props">
                    <q-badge color="green">
                      {{ props.row.status }}
                    </q-badge>
                  </q-td>
                </template>
                <template v-slot:body-cell-Action="props">
                  <q-td
                    :disabled="isCanceled(props.row)"
                    :props="props"
                  >
                    <q-btn @click="()=>{cancelSending(props.row.id)}" icon="cancel" size="sm" class="q-ml-sm" flat
                           dense/>
                  </q-td>
                </template>
              </q-table>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-5 ">
          <q-card class="card">
            <q-card-section class="text-h6  text-grey-8">
              <div class="text-h6">New</div>
            </q-card-section>
            <q-card-section class="q-pa-sm row">
              <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <q-item-section>
                  Message body
                </q-item-section>
              </q-item>
              <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input :maxlength='255' type="textarea" dense outlined round v-model="newMessage.text"
                           label="Text"/>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <q-item-section>
                  Recipient
                </q-item-section>
              </q-item>
              <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input type="email" dense outlined round v-model="newMessage.email" label="Email"/>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <q-item-section>
                  Scheduled sending
                </q-item-section>
              </q-item>
              <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input dense outlined round v-model="newMessage.time">
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-date v-model="newMessage.time" mask="YYYY-MM-DD HH:mm">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat/>
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                          <q-time v-model="newMessage.time" mask="YYYY-MM-DD HH:mm:ss" format24h>
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat/>
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn @click="schedule" class="text-capitalize">Save</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
    import store from "../store";
    import {CANCEL_SENDING_MESSAGE, FETCH_MESSAGES, SCHEDULE_MESSAGE} from "../store/actions.type";
    import {mapGetters} from "vuex";

    export default {
        name: 'Message',
        data() {
            return {
                newMessage: {
                    text: '',
                    email: '',
                    time: '',
                },
                inProgress: false,
                errors: {},
                columns: [
                    {name: 'id', align: 'left', label: '#', field: 'id'},
                    {name: 'message', align: 'left', label: 'Message', field: 'text', headerStyle: 'width: 50%'},
                    {name: 'status', label: 'Status', field: 'status', align: 'left'},
                    {name: 'sendTime', label: 'Send time', field: 'exec_time', align: 'left'},
                    {name: 'Action', label: '', field: 'Action', headerStyle: 'width: 50px'}
                ],
            }
        },
        computed: {
            ...mapGetters(["messages"]),
        },
        beforeRouteEnter(to, from, next) {
            Promise.all([
                store.dispatch(FETCH_MESSAGES),
            ]).then(() => {
                next();
            });
        },
        methods: {
            isCanceled(message) {
                return message.status === 'canceled'
            },
            reloadMessages() {
                store.dispatch(FETCH_MESSAGES)
            },
            cancelSending(id) {
                store.dispatch(CANCEL_SENDING_MESSAGE, id)
            },
            schedule() {
                this.inProgress = true;
                this.$store
                    .dispatch(SCHEDULE_MESSAGE, {
                        exec_time: this.newMessage.time,
                        text: this.newMessage.text,
                        email: this.newMessage.email
                    })
                    .then(({data}) => {
                        this.inProgress = false;
                        this.newMessage = {exec_time: '', text: '', email: ''}
                        store.dispatch(FETCH_MESSAGES)
                    })
                    .catch(({response}) => {
                        this.inProgress = false;
                        this.errors = response.data.errors;
                    });
            },
        }
    }
</script>

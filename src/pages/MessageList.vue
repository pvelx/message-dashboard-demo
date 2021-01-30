<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-grey-8">
          Message list
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
              <q-btn @click="()=>{cancelSending(props.row.id)}" icon="cancel" size="sm" class="q-ml-sm" flat dense/>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
    import store from "../store";
    import {CANCEL_SENDING_MESSAGE, FETCH_MESSAGES} from "../store/actions.type";
    import {mapGetters} from "vuex";

    export default {
        name: 'MessageList',
        beforeRouteEnter(to, from, next) {
            Promise.all([
                store.dispatch(FETCH_MESSAGES),
            ]).then(() => {
                next();
            });
        },
        computed: {
            ...mapGetters(["messages"]),
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
            }
        },
        data() {
            return {
                columns: [
                    {name: 'id', align: 'left', label: '#', field: 'id'},
                    {name: 'message', align: 'left', label: 'Message', field: 'text', headerStyle: 'width: 50%'},
                    {name: 'status', label: 'Status', field: 'status', align: 'left'},
                    {name: 'sendTime', label: 'Send time', field: 'exec_time', align: 'left'},
                    {name: 'Action', label: '', field: 'Action', headerStyle: 'width: 50px'}
                ],
            }
        },
    }
</script>

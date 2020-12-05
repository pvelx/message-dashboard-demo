<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-grey-8">
          Message list
          <q-btn dense round class="float-right" icon="cached"/>
        </div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-table
          :data="data"
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
            <q-td :props="props">
              <q-btn icon="cancel" size="sm" class="q-ml-sm" flat dense/>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
    export default {
        name: 'MessageList',
        data() {
            return {
                columns: [
                    {name: 'id', align: 'left', label: '#', field: 'id'},
                    {name: 'message', align: 'left', label: 'Message', field: 'message', headerStyle: 'width: 50%'},
                    {name: 'status', label: 'Status', field: 'status', align: 'left'},
                    {name: 'sendTime', label: 'Send time', field: 'sendTime', align: 'left'},
                    {name: 'Action', label: '', field: 'Action', headerStyle: 'width: 50px'}
                ],
                data: [
                    {
                        id: 1,
                        message: 'Frozen Yogurt',
                        sendTime: '2020/05/01 12:30',
                        email: 'qwert@sdf.ru',
                        status: 'pending',
                    },
                    {
                        id: 1,
                        message: 'Frozen Yogurt',
                        sendTime: '2020/05/01 12:30',
                        email: 'qwert@sdf.ru',
                        status: 'pending',
                    },
                    {
                        id: 1,
                        message: 'Frozen Yogurt',
                        sendTime: '2020/05/01 12:30',
                        email: 'qwert@sdf.ru',
                        status: 'pending',
                    },
                    {
                        id: 1,
                        message: 'Frozen Yogurt',
                        sendTime: '2020/05/01 12:30',
                        email: 'qwert@sdf.ru',
                        status: 'pending',
                    },
                    {
                        id: 1,
                        message: 'Frozen Yogurt',
                        sendTime: '2020/05/01 12:30',
                        email: 'qwert@sdf.ru',
                        status: 'pending',
                    },
                    {
                        id: 1,
                        message: 'Frozen Yogurt',
                        sendTime: '2020/05/01 12:30',
                        email: 'qwert@sdf.ru',
                        status: 'pending',
                    },
                ],
            }
        },
    }
</script>

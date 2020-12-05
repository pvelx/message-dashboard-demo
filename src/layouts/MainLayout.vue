<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>Message Dashboard</q-toolbar-title>
        <q-space/>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary text-white"
    >
      <q-list>
        <q-item to="/" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="list"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Message list</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/ScheduleMessage" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="add_circle"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Schedule message</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
    export default {
        name: 'MainLayout',

        data() {
            return {
                leftDrawerOpen: false,
            }
        }
    }
</script>

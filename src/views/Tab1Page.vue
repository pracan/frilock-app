<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Control Panel</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="ion-text-center">
        <h2>LED Control</h2>
        <ion-button @click="toggleLed(true)">Turn On</ion-button>
        <ion-button @click="toggleLed(false)">Turn Off</ion-button>
      </div>
      <hr />
      <div class="ion-text-center">
        <h2>RFID Reader</h2>
        <ion-button @click="readRFID">Read RFID</ion-button>
        <p v-if="rfidResult">{{ rfidResult }}</p>
      </div>
      <ExploreContainer name="Tab 1 page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from '@/api/axiosInstance'; // Import the custom Axios instance

const rfidResult = ref<string | null>(null);

const toggleLed = async (on: boolean) => {
  try {
    await axios.get(`${on ? 'on' : 'off'}`);
  } catch (error) {
    console.error('Error toggling LED:', error);
  }
};

const readRFID = async () => {
  try {
    const response = await axios.get<string>('read');
    rfidResult.value = response.data;
  } catch (error) {
    console.error('Error reading RFID:', error);
    rfidResult.value = 'Error reading RFID';
  }
};
</script>

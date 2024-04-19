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
        <ion-button @click="readRFID" expand="block">Read RFID</ion-button>
        <p v-if="rfidResult">{{ rfidResult }}</p>
      </div>

      <div class="ion-text-center">
        <h2>Fetch Example Data</h2>
        <ion-button @click="fetchData" expand="block">Fetch Data</ion-button>
        <p v-if="fetchedData">{{ fetchedData }}</p>
      </div>

      <ExploreContainer name="Tab 1 page" />
    </ion-content>

    <!-- Modal for displaying error messages -->
    <ion-modal :is-open="error !== null">
      <ion-content class="ion-text-center">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Error</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-text v-if="error" class="error-text">{{ error }}</ion-text>
          </ion-card-content>
        </ion-card>
        <ion-button @click="dismissErrorModal">Close</ion-button>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from '@/api/axiosInstance';
import { IonButton, IonModal, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

export default defineComponent({
  components: {
    IonButton,
    IonModal,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  },
  setup() {
    const rfidResult = ref<string | null>(null);
    const error = ref<string | null>(null);
    const fetchedData = ref<string | null>(null);

    const toggleLed = async (on: boolean) => {
      try {
        await axios.get(`${on ? 'on' : 'off'}`);
      } catch (error) {
        console.error('Error toggling LED:', error);
        showErrorModal(`Error toggling LED ${error}`);
      }
    };

    const readRFID = async () => {
      try {
        const response = await axios.get<string>('/api/read');
        rfidResult.value = response.data;
      } catch (error) {
        console.error('Error reading RFID:', error);
        showErrorModal(`Error reading RFID  ${error}`);
      }
    };

    const showErrorModal = (errorMessage: string) => {
      error.value = errorMessage;
    };

    const dismissErrorModal = () => {
      error.value = null;
    };

    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        fetchedData.value = JSON.stringify(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        showErrorModal(`Error fetching data: ${error}`);
      }
    };

    return {
      rfidResult,
      error,
      toggleLed,
      readRFID,
      dismissErrorModal,
      fetchedData,
      fetchData,
    };
  },
});
</script>

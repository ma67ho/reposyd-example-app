<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="rps-card-caption">
        <div class="row fit justify-center">
          <q-icon name="bi-box-arrow-in-right" size="48px" />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-mb-sm text-center text-bold">
          {{ $t('common.logintoreposyd') }}
        </div>
        <q-input
          v-model="username"
          stack-label
          :placeholder="$t('placeholder.youruseraccount')"
          input-style="text-align: center;"
          dense
          outlined
          autofocus
          @keyup.enter="passwordFocus()"
        >
          <template v-slot:prepend>
            <q-icon name="bi-person" />
          </template>
          <template v-slot:append>
            <q-icon />
          </template>
        </q-input>
        <q-input
          v-model="password"
          class="q-mt-sm"
          dense
          :type="hidePassword ? 'password' : 'text'"
          :placeholder="$t('placeholder.yourpassword')"
          input-style="text-align: center;"
          outlined
          ref="inputPassword"
          stack-label
          @keyup.enter="signin()"
        >
          <template v-slot:prepend>
            <q-icon name="bi-key" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="hidePassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
              class="cursor-pointer"
              @click="hidePassword = !hidePassword"
            />
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onClickOK" />
        <q-btn color="primary" label="Cancel" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { QInput, useDialogPluginComponent } from 'quasar';
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import type { AxiosError } from 'axios';

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
]);
// Data structures
//
const hidePassword = ref(true);
const password = ref('');
const inputPassword = ref<QInput>();
const username = ref('');
// Methods
const passwordFocus = () => {
  inputPassword.value?.focus();
};
const signin = () => {
  api
    .post('/auth/login', {
      username: username.value,
      password: password.value,
    })
    .then((response) => {
      api.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
      api.defaults.headers.common['Content-Type'] = 'application/json';
      // session.profile = response.data.account;
      onDialogOK();
    })
    .catch((error: AxiosError) => {
      if (error.request.status === 401) {
        // loginError.value = true;
      } else {
        console.error(error);
      }
    });
};

function onClickOK() {
  onDialogOK();
}
</script>

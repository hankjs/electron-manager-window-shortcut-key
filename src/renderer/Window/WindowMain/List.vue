<script lang="ts" setup>
import { ref } from "vue";
const { electronAPI } = window;

const id = ref<number | null>(null);

async function onClick() {
  console.log("click");
  const id = await electronAPI.getCurrentProcessId();
  console.log(id);
}
</script>

<template>
  {{ id }}
  <ul>
    <li>chrome version: {{ electronAPI.chrome() }}</li>
    <li>node version: {{ electronAPI.node() }}</li>
    <li>electron version: {{ electronAPI.electron() }}</li>
  </ul>
  <button @click="onClick">getCurrentProcessId</button>
</template>

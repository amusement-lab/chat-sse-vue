<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <p>Person 1 Name</p>
  <p>Id : {{ route.params.id }}</p>
  <p>Message 1</p>
  <p>Message 2</p>
  <p>Message 3</p>
  <form>
    <input type="text" name="chat" placeholder="input chat message here" />
    <button>Send</button>
  </form>
</template>

<style></style>

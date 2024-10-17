<script setup lang="ts">
import { ref } from 'vue'

const serverStatus = ref('SSE server not connected')
const getServerStatus = async () => {
  const response = await fetch('http://localhost:3000')
  const payload = await response.json()
  serverStatus.value = payload.message
}
getServerStatus()

const datas = ref(['Message Test 1', 'Message Test 2'])
const getEvent = () => {
  const events = new EventSource('http://localhost:3000/events')
  events.onmessage = (event) => {
    const parsedData = JSON.parse(event.data)
    datas.value = parsedData
    console.log(parsedData)
    // setFacts((facts) => facts.concat(parsedData))
  }
}
getEvent()
</script>

<template>
  <main>
    <p>Home</p>
    <p>Person List</p>
    <p>Person 1</p>
    <p>Person 2</p>
    <p>Person 3</p>
    <p>Person 4</p>
  </main>
</template>

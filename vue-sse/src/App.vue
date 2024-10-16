<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

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
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>

      <div>
        <p>{{ serverStatus }}</p>
        <br />
        <span v-for="data in datas" :key="data">
          <p>{{ data }}</p>
        </span>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const fieldErrors = ref({})

async function submit() {
  loading.value = true
  errorMessage.value = ''
  fieldErrors.value = {}

  try {
    await auth.login(email.value, password.value)
    router.push({ name: 'dashboard' })
  } catch (error) {
    const status = error.response?.status

    if (status === 422) {
      fieldErrors.value = error.response.data.errors // { email: ["..."], password: ["..."] }
    } else if (status === 401) {
      errorMessage.value = error.response.data.message // "Invalid credentials"
    } else if (!error.response) {
      errorMessage.value = 'Cannot reach the server. Is the API running?'
    } else {
      errorMessage.value = 'Something went wrong. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="login-shell">
    <section class="login-story">
      <div class="brand-mark"><span>sf</span><i></i></div>
      <p class="eyebrow">The calm side of creative work</p>
      <h1>Make room<br /><em>for the good stuff.</em></h1>
      <p class="story-copy">StudioFlow keeps your projects, people, and momentum in one considered place.</p>
      <div class="story-stamp"><span>01</span><span>plan with purpose</span></div>
      <div class="sun-shape"></div>
      <div class="line-art line-art-one"></div>
      <div class="line-art line-art-two"></div>
    </section>

    <section class="login-panel">
      <form @submit.prevent="submit" class="login-form">
        <div class="form-heading">
          <p class="eyebrow">Welcome back</p>
          <h2>Good to see you.</h2>
          <p>Sign in to continue where you left off.</p>
        </div>

        <p v-if="errorMessage" class="form-alert">{{ errorMessage }}</p>

        <div class="field-group">
          <label for="email">Email address</label>
          <input id="email" v-model="email" type="email" autocomplete="email" placeholder="you@studio.com" />
          <p v-if="fieldErrors.email" class="field-error">{{ fieldErrors.email[0] }}</p>
        </div>

        <div class="field-group">
          <label for="password">Password</label>
          <input id="password" v-model="password" type="password" autocomplete="current-password" placeholder="Enter your password" />
          <p v-if="fieldErrors.password" class="field-error">{{ fieldErrors.password[0] }}</p>
        </div>

        <button type="submit" :disabled="loading" class="primary-button">
          {{ loading ? 'Signing in...' : 'Sign in' }} <span aria-hidden="true">&#8594;</span>
        </button>
        <p class="form-footnote">Your workspace is waiting for you.</p>
      </form>
    </section>
  </main>
</template>

<style scoped>
.login-shell { min-height: 100vh; display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(420px, .9fr); background: var(--surface); }
.login-story { position: relative; overflow: hidden; padding: clamp(2rem, 6vw, 6rem); background: var(--teal); color: #f5f7ee; isolation: isolate; }
.brand-mark { position: relative; z-index: 2; display: flex; align-items: center; gap: .65rem; font-size: 1.4rem; font-weight: 800; letter-spacing: -.08em; }
.brand-mark i { width: 9px; height: 9px; display: block; border-radius: 50%; background: var(--coral); }
.eyebrow { color: var(--coral); font-size: .72rem; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
.login-story .eyebrow { margin-top: clamp(6rem, 15vh, 11rem); }
.login-story h1 { position: relative; z-index: 2; max-width: 620px; margin-top: 1rem; font-family: Georgia, serif; font-size: clamp(3.5rem, 7vw, 7.2rem); font-weight: 400; line-height: .94; letter-spacing: -.07em; }
.login-story h1 em { color: var(--yellow); font-style: italic; }
.story-copy { position: relative; z-index: 2; max-width: 330px; margin-top: 2rem; color: #c4ddda; font-size: 1rem; }
.story-stamp { position: absolute; z-index: 2; right: 8%; bottom: 9%; display: flex; align-items: center; gap: .8rem; color: #c4ddda; font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; }
.story-stamp span:first-child { display: grid; width: 2.4rem; height: 2.4rem; place-items: center; border: 1px solid #8cb9b4; border-radius: 50%; color: var(--yellow); }
.sun-shape { position: absolute; z-index: -1; top: 45%; right: -10%; width: min(38vw, 540px); aspect-ratio: 1; border: 1px solid rgba(230, 242, 225, .2); border-radius: 50%; box-shadow: 0 0 0 34px rgba(230, 242, 225, .04), 0 0 0 68px rgba(230, 242, 225, .04); }
.line-art { position: absolute; z-index: 1; width: 150px; height: 150px; border: 1px solid rgba(244, 201, 93, .65); transform: rotate(35deg); }
.line-art-one { top: 11%; right: 13%; border-radius: 50% 50% 0 50%; }
.line-art-two { bottom: -55px; left: 10%; width: 190px; height: 190px; border-color: rgba(239, 114, 95, .7); border-radius: 50%; }
.login-panel { display: grid; align-items: center; padding: clamp(2rem, 8vw, 8rem); background: #fbfcf8; }
.login-form { width: 100%; max-width: 410px; margin: auto; }
.form-heading h2 { margin-top: .55rem; color: var(--ink); font-family: Georgia, serif; font-size: clamp(2.3rem, 4vw, 3.4rem); font-weight: 400; letter-spacing: -.055em; }
.form-heading > p:last-child { margin-top: .7rem; color: var(--muted); }
.field-group { margin-top: 2rem; }
.field-group label { display: block; margin-bottom: .55rem; color: var(--ink); font-size: .82rem; font-weight: 700; }
.field-group input { width: 100%; padding: .95rem 1rem; border: 1px solid var(--line); border-radius: 4px; outline: 0; background: var(--surface); color: var(--ink); transition: border-color .2s, box-shadow .2s; }
.field-group input::placeholder { color: #a5afb3; }
.field-group input:focus { border-color: var(--teal); box-shadow: 0 0 0 4px rgba(30, 119, 115, .12); }
.field-error, .form-alert { color: var(--coral-deep); font-size: .78rem; }
.form-alert { margin-top: 1.5rem; padding: .8rem 1rem; border-left: 3px solid var(--coral); background: #fff0ed; }
.primary-button { display: flex; align-items: center; justify-content: space-between; width: 100%; margin-top: 2.2rem; padding: 1rem 1.15rem; border: 0; border-radius: 4px; background: var(--coral); color: #fff; font-weight: 800; transition: background .2s, transform .2s; }
.primary-button:hover:not(:disabled) { background: var(--coral-deep); transform: translateY(-2px); }
.primary-button:disabled { cursor: wait; opacity: .6; }
.primary-button span { font-size: 1.3rem; }
.form-footnote { margin-top: 1.3rem; color: var(--muted); font-size: .75rem; text-align: center; }
@media (max-width: 800px) { .login-shell { display: block; } .login-story { min-height: 380px; padding: 2rem; } .login-story .eyebrow { margin-top: 4.5rem; } .login-story h1 { font-size: clamp(3rem, 13vw, 5rem); } .story-copy { margin-top: 1.2rem; } .sun-shape { top: 40%; right: -24%; width: 360px; } .login-panel { padding: 3.5rem 1.5rem; } }
</style>
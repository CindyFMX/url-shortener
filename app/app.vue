<script setup>
const longUrl = ref('')
const results = ref([])
const error = ref('')
const loading = ref(false)
const copiedUrl = ref('')

async function shorten() {
  error.value = ''

  // Quick check in the browser first
  if (!isValidUrl(longUrl.value)) {
    error.value = 'Please enter a valid URL, e.g. https://example.com/my-long-url'
    return
  }

  loading.value = true
  try {
    const link = await $fetch('/api/shorten-url', {
      method: 'POST',
      body: { url: longUrl.value },
    })
    results.value.unshift(link)
    longUrl.value = ''
  } catch (err) {
    error.value = err?.data?.message || 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}

async function copy(shortUrl) {
  await navigator.clipboard.writeText(shortUrl)
  copiedUrl.value = shortUrl
  setTimeout(() => (copiedUrl.value = ''), 1500)
}
</script>

<template>
  <main class="page">
    <h1>URL Shortener</h1>
    <p class="subtitle">Paste a long link and get a short one.</p>

    <form class="form" novalidate @submit.prevent="shorten">
      <label for="url" class="sr-only">Long URL</label>
      <input
        id="url"
        v-model="longUrl"
        type="url"
        placeholder="https://example.com/my-long-url"
        :class="{ invalid: error }"
        @input="error = ''"
      >
      <button type="submit" :disabled="loading">
        {{ loading ? 'Shortening…' : 'Shorten' }}
      </button>
    </form>

    <p v-if="error" class="error" role="alert">{{ error }}</p>

    <ul v-if="results.length" class="results">
        <li v-for="item in results" :key="item.shortUrl" class="result">
            <div class="row">
            <a :href="item.shortUrl" target="_blank">{{ item.shortUrl }}</a>
            <button type="button" class="copy" @click="copy(item.shortUrl)">
                {{ copiedUrl === item.shortUrl ? 'Copied!' : 'Copy' }}
            </button>
            </div>
            <p class="original">Original: {{ item.originalUrl }}</p>
        </li>
    </ul>
  </main>
</template>

<style>
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #f4f5fb;
  color: #1e1e2f;
}
.page { 
    max-width: 640px;
    margin: 0 auto;
    padding: 64px 16px;
}
h1 { 
    margin: 0;
    font-size: 2.25rem;
    text-align: center;
}
.subtitle { 
    text-align: center;
    color: #666;
    margin-bottom: 32px;
}
.form { 
    display: flex;
    gap: 8px;
}

input {
    flex: 1;
    padding: 14px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    min-width: 0;
}
input:focus { 
    outline: 2px solid #4f46e5;
    border-color: transparent;
}
input.invalid { 
    border-color: #e11d48;
}

button {
  padding: 14px 22px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: #4f46e5;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
button:hover { 
    background: #4338ca;
}
button:disabled {
    opacity: 0.6;
    cursor: wait;
}

.error { 
    color: #e11d48;
    margin-top: 8px;
}

.results {
    list-style: none;
    padding: 0;
    margin: 24px 0 0;
    display: flex;
    flex-direction: column;
    gap: 12px; 
}
.results .result { 
    margin-top: 0;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}
.label { 
    margin: 0 0 8px;
    font-size: 0.85rem;
    color: #666;
}
.row { 
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}
.row a {
    font-weight: 600;
    color: #4f46e5;
    word-break: break-all;
}
.copy {
    padding: 8px 14px;
    font-size: 0.9rem;
}
.original { 
    margin: 12px 0 0;
    font-size: 0.85rem;
    color: #888;
    word-break: break-all;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0); 
}

/* Mobile: stack the input and button */
@media (max-width: 520px) {
    .page {
        padding-top: 40px;
    }
    h1 {
        font-size: 1.75rem;
    }
    .form {
        flex-direction: column;
    }
    .row {
        flex-direction: column;
        align-items: stretch;
    }
}
</style>
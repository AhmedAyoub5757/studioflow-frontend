<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  tone: { type: String, default: 'default' },
})
</script>

<template>
  <article class="stat-card" :class="`stat-card--${tone}`">
    <div class="stat-card__top">
      <span class="stat-card__label">{{ label }}</span>
      <span class="stat-card__dot" aria-hidden="true"></span>
    </div>
    <strong class="stat-card__value">{{ value }}</strong>
  </article>
</template>

<style scoped>
.stat-card { min-height: 132px; padding: 1.25rem; border: 1px solid var(--line); border-radius: 2px; background: var(--surface); box-shadow: 0 8px 24px rgba(29, 45, 51, .04); transition: transform .2s ease, box-shadow .2s ease; }
.stat-card:hover { transform: translateY(-2px); box-shadow: var(--shadow); }
.stat-card__top { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.stat-card__label { color: var(--muted); font-size: .72rem; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; }
.stat-card__dot { width: .55rem; height: .55rem; border-radius: 50%; background: var(--teal); }
.stat-card__value { display: block; margin-top: 1rem; color: var(--ink); font-family: Georgia, serif; font-size: clamp(1.8rem, 4vw, 2.7rem); font-weight: 400; letter-spacing: -.06em; line-height: 1; }
.stat-card--success { border-top: 3px solid var(--teal); }.stat-card--success .stat-card__dot { background: var(--teal); }
.stat-card--warning { border-top: 3px solid var(--yellow); }.stat-card--warning .stat-card__dot { background: var(--yellow); }
.stat-card--danger { border-top: 3px solid var(--coral); }.stat-card--danger .stat-card__dot { background: var(--coral); }
</style>

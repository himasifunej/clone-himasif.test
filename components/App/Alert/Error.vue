<template>
  <div class="bg-[#1A1A1A] rounded-2xl text-white divide-y divide-secondary max-w-sm text-center">
    <div class="px-8 pb-4 pt-6">
      <h2 class="text-title-3">Permintaan gagal</h2>
      <p class="text-secondary mt-2">{{ text }}</p>
    </div>
    <button class="text-mediatek text-title-3 block w-full py-4" @click="alertStore.closeModal">OK</button>
  </div>
</template>

<script setup>
const alertStore = useAlertsStore()
const props = defineProps({
  text: String,
})
</script>

<style></style>


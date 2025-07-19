<template>
  <div class="p-4 border border-primary-800 bg-primary-900 space-y-2 rounded-2xl"
    :class="isOutOfStock ? 'cursor-not-allowed' : 'hover:bg-[#1F1F1F]'">
    <div class="relative">
      <div class="w-full h-full absolute top-0 left-0 bg-black bg-opacity-60 rounded-lg z-20" v-if="isOutOfStock"></div>
      <span class="absolute bottom-0 m-2 py-2 px-4 text-sm bg-[#202020B2] rounded-md z-20 capitalize"
        v-if="!isOutOfStock">{{
          item.status }}</span>
      <div :class="isOutOfStock ? 'grayscale' : ''">
        <NuxtImg :src="item.image[0].url" alt="" sizes="250" height="208" class="rounded-lg w-full h-52 object-cover">
        </NuxtImg>
      </div>
    </div>
    <div class="space-y-4">
      <p class="text-secondary uppercase tracking-[1.8px]">{{ category }}</p>
      <h4 class="text-title-4 line-clamp-2" :class="isOutOfStock ? 'text-secondary' : ''" v-html="item?.title"></h4>
      <h3 class="text-2xl font-bold" :class="isOutOfStock ? 'text-secondary' : ''">Rp{{ item?.price }}</h3>
      <div>
        <nuxt-link :to="item.link == '-' ? 'https://www.tokopedia.com/highst-official' : item.link" target="_blank">
          <button class="bg-[#00A707] w-full rounded-lg py-2 disabled:bg-[#333333]" :disabled="isOutOfStock"
            :class="isOutOfStock ? 'cursor-not-allowed' : ''">{{ isOutOfStock ? 'Stok Habis' : 'Beli Sekarang' }}</button>
        </nuxt-link>
      </div>
    </div>

  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
  category: String
})

const isOutOfStock = computed(() => {
  // return true
  return props.item.status.toLowerCase() == 'out of stock'
})
</script>

<style></style>


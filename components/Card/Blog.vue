<template>
    <div class="border rounded-2xl p-4 cursor-pointer bg-primary-900 border-primary-800 hover:bg-[#1F1F1F] space-y-2">
        <NuxtImg :src="data.image[0].url" alt="" sizes="250" class="rounded-lg w-full h-52 object-cover"> </NuxtImg>

        <div class="py-1 space-y-4">
            <p class="text-secondary text-sm leading-5 tracking-[1.4px]">{{ category }}</p>
            <div class="h-14 flex items-center">
                <h5 class="text-title-3 line-clamp-2">{{ data.title }}</h5>
            </div>
            <span v-html="data.content" class="text-secondary line-clamp-3"></span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object,
    category: String
})


</script>
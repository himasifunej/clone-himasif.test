<template>
  <div>
    <NuxtImg :src="`/img/banner/${props.backgroundImage}`" sizes="1000" class="object-cover h-screen w-full absolute top-0 left-0" alt="profile image" />

    <div class="h-3/4 w-full bg-gradient-to-t from-primary-950 to-transparent absolute bottom-0 left-0"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  backgroundImage: String,
})
</script>

<style>

</style>


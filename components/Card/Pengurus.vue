<template>
    <div class="relative rounded-lg h-[400px] flex justify-center items-end group/pengurus z-0" @mouseenter="playVideo"
        @mouseleave="stopVideo">
        <video playsinline muted loop poster="" class="object-cover absolute top-0 left-0 h-full w-full rounded-lg">
            <source :src="data.video[0]?.url" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        <NuxtImg :src="data.image[0]?.url" sizes="250"
            class="h-full w-full object-cover group-hover/pengurus:opacity-0 transition ease-in-out duration-500 z-10 rounded-lg absolute top-0 left-0"
            alt="" />
        <div class="absolute w-full h-3/4 bottom-0 left-0 bg-gradient-to-t from-[#0C0C0C] to-transparent rounded-lg z-10"></div>
        <div class="z-20 p-4 text-start space-y-2 w-full">
            <div class="flex items-center">
                <div class="rounded mr-2 w-[30px] h-[30px] flex items-center justify-center" :class="getBackgroundDivisionColor">
                    <NuxtImg :src="division.logo[0].url" width="22" class="w-[22px]" alt="" />
                </div>
                <p class="uppercase tracking-[1.8px]">— {{data.position}}</p>
            </div>
            <div class="flex items-center h-14">
                <p class="text-xl font-semibold line-clamp-2">{{data.name}}</p>
            </div>
            <p class="text-secondary">{{data.hometown}} · SI’{{data.year_of_study}} · HMSF’{{data.year_in_hima}}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: Object,
    division: Object
})

const getBackgroundDivisionColor = computed(() => ({
    "bg-psdm": props.division.id === 1,
    'bg-primary-900': props.division.id === 2,
    "bg-kaderisasi": props.division.id === 3,
    "bg-litbang": props.division.id === 4,
    "bg-mediatek": props.division.id === 6,
    "bg-humas": props.division.id === 5,
}));

const playVideo = function (e) {
    e.target.firstChild.load();
    e.target.firstChild.play();
};
const stopVideo = function (e) {
    e.target.firstChild.pause();
};
</script>

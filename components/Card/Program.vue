<template>
    <div class="bg-primary-900 hover:bg-[#1F1F1F] border border-primary-800 p-6 rounded-lg cursor-pointer">
        <div class="h-40 flex items-center justify-center mb-4" v-if="program.is_event === 1">
            <!-- {{ program.logo[0]?.url }} -->
            <NuxtImg :src="program.logo[0]?.url || 'https://placehold.co/600x400?text=Not+Found'"
                class="max-w-full max-h-full" sizes="250" alt="" />
        </div>

        <div class="text-start space-y-2">
            <div :class="program.is_event == 1 ? '' : 'h-24 flex items-center break-words hyphens-auto'" lang="de">
                <h5 class="text-white font-bold uppercase"
                    :class="program.is_event === 1 ? 'truncate text-3xl' : 'text-2xl line-clamp-3'">
                    {{ program.title }}
                </h5>
            </div>

            <p class="text-white uppercase text-sm leading-6 tracking-[1.6px]">
                oleh <span :class="getTextDivisionColor">{{ getDivisionName() }}</span>
            </p>
            <p class="text-secondary">
                {{ implementation }}
            </p>

            <div class="flex items-center justify-center gap-3">
                <div class="w-2 h-2 rounded-full shrink-0" :class="getStatusColor"></div>
                <p class="text-secondary capitalize w-full text-sm">
                    {{ getStatusTitle }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    program: Object,
    status: String,
    implementation: String
});

const getStatusColor = computed(() => ({
    "bg-[#00A707]": props.status === "ongoing",
    "bg-[#0093A7]": props.status === "done",
    "bg-[#DAB100]": props.status === "coming soon",
}));

const getStatusTitle = computed(() => {
    if (props.status === "ongoing") {
        return "Sedang Berjalan";
    } else if (props.status === "done") {
        return "Selesai";
    } else if (props.status === "coming soon") {
        return "Segera Datang";
    } else {
        return "Unknown";
    }
})

const getTextDivisionColor = computed(() => ({
    "text-psdm": props.program?.division_id === 1,
    "text-kaderisasi": props.program?.division_id === 3,
    "text-litbang": props.program?.division_id === 4,
    "text-mediatek": props.program?.division_id === 6,
    "text-humas": props.program?.division_id === 5,
}));

const getDivisionName = () => {
    if (props.program?.division_id === 1) {
        return "psdm";
    } else if (props.program?.division_id === 3) {
        return "kaderisasi";
    } else if (props.program?.division_id === 4) {
        return "litbang";
    } else if (props.program?.division_id === 6) {
        return "mediatek";
    } else if (props.program?.division_id === 5) {
        return "humas";
    } else {
        return "unknown"; // Return empty string for invalid division IDs
    }
}
</script>

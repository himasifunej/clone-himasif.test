<template>
    <!-- <input type="text" name="search" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"> -->
    <div class="relative">
        <input type="search" id="search" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" name="search"
            class="bg-primary-900 border border-primary-600 text-white placeholder-primary-600 rounded-lg focus:border-primary-600 focus:ring-0 block w-full px-5 py-3"
            :placeholder="placeholder">

        <button type="submit"
            class="absolute top-0 right-0 text-sm w-[50px] font-medium h-full text-white bg-primary-800 rounded-r-lg border border-primary-600 hover:bg-primary-700 focus:outline-none ">

            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="m-auto">
                <g id="Search">
                    <path id="Search_2" fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.5468 0.333344C5.35381 0.333344 0.333374 5.2429 0.333374 11.2991C0.333374 17.3554 5.35381 22.2649 11.5468 22.2649C14.1956 22.2649 16.6298 21.3669 18.5485 19.8651L22.1933 23.4201L22.2902 23.5017C22.6286 23.7466 23.1084 23.7188 23.4146 23.4185C23.7514 23.0883 23.7507 22.5536 23.413 22.2242L19.8111 18.711C21.6425 16.7593 22.7603 14.1569 22.7603 11.2991C22.7603 5.2429 17.7399 0.333344 11.5468 0.333344ZM11.5468 2.02237C16.786 2.02237 21.0331 6.17573 21.0331 11.2991C21.0331 16.4226 16.786 20.5759 11.5468 20.5759C6.30771 20.5759 2.06055 16.4226 2.06055 11.2991C2.06055 6.17573 6.30771 2.02237 11.5468 2.02237Z"
                        fill="white" />
                </g>
            </svg>

            <span class="sr-only">Search</span>
        </button>
    </div>
</template>

<script setup>
defineProps(['modelValue', 'placeholder'])
defineEmits(['update:modelValue'])
</script>
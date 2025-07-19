<template>
    <nav class="w-full z-20">
        <div class="pb-4 flex flex-wrap items-center justify-center border-b border-b-primary-600">
            <div class="items-center justify-between flex" id="navbar-sticky">
                <ul class="flex font-medium text-white space-x-8 items-center">
                    <li v-for="(navItem, index) in navbarItems">
                        <nuxt-link :to="navItem.link" class="font-bold text-lg leading-6"
                            :class="activeItem == index ? 'text-primary-100' : 'text-secondary'"
                            :aria-current="activeItem == index">{{ navItem.title }}
                        </nuxt-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
const {y} = useWindowScroll()
const navbarItems = ref([
    {
        title: "Visi & Misi",
        link: "#vismis"
    },
    {
        title: "Divisi",
        link: "#divisi"
    },
    {
        title: "Program yang Dijalankan",
        link: "#program"
    },
    {
        title: "Pengurus",
        link: "#pengurus"
    },
    {
        title: "Dokumen",
        link: "#dokumen"
    }
])

const activeItem = ref(0)

const props = defineProps({
    elpos: Array
})

watch(y, (newY, oldY) => {
    if(newY >= props.elpos[0] && newY <= props.elpos[1]-20) {
        activeItem.value = 0
    } else if(newY >= props.elpos[1]-20 && newY <= props.elpos[2]) {
        activeItem.value = 1
    } else if(newY >= props.elpos[2] && newY <= props.elpos[3]) {
        activeItem.value = 2
    } else if(newY >= props.elpos[3] && newY <= props.elpos[4]) {
        activeItem.value = 3
    } else if(newY >= props.elpos[4]) {
        activeItem.value = 4
    }
})

</script>
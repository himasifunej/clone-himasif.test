<template>
    <div class="bg-primary-950 text-white">
        <section id="banner">
            <div class="h-3/4 w-full bg-gradient-to-t from-primary-950 to-transparent bottom-0 absolute z-10"></div>
            <div class="relative h-screen overflow-hidden flex text-center items-end justify-center">
                <video playsinline autoplay loop poster="" :muted="!bannerSound"
                    class="object-cover absolute top-0 left-0 h-screen w-screen" ref="bannerVideo">
                    <source :src="banner.data[0].video[0].url" type="video/mp4">
                    Your browser does not support the video tag.
                </video>

                <NuxtImg :src="banner.data[0].image_behind[0].url" sizes="1000"
                    class="absolute top-0 left-0 transition ease-in duration-300 w-full object-cover h-full"
                    :class="isPlayVideo ? 'opacity-0' : 'opacity-100'" alt="" />

                <AppContainer class="relative z-10 pb-5 space-y-8 text-white">
                    <NuxtImg :src="banner.data[0].image_front[0].url" width="700" class="mx-auto" alt="" />

                    <div class="flex justify-center gap-4 relative">
                        <template v-for="ctas in banner.data[0].ctas">
                            <nuxt-link :to="ctas.url">

                                <AppButton
                                    class="bg-white bg-opacity-[15%] hover:bg-white hover:bg-opacity-20 focus:bg-white focus:bg-opacity-30 font-semibold text-lg flex items-center">
                                    <img src="/icon/play-button.svg" v-if="ctas.type == 'video'" class="w-4 mr-3" alt="">
                                    {{ ctas.title }}
                                </AppButton>
                            </nuxt-link>
                        </template>
                        <div class="absolute right-0 cursor-pointer" @click="toggleSound">
                            <NuxtImg src="/icon/Iconly/Light/volume-up.svg" width="24" height="24" class="w-6 h-6" alt=""
                                v-show="bannerSound" />
                            <NuxtImg src="/icon/Iconly/Light/volume-off.svg" width="24" height="24" class="w-6 h-6" alt=""
                                v-show="!bannerSound" />
                        </div>
                    </div>

                    <p class="text-secondary">{{ banner.data[0].description }}</p>
                </AppContainer>

            </div>
        </section>

        <section id="program">
            <ProgramWindow />

            <AppContainer class="py-12 space-y-8">

                <h3 class="text-title-2 text-center">Program Kerja</h3>

                <div class="grid grid-cols-6 gap-4.5">
                    <div v-for="program in eventPrograms.data.slice(0, 6)" @mouseenter="playVideo" @mouseleave="stopVideo"
                        @click="selectProgram(program.id)"
                        class="bg-primary-900 relative rounded-lg p-4 w-full h-32 flex items-center justify-center group/program cursor-pointer">
                        <video playsinline muted loop class="object-cover absolute top-0 left-0 h-full w-full rounded-lg">
                            <source :src="program.video[0]?.url || 'https://www.w3schools.com/html/mov_bbb.mp4'"
                                type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <div
                            class="absolute w-full h-full top-0 left-0 bg-primary-900 group-hover/program:bg-black group-hover/program:bg-opacity-0 transition ease-in-out duration-500 rounded-lg">
                        </div>
                        <NuxtImg :src="program.logo[0].url" sizes="100"
                            class="w-full max-w-[140px] max-h-20 object-contain z-10" />
                    </div>
                </div>

                <div class="flex justify-center">
                    <AppButton @click="$router.push({path: '/app/program}'}), useNavbarStore().setActiveNav('/program')">Program
                        Kerja
                        Lainnya</AppButton>
                </div>
            </AppContainer>
        </section>

        <section id="highst">
            <AppContainer>
                <div class="relative rounded-[32px] bg-[#101010] flex justify-between">
                    <NuxtImg src="/img/highst/left.png" width="400" class="w-[400px]">
                    </NuxtImg>

                    <NuxtImg src="/img/highst/right.png" width="400" class="w-[400px]">
                    </NuxtImg>

                    <div class="text-center py-12 space-y-8 absolute top-0 left-0 m-auto items-center w-full">
                        <NuxtImg src="/img/logo-store.png" class="m-auto w-[400px]" width="400" alt=""></NuxtImg>

                        <p class="w-1/2 m-auto">Temukan produk terbaik di HighSt. dengan harga yang terjangkau oleh
                            Mahasiswa dengan tetap mengutamakan kualitas</p>

                        <AppButton variant="secondary"
                            @click="$router.push({ path: '/app/store' }), useNavbarStore().setActiveNav('/store')">Belanja
                            Sekarang
                        </AppButton>
                    </div>
                </div>
            </AppContainer>
        </section>

        <section id="blog">
            <AppContainer class="py-12 space-y-8">

                <h3 class="text-title-2 text-center">Blog</h3>

                <div class="grid grid-cols-4 gap-5">
                    <CardBlog v-for="blog in blogs.data.slice(0, 4)" :data="blog"
                        :category="getBlogCategory(blog.blog_category_id)"
                        @click="$router.push({ path: `/app/blog/${blog.id}` })" />
                </div>

                <div class="flex justify-center">
                    <AppButton @click="$router.push({ path: '/app/blog' }), useNavbarStore().setActiveNav('/app/blog')">Blog
                        Lainnya
                    </AppButton>
                </div>

            </AppContainer>
        </section>

        <section>
            <AppContainer>
                <h3 class="text-3xl font-bold text-center">Fitur Utama</h3>
                <div class="rounded-lg grid my-10 h-[500px]" :class="authenticated ? 'grid-cols-4' : 'grid-cols-3'">
                    <template v-for="(feature, index) in features.slice(0, -1)">
                        <div class="group cursor-pointer relative px-3 flex justify-center items-end"
                            :class="[index == 0 ? 'rounded-l-[32px]' : '', index == features.length - 2 && !authenticated ? 'rounded-r-[32px]' : '']"
                            @click="$router.push(feature.link), useNavbarStore().setActiveNav(feature.link)">

                            <NuxtImg :src="`/img/banner/feature/${feature.image}`"
                                class="object-cover h-[500px] w-full absolute top-0 left-0" height="500"
                                :class="[index == 0 ? 'rounded-l-[32px]' : '', index == features.length - 2 && !authenticated ? 'rounded-r-[32px]' : '']"
                                alt="">
                            </NuxtImg>

                            <div class="absolute top-0 left-0 h-full w-full bg-black bg-opacity-75 transition ease-in duration-150 group-hover:bg-opacity-60"
                                :class="[index == 0 ? 'rounded-l-[32px]' : '', index == features.length - 2 && !authenticated ? 'rounded-r-[32px]' : '']">
                            </div>
                            <div class="relative text-center pb-10">
                                <h3
                                    class="text-2xl lg:text-3xl xl:text-4xl font-bold uppercase transition ease-in translate-y-full group-hover:translate-y-0">
                                    {{ feature.title }}</h3>
                                <div class="h-15">
                                    <p class="opacity-0 transition ease-in group-hover:opacity-100 line-clamp-2">{{
                                        feature.description }}</p>
                                </div>
                            </div>
                        </div>
                    </template>

                    <div class="group cursor-pointer relative px-3 flex justify-center items-end"
                        @click="$router.push(features[features.length - 1].link), useNavbarStore().setActiveNav(features[features.length - 1].link)"
                        v-show="authenticated">
                        <NuxtImg :src="`/img/banner/feature/${features[features.length - 1].image}`"
                            class="object-cover h-[500px] w-full absolute top-0 left-0 rounded-r-[32px]" height="500"
                            alt="">
                        </NuxtImg>

                        <div
                            class="absolute top-0 left-0 h-full w-full bg-black bg-opacity-75 transition ease-in duration-150 group-hover:bg-opacity-60 rounded-r-[32px]">
                        </div>
                        <div class="relative text-center pb-10">
                            <h3
                                class="text-2xl lg:text-3xl xl:text-4xl font-bold uppercase transition ease-in translate-y-full group-hover:translate-y-0">
                                {{ features[features.length - 1].title }}</h3>
                            <div class="h-15">
                                <p class="opacity-0 transition ease-in group-hover:opacity-100 line-clamp-2">{{
                                    features[features.length - 1].description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AppContainer>
        </section>

        <section>
            <AppContainer class="pt-10 flex justify-between items-center relative w-full">
                <NuxtImg src="/img/mobile/left.png" width="350" class="max-h-[500px] object-cover object-top">
                </NuxtImg>

                <NuxtImg src="/img/mobile/right.png" width="350" class="max-h-[500px] object-cover object-top">
                </NuxtImg>

                <div class="text-center absolute z-10 h-full top-0 left-0 container flex items-center justify-center">
                    <div>
                        <p class="uppercase text-2xl leading-normal tracking-[2.4px]">mudah dalam genggaman</p>

                        <h3 class="uppercase text-[80px] leading-normal font-bold">himasif mobile</h3>
                        <p class="text-secondary w-1/3 m-auto">HIMASIF Mobile untuk mempermudah kamu melakukan kegiatan
                            operasional mahasiswa, terutama mahasiswa Sistem Informasi Fakultas Ilmu Komputer Universitas
                            Jember
                        </p>
                        <a href="">
                            <nuxt-link :to="settings['himasifmobile']" target="_blank">
                                <NuxtImg src="/icon/gplay.png" sizes="200" class="m-auto mt-7 w-56" alt="" />
                            </nuxt-link>
                        </a>
                    </div>
                </div>

            </AppContainer>
        </section>
    </div>
</template>

<script setup>
const { authenticated } = storeToRefs(useAuthStore())
const { settings } = useMySettingsStore()
const programStore = useProgramsStore()
const features = [
    {
        title: "shorten.link",
        link: "/app/shorten",
        image: "shorten.webp",
        description: "SHORTEN.LINK Kamu bisa custom shorten link sesuai keinginanmu"
    },
    {
        title: "nim.checker",
        link: "/app/nimchecker",
        image: "nim.webp",
        description: "Kamu bisa cari NIM/nama teman yang ingin kamu tahu"
    },
    {
        title: "himasif.paste",
        link: "/app/himasifpaste",
        image: "sif-paste.webp",
        description: "Kamu bisa mengirimkan pesan rahasia ke temenmu dengan HIMASIF Paste"
    },
    {
        title: "himasif.doc",
        link: "/app/himasifdoc",
        image: "sif-doc.webp",
        description: "Kamu bisa cari dokumen HIMASIF yang perlu kamu tau"
    },

]
const isPlayVideo = ref(false)
const bannerVideo = ref()
const bannerSound = ref(false)
const selectedYear = ref(settings['current-year'])

const { data: banner, error } = await useAPI('/banner', {
    query: {
        "filter[slug]": "banner-home",
        "include": "ctas"
    },
    pick: ['data']
})

if (error.value) {
    console.log(error.value)
}

const { data: eventPrograms } = await useAPI('/work_program', {
    query: {
        "filter[is_highlight]": "1",
        "filter[is_event]": "1"
    },
    pick: ['data']
})

const { data: blogs } = await useAPI('/blog', {
    query: {
        'filter[is_published]': 1
    },
    pick: ['data']
})

const { data: blogCategory } = await useAPI('/blog_category', {
    pick: ['result']
})


const getBlogCategory = (blogId) => {
    return blogCategory.value.result.find((el) => el.id === blogId).title
}


const selectProgram = async function (id) {
    await useRouter().push({
        query: {
            'modal': 'open',
            'selectedProgram': id,
            'year': selectedYear.value
        }
    })

    programStore.openModal(program)
}

const playVideo = (e) => {
    setTimeout(() => {
        e.target.firstChild.play()
    }, 200)
}
const stopVideo = (e) => {
    setTimeout(() => {
        e.target.firstChild.load()
    }, 200)
}

const toggleSound = () => {
    bannerSound.value = !bannerSound.value
}

onMounted(() => {
    setTimeout(() => {
        isPlayVideo.value = true
        bannerVideo.value.load();
    }, 3000)
})

</script>

<style scoped></style>
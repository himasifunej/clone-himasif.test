<template>
    <div class="bg-primary-950 text-white">
        <section id="banner" class="">
            <div class="w-full h-screen relative overflow-hidden flex text-center justify-center">
                <div class="h-3/4 w-full bg-gradient-to-t from-primary-950 to-transparent bottom-0 absolute z-10"></div>
                <NuxtImg :src="pageData.result.banners[0].image_behind[0].url" sizes="1000"
                    class="object-cover absolute top-0 left-0 h-full w-full" alt="profile image" />

                <AppContainer class="relative z-10 pb-5 text-white h-full flex flex-col justify-end">

                    <div class="flex-grow pt-32">
                        <NuxtImg :src="pageData.result.banners[0].image_front[0].url" width="1300"
                            class="mx-auto w-[1300px]" alt="">
                        </NuxtImg>
                        <AppButton ref="yearDropdownTrigger"
                            class="mt-5 inline-flex items-center text-center bg-primary-900 bg-opacity-70 focus:bg-primary-900 focus:bg-opacity-70 hover:bg-primary-900 hover:bg-opacity-70"
                            data-dropdown-toggle="year-dropdown">
                            {{ getYearsName }}
                            <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                :class="isYearDropdownShow ? 'rotate-180' : ''" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="m1 1 4 4 4-4" />
                            </svg>
                        </AppButton>

                        <div id="year-dropdown" ref="yearDropdownContent" class="z-10 hidden bg-primary-900 rounded-lg">
                            <ul class="px-6 py-3 divide-y" aria-labelledby="dropdownDefaultButton">
                                <li v-for="year in years.data" class="cursor-pointer" @click="selectedYear = year.id">
                                    <span class="block py-3">{{ year.years_of_management }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="flex justify-center my-4 gap-4 relative">
                        <nuxt-link :to="ctas.url" v-for="ctas in pageData.result.banners[0].ctas">
                            <AppButton
                                class="bg-white bg-opacity-[15%] hover:bg-white hover:bg-opacity-20 focus:bg-white focus:bg-opacity-30 font-semibold text-xl flex items-center">
                                <img src="/icon/play-button.svg" v-if="ctas.type == 'video'" class="w-4 mr-3" alt="">
                                {{ ctas.title }}
                            </AppButton>
                        </nuxt-link>

                    </div>
                    <p class="text-secondary">{{ pageData.result.banners[0].description }}</p>
                </AppContainer>
            </div>
        </section>

        <section class="sticky top-0 left-0 pt-20 bg-primary-950 z-10">
            <AppContainer>
                <!-- elpos = element position, sending browser each element of profil content (visimisi, program, etc.) top offset position to navbar profil -->
                <AppProfilNavbar :elpos="navElPos" />
            </AppContainer>
        </section>

        <section id="vismis" class="scroll-mt-[122.5px] nav-el">
            <AppContainer class="text-center">
                <div class="border-b border-b-primary-600 py-12">
                    <h3 class="text-3xl font-bold mb-4">Visi</h3>
                    <div v-html="pageData.result.visi" class="text-secondary">

                    </div>

                    <h3 class="text-3xl font-bold mb-4 mt-8">Misi</h3>
                    <div v-html="pageData.result.misi" class="text-secondary">

                    </div>
                </div>

            </AppContainer>
        </section>

        <section id="divisi" class="scroll-mt-[122.5px] nav-el">
            <AppContainer class="text-center">
                <div class="py-12 border-b border-b-primary-600">
                    <h3 class="text-3xl font-bold mb-8">Divisi</h3>

                    <div class="grid grid-cols-5 gap-4.5">
                        <template v-for="division in divisions.data">
                            <div class="rounded-lg shadow bg-primary-900 border border-primary-800"
                                v-if="division.isHighlight === 1">
                                <div class="border-b border-b-primary-800 rounded-t-lg relative z-0">
                                    <div class="bg-black/80 absolute w-full h-full z-10"></div>
                                    <NuxtImg class="absolute object-cover w-full h-full" sizes="250"
                                        :src="division.image[0].url" alt="" />
                                    <div class="px-7 py-6 relative z-10">
                                        <NuxtImg class="w-full" sizes="250" :src="division.logo[0].url" alt="" />
                                    </div>
                                </div>

                                <div class="py-6 px-6">
                                    <a href="#">
                                        <h5 class="mb-2 text-3xl font-bold" :class="getTextDivisionColor(division.id)">{{
                                            division.title }}</h5>
                                    </a>
                                    <p class="text-secondary">{{ division.description }}</p>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>

            </AppContainer>
        </section>

        <section id="program" class="scroll-mt-[122.5px] nav-el">
            <ProgramWindow />

            <AppContainer class="text-center">
                <div class="py-12 border-b border-b-primary-600">
                    <h3 class="text-3xl font-bold">Program Kerja yang Dijalankan</h3>

                    <div class="my-8">
                        <h3 class="text-3xl font-bold mb-[5px]">Event</h3>
                        <p class="text-secondary">Program Event ini merupakan program yang dapat diikuti oleh seluruh
                            anggota
                            HIMASIF. Anggota HIMASIF dapat mengikuti program ini sebagai panitia, peserta, atau lain
                            sebagainya.
                        </p>

                        <div class="grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4.5 mt-8">
                            <template v-for="program in pageData.result.year_has_work_programs">
                                <CardProgram :program="program.work_programs" :status="program.status"
                                    :implementation="program.implementation"
                                    @click="selectProgram(program.work_programs.id)"
                                    v-if="program.work_programs.is_event == 1"></CardProgram>
                            </template>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-3xl font-bold mb-[5px]">Non-Event</h3>
                        <p class="text-secondary">Program Non-event ini merupakan program yang diselenggarakan oleh tiap
                            divisi untuk mengembangkan HIMASIF dalam bentuk program kerja internal HIMASIF.
                        </p>

                        <div class="grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4.5 mt-8">
                            <template v-for="program in pageData.result.year_has_work_programs">
                                <CardProgram :program="program.work_programs" :status="program.status"
                                    :implementation="program.implementation"
                                    @click="selectProgram(program.work_programs.id)"
                                    v-if="program.work_programs.is_event == 0"></CardProgram>
                            </template>
                        </div>
                    </div>

                </div>
            </AppContainer>
        </section>

        <section id="pengurus" class="scroll-mt-[122.5px] nav-el">
            <AppContainer class="text-center z-0">
                <div class="space-y-8 py-12 border-b border-b-primary-600">
                    <h3 class="text-3xl font-bold">Pengurus</h3>

                    <div class="flex justify-center">
                        <InputCategory :options="divisions.data" v-model="selectedDivisiPengurus">
                            <div class="flex-shrink-0">
                                <input type="radio" name="category" value="all" id="all" class="hidden" :checked="true"
                                    v-model="selectedDivisiPengurus" required />
                                <label for="all" class="py-2 px-4 rounded-lg cursor-pointer"
                                    :class="selectedDivisiPengurus == 'all' ? 'bg-primary-100 text-[#1A1A1A] hover:bg-white' : 'hover:bg-[#292929] text-white bg-primary-900'">
                                    SEMUA
                                </label>
                            </div>
                        </InputCategory>
                    </div>

                    <div class="grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-[18px]">
                        <CardPengurus v-for="itemPengurus in pengurus.data" :data="itemPengurus"
                            :division="divisions.data.find((el) => el.id === itemPengurus.division_id)">

                        </CardPengurus>
                    </div>

                    <AppButton @click="getMorePengurus()" v-if="pengurus.total > pengurus.data.length">Lebih Banyak
                    </AppButton>
                </div>
            </AppContainer>
        </section>

        <section id="dokumen" class="scroll-mt-[122.5px] nav-el">
            <AppContainer>
                <div class="pt-12 pb-20 space-y-8">
                    <h3 class="text-3xl font-bold text-center">Dokumen</h3>

                    <div class="grid grid-cols-4 gap-[10px] mx-auto" v-if="pageData.result.dokumen.length > 0">
                        <CardDokumen v-for="document in pageData.result.dokumen" :data-tooltip-target="document.id"
                            @click="navigateTo(document.url, { open: { target: '_blank' } })">
                            {{ document.title }}

                            <template #tooltip>
                                <div :id="document.id" role="tooltip"
                                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg shadow-sm opacity-0 tooltip ">
                                    {{ document.title }}
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </template>
                        </CardDokumen>

                    </div>
                </div>
            </AppContainer>
        </section>
    </div>
</template>

<script setup>
import { initDropdowns, initTooltips, Dropdown } from 'flowbite';
//head HTML settings
useHead({
    title: 'Profil'
})

//state zone
const programStore = useProgramsStore()
const { settings } = useMySettingsStore()
const selectedDivisiPengurus = ref("all")
const selectedYear = ref(settings['current-year'])
const navElPos = []
const isYearDropdownShow = ref(false)
const yearDropdown = ref()
const yearDropdownContent = ref()
const yearDropdownTrigger = ref()

//Fetching zone

const { data: years } = await useAPI('years_of_management', {
    query: {
        'sort': 'order'
    },
    pick: ['data']
})

const { data: pageData } = await useAPI(`/years_of_management/${selectedYear.value}`, {
    pick: ['result']
})


const { data: divisions } = await useAPI('/division', {
    query: {
        sort: "order"
    },
    pick: ['data']
})

const { data: pengurus } = await useAPI('/pengurus', {
    query: {
        "filter[year_of_management]": years.value.data.find((el) => el.id == selectedYear.value).years_of_management,
        'filter[is_active]': 1,
        " page[size]": 10
    },
    pick: ['data', 'total']
})

const toggleYearDropdown = () => {
    yearDropdown.value.toggle()
}

const getYearsName = computed(() => {
    return years.value.data.find((el) => el.id == selectedYear.value).years_of_management
})

const getTextDivisionColor = (id) => {
    if (id === 1) {
        return "text-psdm"
    } else if (id === 3) {
        return "text-kaderisasi"
    } else if (id === 4) {
        return "text-litbang"
    } else if (id === 6) {
        return "text-mediatek"
    } else if (id === 5) {
        return "text-humas"
    } else {
        return "text-white"
    }
};

const getMorePengurus = async function () {
    const { data: newPengurus } = await useAPI('/pengurus', {
        query: {
            "filter[year_of_management]": getYearsName,
            'filter[is_active]': 1,
            "page[size]": pengurus.value.data.length + 10
        },
        pick: ['data', 'total']

    })

    pengurus.value = newPengurus.value
}

const selectProgram = async function (id) {
    await useRouter().push({
        query: {
            'modal': 'open',
            'selectedProgram': id,
            'year': selectedYear.value
        }
    })

    programStore.openModal()
}

watch(selectedYear, async (newVal, oldVal) => {
    const { data: newPageData } = await useAPI(`/years_of_management/${newVal}`, {
        pick: ['result']
    })

    pageData.value = newPageData.value

    const { data: newPengurus } = await useAPI('/pengurus', {
        query: {
            "filter[year_of_management]": getYearsName.value,
            'filter[is_active]': 1,
            " page[size]": 10
        },
        pick: ['data', 'total']
    })

    pengurus.value = newPengurus.value
})

//watcher
watch(selectedDivisiPengurus, async (newDiv, oldDiv) => {
    if (newDiv === 'all') {
        const { data: filteredPengurus } = await useAPI('/pengurus', {
            query: {
                "filter[year_of_management]": getYearsName.value,
                'filter[is_active]': 1
            },
            pick: ['data', 'total']
        })

        pengurus.value = filteredPengurus.value
    } else {
        const { data: filteredPengurus } = await useAPI('/pengurus', {
            query: {
                'filter[is_active]': 1,
                "filter[year_of_management]": getYearsName.value,
                'filter[division_id]': selectedDivisiPengurus.value
            },
            pick: ['data', 'total']
        })

        pengurus.value = filteredPengurus.value
    }
})

// mounted
onMounted(() => {
    initDropdowns()
    initTooltips()
    const navEl = document.querySelectorAll('.nav-el')

    navEl.forEach((el) => {
        navElPos.push(el.offsetTop - 122.5)
    })

    yearDropdown.value = new Dropdown(yearDropdownTrigger.value, yearDropdownContent.value, {
        onToggle() {
            isYearDropdownShow.value = !isYearDropdownShow.value
        }
    })

})
</script>
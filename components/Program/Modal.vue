<template>
    <div class="w-[900px] 2xl:w-[1200px] mx-auto space-y-6 text-white translate-y-0">
        <div class="absolute bg-primary-950 rounded-full w-12 h-12 top-0 right-0 flex items-center justify-center cursor-pointer"
            @click="programStore.closeModal()">
            <svg width="30px" height="30px" fill="#fff" viewBox="-3.5 0 19 19" xmlns="http://www.w3.org/2000/svg"
                class="cf-icon-svg">
                <path
                    d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z" />
            </svg>
        </div>

        <div class="flex items-center justify-center space-x-14">
            <NuxtImg :src="program.result.logo[0]?.url || 'https://placehold.co/600x400?text=Not+Found'" width="160"
                class="w-40 max-h-32 object-contain" alt="" v-if="program.result.is_event === 1" />
            <div class="max-w-sm" :class="program.result.is_event === 1 ? '' : 'text-center'">
                <h3 class="uppercase text-4xl font-bold">{{ program.result.title }}</h3>
                <p class="uppercase leading-6 tracking-[1.6px] mb-1">Oleh <span :class="getTextDivisionColor">{{
                    getDivisionName() }}</span></p>
                <p class="capitalize">
                    {{ programInformation.data[0].implementation }} · {{
                        getStatusTitle
                    }}
                </p>

            </div>
        </div>

        <div class="h-[70vh] overflow-auto no-scrollbar bg-primary-950 text-white rounded-t-2xl" ref="content">
            <section class="fixed bg-primary-950 px-10 w-full z-0 rounded-t-2xl">
                <nav class="w-full">
                    <div data-tabs-toggle="#default-tab-content" role="tablist"
                        class="flex flex-wrap items-center justify-center py-4 w-full border-b border-b-secondary space-x-[45px]">
                        <h3 class="font-semibold text-lg"
                            :class="option == 'detail' ? 'text-primary-100' : 'text-[#494949]'" @click="option = 'detail'">
                            Detail Program</h3>
                        <!-- <h3 class="font-semibold text-lg cursor-pointer" v-if="program.result.is_event === 1"
                            :class="option == 'daftar' ? 'text-primary-100' : 'text-[#494949]'" @click="option = 'daftar'">
                            Pendaftaran</h3> -->
                    </div>
                </nav>
            </section>

            <div class="px-10 pt-20" v-show="option == 'detail'" v-html="program.result.program_detail">
            </div>

            <!-- <div class="px-10 pt-20 pb-10" v-show="option == 'daftar'">

                <InputCategory class="overflow-x-scroll no-scrollbar py-4 mb-6" :options="eventOptions"
                    v-model="selectedEvent" />

                <NuxtImg src="/img/banner/vote.jpeg" sizes="300" height="300"
                    class="w-full h-[205px] 2xl:h-[280px] object-cover rounded-lg" />

                <div class="bg-primary-900 py-4 px-6 my-4 rounded-lg">
                    <h3 class="text-title-2">Pendaftaran {{ selectedEvent }}</h3>
                    <p>Formulir ini adalah formulir pendaftaran kepanitiaan Serigala Sistem Informasi atau SSI. Jika
                        Anda
                        ingin mendaftarkan diri, mohon diisi dengan sebaiknya dan sesuai dengan data yang sebagaimana
                        aslinya. Jangan lupa untuk follow instagram @himasif dan @ssi.himasif untuk informasi lebih
                        lanjut.
                        <br>
                        <br>
                        Jika ada pertanyaan bisa menghubungi contact person di bawah ini : <br>
                        📞 +628113040798 Medita <br>
                        📞 +62859106974463 Yovita <br>
                    </p>
                </div>

                <div class="flex items-center justify-center my-12">
                    <div class="w-20 h-20">
                        <div class="w-20 h-20 rounded-full flex items-center justify-center bg-mediatek">
                            <svg xmlns="http://www.w3.org/2000/svg" width="43" height="48" viewBox="0 0 23 28" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M7.40101 19.8537H14.5825C15.1238 19.8537 15.5726 19.4003 15.5726 18.8537C15.5726 18.307 15.1238 17.867 14.5825 17.867H7.40101C6.85976 17.867 6.41091 18.307 6.41091 18.8537C6.41091 19.4003 6.85976 19.8537 7.40101 19.8537ZM11.8631 11.2003H7.40101C6.85976 11.2003 6.41091 11.6537 6.41091 12.2003C6.41091 12.747 6.85976 13.187 7.40101 13.187H11.8631C12.4043 13.187 12.8532 12.747 12.8532 12.2003C12.8532 11.6537 12.4043 11.2003 11.8631 11.2003ZM21.2841 10.0345C21.5944 10.0309 21.9323 10.027 22.2393 10.027C22.5693 10.027 22.8334 10.2937 22.8334 10.627V21.347C22.8334 24.6537 20.1799 27.3337 16.906 27.3337H6.39771C2.96537 27.3337 0.166687 24.5203 0.166687 21.0537V6.68033C0.166687 3.37366 2.83335 0.666992 6.12048 0.666992H13.17C13.5132 0.666992 13.7773 0.946992 13.7773 1.28033V5.57366C13.7773 8.01366 15.7707 10.0137 18.1865 10.027C18.7508 10.027 19.2483 10.0312 19.6836 10.0349C20.0223 10.0378 20.3234 10.0403 20.5891 10.0403C20.7771 10.0403 21.0206 10.0375 21.2841 10.0345ZM21.6481 8.08833C20.563 8.09233 19.2838 8.08833 18.3637 8.07899C16.9036 8.07899 15.7009 6.86433 15.7009 5.38966V1.87499C15.7009 1.30033 16.3914 1.01499 16.7861 1.42966C17.5005 2.17988 18.4821 3.2111 19.4594 4.23764C20.4343 5.26175 21.4047 6.28119 22.1009 7.01233C22.4864 7.41633 22.2039 8.08699 21.6481 8.08833Z"
                                    fill="white" />
                            </svg>
                        </div>

                        <p class="text-mediatek text-center mt-4">Pengisian Form</p>
                    </div>

                    <hr class="border-t border-dashed border-secondary w-32">

                    <div class="w-20 h-20">
                        <div class="w-20 h-20 rounded-full flex items-center justify-center bg-primary-800">
                            <h3 class="text-6xl">!</h3>
                        </div>

                        <p class="text-secondary text-center mt-4">Selesai</p>
                    </div>

                </div>

                <form @submit.prevent="createEventRegisterForm()">
                    <div class="mb-6">
                        <label for="nama" class="block mb-2 font-medium">Nama</label>
                        <input type="text" id="nama" v-model="formData.nama"
                            class="bg-primary-900 border border-primary-800 rounded-lg placeholder:text-secondary focus:ring-primary-700 focus:border-primary-700 block w-full py-2.5 px-3"
                            placeholder="Isikan namamu disini" required>
                    </div>

                    <div class="mb-6">
                        <label for="nim" class="block mb-2 font-medium">NIM</label>
                        <input type="number" id="nim" v-model="formData.nim"
                            class="bg-primary-900 border border-primary-800 rounded-lg placeholder:text-secondary focus:ring-primary-700 focus:border-primary-700 block w-full py-2.5 px-3"
                            placeholder="Isikan NIM-mu disini" required>
                    </div>

                    <div class="mb-6">
                        <label for="wa" class="block mb-2 font-medium">Nomor WhatsApp</label>
                        <input type="number" id="wa" v-model="formData.wa"
                            class="bg-primary-900 border border-primary-800 rounded-lg placeholder:text-secondary focus:ring-primary-700 focus:border-primary-700 block w-full py-2.5 px-3"
                            placeholder="Isikan nomor WhatsAppmu disini" required>
                    </div>

                    <div class="mb-6">
                        <label class="block mb-4 font-medium">Angkatan</label>
                        <InputCategory :options="['2021', '2022']" v-model="formData.angkatan" />
                    </div>

                    <div class="mb-6">
                        <label for="motivasi" class="block mb-2 font-medium">Motivasi</label>
                        <textarea id="motivasi" v-model="formData.motivasi"
                            class="bg-primary-900 border border-primary-800 rounded-lg placeholder:text-secondary focus:ring-primary-700 focus:border-primary-700 block w-full py-2.5 px-3"
                            placeholder="Isikan motivasimu disini" required></textarea>
                    </div>

                    <div class="mb-6">
                        <label class="block mb-4 font-medium">Pilihan Sie ke-1</label>
                        <InputCategory :options="['Acara', 'Humas', 'PDD', 'KSK', 'Perkab']" v-model="formData.sie_1" />
                    </div>

                    <div class="mb-6">
                        <label for="alasan_1" class="block mb-2 font-medium">Alasan memilih pilihan sie ke-1</label>
                        <textarea id="alasan_1" v-model="formData.alasan_1"
                            class="bg-primary-900 border border-primary-800 rounded-lg placeholder:text-secondary focus:ring-primary-700 focus:border-primary-700 block w-full py-2.5 px-3"
                            placeholder="Isikan alasan pilihan sie ke-1 mu disini" required></textarea>
                    </div>

                    <div class="mb-6">
                        <label class="block mb-4 font-medium">Pilihan Sie ke-2</label>
                        <InputCategory :options="['Acara', 'Humas', 'PDD', 'KSK', 'Perkab']" v-model="formData.sie_2" />
                    </div>

                    <div class="mb-6">
                        <label for="alasan_2" class="block mb-2 font-medium">Alasan memilih pilihan sie ke-2</label>
                        <textarea id="alasan_2" v-model="formData.alasan_2"
                            class="bg-primary-900 border border-primary-800 rounded-lg placeholder:text-secondary focus:ring-primary-700 focus:border-primary-700 block w-full py-2.5 px-3"
                            placeholder="Isikan alasan pilihan sie ke-2 mu disini"></textarea>
                    </div>

                    <div class="mb-6">
                        <label class="block mb-4 font-medium">Portofolio (jika memilih PDD)</label>
                        <div class="flex items-center justify-center w-full">
                            <label for="dropzone-file"
                                class="flex flex-col items-center justify-center w-full h-64 border-2 border-primary-800 border-dashed rounded-lg cursor-pointer bg-primary-900 hover:bg-primary-950 ">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">

                                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                            class="font-semibold">Upload / Drop </span> portofoliomu disini</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or PDF (MAX.
                                        5MB)
                                    </p>
                                </div>
                                <input id="dropzone-file" type="file" class="hidden" />
                            </label>
                        </div>
                    </div>

                    <AppButton type="Submit" variant="secondary">Kirim Pendaftaran</AppButton>
                </form>

            </div> -->
        </div>
    </div>
</template>

<script setup>
const programStore = useProgramsStore()
const route = useRoute();

// console.log(route.query);

const { data: program } = await useAPI(`/work_program/${route.query.selectedProgram}`, { pick: ['result'] })
const { data: programInformation } = await useAPI('year_has_work_program', {
    query: {
        'filter[work_program_id]': route.query.selectedProgram,
        'filter[year_of_management_id]': route.query.year
    },
    pick: ['data']
})

// const isMounted = ref(false)
const option = ref('detail')
const selectedEvent = ref("Lupin")
const content = ref()

const eventOptions = ref([
    "Lupin",
    "Lycan",
    "Sharingala 1.0",
    "Pembinaan Gemastik 2023",
    "Sharingala 2.0",
    "Pembinaan ITCC Udayana",
])
const isRegistered = ref(false)
const formData = ref({
    nama: "",
    nim: "",
    wa: "",
    angkatan: "",
    motivasi: "",
    sie_1: "",
    sie_2: "",
    alasan_1: "",
    alasan_2: "",
    portofolio: ""
})

// const getTextDivisionColor = computed(() => ({
//     "text-psdm": selectedProgram.value.div === "psdm",
//     "text-kaderisasi": selectedProgram.value.div === "kaderisasi",
//     "text-litbang": selectedProgram.value.div === "litbang",
//     "text-mediatek": selectedProgram.value.div === "mediatek",
//     "text-humas": selectedProgram.value.div === "humas",
// }));

const getStatusTitle = computed(() => {
    if (programInformation.value.data[0].status === "ongoing") {
        return "Sedang Berjalan";
    } else if (programInformation.value.data[0].status === "done") {
        return "Selesai";
    } else if (programInformation.value.data[0].status === "coming soon") {
        return "Segera Datang";
    } else {
        return "Unknown";
    }
})


const getTextDivisionColor = computed(() => ({
    "text-psdm": program.value.result.division_id === 1,
    "text-kaderisasi": program.value.result.division_id === 3,
    "text-litbang": program.value.result.division_id === 4,
    "text-mediatek": program.value.result.division_id === 6,
    "text-humas": program.value.result.division_id === 5,
}));

const getDivisionName = () => {
    if (program.value.result.division_id === 1) {
        return "psdm";
    } else if (program.value.result.division_id === 3) {
        return "kaderisasi";
    } else if (program.value.result.division_id === 4) {
        return "litbang";
    } else if (program.value.result.division_id === 6) {
        return "mediatek";
    } else if (program.value.result.division_id === 5) {
        return "humas";
    } else {
        return "unknown"; // Return empty string for invalid division IDs
    }
}

const createEventRegisterForm = function () {
    isRegistered.value = true
    alert(formData.value)
}

watch(option, () => {
    content.value.scrollTop = 0
})

onMounted(() => {
    // detailContent.value =  detailContent.value
    // daftarContent.value =  daftarContent.value
})

</script>

<style scoped></style>
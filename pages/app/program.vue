<template>
    <div class="bg-primary-950 text-white">
        <ProgramWindow />

        <section class="">
            <div class="w-full h-screen relative overflow-hidden flex text-center justify-center">
                <div class="h-3/4 w-full bg-gradient-to-t from-primary-950 to-transparent bottom-0 absolute z-10"></div>
                <NuxtImg src="/img/banner/program.webp" sizes="1000" class="object-cover absolute top-0 left-0 h-full w-full"
                    alt="profile image" />

                <AppContainer class="relative z-10 pb-10 text-white h-full flex flex-col space-y-14 justify-end">

                    <NuxtImg src="/img/logo/banner/program.png" width="1000" class="mx-auto w-[1000px]" alt=""> </NuxtImg>

                    <InputCategory :options="divisions.data" v-model="selectedDivision" class="mx-auto">
                        <div class="flex-shrink-0">
                            <input type="radio" name="category" value="all" id="all" class="hidden" :checked="true"
                                v-model="selectedDivision" required />
                            <label for="all" class="py-2 px-4 rounded-lg cursor-pointer"
                                :class="selectedDivision == 'all' ? 'bg-primary-100 text-[#1A1A1A] hover:bg-white' : 'hover:bg-[#292929] text-white bg-primary-900'">
                                SEMUA
                            </label>
                        </div>
                    </InputCategory>

                </AppContainer>
            </div>
        </section>

        <section>
            <AppContainer class="text-center py-12">
                <div class="my-8">
                    <h3 class="text-3xl font-bold mb-[5px]">Event</h3>
                    <p class="text-secondary">Program Event ini merupakan program yang dapat diikuti oleh seluruh
                        anggota
                        HIMASIF. Anggota HIMASIF dapat mengikuti program ini sebagai panitia, peserta, atau lain
                        sebagainya.
                    </p>

                    <div class="grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4.5 mt-8">
                        <template v-for="program in programs.data">
                            <CardProgram :program="program.work_programs" :status="program.status"
                                :implementation="program.implementation" @click="selectProgram(program.work_programs.id)"
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
                        <template v-for="program in programs.data">
                            <CardProgram :program="program.work_programs" :status="program.status"
                                :implementation="program.implementation" @click="selectProgram(program.work_programs.id)"
                                v-if="program.work_programs.is_event == 0"></CardProgram>
                        </template>
                    </div>
                </div>
            </AppContainer>
        </section>

    </div>
</template>

<script setup>
useHead({
    title: 'Program'
})

const { settings } = useMySettingsStore()
const programStore = useProgramsStore()
const selectedDivision = ref("all")

const { data: divisions } = await useAPI('/division', {
    query: {
        sort: "order",
        "filter[isHighlight]": 1
    },
    pick: ['data']
})

const { data: programs } = await useAPI('/year_has_work_program', {
    query: {
        "filter[year_of_management_id]": settings['current-year'],
        "include": "work_programs"
    },
    pick: ['data']
})


const selectProgram = async function (id) {
    await useRouter().push({
        query: {
            'modal': 'open',
            'selectedProgram': id,
            'year': settings['current-year']
        }
    })

    programStore.openModal()
}

// TO DO :
// 1. need to filter by division id
watch(selectedDivision, async (newDiv, oldDiv) => {
    if (newDiv === "all") {
        const { data: newPrograms } = await useAPI('/year_has_work_program', {
            query: {
                "filter[year_of_management_id]": settings['current-year'],
                "include": "work_programs"
            },
            pick: ['data']
        })

        programs.value = newPrograms.value
    } else {
        const { data: newPrograms } = await useAPI('/year_has_work_program', {
            query: {
                "filter[year_of_management_id]": settings['current-year'],
                "filter[division_id]": newDiv,
                "include": "work_programs"
            },
            pick: ['data']
        })
        programs.value = newPrograms.value

    }
})

</script>
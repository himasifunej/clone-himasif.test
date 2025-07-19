<template>
    <div class="bg-primary-950 text-white min-h-screen">

        <AppBackgroundHeader background-image="feature/nim.webp" />

        <AppContentArea class="pt-52">

            <AppContainer class="pb-20">
                <FeatureTitle>nim.checker</FeatureTitle>

                <form class="mt-14 mx-auto w-3/4" @submit.prevent="search()">
                    <div class="mb-8">
                        <input type="text" id="input" v-model="input"
                            class="bg-primary-900 border border-primary-600 text-white placeholder-primary-600 rounded-lg focus:border-primary-600 focus:ring-0 block w-full px-6 py-4"
                            placeholder="NIM atau Nama" required>
                    </div>

                    <div class="flex justify-center">
                        <AppButton variant="secondary" type="submit" :disabled="input == ''">Cari</AppButton>
                    </div>
                </form>

                <section class="relative overflow-x-auto w-3/4 mx-auto mt-14" v-if="searchData">
                    <div class="rounded-xl border border-primary-600 bg-primary-900 px-4">
                        <table class="w-full mx-auto text-left text-white text-sm">
                            <thead class="capitalize border-b border-b-primary-800">
                                <tr>
                                    <th scope="col" class="px-2 py-4 font-normal">
                                        NIM
                                    </th>
                                    <th scope="col" class="px-2 py-4 font-normal">
                                        Nama
                                    </th>
                                    <th scope="col" class="px-2 py-4 font-normal">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody class="divide-y divide-primary-800">
                                <template v-for="data in searchData?.data">
                                    <tr class=""
                                        :class="searchData[searchData.length - 1] ? 'border-b border-b-primary-800' : ''">
                                        <td class="px-2 py-4 font-semibold">
                                            {{ data.nim }}
                                        </td>
                                        <td class="px-2 py-4 font-semibold capitalize">
                                            {{ data.nama }}
                                        </td>
                                        <td class="px-2 py-4 font-semibold capitalize">
                                            {{ data.status }}
                                        </td>
                                    </tr>
                                </template>

                            </tbody>
                        </table>
                    </div>

                    <nav class="flex items-center justify-between pt-4" aria-label="Table navigation">
                        <span class="text-sm font-normal">Showing
                            <span class="font-semibold">{{ searchData?.from }} - {{ searchData?.to }}</span> of
                            <span class="font-semibold">{{ searchData?.total }}</span>
                        </span>
                        <ul class="inline-flex -space-x-px text-sm h-8">
                            <li @click="prevPagination()">
                                <a href="#"
                                    class="flex items-center justify-center px-3 h-8 ml-0 leading-tight bg-primary-900 border border-secondary rounded-l-lg hover:bg-primary-800">&laquo;
                                    Previous</a>
                            </li>
                            <li v-for="(link, index) in searchData?.links.slice(1, -1)" @click="goToPagination(link.url)">
                                <a href="#"
                                    class="flex items-center justify-center px-3 h-8 leading-tight bg-primary-900 border border-secondary hover:bg-primary-800">{{
                                        link.label }}</a>
                            </li>
                            <li @click="nextPagination()">
                                <a href="#"
                                    class="flex items-center justify-center px-3 h-8 leading-tight bg-primary-900 border border-secondary rounded-r-lg hover:bg-primary-800 ">Next
                                    &raquo;</a>
                            </li>
                        </ul>
                    </nav>

                </section>


            </AppContainer>

        </AppContentArea>
    </div>
</template>

<script setup>
import { AppAlertError } from '#components';

useHead({
    title: 'NIM Checker'
})

const input = ref('')
const searchData = ref()

const search = async function () {

    const { data: searchResult, error } = await useAPI('/nimchecker', {
        query: {
            search: input.value
        }
    })

    if (error.value) {
        useAlertsStore().openModal({
            component: AppAlertError,
            props: {
                text: error.value.message
            }
        })
    }

    searchData.value = searchResult.value
}

const nextPagination = async function () {
    const { data: searchResult, error } = await useAPI(searchData.value.next_page_url)

    if (error.value) {
        useAlertsStore().openModal({
            component: AppAlertError,
            props: {
                text: error.value.message
            }
        })
    }

    searchData.value = searchResult.value
}

const prevPagination = async function () {
    const { data: searchResult, error } = await useAPI(searchData.value.prev_page_url)

    if (error.value) {
        useAlertsStore().openModal({
            component: AppAlertError,
            props: {
                text: error.value.message
            }
        })
    }

    searchData.value = searchResult.value
}

const goToPagination = async function (url) {
    const { data: searchResult, error } = await useAPI(url)

    if (error.value) {
        useAlertsStore().openModal({
            component: AppAlertError,
            props: {
                text: error.value.message
            }
        })
    }

    searchData.value = searchResult.value
}



</script>
<template>
    <div class="bg-primary-1000">
        <AppContainer class="py-12">

            <NuxtImg src="/img/logo/himasif-white.png" sizes="90" class="w-24" alt="" />
            <div class="grid grid-cols-3 justify-between text-white mt-10">
                <div class="space-y-4 relative z-0">
                    <h5 class="text-xl font-semibold">HIMASIF 2023</h5>
                    <p class="text-secondary w-4/5">{{ settings.alamat }}</p>

                    <p class="absolute bottom-0 text-secondary">© 2023 HIMASIF </p>
                </div>

                <div class="space-y-4">
                    <h5 class="text-xl font-semibold">Terhubung dengan kami</h5>
                    <div class="flex">
                        <nuxt-link :to="settings.instagram" target="_blank"
                            class="mr-2 bg-primary-600 rounded-full w-[40px] h-[40px] flex justify-center items-center group hover:bg-mediatek">
                            <svg xmlns="http://www.w3.org/2000/svg" class="fill-primary-900 w-6 h-6 group-hover:fill-white"
                                viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                <path
                                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                            </svg>
                        </nuxt-link>
                        <nuxt-link :to="settings.youtube" target="_blank"
                            class="mr-2 bg-primary-600 rounded-full w-[40px] h-[40px] flex justify-center items-center group hover:bg-mediatek">
                            <svg xmlns="http://www.w3.org/2000/svg" class="fill-primary-900 w-6 h-6 group-hover:fill-white"
                                viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                <path
                                    d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                            </svg>
                        </nuxt-link>
                        <nuxt-link :to="settings.tiktok" target="_blank"
                            class="mr-2 bg-primary-600 rounded-full w-[40px] h-[40px] flex justify-center items-center group hover:bg-mediatek">
                            <svg xmlns="http://www.w3.org/2000/svg" class="fill-primary-900 w-6 h-6 group-hover:fill-white"
                                viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                <path
                                    d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                            </svg>
                        </nuxt-link>
                        <nuxt-link :to="settings['e-mail']" target="_blank"
                            class="mr-2 bg-primary-600 rounded-full w-[40px] h-[40px] flex justify-center items-center group hover:bg-mediatek">
                            <svg xmlns="http://www.w3.org/2000/svg" class="fill-primary-900 w-6 h-6 group-hover:fill-white"
                                viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                <path
                                    d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
                            </svg>
                        </nuxt-link>
                        <nuxt-link :to="settings.whatsapp" target="_blank"
                            class="mr-2 bg-primary-600 rounded-full w-[40px] h-[40px] flex justify-center items-center group hover:bg-mediatek">
                            <svg xmlns="http://www.w3.org/2000/svg" class="fill-primary-900 w-6 h-6 group-hover:fill-white"
                                viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                <path
                                    d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                            </svg>
                        </nuxt-link>
                    </div>
                </div>

                <div class="space-y-4">
                    <h5 class="text-xl font-semibold">Kritik dan Saran</h5>

                    <textarea id="message" rows="4"
                        class="block p-2.5 w-full text-sm placeholder-primary-700 text-white bg-[#101010] rounded-lg border border-primary-800 focus:border-primary-700 focus:ring-primary-700"
                        placeholder="Isikan kritik & saran kamu disini" v-model="criticism_n_suggestion"></textarea>
                    <button type="button" @click="submitKritikSaran"
                        class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-white-900 focus:outline-none bg-primary-900 rounded-lg hover:bg-[#292929] focus:z-10 focus:bg-primary-800">Kirim</button>
                </div>
            </div>

        </AppContainer>
    </div>
</template>

<script setup>
import { AppAlertSuccess, AppAlertError } from '#components';
const { settings } = useMySettingsStore()

const criticism_n_suggestion = ref('')

const submitKritikSaran = async () => {
    const formData = createFormData({criticism_n_suggestion: criticism_n_suggestion.value})
    const { data,error } = await useAPI('/criticism_n_suggestion', {
        method: 'POST',
        body: formData
    })

    if (data.value.code !==200 || error.value) {
        criticism_n_suggestion.value = ''
        useAlertsStore().openModal({
            component: AppAlertError,
            props: {
                text: data.value.message || error.value
            }
        })
    }

    criticism_n_suggestion.value = ''
    useAlertsStore().openModal({
        component: AppAlertSuccess,
        props: {
            text: data.value.message
        }
    })
}

</script>
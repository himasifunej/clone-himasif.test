<template>
    <div class="bg-primary-950 text-white min-h-screen">

        <AppBackgroundHeader background-image="feature/shorten.webp" />

        <AppContentArea class="pt-52">
            <AppContainer>
                <FeatureTitle>shorten.link</FeatureTitle>

                <form class="mt-14 w-3/4 mx-auto" v-if="!generatedLink" @submit.prevent="createShorten()">
                    <div class="mb-4">
                        <input type="text" id="inputLink" v-model="formData.destination_url"
                            class="bg-primary-900 border border-primary-600 text-white placeholder-primary-600 rounded-lg focus:border-primary-600 focus:ring-0 block w-full px-6 py-4 autofill:active:bg-red-400"
                            placeholder="Isikan link yang ingin kamu shorten" required>
                    </div>

                    <div class="mb-8">
                        <div class="flex gap-4">
                            <div class="flex gap-2">
                                <div>
                                    <input type="radio" id="auto" name="short-type" value="auto" class="hidden peer"
                                        required v-model="formData.shortTypePicked" checked>
                                    <label for="auto"
                                        class="inline-flex items-center justify-center px-6 py-4 bg-primary-900 border border-primary-600 text-white rounded-lg cursor-pointer peer-checked:bg-primary-800 peer-checked:border-primary-600">
                                        Auto
                                    </label>
                                </div>

                                <div>
                                    <input type="radio" id="custom" name="short-type" value="custom" class="hidden peer"
                                        v-model="formData.shortTypePicked">
                                    <label for="custom"
                                        class="inline-flex items-center justify-center px-6 py-4 bg-primary-900 border border-primary-600 text-white rounded-lg cursor-pointer peer-checked:bg-primary-800 peer-checked:border-primary-600">
                                        Custom
                                    </label>
                                </div>

                            </div>

                            <div class="flex w-full">
                                <span
                                    class="inline-flex items-center px-6 py-4 text-white bg-primary-900 border border-r-0 border-primary-600 rounded-l-lg">
                                    himasif.id/
                                </span>
                                <input type="text" id="website-admin" v-model="formData.url_key"
                                    :disabled="formData.shortTypePicked == 'auto'"
                                    class="rounded-none rounded-r-lg px-6 py-4 bg-primary-900 border border-primary-600 text-white placeholder-primary-600 focus:border-primary-600 focus:ring-0 block flex-1 min-w-0 w-full disabled:cursor-not-allowed"
                                    placeholder="Isikan shorten link custom">
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-center">
                        <AppButton variant="secondary" type="submit" :disabled="formData.destination_url == ''">
                            Shorten</AppButton>
                    </div>
                </form>


                <div class="mt-14 w-3/4 mx-auto" v-if="generatedLink">
                    <div class="relative mb-4">
                        <input type="text" id="generatedLink"
                            class="bg-primary-900 border border-primary-600 text-white placeholder-primary-600 rounded-lg focus:border-primary-600 focus:ring-0 block w-full pl-6 py-4 pr-14"
                            readonly required v-model="generatedLink">

                        <div class="absolute inset-y-0 right-0 flex items-center pr-6">
                            <img src="/icon/Iconly/Bold/Scan.svg" class="w-6 h-6 cursor-pointer" alt="copy link"
                                @click="copyToClipboard()">
                        </div>

                    </div>

                    <div class="flex justify-center space-x-4">
                        <AppButton variant="secondary" @click="generateQr(generatedLink)">Generate QR Code
                        </AppButton>
                        <AppButton variant="secondary" @click="resetForm">Shorten Another</AppButton>
                    </div>

                </div>

                <section class="w-full mt-20 z-10 pb-20 mx-auto" v-if="qr">
                    <div class="w-80 h-80 mx-auto">
                        <img :src="qr" alt="qrcode" class="w-full">
                    </div>
                </section>

            </AppContainer>
        </AppContentArea>
    </div>
</template>

<script setup>
import { AppAlertSuccess, AppAlertError } from '#components';

useHead({
    title: 'Shorten Link'
})

//STATE / DATA AREA

//Set base form data structure
const baseFormData = {
    destination_url: '',
    url_key: '',
    shortTypePicked: 'auto'
}

// state for storing data/result
const generatedLink = ref('')
const qr = ref()
const formData = ref({
    destination_url: '',
    url_key: '',
    shortTypePicked: 'auto'
})


// METHODS AREA

// call API shorten using useFetch (im making it composable so it can be reusable, and easy to call)
const createShorten = async function () {
    const bodyData = createFormData({
        destination_url: formData.value.destination_url,
        url_key: formData.value.url_key
    })

    const { data: data, error } = await useAPI('/shorten', {
        method: 'POST',
        body: bodyData
    })

    if (data.value.code === 200) {
        generatedLink.value = data.value.result.short_link
        useAlertsStore().openModal({
            component: AppAlertSuccess,
            props: {
                text: data.value.message
            }
        })
    }

    if (error.value) {
        useAlertsStore().openModal({
            component: AppAlertError,
            props: {
                text: error.value
            }
        })
    }
}

// copying generated link to user clipboard, if success/failed showing alert
const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(generatedLink.value)
        useAlertsStore().openModal({
            component: AppAlertSuccess,
            props: {
                text: 'Berhasil menyalin'
            }
        })
    } catch (error) {
        useAlertsStore().openModal({
            component: AppAlertError,
            props: {
                text: error
            }
        })
    }
}

// generate qr, using qr package. createQRCode is composable from some qr package script
// See /composables/createQrCode.js
const generateQr = async (link) => {
    const qrcode = await createQrCode(link)
    qr.value = qrcode
}

// reseting form to base form data structure
// also reseting the result from the state
const resetForm = () => {
    formData.value = baseFormData
    generatedLink.value = ''
    qr.value = ''
}
</script>
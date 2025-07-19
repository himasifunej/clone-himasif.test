<template>
    <div class="bg-primary-950 text-white min-h-screen">

        <AppBackgroundHeader background-image="feature/sif-paste.webp" />

        <AppContentArea class="pt-52">

            <AppContainer>
                <FeatureTitle>himasif.paste</FeatureTitle>

                <form class="mt-8 w-3/4 mx-auto" v-if="!result.paste.url" @submit.prevent="paste()">
                    <div class="mb-4">
                        <input type="text" id="input" v-model="formData.title"
                            class="px-6 py-4 bg-primary-900 border border-primary-600 text-white placeholder-primary-600 rounded-lg focus:border-primary-400 focus:ring-0 block w-full"
                            placeholder="Judul" required>
                    </div>

                    <textarea id="message" rows="4" v-model="formData.text"
                        class="block px-6 py-4 mb-6 w-full placeholder-primary-600 text-white bg-primary-900 rounded-lg border border-primary-600 focus:border-primary-400 focus:ring-0"
                        placeholder="Text" required></textarea>

                    <div class="flex justify-center">
                        <AppButton variant="secondary" type="submit"
                            :disabled="formData.title == '' || formData.text == ''">Paste!</AppButton>
                    </div>
                </form>

                <form class="mt-14 w-3/4 mx-auto" v-if="result.paste.url && !result.shortedLink" @submit.prevent="createShorten()">
                    <div class="mb-4">
                        <input type="text" id="paste" v-model="result.paste.url" readonly
                            class="bg-primary-900 border border-primary-600 text-white placeholder-primary-600 rounded-lg focus:border-primary-600 focus:ring-0 block w-full px-6 py-4"
                            placeholder="Link paste" required>
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
                        <AppButton variant="secondary" type="submit" :disabled="result.paste.url == ''">
                            Shorten</AppButton>
                    </div>
                </form>


                <div class="mt-14 w-3/4 mx-auto" v-if="result.shortedLink">
                    <div class="relative mb-4">
                        <input type="text" id="generatedLink"
                            class="bg-primary-900 border border-primary-600 text-white placeholder-primary-600 rounded-lg focus:border-primary-600 focus:ring-0 block w-full pl-6 py-4 pr-14"
                            readonly required v-model="result.shortedLink">

                        <div class="absolute inset-y-0 right-0 flex items-center pr-6">
                            <img src="/icon/Iconly/Bold/Scan.svg" class="w-6 h-6 cursor-pointer" alt="copy link"
                                @click="copyToClipboard()">
                        </div>

                    </div>

                    <div class="flex justify-center space-x-4">
                        <AppButton variant="secondary" @click="generateQr(result.shortedLink)">Generate QR Code
                        </AppButton>
                        <AppButton variant="secondary" @click="resetForm">Shorten Another</AppButton>
                    </div>

                </div>

                <section class="w-full mt-20 z-10 pb-20 relative container mx-auto" v-if="qr">
                    <div class="w-80 h-80 mx-auto">
                        <img :src="qr" alt="qrcode" class="w-full">
                    </div>
                </section>
            </AppContainer>

        </AppContentArea>
    </div>
</template>

<script setup>
import { AppAlertSuccess, AppAlertError } from '#components'

useHead({
    title: 'Paste!'
})

const qr = ref('')

const baseFormData = {
    title: '',
    text: '',
    shortTypePicked: 'auto',
    url_key: ''
}

const formData = ref({
    title: '',
    text: '',
    shortTypePicked: 'auto',
    url_key: ''
})

const result = ref({
    paste: '',
    shortedLink: ''
})

const paste = async () => {
    const { data: data, error } = await useAPI('paste', {
        method: 'POST',
        query: {
            title: formData.value.title,
            text: formData.value.text
        }
    })

    if (data.value.code === 200) {
        useAlertsStore().openModal({
            component: AppAlertSuccess,
            props: {
                text: data.value.message
            }
        })
        result.value.paste = data.value.result
    }

    if(error.value) {
        useAlertsStore().openModal({
            component: AppAlertError,
            props: {
                text: error.value.message
            }
        })
    }
}


const createShorten = async function () {
    const bodyData = createFormData({
        destination_url: result.value.paste.url,
        url_key: formData.value.url_key
    })

    const { data: data, error } = await useAPI('shorten', {
        method: 'POST',
        body: bodyData
    })

    if (data.value.code === 200) {
        result.value.shortedLink = data.value.result.short_link
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

const generateQr = async (link) => {
    const qrcode = await createQrCode(link)
    qr.value = qrcode
}

const resetForm = () => {
    formData.value = baseFormData
    result.value.paste = '',
    result.value.shortedLink = ''
    qr.value = ''
}
</script>
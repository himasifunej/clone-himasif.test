<template>
  <div class="bg-primary-950 text-white min-h-screen">

    <AppBackgroundHeader background-image="feature/sif-paste.webp" />

    <AppContentArea class="pt-52">
      <AppContainer>
        <FeatureTitle>himasif.paste</FeatureTitle>

        <form class="mt-8 w-1/2 mx-auto">
          <div class="mb-4">
            <input type="text" id="input" v-model="paste.title"
              class="px-6 py-4 bg-primary-900 border border-primary-600 text-white placeholder-primary-600 rounded-lg focus:border-primary-400 focus:ring-0 block w-full"
              placeholder="Judul" required readonly>
          </div>

          <textarea id="message" rows="4" v-model="paste.text"
            class="block px-6 py-4 mb-6 w-full placeholder-primary-600 text-white bg-primary-900 rounded-lg border border-primary-600 focus:border-primary-400 focus:ring-0"
            placeholder="Text" readonly></textarea>
        </form>
      </AppContainer>
    </AppContentArea>
  </div>
</template>

<script setup>
import { AppAlertSuccess, AppAlertError } from '#components'
const route = useRoute()

const paste = ref({
  title: '',
  text: '',
})

const getPaste = async function () {
  const { data: data, error } = await useAPI(`/paste/${route.params.hash}`)
  if (data.value.code === 400) {
    useAlertsStore().openModal({
      component: AppAlertError,
      props: {
        text: data.value.message
      }
    })
  }

  if (data.value.code === 200) {
    useAlertsStore().openModal({
      component: AppAlertSuccess,
      props: {
        text: data.value.message
      }
    })
    paste.value.title = data.value.result.title
    paste.value.text = data.value.result.text
  }
}

getPaste()
</script>

<style></style>


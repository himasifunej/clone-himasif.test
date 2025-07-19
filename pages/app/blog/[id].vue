<template>
  <div class="bg-primary-950 text-white">
    <AppContainer class="pt-24 pb-20 space-y-8">
      <form @submit.prevent="searchBlog">
        <InputSearch placeholder="Cari blog" v-model="searchValue" class="w-1/2 mx-auto mb-5"></InputSearch>
      </form>

      <div class="flex flex-wrap">

        <section class="w-2/3 ">
          <article class="border rounded-2xl p-8 bg-primary-900 border-primary-800 space-y-2 ">
            <NuxtImg :src="blogDetail.result.image[0].url" alt="" sizes="400"
              class="rounded-lg object-cover w-full h-[430px] flex-none">
            </NuxtImg>

            <div class="py-1 space-y-4">
              <p class="text-secondary text-sm uppercase leading-5 tracking-[1.4px]">
                {{ getBlogCategory(blogDetail.result.blog_category_id) }} · {{ getDatePublished }}</p>
              <h5 class="text-title-2">{{ blogDetail.result.title }}</h5>
              <div class="list-decimal" v-html="blogDetail.result.content"></div>
            </div>
          </article>
        </section>


        <aside class="w-1/3 pl-6 space-y-4">
          <h3 class="text-2xl font-bold">Lainnya</h3>

          <div v-for="blog in blogs.data.slice(0, 3)" @click="$router.push({ path: `/app/blog/${blog.id}` })"
            class="border rounded-2xl p-4 cursor-pointer bg-primary-900 border-primary-800 hover:bg-[#1F1F1F] space-y-2 space-x-6 flex">

            <NuxtImg :src="blog.image[0].url" alt="" height="150" width="150" class="w-[150px] rounded-lg object-cover">
            </NuxtImg>

            <div class="py-1 space-y-4">
              <p class="text-secondary text-sm leading-5 tracking-[1.4px]">{{ getBlogCategory(blog.blog_category_id) }}
              </p>
              <h5 class="text-title-3">{{ blog.title }}</h5>
              <span v-html="blog.content" class="text-secondary text-sm line-clamp-3"></span>
            </div>
          </div>
        </aside>
      </div>

    </AppContainer>
  </div>
</template>

<script setup>
const searchValue = ref('')
const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

const { data: blogDetail, error } = await useAPI(`/blog/${useRoute().params.id}`, {
  pick: ['result']
})

if (error.value) {
  console.log(error.value)
}

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

const searchBlog = async () => {
  await navigateTo({
  path: '/app/blog',
  query: {
    search: searchValue.value
  }
})
}

const getDatePublished = computed(() => {
  const date = new Date(blogDetail.value.result.published_date);

  // Mendapatkan hari dalam format singkat
  const day = date.getDate();

  // Mendapatkan bulan dalam format singkat
  const month = date.getMonth();

  // Mendapatkan tahun
  const year = date.getFullYear();

  return day + " " + monthNamesShort[month] + " " + year
})

</script>

<style></style>


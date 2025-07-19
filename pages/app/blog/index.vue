<template>
    <div class="bg-primary-950 text-white">
        <section class="">
            <div class="w-full h-screen relative overflow-hidden flex text-center justify-center">
                <div class="h-3/4 w-full bg-gradient-to-t from-primary-950 to-transparent bottom-0 absolute z-10"></div>
                <NuxtImg src="/img/banner/blog.webp" sizes="1000" class="object-cover absolute top-0 left-0 h-full w-full"
                    alt="profile image" />

                <AppContainer class="relative z-10 pb-5 text-white h-full flex flex-col justify-end">

                    <NuxtImg src="/img/logo/banner/blog.png" width="350" class="mx-auto mt-6 mb-12" alt=""> </NuxtImg>

                    <form @submit.prevent="searchBlog">
                        <InputSearch placeholder="Cari blog" v-model="searchValue" class="w-1/2 mx-auto mb-5"></InputSearch>
                    </form>

                    <InputCategory :options="blogCategory.result" v-model="selectedCategory" class="mx-auto">
                        <div class="flex-shrink-0">
                            <input type="radio" name="category" value="all" id="all" class="hidden" :checked="true"
                                v-model="selectedCategory" required />
                            <label for="all" class="py-2 px-4 rounded-lg cursor-pointer"
                                :class="selectedCategory == 'all' ? 'bg-primary-100 text-[#1A1A1A] hover:bg-white' : 'hover:bg-[#292929] text-white bg-primary-900'">
                                SEMUA
                            </label>
                        </div>

                    </InputCategory>

                </AppContainer>
            </div>
        </section>

        <section v-if="blogs.data.length == 0">
            <AppContainer class="pt-6 pb-8 space-y-6 h-56 flex items-center justify-center">

                <h3 class="text-title-3">Maaf blog masih belum tersedia</h3>

            </AppContainer>
        </section>

        <section id="content" v-if="blogs.data.length != 0">
            <AppContainer class="pt-6 pb-8 space-y-6">

                <h3 class="text-title-2 text-center">Terbaru</h3>

                <div class="flex flex-wrap">
                    <article @click="goToDetail(blogs.data[0].id)"
                        class="border rounded-2xl p-4 cursor-pointer bg-primary-900 border-primary-800 hover:bg-[#1F1F1F] row-span-2 col-span-2 space-y-2 w-2/3">

                        <NuxtImg :src="blogs.data[0].image[0].url" alt="" sizes="250"
                            class="rounded-lg object-cover w-full h-[250px] flex-none"></NuxtImg>


                        <div class="py-1 space-y-4">
                            <p class="text-secondary text-sm leading-5 tracking-[1.4px]">{{
                                getBlogCategory(blogs.data[0].blog_category_id) }}</p>
                            <h5 class="text-title-3">{{ blogs.data[0].title }}</h5>
                            <!-- <p class="text-secondary text-sm line-clamp-3"> -->
                            <span v-html="blogs.data[0].content" class="text-secondary text-sm line-clamp-3"></span>
                            <!-- </p> -->
                        </div>
                    </article>

                    <aside class="w-1/3 space-y-4 pl-6" v-if="blogs.data.length > 1">
                        <div v-for="i in 2" @click="goToDetail(blogs.data[i].id)"
                            class="border rounded-2xl p-4 cursor-pointer bg-primary-900 border-primary-800 hover:bg-[#1F1F1F] space-y-2 space-x-6 flex">
                            <NuxtImg :src="blogs.data[i].image[0].url" alt="" width="150" sizes="250"
                                class="rounded-lg object-cover w-[150px]">
                            </NuxtImg>

                            <div class="py-1 space-y-4">
                                <p class="text-secondary text-sm leading-5 tracking-[1.4px]">
                                    {{ getBlogCategory(blogs.data[i].blog_category_id) }}</p>
                                <h5 class="text-title-3">{{ blogs.data[i].title }}</h5>
                                <span v-html="blogs.data[i].content" class="text-secondary text-sm line-clamp-3"></span>
                            </div>
                        </div>
                    </aside>
                </div>
            </AppContainer>

        </section>

        <section v-if="blogs.data.length > 3">
            <AppContainer class="pb-20 space-y-6">
                <h3 class="text-title-2 text-center">Lainnya</h3>

                <div class="grid grid-cols-4 gap-5">
                    <CardBlog v-for="blog in blogs.data.slice(3)" :data="blog"
                        :category="getBlogCategory(blog.blog_category_id)" @click="goToDetail(blog.id)"></CardBlog>
                </div>

            </AppContainer>
        </section>
    </div>
</template>

<script setup>

useHead({
    title: 'Blog'
})
const route = useRoute();

const selectedCategory = ref('all')
const searchValue = ref('')

searchValue.value = route.query.search

const { data: blogs } = await useAPI('/blog', {
    query: {
        'filter[is_published]': 1,
        "search": searchValue.value,
    },
    pick: ['data']
})

const { data: blogCategory } = await useAPI('/blog_category', {
    pick: ['result']
})


const getBlogCategory = (blogId) => {
    return blogCategory.value.result.find((el) => el.id === blogId).title
}

const searchBlog = async function () {
    const { data: searchedBlog } = await useAPI('/blog', {
        query: {
            "filter[is_published]": 1,
            "search": searchValue.value,
            "filter[blog_category_id]": selectedCategory.value == 'all' ? '' : selectedCategory.value
        },
        pick: ['data']
    })

    blogs.value = searchedBlog.value
}

const goToDetail = function (id) {
    navigateTo(`/app/blog/${id}`)
}

watch(selectedCategory, async (newVal, oldVal) => {
    if (newVal == 'all') {
        const { data: newBlogs } = await useAPI('/blog', {
            query: {
                "search": searchValue.value,
                'filter[is_published]': 1
            },
            pick: ['data']
        })

        blogs.value = newBlogs.value
    } else {
        const { data: newBlogs } = await useAPI('/blog', {
            query: {
                'filter[is_published]': 1,
                "search": searchValue.value,
                'filter[blog_category_id]': newVal
            },
            pick: ['data']
        })

        blogs.value = newBlogs.value
    }
})




</script>
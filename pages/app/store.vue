<template>
    <div class="bg-primary-950 text-white">
        <section class="">
            <div class="w-full h-screen relative overflow-hidden flex text-center justify-center">
                <div class="h-3/4 w-full bg-gradient-to-t from-primary-950 to-transparent bottom-0 absolute z-10"></div>
                <NuxtImg src="/img/banner/store.webp" sizes="1000" class="object-cover absolute top-0 left-0 h-full w-full"
                    alt="profile image" />

                <AppContainer class="relative z-10 pb-5 text-white h-full flex flex-col justify-end">

                    <NuxtImg src="/img/logo/banner/highst-logo.png" width="350" class="mx-auto w-[350px]" alt=""> </NuxtImg>

                    <NuxtImg src="/img/logo/banner/highst.png" width="350" class="mx-auto mt-6 mb-12 w-[350px]" alt="">
                    </NuxtImg>

                    <form @submit.prevent="searchProduct">
                        <InputSearch placeholder="Cari produk" v-model="searchValue" class="w-1/2 mx-auto mb-5">
                        </InputSearch>
                    </form>

                    <InputCategory :options="productCategories.data" v-model="selectedCategory" class="mx-auto">
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

        <section v-if="products.data.length == 0">
            <AppContainer class="pt-6 pb-8 space-y-6 h-56 flex items-center justify-center">

                <h3 class="text-title-3">Maaf produk yang anda cari tidak tersedia</h3>

            </AppContainer>
        </section>

        <section v-if="products.data.length != 0">
            <AppContainer class="pt-6 pb-20">
                <div class="grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                    <CardStore v-for="product in products.data" :item="product"
                        :category="getProductCategory(product.product_category_id)">

                    </CardStore>
                </div>
            </AppContainer>
        </section>
    </div>
</template>

<script setup>
useHead({
    title: 'Store'
})

const { data: products } = await useAPI('/product', {
    query: {
        "sort": "status"
    },
    pick: ["data"]
})

const { data: productCategories } = await useAPI('/product_categories', {
    pick: ['data']
})

const selectedCategory = ref("all")
const searchValue = ref('')

const getProductCategory = (id) => {
    return productCategories.value.data.find((el) => el.id === id).name
}

const searchProduct = async function () {
    const { data: searchedProduct } = await useAPI('/product', {
        query: {
            "search": searchValue.value,
            "sort": "status",
            "filter[product_category_id]": selectedCategory.value == 'all' ? '' : selectedCategory.value
        },
        pick: ['data']
    })

    products.value.data = searchedProduct.value.data
}

watch(selectedCategory, async (newVal, oldVal) => {
    if (newVal == 'all') {
        const { data: newProduct } = await useAPI('/product', {
            query: {
                "search": searchValue.value,
                "sort": "status"
            },
            pick: ['data']
        })

        products.value.data = newProduct.value.data
    } else {
        const { data: newProduct } = await useAPI('/product', {
            query: {
                "search": searchValue.value,
                "sort": "status",
                'filter[product_category_id]': newVal
            },
            pick: ['data']
        })

        products.value.data = newProduct.value.data
    }
})

</script>
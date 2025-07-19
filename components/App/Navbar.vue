<template>
    <nav class="fixed w-full z-20 top-0 left-0 bg-gradient-to-b from-[#000000B2] to-transparent"
        :class="y > 1 ? 'addBlur' : ''">
        <AppContainer class="h-20 flex flex-wrap items-center justify-between">
            <nuxt-link to="/" class="flex items-center">
                <NuxtImg src="/img/logo/himasif-white.png" class="mr-3" sizes="60" width="60" alt="Logo HIMASIF" />
            </nuxt-link>
            <div class="flex md:order-2">
                <button type="button" ref="userDropdownTrigger"
                    class="flex text-sm bg-gray-800 rounded-full border border-mediatek md:mr-0 focus:ring-1 focus:ring-mediatek"
                    id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown"
                    data-dropdown-placement="bottom-end">
                    <span class="sr-only">Open user menu</span>
                    <NuxtImg :src="`https://source.boringavatars.com/beam`" width="40" height="40" v-if="authenticated"
                        class="rounded-full w-10 h-10 object-cover">
                    </NuxtImg>
                    <svg v-else version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="30px" height="30px" class="rounded-full w-10 h-10 object-cover" viewBox="0,0,256,256">
                        <g fill="#ababab" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                            stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                            font-family="none" font-weight="none" font-size="none" text-anchor="none"
                            style="mix-blend-mode: normal">
                            <path d="M0,256v-256h256v256z" id="bgRectangle"></path>
                        </g>
                        <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                            stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                            font-family="none" font-weight="none" font-size="none" text-anchor="none"
                            style="mix-blend-mode: normal">
                            <g transform="scale(8.53333,8.53333)">
                                <path
                                    d="M15,3c-3.314,0 -6,2.686 -6,6v1c0,3.314 2.686,6 6,6c3.314,0 6,-2.686 6,-6v-1c0,-3.314 -2.686,-6 -6,-6zM14.99805,19c-4.006,0 -9.146,2.16684 -10.625,4.08984c-0.914,1.189 -0.04392,2.91016 1.45508,2.91016h18.3418c1.499,0 2.36908,-1.72116 1.45508,-2.91016c-1.479,-1.922 -6.62095,-4.08984 -10.62695,-4.08984z">
                                </path>
                            </g>
                        </g>
                    </svg>
                </button>

                <!-- Dropdown menu -->
                <div class="z-50 p-5 hidden text-base text-white list-none divide-y divide-primary-600 font-normal bg-primary-900 bg-opacity-[85%] rounded-2xl rounded-tr-none backdrop-blur"
                    id="user-dropdown" ref="userDropdownContent">
                    <template v-if="authenticated">
                        <div class="pb-4 flex items-center space-x-4">
                            <NuxtImg :src="`https://source.boringavatars.com/beam`" sizes="32" width="32" height="32"
                                class="w-8 h-8 rounded-full object-cover border border-mediatek" alt="" />
                            <span class="line-clamp-3" v-html="username"></span>
                        </div>
                        <ul class="pt-4" aria-labelledby="user-menu-button">
                            <li>
                                <a href="#" class="block text-mediatek" @click="logout()">Logout</a>
                            </li>
                        </ul>
                    </template>

                    <!-- <template v-if="status === 'unauthenticated'"> -->
                    <div class="flex items-center space-x-4" v-show="!authenticated">
                        <button type="button" data-modal-target="authentication-modal" @click="userDropdown.hide()"
                            data-modal-toggle="authentication-modal" class="block text-mediatek">Login</button>
                    </div>
                    <!-- </template> -->

                    <Teleport to="body">
                        <div id="authentication-modal" tabindex="-1" aria-hidden="true"
                            class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center md:inset-0 h-screen bg-black/80">
                            <div class="relative p-4 w-full max-w-md max-h-full">
                                <!-- Modal content -->
                                <div class="relative bg-primary-900 rounded-lg shadow text-white">
                                    <!-- Modal body -->
                                    <div class="p-8 md:p-10 space-y-4">
                                        <NuxtImg src="/img/logo/himasif-white.png" class="mx-auto w-40" sizes="150"
                                            alt="Logo HIMASIF" />
                                        <h3 class="text-title-2 text-center">LOGIN</h3>
                                        <form class="space-y-4" @submit.prevent="login()">
                                            <div>
                                                <input type="email" name="email" id="email" v-model="user.email"
                                                    autocomplete="email"
                                                    class="border border-primary-600 bg-primary-900 placeholder:text-secondary text-sm rounded-lg focus:ring-primary-700 focus:border-primary-700 block w-full py-4 px-4 "
                                                    placeholder="E-mail" required>
                                            </div>
                                            <div class="relative">
                                                <input type="password" name="password" id="password" placeholder="Password"
                                                    v-model="user.password" autocomplete="current-password"
                                                    v-if="!passwordShow"
                                                    class="border border-primary-600 bg-primary-900 text-sm placeholder:text-secondary rounded-lg focus:ring-primary-700 focus:border-primary-700 block w-full py-4 pl-4 pr-10"
                                                    required>
                                                <input type="text" name="password" id="password" placeholder="Password"
                                                    v-model="user.password" autocomplete="current-password"
                                                    v-else-if="passwordShow"
                                                    class="border border-primary-600 bg-primary-900 text-sm placeholder:text-secondary rounded-lg focus:ring-primary-700 focus:border-primary-700 block w-full py-4 pl-4 pr-10"
                                                    required>
                                                <button type="button" @click="togglePassword()"
                                                    class="absolute top-0 right-0 w-8 h-full text-white focus:outline-none">

                                                    <svg width="31" height="30" viewBox="0 0 31 30" fill="none"
                                                        v-show="!passwordShow" class="w-6"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                            d="M26.0222 4.64523C25.656 4.28492 25.0625 4.28492 24.6963 4.64523L22.0866 7.21358C20.0706 5.82863 17.8193 5.09428 15.5 5.09428C12.9289 5.09428 10.4343 5.99427 8.2732 7.67752C6.13818 9.33002 4.35871 11.7133 3.0768 14.6351C2.97467 14.8679 2.97439 15.1318 3.07602 15.3648C4.18303 17.9028 5.66997 20.0319 7.44305 21.6249L4.97884 24.05L4.88806 24.1535C4.61575 24.5147 4.646 25.0272 4.97884 25.3548C5.34495 25.7151 5.93855 25.7151 6.30466 25.3548L26.0222 5.95003L26.1129 5.84655C26.3853 5.48535 26.355 4.97279 26.0222 4.64523ZM8.77046 20.3185L11.4428 17.6886C10.9032 16.907 10.6075 15.9813 10.6075 15.0015C10.6075 12.3355 12.7921 10.1841 15.5 10.1841C16.4902 10.1841 17.4409 10.4772 18.2333 11.0057L20.7365 8.54228C19.1019 7.48819 17.3206 6.93954 15.5 6.93954C13.3628 6.93954 11.2749 7.6928 9.43455 9.1262C7.67227 10.4902 6.16181 12.4509 5.02133 14.8755L4.963 15.0017L5.01969 15.1253C6.0109 17.2435 7.28812 19.0048 8.77046 20.3185ZM16.8669 12.3505C16.4523 12.1426 15.9845 12.0294 15.5 12.0294C13.8279 12.0294 12.4825 13.3544 12.4825 15.0015C12.4825 15.4813 12.5959 15.9369 12.8085 16.3445L16.8669 12.3505ZM19.4207 14.7698L19.5474 14.7837C20.057 14.8739 20.3958 15.3535 20.3042 15.855C19.945 17.8208 18.3739 19.37 16.3777 19.7266C15.8683 19.8176 15.3803 19.485 15.2878 18.9836C15.1953 18.4823 15.5334 18.002 16.0428 17.911C17.2691 17.692 18.238 16.7365 18.4588 15.5284C18.5428 15.0687 18.9594 14.7502 19.4207 14.7698ZM24.2462 10.393C24.6599 10.0865 25.2476 10.1681 25.559 10.5753C26.4663 11.7614 27.2591 13.1231 27.923 14.634C28.0256 14.8675 28.0257 15.1323 27.9232 15.3659C25.3266 21.2861 20.6681 24.9056 15.5 24.9056C14.3235 24.9056 13.1594 24.7183 12.0382 24.3501C11.5471 24.1888 11.2818 23.6662 11.4457 23.1828C11.6096 22.6995 12.1407 22.4384 12.6318 22.5997C13.5622 22.9053 14.5259 23.0603 15.5 23.0603C19.6308 23.0603 23.4763 20.233 25.8409 15.4122L26.0355 15.0017L25.9693 14.8557C25.4935 13.848 24.9556 12.9237 24.3622 12.0927L24.061 11.685C23.7496 11.2779 23.8325 10.6994 24.2462 10.393Z"
                                                            fill="#868686" />
                                                    </svg>

                                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                                        v-show="passwordShow" class="w-6"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                            d="M15.3603 5.00602L15.0025 5C9.82635 5 5.16158 8.65385 2.57614 14.6323C2.47462 14.8671 2.47462 15.1329 2.57614 15.3677L2.7553 15.771C5.30798 21.3664 9.7193 24.8304 14.6397 24.994L14.9975 25C20.1737 25 24.8384 21.3461 27.4239 15.3677C27.5267 15.13 27.5253 14.8605 27.4201 14.6238L27.246 14.232C24.6872 8.62614 20.274 5.16933 15.3603 5.00602ZM15.0113 6.86177L15.3099 6.8682L15.6437 6.88556C19.6402 7.16855 23.3157 10.1319 25.5362 14.9989L25.5246 15.0289C23.2484 20.0006 19.4462 22.9816 15.3236 23.1312L15.005 23.136L14.6837 23.1317L14.3508 23.1144C10.4784 22.8401 6.90797 20.043 4.67393 15.4496L4.4625 14.9989L4.65822 14.5827C7.01397 9.71643 10.8644 6.86284 15.0113 6.86177ZM14.9994 10.1418C12.2989 10.1418 10.1106 12.3164 10.1106 15.0002C10.1106 17.6831 12.2991 19.8574 14.9994 19.8574C17.6998 19.8574 19.8894 17.6829 19.8894 15.0002C19.8894 12.3166 17.7 10.1418 14.9994 10.1418ZM14.9994 12.0047C16.6646 12.0047 18.0144 13.3455 18.0144 15.0002C18.0144 16.6539 16.6644 17.9945 14.9994 17.9945C13.3346 17.9945 11.9856 16.6542 11.9856 15.0002C11.9856 13.3452 13.3345 12.0047 14.9994 12.0047Z"
                                                            fill="#868686" />
                                                    </svg>

                                                    <span class="sr-only">Toggle Password</span>
                                                </button>
                                            </div>
                                            <!-- <div class="flex items-center mb-4">
                                                <input id="default-checkbox" type="checkbox" value="1"
                                                    v-model="user.remember_me"
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2">
                                                <label for="default-checkbox"
                                                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember
                                                    me?</label>
                                            </div> -->

                                            <div class="flex justify-center">
                                                <AppButton type="submit" variant="secondary"
                                                    :disabled="user.email == '' || user.password == ''"
                                                    data-modal-hide="authentication-modal" class="mx-auto">Masuk
                                                </AppButton>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Teleport>

                </div>
            </div>

            <div class="items-center justify-between flex" id="navbar-sticky">
                <ul class="flex font-medium text-white space-x-8 items-center text-sm">
                    <li v-for="navItem in navbarStore?.navItems">
                        <nuxt-link class="flex items-center" :to="navItem.link"
                            @click="navbarStore.setActiveNav(navItem.link)">
                            <NuxtImg v-show="navbarStore.activeNav == navItem.link"
                                :src="'/icon/Iconly/Bold/' + navItem.icon" :alt="navItem.title + 'navbar icon'" width="20"
                                class="w-5" />
                            <NuxtImg v-show="navbarStore.activeNav != navItem.link"
                                :src="'/icon/Iconly/Light/' + navItem.icon" :alt="navItem.title + 'navbar icon'" width="20"
                                class="w-5" />

                            <span class="ml-2">{{ navItem.title }}</span>
                        </nuxt-link>
                    </li>

                    <li class="flex space-x-2 items-center">

                        <button id="ButtonDropdownFitur" ref="buttonDropdownFitur" data-dropdown-toggle="dropdownFitur"
                            data-dropdown-trigger="hover" data-dropdown-placement="bottom-start" type="button"
                            class="flex itesm-center">
                            <NuxtImg v-show="navbarStore.isFiturActive" :src="'/icon/Iconly/Bold/Fitur.svg'"
                                alt="feature navbar icon" width="20" class="w-5" />
                            <NuxtImg v-show="!navbarStore.isFiturActive" :src="'/icon/Iconly/Light/Fitur.svg'"
                                alt="feature navbar icon" width="20" class="w-5" />

                            <span class="ml-2">Fitur</span>
                        </button>

                        <div id="dropdownFitur" ref="dropdownFitur"
                            class="z-50 hidden text-secondary text-sm font-normal bg-primary-900 bg-opacity-[85%] rounded-2xl rounded-tl-none backdrop-blur">
                            <ul class="p-4 space-y-z text-base" aria-labelledby="dropdownLargeButton">
                                <li v-for="fiturItem in navbarStore.fiturDropdownItems.slice(0, -1)">
                                    <nuxt-link :to="fiturItem.link" @click="navbarStore.setActiveNav(fiturItem.link)"
                                        class="hover:text-[#AEAEAE] focus:text-[#D6D6D6] block px-4 py-2">{{ fiturItem.title
                                        }}</nuxt-link>
                                </li>

                                <li v-if="authenticated">
                                    <nuxt-link
                                        :to="navbarStore.fiturDropdownItems[navbarStore.fiturDropdownItems.length - 1].link"
                                        @click="navbarStore.setActiveNav(navbarStore.fiturDropdownItems[navbarStore.fiturDropdownItems.length - 1].link)"
                                        class="hover:text-[#AEAEAE] focus:text-[#D6D6D6] block px-4 py-2">{{
                                            navbarStore.fiturDropdownItems[navbarStore.fiturDropdownItems.length - 1].title
                                        }}</nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </AppContainer>
    </nav>
</template>

<script setup>
import { initDropdowns, initModals, Dropdown } from 'flowbite';

const { authenticateUser, logUserOut } = useAuthStore()
const { authenticated } = storeToRefs(useAuthStore())
const user = ref({
    email: '',
    password: '',
    remember_me: 0
})
const username = ref(useCookie('username').value)

const { y } = useWindowScroll()
const navbarStore = useNavbarStore()
const passwordShow = ref(false)
const userDropdownContent = ref(null)
const userDropdownTrigger = ref(null)
const userDropdown = ref(null)

const getUsernameInitial = computed(() => {
    //create random char?
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex]
})

const login = async () => {
    await authenticateUser(user.value)

    if (authenticated) {
        username.value = useCookie('username').value
    }
}

const logout = async () => {
    await logUserOut()
    userDropdown.value.hide()
    username.value = ''
    user.value.email = ''
    user.value.password = ''
    user.value.remember_me = 0
}

const togglePassword = () => {
    passwordShow.value = !passwordShow.value
}


onMounted(() => {
    initDropdowns()
    initModals()
    userDropdown.value = new Dropdown(userDropdownContent.value, userDropdownTrigger.value, { placement: 'bottom-end' })

    if (!authenticated) {
        navbarStore.setActiveNav('/')
    } else {
        navbarStore.setActiveNav(getRouteLink())
    }
})
</script>

<style scoped>
.addBlur::before {
    content: "";
    position: absolute;
    z-index: -1;
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
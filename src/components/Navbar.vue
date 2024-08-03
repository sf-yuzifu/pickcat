<script setup>
import { getCurrentInstance, ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue'
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import axios from 'axios'

function logout() {
  document.querySelector('.c-navigator--logout').click()
}

const mobileMenuOpen = ref(false)

const { proxy } = getCurrentInstance()

const isLogined = ref(false)
const userDetail = ref({
  name: null,
  avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+P///38ACfsD/QVDRcoAAAAASUVORK5CYII=',
})

const user_item = ref([
  { name: '作品管理', href: '/my', click: null },
  { name: '个人中心', href: '/user/', click: null },
  { name: '账户设置', href: '/setting/', click: null },
  { name: '退出登录', click: logout, href: '#' },
])

const message_item = ref([
  { name: '评论与回复', href: '/message', count: 0 },
  { name: '赞与被购买', href: '/message#like', count: 0 },
  { name: '系统通知', href: '/message#system', count: 0 },
])

setInterval(async () => {
  if (isLogined.value !== (!!localStorage.getItem('user_id') && localStorage.getItem('user_id') !== '0')) {
    isLogined.value = !!localStorage.getItem('user_id') && localStorage.getItem('user_id') !== '0'
    if (!!localStorage.getItem('user_id') && localStorage.getItem('user_id') !== '0') {
      const a = await axios.get(`https://api.codemao.cn/creation-tools/v1/user/center/honor?user_id=${localStorage.getItem('user_id')}`)
      userDetail.value.name = a.data.nickname
      userDetail.value.avatar = a.data.avatar_url
      user_item.value[1].href = `/user/${localStorage.getItem('user_id')}`
    }
    else {
      userDetail.value.name = null
      userDetail.value.avatar = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+P///38ACfsD/QVDRcoAAAAASUVORK5CYII='
    }
  }
  if (!!localStorage.getItem('user_id') && localStorage.getItem('user_id') !== '0') {
    const a = await axios({
      method: 'get',
      url: `https://api.codemao.cn/web/message-record/count`,
      withCredentials: true,
    })
    message_item.value[0].count = a.data[0].count
    message_item.value[1].count = a.data[1].count
    message_item.value[2].count = a.data[2].count
  }
}, 100)
</script>

<template>
  <header class="bg-white min-h-64px">
    <nav class="mx-auto flex max-w-1180px items-center justify-between px-6 py-3" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="/" class="-m-1.5 p-1.5">
          <span class="pickcat">PICKCAT</span>
        </a>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <a v-for="item in proxy.navbar_item" :key="item.name" :href="item.href" class="text-base font-semibold leading-6 text-gray-900">{{ item.name }}</a>
        <Popover class="relative">
          <PopoverButton class="flex items-center gap-x-1 text-base font-semibold leading-6 text-gray-900">
            ···
          </PopoverButton>

          <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <PopoverPanel class="absolute -left-8 top-full z-10 mt-3 w-screen max-w-56 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div class="p-4">
                <div v-for="item in proxy.navbar_more" :key="item.name" class="group relative flex items-center gap-x-6 rounded-lg p-4 text-base leading-6 hover:bg-gray-50">
                  <div class="flex-auto">
                    <a :href="item.href" class="block font-semibold text-gray-900">
                      {{ item.name }}
                      <span class="absolute inset-0" />
                    </a>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
      </PopoverGroup>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <Popover v-if="isLogined" class="relative flex mr-6">
          <PopoverButton class="flex items-center justify-center gap-x-1 text-base font-semibold leading-6 text-gray-900">
            <BellIcon class="inline-flex items-center justify-center h-7 w-7" aria-hidden="true" />
            <span v-if="message_item[0].count + message_item[1].count + message_item[2].count" class="items-center justify-center flex absolute -right-1 top-0 h-4.5 w-4.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span class="items-center justify-center text-white relative inline-flex rounded-full h-4.5 w-4.5 bg-red-500 text-xs">{{ message_item[0].count + message_item[1].count + message_item[2].count }}</span>
            </span>
          </PopoverButton>
          <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <PopoverPanel class="absolute -right-8 top-full z-10 mt-3 w-screen max-w-52 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div class="p-4">
                <div v-for="item in message_item" :key="item.name" class="group relative flex items-center gap-x-6 rounded-lg p-4 text-base leading-6 hover:bg-gray-50">
                  <div class="flex-auto">
                    <a :href="item.href" class="flex justify-between font-semibold text-gray-900" @click="item.click">
                      <span>{{ item.name }}</span>
                      <span v-if="item.count" class="text-gray-500">{{ item.count }}</span>
                      <span class="absolute inset-0" />
                    </a>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
        <Popover v-if="isLogined" class="relative">
          <PopoverButton class="flex items-center gap-x-1 text-base font-semibold leading-6 text-gray-900">
            <img class="inline-block h-10 w-10 rounded-full" :src="userDetail.avatar" alt="">
          </PopoverButton>
          <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <PopoverPanel class="absolute -right-8 top-full z-10 mt-3 w-screen max-w-60 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div class="p-4">
                <div v-for="item in user_item" :key="item.name" class="group relative flex items-center gap-x-6 rounded-lg p-4 text-base leading-6 hover:bg-gray-50">
                  <div class="flex-auto">
                    <a :href="item.href" class="block font-semibold text-gray-900" @click="item.click">
                      {{ item.name }}
                      <span class="absolute inset-0" />
                    </a>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
        <a v-else href="?type=login" class="text-sm font-semibold leading-6 text-gray-900">登录 <span aria-hidden="true">&rarr;</span></a>
      </div>
    </nav>
    <Dialog class="lg:hidden" :open="mobileMenuOpen" @close="mobileMenuOpen = false">
      <div class="fixed inset-0 z-10" />
      <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-3 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <a href="/" class="-m-1.5 p-1.5">
            <span class="pickcat">PICKCAT</span>
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <a v-for="item in proxy.navbar_item" :key="item.name" :href="item.href" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{ item.name }}</a>
              <Disclosure v-slot="{ open }" as="div" class="-mx-3">
                <DisclosureButton class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  更多
                  <ChevronDownIcon class="h-5 w-5 flex-none" :class="[open ? 'rotate-180' : '']" aria-hidden="true" />
                </DisclosureButton>
                <DisclosurePanel class="mt-2 space-y-2">
                  <DisclosureButton v-for="item in [...proxy.navbar_more]" :key="item.name" as="a" :href="item.href" class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    {{ item.name }}
                  </DisclosureButton>
                </DisclosurePanel>
              </Disclosure>
            </div>
            <div class="py-6">
              <Disclosure v-if="isLogined" v-slot="{ open }" as="div" class="-mx-3">
                <DisclosureButton class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  <div class="flex items-center justify-between">
                    <img class="inline-block h-10 w-10 rounded-full" :src="userDetail.avatar" alt="">
                    <span class="px-2">{{ userDetail.name }}</span>
                  </div>
                  <ChevronDownIcon class="h-5 w-5 flex-none" :class="[open ? 'rotate-180' : '']" aria-hidden="true" />
                </DisclosureButton>
                <DisclosurePanel class="mt-2 space-y-2">
                  <DisclosureButton v-for="item in [...user_item]" :key="item.name" as="a" :href="item.href" class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50" @click="item.click">
                    {{ item.name }}
                  </DisclosureButton>
                </DisclosurePanel>
              </Disclosure>
              <a v-else href="?type=login" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">登录</a>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<style>

</style>

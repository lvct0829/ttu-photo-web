<template>
  <footer class="bg-[#050505] border-t border-white/5 px-6 py-16 pb-28 text-center text-white">
    <img
      :src="`${basePath}logoblack.png`"
      alt="TTU PHOTO"
      class="h-12 w-12 mx-auto mb-6 invert opacity-50"
    />
    <h3 class="text-lg font-serif tracking-[0.2em] mb-2 font-bold text-white">大同大學攝影社</h3>
    <p class="text-[10px] text-white/30 tracking-[0.3em] uppercase mb-10">Capture The Moment</p>

    <div class="grid grid-cols-2 gap-y-4 gap-x-8 mb-12 max-w-[240px] mx-auto">
      <RouterLink
        v-for="link in mobileLinks"
        :key="link.to"
        :to="link.to"
        class="text-xs text-white/50 py-2 border-b border-white/5 active:text-[#e6a23c]"
      >
        {{ link.label }}
      </RouterLink>
    </div>

    <div class="flex flex-col items-center gap-4">
      <button
        @click="backToDesktop"
        class="px-8 py-3 bg-white/5 border border-white/20 rounded-2xl text-[#e6a23c] text-[10px] tracking-widest uppercase font-bold active:bg-white/10 transition-all"
      >
        🖥️ 回到電腦完整版介面
      </button>
      <p class="text-[9px] text-white/20 tracking-tighter">
        © 2026 TTU PHOTO CLUB. ALL RIGHTS RESERVED.
      </p>
      <p class="text-[9px] text-white/35 tracking-tight">
        Inspired by the
        <a
          href="https://github.com/TTUSSC/website"
          target="_blank"
          rel="noopener noreferrer"
          class="underline underline-offset-2 active:text-[#e6a23c]"
          >TTUSSC/website</a
        >
      </p>
    </div>
  </footer>
</template>

<script setup>
import { useRouter, useRoute, RouterLink } from 'vue-router'

const router = useRouter()
const route = useRoute()
const basePath = import.meta.env.BASE_URL

const mobileLinks = [
  { to: '/m/home', label: '首頁' },
  { to: '/m/about', label: '關於我們' },
  { to: '/m/member', label: '幹部成員' },
  { to: '/m/equipment', label: '器材設備' },
]

const backToDesktop = () => {
  // 強制將 /m/xxx 換成 /xxx
  const currentPath = route.path
  if (currentPath.startsWith('/m/')) {
    const targetPath = currentPath.replace('/m/', '/')
    // 雙重檢查避免 // 情況
    router.push(targetPath.replace('//', '/'))
  } else {
    router.push('/')
  }
}
</script>

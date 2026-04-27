<template>
  <footer class="border-t border-chalk bg-paper">
    <div class="max-w-5xl mx-auto px-6 py-12">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div class="flex items-center gap-2.5">
          <img src="/logoblack.png" alt="TTU PHOTO" class="h-10 w-10 opacity-100" />
          <div class="flex flex-col">
            <span class="font-display font-semibold text-ink text-sm tracking-tight uppercase"
              >TTU PHOTO</span
            >
            <span class="text-[10px] text-sand uppercase tracking-widest font-medium"
              >大同大學攝影社</span
            >
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-x-6 gap-y-4 text-[13px] text-clay font-medium">
          <a
            href="https://www.instagram.com/ttuphoto_?igsh=MW80Z2puaGdkZnJlZQ%3D%3D&utm_source=qr"
            target="_blank"
            class="hover:text-[#e6a23c] transition-colors"
            >Instagram</a
          >

          <RouterLink to="/about" class="hover:text-[#e6a23c] transition-colors"
            >關於我們</RouterLink
          >
          <RouterLink to="/member" class="hover:text-[#e6a23c] transition-colors"
            >幹部名單</RouterLink
          >
          <RouterLink to="/equipment" class="hover:text-[#e6a23c] transition-colors"
            >器材清單</RouterLink
          >
          <RouterLink to="/project" class="hover:text-[#e6a23c] transition-colors"
            >活動紀錄</RouterLink
          >
          <RouterLink to="/exhibition-2026" class="hover:text-[#e6a23c] transition-colors"
            >年度展覽</RouterLink
          >

          <RouterLink
            to="/m/home"
            class="ml-2 px-4 py-2 bg-ink text-paper rounded-full text-[11px] flex items-center gap-2 hover:bg-[#e6a23c] hover:text-white transition-all duration-300 shadow-sm active:scale-95"
          >
            <svg
              class="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              ></path>
            </svg>
            手機版模式
          </RouterLink>
        </div>

        <div class="text-left md:text-right">
          <p class="text-[11px] text-sand tracking-wide font-medium">© 2026 TTU PHOTO.</p>
          <p class="mt-1 text-[10px] text-sand/80 tracking-wide">
            Inspired by the
            <a
              href="https://github.com/TTUSSC/website"
              target="_blank"
              rel="noopener noreferrer"
              class="underline underline-offset-2 hover:text-[#e6a23c] transition-colors"
              >TTUSSC/website</a
            >
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
/* 確保字體在不同螢幕上的連貫性 */
.font-display {
  font-family: var(--font-display, inherit);
}
</style>

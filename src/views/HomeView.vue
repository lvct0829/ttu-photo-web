<template>
  <div>
    <section
      class="relative overflow-hidden noise-bg min-h-[calc(100vh-3.5rem)] flex items-center py-16 md:py-0 bg-cover bg-center"
      style="background-image: url('IMG_9651.jpg');"
    >
      <div class="absolute inset-0 bg-black/40"></div>

      <div class="relative z-10 max-w-6xl mx-auto px-6 w-full md:-mt-8">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div class="md:col-span-7">
            <div class="reveal flex items-center gap-3 mb-4 md:mb-6">
              <span class="inline-block px-2.5 py-1 text-[11px] font-display font-semibold uppercase tracking-[0.2em] text-rust border border-rust/30 rounded-sm">
                Photography Club
              </span>
              <div class="flex items-center gap-2">
                <a href="https://www.instagram.com/ttuphoto_?igsh=MW80Z2puaGdkZnJlZQ%3D%3D&utm_source=qr" target="_blank" aria-label="Discord" class="text-sand hover:text-[#5865F2] transition-colors duration-200">
                  <font-awesome-icon :icon="faInstagram" class="text-base" />
                </a>
                
              </div>
            </div>
            <h1 class="reveal reveal-d1 font-display text-[clamp(3.2rem,9vw,6rem)] font-extrabold text-white leading-tight tracking-tight whitespace-nowrap">
              大同大學 攝影社
            </h1>
            <p class="reveal reveal-d2 mt-4 md:mt-8 text-base md:text-xl font-medium text-white leading-relaxed max-w-md drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              透過鏡頭，記錄那些被時光遺忘的細碎美好。<br>
              在這裡，每一張照片都是一段獨一無二的故事。
            </p>
            <div class="reveal reveal-d3 mt-8 flex flex-wrap gap-3">
              <router-link to="/about" class="group inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-paper text-sm font-medium rounded-md hover:bg-ink-soft transition-colors duration-300">
                關於我們
                <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" d="M5 12h14m-4-4l4 4-4 4" />
                </svg>
              </router-link>
              <router-link to="/exhibition-2026" class="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-rust text-paper rounded-md hover:opacity-90 transition-opacity duration-200">
                進入展覽
                <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" d="M5 12h14m-4-4l4 4-4 4" />
                </svg>
              </router-link>
            </div>
          </div>

          <div class="reveal reveal-d4 md:col-span-5 flex justify-center items-center">
            <div class="relative">
              <div class="absolute -inset-16 bg-rust/15 rounded-full blur-[80px]"></div>
              
              <router-link to="/game" class="relative block group">
              <img 
                src="/logo.svg" 
                alt="TTU PHOTO" 
                class="relative w-48 h-48 md:w-64 md:h-64 object-contain scale-125 md:scale-[5.0] transform-gpu transition-transform duration-500 group-hover:scale-[5.2] cursor-pointer" 
              />
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-sand/60">
        <span class="text-[10px] uppercase tracking-widest">Scroll</span>
        <svg class="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-chalk to-transparent"></div>
    </section>

    <section class="py-20 md:py-28">
      <div class="max-w-6xl mx-auto px-6">
        <div class="mb-12 scroll-reveal" ref="addRevealRef">
          <h2 class="text-3xl md:text-4xl font-bold text-ink">我們在做什麼？</h2>
        </div>

        <div class="scroll-reveal grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center" ref="addRevealRef">
          <div class="md:col-span-5 flex flex-col gap-4">
            <div
              v-for="(item, i) in whatWeDoItems"
              :key="item.title"
              @click="activeIndex = i"
              @mouseenter="activeIndex = i"
              class="group cursor-pointer p-5 rounded-2xl transition-all duration-300"
              :class="activeIndex === i ? 'bg-ink/5 shadow-sm' : 'hover:bg-ink/5 border-transparent'"
            >
              <div class="flex items-center gap-4 mb-2">
                <span class="font-mono text-sm tracking-widest transition-colors duration-300"
                      :class="activeIndex === i ? 'text-rust' : 'text-ink/40'">
                  {{ String(i + 1).padStart(2, '0') }}
                </span>
                <h3 class="font-display font-bold text-xl md:text-2xl transition-colors duration-300"
                    :class="activeIndex === i ? 'text-ink' : 'text-ink/60'">
                  {{ item.title }}
                </h3>
              </div>
              
              <div 
                class="grid transition-all duration-500 ease-in-out"
                :class="activeIndex === i ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'"
              >
                <div class="overflow-hidden">
                  <p class="text-ink/75 text-sm leading-relaxed pl-9">
                    {{ item.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="md:col-span-7 relative aspect-[4/3] md:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl bg-ink/10">
            <transition-group name="fade-img">
              <img
                v-for="(item, i) in whatWeDoItems"
                :key="item.title"
                v-show="activeIndex === i"
                :src="item.img"
                :alt="item.title"
                class="absolute inset-0 w-full h-full object-cover will-change-transform"
              />
            </transition-group>
          </div>
        </div>
      </div>
    </section>

    <div class="max-w-5xl mx-auto px-6">
      <div class="h-px bg-gradient-to-r from-transparent via-chalk to-transparent"></div>
    </div>

    <section class="py-20 md:py-28 mb-10">
      <div class="max-w-5xl mx-auto px-6">
        <div class="mb-10 scroll-reveal" ref="addRevealRef">
          <span class="text-[11px] uppercase tracking-[0.2em] text-moss font-semibold">Course</span>
          <h2 class="mt-2 text-3xl md:text-4xl font-bold text-ink">114 下學期 活動</h2>
        </div>

        <div class="scroll-reveal w-full flex flex-row rounded-2xl overflow-hidden shadow-2xl border border-ink/10 bg-white" ref="addRevealRef">
          <img src="/01.jpg" alt="社課 1" class="w-1/3 h-auto object-cover block" />
          <img src="/02.jpg" alt="社課 2" class="w-1/3 h-auto object-cover block" />
          <img src="/03.jpg" alt="社課 3" class="w-1/3 h-auto object-cover block" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { faDiscord, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

const activeIndex = ref(0)
const whatWeDoItems = [
  {
    title: '平日社課',
    desc: '邀請不同類型的攝影師來為我們上課，傳授實用的攝影技巧與獨門心法。',
    img: 'class.jpg',
  },
  {
    title: '假日實拍',
    desc: '假日會請攝影師帶領我們去做實拍的練習，走出戶外，將課堂理論化為鏡頭下的實作。',
    img: 'outdoor.jpg',
  },
  {
    title: '年度競賽',
    desc: '每年都會舉辦「光影之間」攝影比賽，投稿者來自全台各地的高中職及大專院校的學生。',
    img: 'contest.jpg',
  },
]

const revealEls = ref([])
const addRevealRef = (el) => {
  if (el) {
    const node = el.$el ?? el
    if (node instanceof Element && !revealEls.value.includes(node)) {
      revealEls.value.push(node)
    }
  }
}

let observer = null
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 },
  )
  document.querySelectorAll('.scroll-reveal').forEach((el) => {
    observer.observe(el)
  })
})
onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.22, 1, 0.36, 1);
}
.scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* 原有的動畫 class 保留 */
.fade-up-enter-active {
  transition: all 0.6s ease-out 0.3s;
}
.fade-up-leave-active {
  transition: all 0.2s ease-in;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 新增：藝廊圖片切換的專屬動畫 */
.fade-img-enter-active,
.fade-img-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-img-enter-from {
  opacity: 0;
  transform: scale(1.05);
}
.fade-img-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
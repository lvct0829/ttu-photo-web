<template>
  <div class="bg-black min-h-screen pt-24 pb-12 px-4 md:px-10 font-sans flex flex-col items-center justify-center">
    
    <div class="text-center mb-10 reveal-fade">
      <h1 class="text-3xl md:text-4xl font-bold text-white mb-3 tracking-widest font-serif">團隊幹部</h1>
      <p class="text-[#e6a23c] tracking-[0.2em] text-xs md:text-sm uppercase opacity-80">{{ currentSessionLabel }} 幹部成員</p>

      <div class="flex items-center justify-center gap-2 mt-6">
        <button
          v-for="session in sessionOrder"
          :key="session"
          @click="selectSession(session)"
          class="px-5 py-2 rounded-full text-sm tracking-widest border transition-all duration-300"
          :class="session === currentSession
            ? 'bg-[#e6a23c] text-black border-[#e6a23c] font-bold'
            : 'text-white/50 border-white/15 hover:text-[#e6a23c] hover:border-[#e6a23c]/50'"
        >
          第{{ session }}屆
        </button>
      </div>
    </div>

    <div v-if="!members.length" class="text-white/40 text-sm md:text-base tracking-wide reveal-up">
      這屆的幹部資料還在準備中，敬請期待。
    </div>

    <div v-else class="w-full max-w-[1300px] flex items-center gap-2 md:gap-10 reveal-up">
      
      <button @click="prevMember" class="shrink-0 z-30 p-2 text-white/20 hover:text-[#e6a23c] transition-all duration-300 hidden md:block">
        <svg class="w-10 h-10 lg:w-16 lg:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <div class="flex-grow bg-[#080808] border border-white/10 shadow-2xl overflow-hidden rounded-[30px] md:rounded-[40px] relative">
        <Transition name="slide-fade" mode="out-in">
          <div :key="`${currentSession}-${currentIndex}`" class="flex flex-col md:flex-row items-stretch md:h-[600px] lg:h-[700px]">
            
            <div class="w-full md:w-auto aspect-[2/3] md:h-full overflow-hidden relative shrink-0">
              <img :src="currentMember.photo" :alt="currentMember.title" class="w-full h-full object-cover transition-transform duration-1000" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#080808] opacity-70"></div>
            </div>
            
            <div class="flex-1 h-full p-8 md:p-12 lg:p-20 overflow-y-auto custom-scrollbar flex flex-col">
              <div class="my-auto py-4">
                <div class="mb-8 border-b border-white/10 pb-8">
                  <span class="block text-[#e6a23c] tracking-[0.4em] text-[10px] md:text-xs mb-4 uppercase font-medium">{{ currentMember.title }}</span>
                  <h2 class="text-4xl md:text-6xl font-bold text-white tracking-wider leading-tight">{{ currentMember.name }}</h2>
                </div>
                
                <p class="text-white/60 leading-[2.2] text-[15px] md:text-[16px] lg:text-[18px] text-justify tracking-wide font-light whitespace-pre-line mb-10">
                  {{ currentMember.bio }}
                </p>

                <div v-if="currentMember.socials && currentMember.socials.length" class="flex flex-wrap gap-3">
                  <a 
                    v-for="social in currentMember.socials" 
                    :key="social.url"
                    :href="social.url" 
                    target="_blank"
                    class="group flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[#e6a23c] text-sm hover:bg-[#e6a23c] hover:text-black transition-all duration-300"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    {{ social.label }}
                  </a>
                </div>
              </div>
            </div>

          </div>
        </Transition>
      </div>

      <button @click="nextMember" class="shrink-0 z-30 p-2 text-white/20 hover:text-[#e6a23c] transition-all duration-300 hidden md:block">
        <svg class="w-10 h-10 lg:w-16 lg:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>

    </div>

    <div v-if="members.length" class="w-full max-w-[1300px] flex gap-3 mt-6 md:hidden">
      <button @click="prevMember" class="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-white/40 text-sm font-bold active:bg-white/10 transition-all">
        ← 上一位
      </button>
      <button @click="nextMember" class="flex-1 py-4 bg-[#e6a23c]/10 border border-[#e6a23c]/30 rounded-2xl text-[#e6a23c] text-sm font-bold active:bg-[#e6a23c]/20 transition-all">
        下一位 →
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { membersBySession, sessionOrder } from '@/data/members.js'

// 預設顯示最新一屆（sessionOrder 已由新到舊排序）
const currentSession = ref(sessionOrder[0])
const currentIndex = ref(0)

const members = computed(() => membersBySession[currentSession.value]?.members ?? [])
const currentSessionLabel = computed(() => membersBySession[currentSession.value]?.label ?? '')
const currentMember = computed(() => members.value[currentIndex.value])

const selectSession = (session) => {
  currentSession.value = session
  currentIndex.value = 0
}

const nextMember = () => {
  if (!members.value.length) return
  currentIndex.value = (currentIndex.value + 1) % members.value.length
}

const prevMember = () => {
  if (!members.value.length) return
  currentIndex.value = (currentIndex.value - 1 + members.value.length) % members.value.length
}

onMounted(() => {
  setTimeout(() => {
    document.querySelectorAll('.reveal-fade, .reveal-up').forEach((el) => {
      el.classList.add('is-visible')
    })
  }, 100)
})
</script>

<style scoped>
/* 自訂右側文字區塊的滾動條樣式 */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  margin: 20px 0;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(230, 162, 60, 0.5);
}

/* 切換動畫 */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
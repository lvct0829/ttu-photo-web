<template>
  <div class="bg-black min-h-screen pt-14 p-0 relative overflow-x-hidden text-white font-sans">
    
    <div class="relative w-full z-0">
      <img src="/poster.png" alt="光影之間：定格" class="w-full h-auto object-contain block relative z-0" />
      <img src="/overlay.png" alt="定格標題" class="absolute top-0 left-0 w-full h-auto z-10 pointer-events-none block" />

      <div class="absolute inset-0 z-40 pointer-events-none flex flex-col justify-start pt-[55%] px-[10%] md:px-[15%] gap-6 md:gap-10">
        <div class="reveal-el reveal-left text-left w-full">
          <p class="text-[clamp(12px,2.5vw,24px)] tracking-[0.3em] leading-loose text-white font-serif drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            或許<br>是否有記錄下瞬間的照片<br>本身是不矛盾的吧
          </p>
        </div>
        <div class="reveal-el reveal-right text-right w-full">
          <p class="text-[clamp(12px,2.5vw,24px)] tracking-[0.3em] leading-loose text-white font-serif drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            或許<br>隨意拍的一張照片<br>將會成為最好的畫面吧
          </p>
        </div>
        <div class="reveal-el reveal-left text-left w-full">
          <p class="text-[clamp(12px,2.5vw,24px)] tracking-[0.3em] leading-loose text-white font-serif drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            或許<br>不拍下那張照片<br>才讓這段記憶更加難以忘懷
          </p>
        </div>
      </div>
    </div>

    <div class="relative bg-black -mt-[25%] md:-mt-[70%] z-30">
      
      <div class="absolute inset-0 z-0 opacity-25 bg-[url('/poster.png')] bg-[length:140px_auto] md:bg-[length:600px_auto] bg-repeat bg-fixed bg-center"></div>

      <div class="relative z-10">
        
        <section class="max-w-5xl mx-auto pt-16 pb-24 px-6 border-t border-white/20">
          <div class="text-center mb-20 reveal-el reveal-fade">
            <h2 class="text-3xl tracking-[0.2em] font-light text-[#e6a23c]">獲獎作品</h2>
            <p class="mt-4 text-white/50 tracking-widest text-sm">AWARD-WINNING PHOTOGRAPHS</p>
          </div>

          <div class="flex flex-col gap-28">
            <div 
              v-for="(photo, index) in topAwards" :key="index"
              class="reveal-el reveal-up flex flex-col md:flex-row gap-10 items-center group cursor-pointer"
              @click="openLightbox(photo)"
            >
              <div class="w-full md:w-3/5 overflow-hidden flex justify-center bg-black/60 p-6 md:p-2 shadow-2xl">
                <img :src="photo.src" :alt="photo.title" class="w-full h-auto max-h-[80vh] object-contain transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div class="w-full md:w-2/5 flex flex-col justify-center px-4">
                <span class="text-sm font-bold tracking-widest mb-2" :class="photo.colorClass">{{ photo.award }}</span>
                <h3 class="text-3xl font-serif tracking-widest mb-4">{{ photo.title }}</h3>
                <p class="text-white/40 text-sm tracking-wider mb-6">{{ photo.author }}</p>
                <p v-if="photo.desc" class="text-white/70 leading-relaxed text-sm tracking-wide border-l-2 border-white/20 pl-4">
                  {{ photo.desc }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="max-w-7xl mx-auto py-24 px-6 border-t border-white/10">
          <div class="text-center mb-16 reveal-el reveal-fade">
            <h2 class="text-2xl tracking-[0.2em] font-light text-white">佳作展區</h2>
            <p class="mt-4 text-white/50 tracking-widest text-sm">HONORABLE MENTIONS</p>
          </div>

          <div class="columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
            <div 
              v-for="(photo, index) in honorableMentions" :key="index"
              class="reveal-el reveal-up relative overflow-hidden group cursor-pointer break-inside-avoid shadow-lg"
              @click="openLightbox(photo)"
            >
              <img :src="photo.src" :alt="photo.title" class="w-full h-auto block transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2 md:p-4 text-center backdrop-blur-sm">
                <span class="text-[#e6a23c] text-[10px] md:text-xs tracking-widest mb-1">佳作</span>
                <h4 class="text-sm md:text-lg font-serif tracking-widest mb-1">{{ photo.title }}</h4>
                <p class="text-white/60 text-[10px] md:text-xs tracking-wider">{{ photo.author }}</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div> 
    
    <Transition name="fade">
      <div v-if="isLightboxOpen" class="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 md:p-8" @click="closeLightbox">
        <button class="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2" @click.stop="closeLightbox">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <img :src="activePhoto.src" :alt="activePhoto.title" class="max-w-full max-h-[75vh] object-contain shadow-2xl mb-6" @click.stop />
        <div class="text-center max-w-2xl" @click.stop>
          <div class="flex items-center justify-center gap-3 mb-2">
            <span class="text-xs px-2 py-1 border border-white/20 rounded-sm tracking-widest" :class="activePhoto.colorClass || 'text-white'">{{ activePhoto.award }}</span>
            <h3 class="text-2xl font-serif tracking-widest">{{ activePhoto.title }}</h3>
          </div>
          <p class="text-white/50 text-sm tracking-wider mb-4">{{ activePhoto.author }}</p>
          <p v-if="activePhoto.desc" class="text-white/80 text-sm tracking-wide leading-relaxed">{{ activePhoto.desc }}</p>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const topAwards = ref([
  { award: '金獎', title: '靜謐之城', author: '橫式測試', desc: '這是一張標準 3:2 橫式的照片。', src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=900&h=600&fit=crop', colorClass: 'text-yellow-400' },
  { award: '銀獎', title: '光與影的對話', author: '直式測試', desc: '這是一張標準 2:3 直式的照片。', src: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=600&h=900&fit=crop', colorClass: 'text-gray-300' },
  { award: '銅獎', title: '歸途', author: '橫式測試', desc: '', src: 'https://images.unsplash.com/photo-1506744626753-1fa7604ee133?q=80&w=900&h=600&fit=crop', colorClass: 'text-amber-600' }
])

const honorableMentions = ref([
  { award: '佳作', title: '凝視', author: '直式 2:3', desc: '', src: 'https://images.unsplash.com/photo-1447958272669-9c562446304f?q=80&w=600&h=900&fit=crop' },
  { award: '佳作', title: '雨後', author: '橫式 3:2', desc: '', src: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=900&h=600&fit=crop' },
  { award: '佳作', title: '尋找', author: '直式 2:3', desc: '', src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&h=900&fit=crop' },
  { award: '佳作', title: '老街', author: '橫式 3:2', desc: '', src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=900&h=600&fit=crop' },
  { award: '佳作', title: '貓的視角', author: '直式 2:3', desc: '', src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&h=900&fit=crop' },
  { award: '佳作', title: '邊緣', author: '橫式 3:2', desc: '', src: 'https://images.unsplash.com/photo-1470071131384-001b85755b36?q=80&w=900&h=600&fit=crop' }
])

const isLightboxOpen = ref(false)
const activePhoto = ref({})

const openLightbox = (photo) => {
  activePhoto.value = photo
  isLightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  isLightboxOpen.value = false
  document.body.style.overflow = ''
}

let observer = null
onMounted(() => {
  setTimeout(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal-el').forEach((el) => {
      observer.observe(el)
    })
  }, 100)
})
onUnmounted(() => { if (observer) observer.disconnect() })
</script>

<style scoped>
.reveal-left { opacity: 0; transform: translateX(-50px); transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1); }
.reveal-right { opacity: 0; transform: translateX(50px); transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1); }
.reveal-up { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1); }
.reveal-fade { opacity: 0; transition: all 1s ease-out; }
.reveal-el.is-visible { opacity: 1 !important; transform: translate(0, 0) !important; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
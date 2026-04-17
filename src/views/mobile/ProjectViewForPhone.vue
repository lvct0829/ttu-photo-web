<template>
  <div class="bg-black min-h-screen pt-20 pb-20 px-6 text-white font-sans overflow-x-hidden">
    
    <div class="mb-16 text-center animate-fade-in">
      <span class="text-[#e6a23c] tracking-[0.4em] text-[10px] uppercase font-bold">Portfolio & Events</span>
      <h1 class="text-3xl font-bold mt-3 font-serif tracking-widest">活動與展覽紀錄</h1>
      <div class="w-10 h-px bg-white/20 mx-auto mt-6"></div>
    </div>

    <div class="space-y-20">
      
      <section class="reveal-up">
        <div class="flex items-center gap-3 mb-8">
          <span class="text-[#e6a23c] font-mono text-xs">01</span>
          <h2 class="text-xl font-bold tracking-widest border-l border-white/30 pl-3">攝影社課</h2>
        </div>
        
        <div class="space-y-4">
          <div v-for="item in classes" :key="item.title" class="relative aspect-[4/3] rounded-2xl overflow-hidden group border border-white/5">
            <img :src="`${basePath}${item.img}`" class="absolute inset-0 w-full h-full object-cover opacity-60" />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div class="absolute bottom-6 left-6">
              <h3 class="text-lg font-bold tracking-wide">{{ item.title }}</h3>
              <p class="text-white/40 text-[10px] mt-1 tracking-widest uppercase"></p>
            </div>
          </div>
        </div>
      </section>

      <section class="reveal-up">
        <div class="flex items-center gap-3 mb-8">
          <span class="text-[#e6a23c] font-mono text-xs">02</span>
          <h2 class="text-xl font-bold tracking-widest border-l border-white/30 pl-3">外拍實作</h2>
        </div>
        
        <div class="space-y-6">
          <div v-for="item in photowalks" :key="item.title" class="relative min-h-[250px] rounded-2xl overflow-hidden flex flex-col justify-end p-6 border border-white/5">
            <img :src="`${basePath}${item.img}`" class="absolute inset-0 w-full h-full object-cover opacity-50" />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div class="relative z-10">
              <h3 class="text-xl font-bold mb-2">{{ item.title }}</h3>
              <p class="text-white/60 text-xs leading-relaxed line-clamp-2"></p>
            </div>
          </div>
        </div>
      </section>

      <section class="reveal-up pb-20"> <div class="flex items-center gap-3 mb-8">
          <span class="text-[#e6a23c] font-mono text-xs">03</span>
          <h2 class="text-xl font-bold tracking-widest border-l border-white/30 pl-3">年度展覽與競賽</h2>
        </div>

        <div v-for="item in exhibitionsAndAwards" :key="item.title" class="bg-[#080808] rounded-[2rem] overflow-hidden border border-white/10">
          <div class="aspect-[2/3] relative">
            <img :src="`${basePath}${item.img}`" class="w-full h-full object-cover opacity-80" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent"></div>
          </div>
          <div class="p-8">
            <span class="inline-block px-3 py-1 text-[10px] border border-[#e6a23c]/40 text-[#e6a23c] rounded-full mb-6 font-bold tracking-tighter uppercase">
              {{ item.type }}
            </span>
            <h3 class="text-2xl font-bold mb-6 font-serif tracking-widest text-[#e6a23c]">{{ item.title }}</h3>
            <p class="text-white/60 text-sm leading-[2.2] font-light italic whitespace-pre-line border-l border-white/20 pl-4 mb-8">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </section>

    </div>

    </div>
</template>

<script setup>
import { onMounted } from 'vue'

// 1. 獲取基礎路徑
const basePath = import.meta.env.BASE_URL

const classes = [
  { title: '基礎攝影講座', img: 'img/lectures/class1.jpg' },
  { title: '星空攝影講座', img: 'img/lectures/class2.jpg' },
  { title: '婚紗攝影講座', img: 'img/lectures/class3.jpg' }
]

const photowalks = [
  { title: '人像外拍', img: 'img/camps/walk1.jpg' },
  { title: '婚紗外拍', img: 'img/camps/walk2.jpg' },
  { title: '建築外拍', img: 'img/camps/walk3.jpg' },
  { title: '食物外拍', img: 'img/camps/walk4.jpg' },
  { title: '動態外拍', img: 'img/camps/walk5.jpg' }
]

const exhibitionsAndAwards = [
  { 
    type: '展覽',
    title: '《光影之間》年度比賽', 
    desc: `或許\n隨意拍的一張照片\n將會成為最好的畫面吧\n\n或許\n不拍下那張照片\n才讓這段記憶更加難以忘懷\n\n或許\n是否有記錄下瞬間的照片\n本身是不矛盾的吧`,
    img: 'img/Open-Source-Activity/exhibition.png'
  }
]

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el))
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1.2s ease-out;
}
.reveal-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
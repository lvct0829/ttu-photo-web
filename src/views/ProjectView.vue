<template>
  <div class="bg-[#050505] min-h-screen text-white py-20 px-6 md:px-12 font-sans">
    <div class="max-w-7xl mx-auto">
      
      <div class="mb-20 md:mb-32 text-center scroll-reveal" ref="addRevealRef">
        <span class="text-[#e6a23c] tracking-[0.4em] text-xs md:text-sm uppercase font-semibold">Portfolio & Events</span>
        <h1 class="text-4xl md:text-6xl font-bold mt-4 mb-6 font-serif tracking-widest text-white">活動與展覽紀錄</h1>
        <p class="text-white/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light tracking-wide">
          每一次按下快門，都是對時間的溫柔抵抗。從日常社課的技術淬鍊，到街頭巷尾的實地探索，這裡是我們用影像寫下的日記。
        </p>
      </div>

      <div class="space-y-24 md:space-y-36">

        <section class="scroll-reveal" ref="addRevealRef">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-white/10 pb-6">
            <div>
              <span class="text-[#e6a23c] text-sm tracking-widest uppercase mb-2 block font-mono">01 / Education</span>
              <h2 class="text-3xl md:text-4xl font-bold font-serif tracking-wider">攝影社課</h2>
            </div>
            
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <div v-for="item in classes" :key="item.title" class="group cursor-pointer">
              <div class="overflow-hidden rounded-xl aspect-[3/2] bg-[#111] relative border border-white/5">
                <img 
                  v-if="item.img" 
                  :src="item.img" 
                  :alt="item.title" 
                  class="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div class="mt-5">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-xl font-bold tracking-wide text-white group-hover:text-[#e6a23c] transition-colors duration-300">{{ item.title }}</h3>
                  <span class="text-xs text-white/30 font-mono tracking-wider">{{ item.date }}</span>
                </div>
                <p class="text-white/50 text-sm leading-relaxed font-light">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </section>

        <section class="scroll-reveal" ref="addRevealRef">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-white/10 pb-6">
            <div>
              <span class="text-[#e6a23c] text-sm tracking-widest uppercase mb-2 block font-mono">02 / Photowalk</span>
              <h2 class="text-3xl md:text-4xl font-bold font-serif tracking-wider">外拍實作</h2>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
            <div v-for="(item, index) in photowalks" :key="item.title" 
                 class="group cursor-pointer"
                 :class="index === 0 ? 'md:col-span-8' : 'md:col-span-4'">
              <div class="overflow-hidden rounded-xl bg-[#111] relative border border-white/5" 
                   :class="index === 0 ? 'aspect-[16/9]' : 'aspect-[3/4] md:aspect-[4/5]'">
                <img 
                  v-if="item.img" 
                  :src="item.img" 
                  :alt="item.title" 
                  class="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/10 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
                
                <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span class="text-[#e6a23c] text-xs font-mono tracking-widest block mb-2">{{ item.date }}</span>
                  <h3 class="text-2xl md:text-3xl font-bold tracking-wide text-white drop-shadow-lg mb-2">{{ item.title }}</h3>
                  <p class="text-white/70 text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="scroll-reveal" ref="addRevealRef">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-white/10 pb-6">
            <div>
              <span class="text-[#e6a23c] text-sm tracking-widest uppercase mb-2 block font-mono">03 / Exhibition & Awards</span>
              <h2 class="text-3xl md:text-4xl font-bold font-serif tracking-wider">年度展覽與競賽</h2>
            </div>
          </div>

          <div v-for="item in exhibitionsAndAwards" :key="item.title" 
               class="group cursor-pointer flex flex-col md:flex-row gap-10 md:gap-16 items-center bg-[#0a0a0a] p-6 md:p-10 rounded-2xl border border-white/5 hover:border-[#e6a23c]/20 transition-all duration-700 hover:bg-[#0c0c0c]">
            
            <div class="w-full md:w-[40%] overflow-hidden rounded-xl aspect-[2/3] bg-[#111] shrink-0 relative border border-white/10 shadow-2xl">
              <img 
                v-if="item.img" 
                :src="item.img" 
                :alt="item.title" 
                class="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-110"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

            <div class="w-full md:w-[60%] flex flex-col items-start text-left">
              <span class="inline-block px-4 py-1 text-xs font-mono tracking-[0.2em] uppercase mb-8 rounded-full border border-[#e6a23c]/30 text-[#e6a23c]">
                {{ item.type }}
              </span>
              <h3 class="text-3xl md:text-5xl font-bold tracking-wider text-white mb-8 font-serif group-hover:text-[#e6a23c] transition-colors duration-500">
                {{ item.title }}
              </h3>
              <p class="text-white/60 text-base md:text-xl leading-relaxed font-light mb-10 max-w-2xl whitespace-pre-line">
                {{ item.desc }}
              </p>
              
              <div class="text-white/30 font-mono tracking-[0.2em] text-sm w-full">
                {{ item.date }}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const classes = [
  { 
    title: '基礎攝影講座', 
    img: 'img/lectures/class1.jpg' 
  },
  { 
    title: '星空攝影講座', 
    img: 'img/lectures/class2.jpg' 
  },
  { 
    title: '婚紗攝影講座', 
    img: 'img/lectures/class3.jpg' 
  }
]

const photowalks = [
  { 
    title: '人像外拍', 
    img: '/img/camps/walk1.jpg' 
  },
  { 
    title: '婚紗外拍', 
    img: 'img/camps/walk2.jpg' 
  },
  { 
    title: '建築外拍', 
    img: 'img/camps/walk3.jpg' 
  },
  { 
    title: '食物外拍', 
    img: 'img/camps/walk4.jpg' 
  },
  { 
    title: '動態外拍', 
    img: 'img/camps/walk5.jpg' 
  }
]

const exhibitionsAndAwards = [
  { 
    type: '展覽',
    title: '《光影之間》年度比賽', 
    desc: `或許
          隨意拍的一張照片
          將會成為最好的畫面吧

          或許
          不拍下那張照片
          才讓這段記憶更加難以忘懷

          或許
          是否有記錄下瞬間的照片
          本身是不矛盾的吧`,
    img: 'img/Open-Source-Activity/exhibition.png'
  }
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

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      });
    },
    { threshold: 0.1 }
  )
  document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el))
})
</script>

<style scoped>
.scroll-reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

h1, h2, h3 {
  letter-spacing: 0.05em;
}
</style>
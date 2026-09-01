<template>
  <div class="bg-black min-h-screen pt-24 pb-32 px-6 md:px-12 text-white font-sans overflow-x-hidden relative z-0">
    
    <div class="text-center mb-28 reveal-fade" ref="addRevealRef">
      <h1 class="text-3xl md:text-5xl font-bold mb-4 tracking-widest font-serif text-white">關於我們</h1>
      <p class="text-[#e6a23c] tracking-[0.3em] text-sm md:text-base uppercase">About TTU Photo</p>
    </div>

    <div class="max-w-7xl mx-auto flex flex-col gap-32 relative z-10">
      
      <section class="reveal-up flex flex-col items-center text-center" ref="addRevealRef">
        <h2 class="text-2xl md:text-3xl tracking-[0.2em] font-light text-[#e6a23c] mb-12 flex items-center gap-4">
          <span class="w-12 h-px bg-[#e6a23c] hidden md:block"></span>
          本社成立宗旨
          <span class="w-12 h-px bg-[#e6a23c] hidden md:block"></span>
        </h2>
        <p class="text-white/80 text-[16px] md:text-lg leading-[2.2] tracking-wider max-w-3xl text-justify md:text-center">
          本社成立目的在於透過影像分析及技術指導，讓大家能輕易地使用相機，把所學習到的技能和方法用攝影展現出來，並且加以記錄我們生活週遭一切美好的事物和畫面，藉此提供令人賞心悅目的作品。
        </p>
      </section>

      <div class="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent reveal-fade" ref="addRevealRef"></div>

      <section class="reveal-up" ref="addRevealRef">
        <h2 class="text-2xl md:text-3xl tracking-[0.2em] font-light text-[#e6a23c] mb-20 text-center">
          主要運作方式
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
          
          <div class="bg-black border border-white/10 p-12 md:p-14 min-h-[350px] md:min-h-[400px] flex flex-col justify-end hover:border-[#e6a23c] transition-colors duration-500 group relative overflow-hidden z-0 rounded-xl shadow-2xl">
            <div 
              class="absolute inset-0 z-[-1] opacity-20 bg-cover bg-center transition-all duration-700 group-hover:scale-110 group-hover:opacity-60"
              :style="{ backgroundImage: `url(${basePath}class.jpg)` }"
            ></div>
            <div class="relative z-10 text-left">
              <h3 class="text-2xl font-serif tracking-widest mb-5 font-bold text-white group-hover:text-[#e6a23c] transition-colors">平日社課</h3>
              <p class="text-white/80 leading-relaxed text-[16px] tracking-wide m-0">
                平日社課時間我們會邀請不同類型的攝影師來為我們上課。
              </p>
            </div>
          </div>

          <div class="bg-black border border-white/10 p-12 md:p-14 min-h-[350px] md:min-h-[400px] flex flex-col justify-end hover:border-[#e6a23c] transition-colors duration-500 group relative overflow-hidden z-0 rounded-xl shadow-2xl">
            <div 
              class="absolute inset-0 z-[-1] opacity-20 bg-cover bg-center transition-all duration-700 group-hover:scale-110 group-hover:opacity-60"
              :style="{ backgroundImage: `url(${basePath}outdoor.jpg)` }"
            ></div>
            <div class="relative z-10 text-left">
              <h3 class="text-2xl font-serif tracking-widest mb-5 font-bold text-white group-hover:text-[#e6a23c] transition-colors">假日實拍</h3>
              <p class="text-white/80 leading-relaxed text-[16px] tracking-wide m-0">
                假日會請攝影師帶領我們去做實拍的練習，將理論化為實作。
              </p>
            </div>
          </div>

          <div class="bg-black border border-white/10 p-12 md:p-14 min-h-[350px] md:min-h-[400px] flex flex-col justify-end hover:border-[#e6a23c] transition-colors duration-500 group relative overflow-hidden z-0 rounded-xl shadow-2xl">
            <div 
              class="absolute inset-0 z-[-1] opacity-20 bg-cover bg-center transition-all duration-700 group-hover:scale-110 group-hover:opacity-60"
              :style="{ backgroundImage: `url(${basePath}contest.jpg)` }"
            ></div>
            <div class="relative z-10 text-left">
              <h3 class="text-2xl font-serif tracking-widest mb-5 font-bold text-white group-hover:text-[#e6a23c] transition-colors">年度競賽</h3>
              <p class="text-white/80 leading-relaxed text-[16px] tracking-wide m-0">
                每年都會舉辦「光影之間」攝影比賽，投稿者來自全台各地的高中職及大專院校的學生。
              </p>
            </div>
          </div>

        </div>
      </section>

      <div class="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent reveal-fade" ref="addRevealRef"></div>

      <section class="reveal-up flex flex-col items-center text-center" ref="addRevealRef">
        <h2 class="text-2xl md:text-3xl tracking-[0.2em] font-light text-[#e6a23c] mb-4 flex items-center gap-4">
          <span class="w-12 h-px bg-[#e6a23c] hidden md:block"></span>
          合作夥伴
          <span class="w-12 h-px bg-[#e6a23c] hidden md:block"></span>
        </h2>
        <p class="text-white/50 text-xs tracking-[0.3em] uppercase mb-14">Official Partner — NIKON</p>

        <div class="w-full max-w-4xl border border-[#e6a23c]/30 rounded-xl p-10 md:p-16 bg-gradient-to-b from-white/[0.03] to-transparent relative overflow-hidden">

          <div class="absolute -top-20 -right-20 w-64 h-64 bg-[#e6a23c]/10 rounded-full blur-3xl"></div>

          <div class="relative z-10 flex flex-col items-center gap-6 mb-14">
            <img
              :src="`${basePath}nikon-logo.svg`"
              alt="Nikon"
              class="h-40 md:h-50 object-contain opacity-90"
            />
            <p class="text-white/80 text-[15px] md:text-lg leading-[2] tracking-wider max-w-2xl">
              本社很榮幸與 Nikon 台灣正式合作，不定期邀請 Nikon 專業講師舉辦器材體驗與技術講座，
              讓社員能親身接觸最新機身鏡頭、深入學習各類攝影技巧。
            </p>
          </div>

          <!-- 活動時間軸 -->
          <div class="relative z-10 flex flex-col divide-y divide-white/10 text-left max-w-2xl mx-auto">

            <div class="flex items-center gap-6 py-6 group">
              <div class="flex-shrink-0 w-20 md:w-24 text-[#e6a23c] font-serif text-lg md:text-xl tracking-wider">
                10/15
              </div>
              <div class="flex-1">
                <h3 class="text-white text-base md:text-lg tracking-wide font-medium group-hover:text-[#e6a23c] transition-colors">
                  NIKON 器材大會
                </h3>
              </div>
            </div>

            <div class="flex items-center gap-6 py-6 group">
              <div class="flex-shrink-0 w-20 md:w-24 text-[#e6a23c] font-serif text-lg md:text-xl tracking-wider">
                10/17
              </div>
              <div class="flex-1">
                <h3 class="text-white text-base md:text-lg tracking-wide font-medium group-hover:text-[#e6a23c] transition-colors">
                  NIKON 旅行風景外拍
                </h3>
              </div>
            </div>

            <div class="flex items-center gap-6 py-6 group">
              <div class="flex-shrink-0 w-20 md:w-24 text-[#e6a23c] font-serif text-lg md:text-xl tracking-wider">
                11/05
              </div>
              <div class="flex-1">
                <h3 class="text-white text-base md:text-lg tracking-wide font-medium group-hover:text-[#e6a23c] transition-colors">
                  NIKON 運動攝影
                </h3>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 獲取 Vite 設定中的 base 路徑 (例如 /ttu-photo-web/)
const basePath = import.meta.env.BASE_URL

const revealEls = ref([])
let observer = null

const addRevealRef = (el) => {
  if (el && !revealEls.value.includes(el)) {
    revealEls.value.push(el)
  }
}

onMounted(() => {
  setTimeout(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })

    // 確保 observer 監聽所有需要動畫的元素
    document.querySelectorAll('.reveal-fade, .reveal-up').forEach((el) => {
      observer.observe(el)
    })
  }, 100)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.reveal-up {
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal-fade {
  opacity: 0;
  transition: all 1s ease-out;
}
.is-visible {
  opacity: 1 !important;
  transform: translate(0, 0) !important;
}
</style>
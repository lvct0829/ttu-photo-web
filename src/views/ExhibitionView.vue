<template>
  <div class="bg-black min-h-screen pt-14 p-0 relative overflow-x-hidden text-white font-sans">
    
    <div class="relative w-full z-0">
      <img :src="basePath + 'poster.png'" class="w-full h-auto object-contain block relative z-0" />
      <img :src="basePath + 'overlay.png'" class="absolute top-0 left-0 w-full h-auto z-10 pointer-events-none block" />

      <div class="absolute inset-0 z-40 pointer-events-none flex flex-col justify-start pt-[55%] px-[10%] md:px-[15%] gap-20 md:gap-32">
        <div class="reveal-el reveal-left text-left w-full">
          <p class="text-[clamp(14px,2.5vw,24px)] tracking-[0.3em] leading-loose font-serif">
            或許<br>是否有記錄下瞬間的照片<br>本身是不矛盾的吧
          </p>
        </div>
        <div class="reveal-el reveal-right text-right w-full">
          <p class="text-[clamp(14px,2.5vw,24px)] tracking-[0.3em] leading-loose font-serif">
            或許<br>隨意拍的一張照片<br>將會成為最好的畫面吧
          </p>
        </div>
        <div class="reveal-el reveal-left text-left w-full">
          <p class="text-[clamp(14px,2.5vw,24px)] tracking-[0.3em] leading-loose font-serif">
            或許<br>不拍下那張照片<br>才讓這段記憶更加難以忘懷
          </p>
        </div>
      </div>
    </div>

    <div class="relative bg-black -mt-[35%] md:-mt-[75%] z-30 pb-32">
      <div class="absolute inset-0 z-0 opacity-30 bg-cover bg-fixed bg-center"
           :style="{ backgroundImage: `url(${basePath}poster.png)` }">
      </div>

      <div class="relative z-10">

        <div class="flex justify-center pt-24 mb-16">
          <div class="flex gap-2 p-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <button
              @click="activeTab = 'color'"
              class="px-8 py-2.5 rounded-full text-sm tracking-[0.2em] transition-all duration-500 ease-out"
              :class="activeTab === 'color'
                ? 'text-black bg-[#e6a23c] shadow-[0_0_20px_rgba(230,162,60,0.4)]'
                : 'text-white/60 hover:text-white'"
            >
              彩色組
            </button>

            <button
              @click="activeTab = 'bw'"
              class="px-8 py-2.5 rounded-full text-sm tracking-[0.2em] transition-all duration-500 ease-out"
              :class="activeTab === 'bw'
                ? 'text-black bg-[#e6a23c] shadow-[0_0_20px_rgba(230,162,60,0.4)]'
                : 'text-white/60 hover:text-white'"
            >
              黑白組
            </button>
          </div>
        </div>

        <Transition name="page-fade" mode="out-in">
          <div :key="activeTab">

            <div v-if="activeTab === 'color'">
              <section class="max-w-5xl mx-auto py-16 px-6 border-t border-white/10">
                <div class="text-center mb-20">
                  <h2 class="text-3xl tracking-[0.3em] text-[#e6a23c]">彩色組</h2>
                </div>

                <div class="flex flex-col gap-28">
                  <div v-for="(photo, index) in colorTopAwards" :key="index"
                    class="reveal-el reveal-up flex flex-col md:flex-row gap-10 items-center group cursor-pointer"
                    @click="openLightbox(photo)"
                  >
                    <div class="w-full md:w-3/5 bg-white/5 p-2 shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]">
                      <img :src="basePath + photo.photo" class="w-full max-h-[80vh] object-contain" />
                    </div>
                    <div class="w-full md:w-2/5 px-4">
                      <span class="text-xs font-bold mb-3 block tracking-wider" :class="photo.colorClass">{{ photo.award }}獎</span>
                      <h3 class="text-3xl font-serif mb-2 group-hover:text-[#e6a23c] transition-colors">{{ photo.title }}</h3>
                      <p class="text-white/40 text-sm mb-4">{{ photo.author }} ｜ {{ photo.school }}</p>
                      <p class="text-white/70 text-sm leading-loose tracking-wide whitespace-pre-line">{{ photo.description }}</p>
                    </div>
                  </div>
                </div>
              </section>

              <section class="max-w-7xl mx-auto py-24 px-6 border-t border-white/10">
                <div class="text-center mb-16 text-white/50 tracking-widest text-sm">彩色組佳作</div>
                <div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                  <div v-for="(photo, index) in colorHonorable" :key="index"
                    class="cursor-pointer overflow-hidden bg-white/5 group relative"
                    @click="openLightbox(photo)"
                  >
                    <img :src="basePath + photo.photo" class="w-full hover:scale-105 transition-transform duration-1000" />
                  </div>
                </div>
              </section>
            </div>

            <div v-else>
              <section class="max-w-5xl mx-auto py-16 px-6 border-t border-white/10">
                <div class="text-center mb-20">
                  <h2 class="text-3xl tracking-[0.3em] text-[#e6a23c]">黑白組</h2>
                </div>

                <div class="flex flex-col gap-28">
                  <div v-for="(photo, index) in bwTopAwards" :key="index"
                    class="reveal-el reveal-up flex flex-col md:flex-row gap-10 items-center group cursor-pointer"
                    @click="openLightbox(photo)"
                  >
                    <div class="w-full md:w-3/5 bg-white/5 p-2 shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]">
                      <img :src="basePath + photo.photo" class="w-full max-h-[80vh] object-contain grayscale group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <div class="w-full md:w-2/5 px-4">
                      <span class="text-xs font-bold mb-3 block tracking-wider" :class="photo.colorClass">{{ photo.award }}獎</span>
                      <h3 class="text-3xl font-serif mb-2 group-hover:text-[#e6a23c] transition-colors">{{ photo.title }}</h3>
                      <p class="text-white/40 text-sm mb-4">{{ photo.author }} ｜ {{ photo.school }}</p>
                      <p class="text-white/70 text-sm leading-loose tracking-wide whitespace-pre-line">{{ photo.description }}</p>
                    </div>
                  </div>
                </div>
              </section>

              <section class="max-w-7xl mx-auto py-24 px-6 border-t border-white/10">
                <div class="text-center mb-16 text-white/50 tracking-widest text-sm">黑白組佳作</div>
                <div class="columns-1 md:columns-2 gap-6 space-y-6">
                  <div v-for="(photo, index) in bwHonorable" :key="index"
                    class="cursor-pointer overflow-hidden bg-white/5 group relative"
                    @click="openLightbox(photo)"
                  >
                    <img :src="basePath + photo.photo" class="w-full grayscale hover:grayscale-0 hover:scale-105 transition-all duration-1000" />
                  </div>
                </div>
              </section>
            </div>

          </div>
        </Transition>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="isLightboxOpen" 
        class="fixed inset-0 z-[100] bg-black/fb backdrop-blur-2xl flex items-center justify-center p-6 md:p-12 overflow-y-auto" 
        @click="closeLightbox">
        
        <div class="relative max-w-6xl w-full flex flex-col md:flex-row gap-10 items-center py-10" @click.stop>
          <div class="w-full md:w-3/5 flex justify-center">
            <img :src="basePath + activePhoto.photo" class="max-h-[60vh] md:max-h-[85vh] w-auto shadow-2xl object-contain" />
          </div>
          <div class="w-full md:w-2/5 text-left bg-black/60 md:bg-transparent p-8 rounded-lg">
            <span v-if="activePhoto.award" class="text-xs font-bold tracking-[0.2em] block mb-3" :class="activePhoto.colorClass">{{ activePhoto.award }}獎</span>
            <h4 class="text-3xl md:text-4xl font-serif mb-2 text-white">{{ activePhoto.title }}</h4>
            <p class="text-[#e6a23c]/80 text-sm mb-6 tracking-widest">{{ activePhoto.author }} ｜ {{ activePhoto.school }}</p>
            <div class="h-px w-16 bg-[#e6a23c] mb-8 opacity-50"></div>
            <p class="text-white/90 text-base md:text-lg leading-[1.8] tracking-wide font-light whitespace-pre-line">{{ activePhoto.description }}</p>
            <button @click="closeLightbox" class="mt-12 text-[10px] tracking-[0.3em] border border-white/30 px-8 py-3 hover:bg-white hover:text-black transition-all duration-300 uppercase">
              Close / 關閉
            </button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const basePath = import.meta.env.BASE_URL
const activeTab = ref('color')

// 彩色組數據
const colorTopAwards = ref([
  { 
    award: '金', title: '縫紉', author: '謝富安', school: '世新大學',
    description: '從構圖、調整光圈與快門，到對焦的過程中，奶奶操作縫紉機的手從未停歇。我相信她縫補的不只是衣物，更是縫著歲月，縫著生活裡一針一線的痕跡。',
    photo: 'photos/c1.jpg', colorClass: 'text-yellow-400' 
  },
  { 
    award: '銀', title: '闖入者', author: '施竣友', school: '大同大學',
    description: '在灰暗深邃的幾何迴廊裡，一抹鮮豔的紅闖入視野。按下快門，將這短暫的交錯凝結，在無聲的建築中留住了生命的流動與瞬間的色彩。',
    photo: 'photos/c2.jpg', colorClass: 'text-gray-300' 
  },
  { 
    award: '銅', title: '瞬息光廊', author: '林里行', school: '大同大學',
    description: '午後的金黃餘暉穿過樹梢，把走廊鋪成了一條光之路。這種魔幻的光影轉瞬即逝，我選擇按下快門，把這份溫暖定格下來。這張照片不只是記錄，更是為了給那天的記憶找一個安靜的歸宿。',
    photo: 'photos/c3.jpg', colorClass: 'text-amber-600' 
  }
])

const colorHonorable = ref([
  { award: '佳作', title: '榕下的記憶', author: '鄭安妤', school: '大同大學', description: '盤根錯節的樹根與磚拱共生。站在樹影下，感受光斑在地面舞動的靜謐。拍下這幕，讓這份與歲月共處的安寧，成為記憶中珍貴的一角。', photo: 'photos/c4.jpg' },
  { award: '佳作', title: '巡航', author: '楊佳穎', school: '大同大學', description: '廣闊海面在陽光下閃耀，一艘警艇緩緩巡行其間。遠方城市與橋梁若隱若現，在寧靜的水域裡，守護與日常悄然並存。', photo: 'photos/c5.jpg' },
  { award: '佳作', title: '背影', author: '謝富安', school: '世新大學', description: '阿嬤提著剛買的菜，沿著市場的軌道慢慢走回家。', photo: 'photos/c6.jpg' },
  { award: '佳作', title: '燼中的航向', author: '沈瑞文', school: '靜宜大學', description: '橘紅碎火與白煙炸出翻湧的浪，北港虎爺於炮陣中破浪前行。極致的喧嘩裡，信眾掩耳屏息。在最鼎沸的時刻鬧中取靜，信仰浮出水面，將漫天烽火凝結為無聲的虔誠。', photo: 'photos/c7.jpg' },
  { award: '佳作', title: '雲下', author: '簡嘉圻', school: '照海華德福實業教育機構', description: '就算此刻被雲遮蔽，光也從未離開。它只是躲在層層翻之後，等你抬頭。', photo: 'photos/c8.jpg' },
  { award: '佳作', title: '昨日', author: '顏宇沛', school: '大同大學', description: '昨日尚未遠去，卻已無法觸及，只剩下模糊的片段定格在回憶裡。', photo: 'photos/c9.jpg' }
])

// 黑白組數據
const bwTopAwards = ref([
  { 
    award: '金', title: '時間的切片', author: '簡嘉圻', school: '照海華德福實業教育機構',
    description: '如果把一段旅程攤開， 它或許就是這樣—— \n一格一格地被保存。 \n定格不是停止， \n而是替流動留下一次呼吸。',
    photo: 'photos/b1.jpg', colorClass: 'text-yellow-400' 
  },
  { 
    award: '銀', title: '過客', author: '謝富安', school: '世新大學',
    description: '人們撐著傘在雨中匆匆而行，與櫥窗裡的模特擦肩而過，成為彼此生活中的過客。',
    photo: 'photos/b2.jpg', colorClass: 'text-gray-300' 
  },
  { 
    award: '銅', title: 'Cyber Taipei 賽博台北', author: '沈瑞文', school: '靜宜大學',
    description: '慢快門拉出放射光軌，車流與大樓化極速賽博龐克。光影洪流中，捷運、車流、現代高樓與台式老公寓靜默並存。光線縫合了新舊時代，凝結台北科幻與真實，縫合城市新舊交融想像。',
    photo: 'photos/b3.jpg', colorClass: 'text-amber-600' 
  }
])

const bwHonorable = ref([
  { award: '佳作', title: '手與鰭', author: '林思妤', school: '致理科技大學', description: '快門記錄下玻璃兩側的不同靈魂；孩子的探索、魟魚的游戲，在時間與水不同的流動介質中，定格特別的生命對話。', photo: 'photos/b4.jpg' },
  { award: '佳作', title: '驛站留白', author: '鄭丞晏', school: '大安高工', description: '月台指標前，旅人匆匆。巨大的幾何穹頂宛如時間的刻度，冷冽而深邃。將這繁忙車站的一瞬抽離色彩，讓不停歇的腳步在記憶中暫停。', photo: 'photos/b5.jpg' }
])

const isLightboxOpen = ref(false)
const activePhoto = ref({})

const openLightbox = (p) => {
  activePhoto.value = p
  isLightboxOpen.value = true
  document.body.style.overflow = 'hidden' 
}

const closeLightbox = () => {
  isLightboxOpen.value = false
  document.body.style.overflow = 'auto'
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.page-fade-enter-active { transition: all 0.6s ease-out; }
.page-fade-leave-active { transition: all 0.4s ease-in; }
.page-fade-enter-from { opacity: 0; transform: translateY(20px); }
.page-fade-leave-to { opacity: 0; transform: translateY(-10px); }
.reveal-el { transition: all 1s ease-out; }
</style>
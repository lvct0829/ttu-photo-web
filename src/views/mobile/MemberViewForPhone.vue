<template>
  <div class="bg-black min-h-screen pt-20 pb-10 px-6 font-sans flex flex-col items-center overflow-x-hidden">
    
    <div class="text-center mb-6 animate-fade-in">
      <h1 class="text-3xl font-bold text-white mb-2 tracking-widest font-serif">團隊幹部</h1>
      <p class="text-[#e6a23c] tracking-[0.3em] text-[10px] uppercase opacity-80">114學年 幹部成員</p>
    </div>

    <div class="w-full flex-grow flex flex-col bg-[#080808] border border-white/10 shadow-2xl overflow-hidden rounded-[2rem] relative">
      
      <Transition name="mobile-slide" mode="out-in">
        <div :key="currentIndex" class="flex flex-col h-full">
          
          <div class="w-full aspect-[3/4] overflow-hidden relative shrink-0">
            <img 
              :src="`${basePath}${currentMember.photo}`" 
              :alt="currentMember.name" 
              class="w-full h-full object-cover" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent"></div>
          </div>
          
          <div class="flex-1 p-8 flex flex-col min-h-0">
            <div class="mb-4 border-b border-white/10 pb-4">
              <span class="block text-[#e6a23c] tracking-[0.4em] text-[10px] mb-2 uppercase font-medium">{{ currentMember.title }}</span>
              <h2 class="text-3xl font-bold text-white tracking-wider">{{ currentMember.name }}</h2>
            </div>
            
            <div class="overflow-y-auto pr-2 custom-scrollbar flex-grow">
              <p class="text-white/60 leading-[1.8] text-sm text-justify tracking-wide font-light whitespace-pre-line mb-6">
                {{ currentMember.bio }}
              </p>
            </div>

            <div v-if="currentMember.socials && currentMember.socials.length" class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
              <a 
                v-for="social in currentMember.socials" 
                :key="social.url"
                :href="social.url" 
                target="_blank"
                class="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[#e6a23c] text-xs active:bg-[#e6a23c] active:text-black transition-all"
              >
                <span class="font-bold">IG</span>
                {{ social.label }}
              </a>
            </div>
          </div>

        </div>
      </Transition>
    </div>

    <div class="flex w-full gap-3 mt-6 pb-20"> <button @click="prevMember" class="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-white/40 text-sm font-bold active:bg-white/10 transition-all">
        ← 上一位
      </button>
      <button @click="nextMember" class="flex-1 py-4 bg-[#e6a23c]/10 border border-[#e6a23c]/30 rounded-2xl text-[#e6a23c] text-sm font-bold active:bg-[#e6a23c]/20 transition-all">
        下一位 →
      </button>
    </div>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 1. 獲取路徑前綴
const basePath = import.meta.env.BASE_URL

const members = ref([
  {
    name: '鄭安妤',
    title: '社長',
    photo: 'president.jpeg', 
    bio: `對我來說社團和課業是並行的存在 缺一不可\n
玩的時候玩 該認真的時候認真\n
誰都不能阻止我帶相機出去玩！\n
玩到哪拍到哪 假日不出門就渾身不對勁\n
每個東西都能拍 朋友就是我的模特兒\n
#IE切換自如\n
#秒回仔\n
#緊張大師\n
#幼稚鬼\n
#看起來很閒\n
#好奇寶寶\n
#樣樣行樣樣不行\n

@anyu_zheng @anyu_photo`,
    socials: [
      { label: 'anyu_zheng', url: 'https://www.instagram.com/anyu_zheng' },
      { label: 'anyu_photo', url: 'https://www.instagram.com/anyu_photo' }
    ]
  },
  {
    name: '邱宥彥',
    title: '副社長',
    photo: 'vp.jpg',
    bio: `哈嘍 我機材2B的邱宥諺\n興趣是拍照、打鼓、騎車\n本人比較內向 但熟了之後會挺瘋的\n有喜歡騎車的可以找我一起騎～`,
    socials: []
  },
  {
    name: '黃宥傑',
    title: '副社長/器材長',
    photo: 'vp2.JPG',
    bio: `嗨～～我是資工2B的黃宥傑\n一個愛作夢ㄉ人\n網頁有問題麻煩聯繫我（？\n\n＃lvct0829\n＃INFP\n＃什麼都會,但什麼都不精通\n＃拖延症末期\n＃我想睡覺`,
    socials: [
      { label: 'lvct0829', url: 'https://www.instagram.com/lvct0829' }
    ]
  }, 
  {
    name: '施竣友',
    title: '器材/文書',
    photo: 'gear.jpg', 
    bio: `大家好我是機材2A的施竣友\n目前擔任文書與器材\n是大學才開始接觸相機的\n喜歡拍攝各式各樣奇奇怪怪的東西。`,
    socials: []
  },
  {
    name: '鄒倢宜',
    title: '總務',
    photo: 'IMG_5656.jpg',
    bio: `大家好～我是電機二B的鄒倢宜\n目前在攝影社擔任總務📸\n平常除了跟著攝影社一起外拍\n到處拍拍風景、人像，我也很常跑去棒球場拍比賽⚾️\n記錄球員在場上的每個精彩瞬間！\n對我來說，攝影就是把那些轉瞬即逝的畫面好好保存下來✨`,
    socials: [
       { label: 'jieyi__0602', url: 'https://www.instagram.com/jieyi__0602' }
    ]
  },
  {
    name: '張芯慈',
    title: '美宣/公關',
    photo: 'IMG_1565.jpg',
    bio: `我是美宣兼公關 媒設系 2B 的張芯慈✨ \n\n我平常很喜歡跳舞 💃  \n在舞台上釋放能量 是我最享受的時刻！  \n\n同時也是個小小追星族 ⭐  \n不管是演唱會、應援活動，還是新歌舞台 都會熱血跟進🔥  \n\n另外我也很喜歡攝影 📸  \n喜歡用鏡頭記錄生活裡的細節和那些美好的瞬間`,
    socials: [
      { label: 'xicivi__', url: 'https://www.instagram.com/xicivi__' }
    ]
  },
  {
    name: '陳采融',
    title: '美宣/公關',
    photo: 'IMG_7555.JPG',
    bio: `能有時間自己“一個人”出門的時候喜歡找幾個地方走走拍照\n正在學習拍人像、周邊中\n（買了很多也想讓它們有好看的照片）\n＃我是I人！\n＃遊戲控\n＃甜文小說\n＃失蹤人口\n＃耿鬼`,
    socials: [
      { label: 'vivi＿940521', url: 'https://www.instagram.com/vivi_940521' }
    ]
  }
])

const currentIndex = ref(0)
const currentMember = computed(() => members.value[currentIndex.value])

const nextMember = () => {
  currentIndex.value = (currentIndex.value + 1) % members.value.length
}

const prevMember = () => {
  currentIndex.value = (currentIndex.value - 1 + members.value.length) % members.value.length
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.mobile-slide-enter-active, .mobile-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.mobile-slide-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.mobile-slide-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(230, 162, 60, 0.3);
  border-radius: 10px;
}
</style>
<template>
  <div class="bg-black min-h-screen pt-24 pb-12 px-4 md:px-10 font-sans flex flex-col items-center justify-center">
    
    <div class="text-center mb-10 reveal-fade">
      <h1 class="text-3xl md:text-4xl font-bold text-white mb-3 tracking-widest font-serif">團隊幹部</h1>
      <p class="text-[#e6a23c] tracking-[0.2em] text-xs md:text-sm uppercase opacity-80">114學年 幹部成員</p>
    </div>

    <div class="w-full max-w-[1300px] flex items-center gap-2 md:gap-10 reveal-up">
      
      <button @click="prevMember" class="shrink-0 z-30 p-2 text-white/20 hover:text-[#e6a23c] transition-all duration-300 hidden md:block">
        <svg class="w-10 h-10 lg:w-16 lg:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <div class="flex-grow bg-[#080808] border border-white/10 shadow-2xl overflow-hidden rounded-[30px] md:rounded-[40px] relative">
        <Transition name="slide-fade" mode="out-in">
          <div :key="currentIndex" class="flex flex-col md:flex-row items-stretch md:h-[600px] lg:h-[700px]">
            
            <div class="w-full md:w-auto h-[450px] md:h-full md:aspect-[2/3] overflow-hidden relative shrink-0">
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const members = ref([
  {
    name: '鄭安妤',
    title: '社長',
    photo: 'president.jpeg', 
    bio: `對我來說社團和課業是並行的存在 缺一不可
玩的時候玩 該認真的時候認真
誰都不能阻止我帶相機出去玩！
玩到哪拍到哪 假日不出門就渾身不對勁
每個東西都能拍 朋友就是我的模特兒

#IE切換自如
明明是個E人，但有的時候比I人還I
不是故意不理人、擺臭臉，只是有時候累了
人在魂不在 可以把她喚醒 但不一定會成功
是個自來熟又社恐的矛盾仔

#秒回仔
不管什麼時候傳訊息幾乎都秒回
除非在睡覺 回完她訊息要趕快滑掉 不然回不完

#緊張大師
小小的事都會很緊張開始喊人幫忙 最後發現其實不用

#幼稚鬼
無聊的時候喜歡搗蛋 被她鎖在社辦外是正常現象

#看起來很閒
跟她熟了會發現 她假日不是在社團 就是在去玩的路上
別問她為什麼可以這麼悠哉 你會怕…

#好奇寶寶
她就是一個什麼都會一點 三分鐘熱度的標準典範
但莫名奇妙的是 每個都有一定的水準
她自己常常也覺得奇怪 第一次玩卻像個老手

#樣樣行樣樣不行
很多興趣是她的熱愛 但同時也是致命傷`,
    socials: [
      { label: 'anyu_zheng', url: 'https://www.instagram.com/anyu_zheng' },
      { label: 'anyu_photo', url: 'https://www.instagram.com/anyu_photo' }
    ]
  },
  {
    name: '邱宥彥',
    title: '副社長',
    photo: 'vp.jpg',
    bio: `哈嘍 我機材2B的邱宥諺
興趣是拍照、打鼓、騎車
本人比較內向 但熟了之後會挺瘋的
有喜歡騎車的可以找我一起騎～`,
    socials: []
  },
  {
    name: '黃宥傑',
    title: '副社長/器材長',
    photo: 'vp2.JPG',
    bio: `嗨～～我是資工2B的黃宥傑
一個愛作夢ㄉ人
網頁有問題麻煩聯繫我（？

＃lvct0829
＃INFP
＃什麼都會,但什麼都不精通
＃拖延症末期
＃我想睡覺`,
    socials: [
      { label: 'lvct0829', url: 'https://www.instagram.com/lvct0829' }
    ]
  }, 
  {
    name: '施竣友',
    title: '器材/文書',
    photo: 'gear.jpg', 
    bio: `大家好我是機材2A的施竣友
目前擔任文書與器材
是大學才開始接觸相機的
喜歡拍攝各式各樣奇奇怪怪的東西。`,
    socials: []
  },
  {
    name: '鄒倢宜',
    title: '總務',
    photo: 'IMG_5656.jpg',
    bio: `大家好～我是電機二B的鄒倢宜
目前在攝影社擔任總務📸
平常除了跟著攝影社一起外拍
到處拍拍風景、人像，我也很常跑去棒球場拍比賽⚾️
記錄球員在場上的每個精彩瞬間！
對我來說，攝影就是把那些轉瞬即逝的畫面好好保存下來✨`,
    socials: [
       { label: 'jieyi__0602', url: 'https://www.instagram.com/jieyi__0602' }
    ]
  },
  {
    name: '張芯慈',
    title: '美宣/公關',
    photo: 'IMG_1565.jpg',
    bio: `我是美宣兼公關 媒設系 2B 的張芯慈✨ 

我平常很喜歡跳舞 💃  
在舞台上釋放能量 是我最享受的時刻！  

同時也是個小小追星族 ⭐  
不管是演唱會、應援活動，還是新歌舞台 都會熱血跟進🔥  

另外我也很喜歡攝影 📸  
喜歡用鏡頭記錄生活裡的細節和那些美好的瞬間`,
    socials: [
      { label: 'xicivi__', url: 'https://www.instagram.com/xicivi__' }
    ]
  },
  {
    name: '陳采融',
    title: '美宣/公關',
    photo: 'IMG_7555.JPG',
    bio: `能有時間自己“一個人”出門的時候喜歡找幾個地方走走拍照
正在學習拍人像、周邊中
（買了很多也想讓它們有好看的照片）
＃我是I人！
＃遊戲控
＃甜文小說
＃失蹤人口
＃耿鬼`,
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
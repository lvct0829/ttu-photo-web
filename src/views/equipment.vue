<template>
  <div class="min-h-screen bg-paper py-12 px-6">
    <div class="max-w-5xl mx-auto">
      
      <div class="mb-10 text-center md:text-left">
        <h1 class="text-3xl font-display font-bold text-ink tracking-tight">器材清單</h1>
        <p class="text-clay mt-2 font-medium">TTU PHOTO 器材設備一覽</p>
      </div>

      <div class="flex flex-wrap justify-center md:justify-start gap-2 mb-10">
        <button 
          v-for="tab in tabs" 
          :key="tab.value"
          @click="currentTab = tab.value"
          :class="[
            'px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border',
            currentTab === tab.value 
              ? 'bg-[#e6a23c] border-[#e6a23c] text-white shadow-md' 
              : 'bg-white border-chalk text-clay hover:border-[#e6a23c] hover:text-[#e6a23c]'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="relative min-h-[400px]">
        <TransitionGroup name="list-fade" tag="div" class="grid grid-cols-1 gap-12">
          <section v-for="group in filteredEquipments" :key="group.title">
            <h2 class="text-xl font-bold text-ink mb-6 flex items-center gap-2">
              <span class="w-2 h-6 bg-[#e6a23c] rounded-sm"></span>
              {{ group.title }}
            </h2>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div 
                v-for="item in group.items" 
                :key="item.name" 
                class="p-4 bg-white border border-chalk rounded-xl shadow-sm hover:border-[#e6a23c] hover:shadow-md transition-all duration-300"
              >
                <p class="font-bold text-ink">{{ item.name }}</p>
                <p class="text-xs text-[#e6a23c] mt-1 font-medium tracking-wider uppercase">
                  {{ item.sub }}
                </p>
              </div>
            </div>
          </section>
        </TransitionGroup>
      </div>

      <div class="mt-16 pt-8 border-t border-chalk text-center text-sm text-clay">
        <p>※ 器材借用規範請洽詢社團器材幹部</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentTab = ref('all')

const tabs = [
  { label: '全部器材', value: 'all' },
  { label: '相機機身', value: 'body' },
  { label: '鏡頭列表', value: 'lens' },
  { label: '其他配件', value: 'others' }
]

const equipmentData = {
  body: {
    title: '機身 (Body)',
    items: [
      { name: 'Canon EOS R10 (Ｘ2)', sub: 'Canon-RF' },
      { name: 'Canon EOS R50', sub: 'Canon-RF' },
      { name: 'Canon EOS 77d', sub: 'Canon-EF' },
      { name: 'Nikon D750', sub: 'Nikon-F' }, // 已補上引號
      { name: 'Nikon D7100', sub: 'Nikon-F' }, // 已補上引號
      { name: 'Nikon D7000', sub: 'Nikon-F' }  // 已補上引號
    ]
  },
  
  lens: {
    title: '鏡頭 (Lens)',
    items: [
      // RF 鏡頭
      { name: 'RF-S 10-18mm f/4.5-6.3 IS STM', sub: 'Canon RF' },
      { name: 'RF 100-400mm f/5.6-8 IS USM', sub: 'Canon RF' },
      { name: 'RF-S 18-150mm f/3.5-6.3 IS STM (x2)', sub: 'Canon RF' },
      { name: 'RF 35mm f/1.8 Macro IS STM', sub: 'Canon RF' },
      { name: 'RF 50mm f/1.8 STM', sub: 'Canon RF' },
      { name: 'RF 70-200mm f/4L IS USM', sub: 'Canon RF' },
      { name: 'RF-S 18-50mm f/2.8 (Sigma)', sub: 'Canon RF' },
      
      // EF 鏡頭
      { name: 'EF 24mm f/2.8', sub: 'Canon EF' },
      { name: 'EF-S 18-135mm f/3.5-5.6 IS', sub: 'Canon EF' },
      { name: 'Sigma 10-20mm f/4-5.6 EX DC', sub: 'Canon EF' },
      { name: 'EF 75-300mm f/4-5.6', sub: 'Canon EF' },
      { name: 'EF 50mm f/1.8 STM', sub: 'Canon EF' },

      // Nikon F 鏡頭
      { name: 'AF-S 50mm f/1.8D (x2)', sub: 'Nikon F' },
      { name: 'AF-S 35mm f/1.8G', sub: 'Nikon F' },
      { name: 'Tamron 24-70mm f/2.8 Di VC USD', sub: 'Nikon F' },
      { name: 'AF-S 18-300mm f/3.5-5.6G', sub: 'Nikon F' },
      { name: 'AF-S 18-200mm f/3.5-5.6G', sub: 'Nikon F' }
    ]
  },
  others: {
    title: '其他配件 (Others)',
    items: [
      { name: '閃光燈', sub: 'Flash' },
      { name: '攝影包', sub: 'Camera Bag' },
      { name: '三腳架', sub: 'Tripod' },
      { name: '轉接環 (EF to RF)', sub: 'Adapter' },
      { name: 'SD 記憶卡 (64GB/128GB)', sub: 'Storage' },
      { name: '快門線', sub: 'Accessory' }
    ]
  }
}

const filteredEquipments = computed(() => {
  if (currentTab.value === 'all') {
    return Object.values(equipmentData)
  }
  return [equipmentData[currentTab.value]].filter(Boolean)
})
</script>
<template>
  <div class="flex h-screen background">
    <div class="h-full transition-all duration-300  overflow-hidden z-40" :class="isCollapsed ? 'w-0' : 'w-1/6'">
      <div class="relative m-3">
        <input type="email"
          class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Введите наименование ЖК" v-model="search" />
        <button
          class="absolute left-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
            <path fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <div class="container-card m-4 h-full">
        <h2>Объекты</h2>
        <div class="container-card-wrapper h-full flex flex-col gap-5">
          <div class=" " v-for="item in items">
            <div
              class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow">
              <div class="title">{{ item }}</div>
            </div>
          </div>
        </div>
      </div>

    </div>


    <div class="flex-1 bg-transparent relative" :class="isCollapsed ? '' : 'm-2 rounded-md '">
      <button @click="toggleCollapse"
        class="absolute z-40 left-0 top-[47%] pr-3 p-2 bg-gray-800 text-white rounded-tr-md rounded-br-md hover:bg-gray-700 transition-colors  "
        :class="isCollapsed ? 'rounded-tl-md rounded-bl-md left-2 pl-3 ' : ''">
        {{ isCollapsed ? ">" : "<" }} </button>

          <!-- Обертка для карты и overlay -->
          <div class="relative h-full w-full">
            <MapboxMap map-id="map1" :ref="mapRefHard" style="position: relative; width: 100%; height: 100%;"
              class="rounded-md" :options="{
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [73.40940, 61.25096],
                zoom: 15
              }" />
          </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Marker, Popup } from 'mapbox-gl';
const mapRefHard = ref(null)
const mapRef = useMapboxRef('map1');
const isCollapsed = ref(false);
const search = ref("");
const items = ref([])
watch(search, async () => {
  if (search.value.length > 3) {
    items.value.push(search.value)
  }
})
const toggleCollapse = async () => {
  isCollapsed.value = !isCollapsed.value;
};


nextTick(() => {
  if (mapRefHard.value) {
    const mak = new Marker().setLngLat([73.40940, 61.25096]).setPopup(new Popup().setHTML("<h1>Hello World!</h1>")).addTo(mapRefHard.value)
    console.log(mak)
  }
})
</script>

<style>
.background {
  background-color: #ffffff;
}

.container-card-wrapper {
  overflow-y: scroll;
  /* Включаем вертикальный скролл */
  scrollbar-width: none;
  /* Для Firefox */
  -ms-overflow-style: none;
  /* Для IE и Edge */
}
</style>
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
      <div class="container-card m-4 h-[85%]">
        <h2>Объекты</h2>
        <div class="container-card-wrapper h-full flex flex-col gap-5">
          <div v-for="item in paginationItems" :key="item.id">
            <div
              class="w-full  flex items-start gap-4 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md p-4 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              :class="{
                'bg-transparent': item.id !== selectId,
                'bg-gray-100': item.id == selectId
              }" @click="selectId = item.id">
              <div class="images w-24 shrink-0">
                <img :src="item.image" alt="..." class="w-full h-auto rounded-md object-cover">
              </div>
              <div class="data flex-1">
                <div class="title font-semibold text-base mb-2">{{ item.title }}</div>
                <div class="deck text-slate-500 text-sm">{{ item.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="paginator items-center w-full flex mt-6" style="justify-content: space-evenly">
        <button type="button" @click="page === 0 ? page + 0 : page--"
          class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-gray-800 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z"
              fill="white" />
          </svg>
          <span class="sr-only">Icon description</span>
        </button>
        {{ page + 1 }} / {{ allPages }}
        <button type="button" @click="page === allPages - 1 ? page + 0 : page++"
          class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-gray-800 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
          <span class="sr-only">Icon description</span>
        </button>
      </div>
    </div>


    <div class="flex-1 bg-transparent relative" :class="isCollapsed ? '' : 'm-2 rounded-md '">
      <button @click="toggleCollapse"
        class="absolute z-40 left-0 top-[47%] pr-3 p-2 bg-gray-800 text-white rounded-tr-md rounded-br-md hover:bg-gray-700 transition-colors  "
        :class="isCollapsed ? 'rounded-tl-md rounded-bl-md left-2 pl-3 ' : ''">
        {{ isCollapsed ? ">" : "<" }} </button>

          <div class="relative h-full w-full">
            <iframe :ref="map" :src="'/api/getMap?id=' + uuid" class="absolute left-0 top-0 h-full w-full rounded-md"
              frameborder="0"></iframe>
          </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const uuid: Ref<string | undefined> = ref();
const isCollapsed = ref(false);
const search = ref("");
const selectId = ref(-1)
const map = ref()

const items: Ref<{
  id: number,
  title: string,
  desc?: string,
  image?: string,
  latLan: [number, number]
}[]> = ref([{
  id: 1,
  title: "Central Park",
  desc: "A large public park in New York City.",
  image: 'https://shop.purina.ru/media/wysiwyg/57cca243f2b910f75679a08f_1_1_.jpg',
  latLan: [40.785091, -73.968285]
},
{
  id: 2,
  title: "Eiffel Tower",
  desc: "A wrought-iron lattice tower in Paris, France.",
  image: 'https://shop.purina.ru/media/wysiwyg/57cca243f2b910f75679a08f_1_1_.jpg',
  latLan: [48.858844, 2.294351]
},
{
  id: 3,
  title: "Great Wall of China",
  desc: "A series of fortifications made of stone, brick, and other materials.",
  image: 'https://shop.purina.ru/media/wysiwyg/57cca243f2b910f75679a08f_1_1_.jpg',
  latLan: [40.431908, 116.570374]
},
{
  id: 4,
  title: "Statue of Liberty",
  desc: "A colossal neoclassical sculpture on Liberty Island in New York Harbor.",
  image: 'https://shop.purina.ru/media/wysiwyg/57cca243f2b910f75679a08f_1_1_.jpg',
  latLan: [40.689247, -74.044502]
},
{
  id: 5,
  title: "Taj Mahal",
  desc: "An ivory-white marble mausoleum in Agra, India.",
  image: 'https://shop.purina.ru/media/wysiwyg/57cca243f2b910f75679a08f_1_1_.jpg',
  latLan: [27.175144, 78.042142]
},
{
  id: 6,
  title: "Machu Picchu",
  desc: "A 15th-century Inca citadel situated on a mountain ridge in Peru.",
  image: 'https://shop.purina.ru/media/wysiwyg/57cca243f2b910f75679a08f_1_1_.jpg',
  latLan: [-13.163141, -72.544963]
},
{
  id: 7,
  title: "Sydney Opera House",
  desc: "A multi-venue performing arts centre in Sydney, Australia.",
  image: 'https://shop.purina.ru/media/wysiwyg/57cca243f2b910f75679a08f_1_1_.jpg',
  latLan: [-33.856784, 151.215297]
},
{
  id: 8,
  title: "Colosseum",
  desc: "An oval amphitheatre in the centre of Rome, Italy.",
  image: 'https://shop.purina.ru/media/wysiwyg/57cca243f2b910f75679a08f_1_1_.jpg',
  latLan: [41.890251, 12.492373]
},
{
  id: 9,
  title: "Mount Everest",
  desc: "Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas.",
  image: 'https://shop.purina.ru/media/wysiwyg/57cca243f2b910f75679a08f_1_1_.jpg',
  latLan: [27.988120, 86.924975]
},
{
  id: 10,
  title: "Grand Canyon",
  desc: "A steep-sided canyon carved by the Colorado River in Arizona, USA.",
  image: 'https://shop.purina.ru/media/wysiwyg/57cca243f2b910f75679a08f_1_1_.jpg',
  latLan: [36.106965, -112.112997]
}])

const page = ref(0);

const itemsPerPage = 5;

const allPages = computed(() => {
  const filteredItems = filteredAndPagination(search.value);
  return Math.ceil(filteredItems.length / itemsPerPage);
});
const paginationItems = computed(() => {
  const filteredItems = filteredAndPagination(search.value);
  return filteredItems.slice(page.value * itemsPerPage, (page.value * itemsPerPage) + itemsPerPage);
});
const filteredAndPagination = (_search = "") => {
  if (_search.length === 0) return items.value

  const searchLower = _search.toLowerCase();
  const result = items.value.filter(e =>
    _search && (
      e.desc?.toLowerCase().includes(searchLower) ||
      (e.title && e.title.toLowerCase().includes(searchLower))
    )
  );

  return result
}

onMounted(() => {
  uuid.value = crypto.randomUUID()
  console.log(map.value)
})
watch(selectId, async (newVal) => {
  const _item = items.value.find(e => e.id === selectId.value)
  console.log(uuid.value)
  await fetch('/api/changeMarker', {
    method: "POST",
    body: JSON.stringify({
      id: uuid.value,
      lat: _item.latLan[0],
      lan: _item.latLan[1],
    })
  })
})

watch(search, async () => {
  if (search.value.length > 3) {
    const newId = search.value.length;
    const exists = items.value.some(item => item.id === newId);

    if (!exists) {
      items.value.push({
        id: newId,
        title: search.value,
        image: 'https://shop.purina.ru/media/wysiwyg/57cca243f2b910f75679a08f_1_1_.jpg',
        desc: "Что то",
        latLan: [
          61.28203 + (Math.random() * 0.01) - (Math.random() * 0.01),
          73.3897 + (Math.random() * 0.01) - (Math.random() * 0.01)
        ]
      });
    }
  }
})

const toggleCollapse = async () => {
  isCollapsed.value = !isCollapsed.value;
};

</script>

<style>
.background {
  background-color: #ffffff;
}

.container-card-wrapper {
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>
<template>
  <div class="flex flex-col justify-center items-center h-[100svh] space-y-10">
    <p class="text-xl font-bold">ToDo App</p>
    <p>Built with Vue.js + Vite + TailwindCSS</p>
    <div class="flex flex-col">
      <router-link to="/app" class="flex flex-nowrap items-center gap-2 px-4 py-2 border-2 rounded-xl"
        >Open ToDo App
        <span
          class="bg-gray-300 block size-4"
          style="clip-path: polygon(0 0, 0% 100%, 100% 50%)"
        ></span>
      </router-link>
    </div>
  </div>
</template>

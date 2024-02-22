<template>
  <nav class="flex gap-x-4 px-8 my-4 items-center">
    <router-link to="/" class="mr-auto">ToDo Logo</router-link>
    <router-link to="/app" class="max-sm:hidden">Home</router-link>
    <router-link to="/about" class="max-sm:hidden">About</router-link>
    <router-link to="/contact" class="max-sm:hidden">Contact</router-link>
    <button class="hidden max-sm:flex flex-col gap-1 p-2">
      <span class="block w-4 h-1 bg-black rounded-full" />
      <span class="block w-4 h-1 bg-black rounded-full" />
      <span class="block w-4 h-1 bg-black rounded-full" />
    </button>
  </nav>
</template>

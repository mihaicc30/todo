<script setup>
import Nav from "@/nav/Nav.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const isNotRootRoute = computed(() => route.path !== "/");
</script>

<template>
  <Nav v-if="isNotRootRoute" />
  <router-view />
</template>

<script setup>
import { ref } from "vue";

const { todo, jobs } = defineProps(["todo", "jobs"]);
let newTaskInput = ref("");

const addNewTask = () => {
  if (newTaskInput.value.length > 2) {
    try {
      jobs.todo.push({
        completed: false,
        taskName: newTaskInput.value,
        assignedToDo: [],
        list: "todo",
      });
      newTaskInput.value = "";
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<template>
  <div class="flex flex-nowrap gap-2 px-4">
    <button
      v-if="newTaskInput.length > 0"
      @click="newTaskInput = ''"
      class="p-2 mr-2 border-2 rounded-lg"
    >
      ✖
    </button>
    <input
      type="text"
      v-model="newTaskInput"
      @keyup.enter="addNewTask"
      placeholder="New task..."
      class="p-4 border-b-2 w-full outline-none"
      :class="{
        'border-red-400': newTaskInput.length > 0 && newTaskInput.length < 3,
      }"
    />
    <button
      v-if="newTaskInput.length > 0"
      @click="addNewTask"
      class="p-2 mr-2 border-2 rounded-lg"
    >
      ▶
    </button>
  </div>
</template>

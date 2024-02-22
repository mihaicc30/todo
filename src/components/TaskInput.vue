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
  <div class="flex flex-nowrap gap-2 px-4 my-2 bg-gray-200 mx-4 rounded-lg">
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
      class="px-4 py-2 my-4 rounded-lg w-full outline-none"
      :class="{
        'ring-2 ring-red-400':
          newTaskInput.length > 0 && newTaskInput.length < 3,
      }"
    />
    <button
      v-if="newTaskInput.length > 0"
      @click="addNewTask"
      class="p-2 mr-2 border-2 rounded-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="size-10"
      >
        <path
          stroke="#363636"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m10 16 4-4-4-4"
        />
      </svg>
    </button>
  </div>
</template>

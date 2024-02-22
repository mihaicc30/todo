<script setup>
const {
  listType,
  todo,
  logHoveredTaskElement,
  clearHoveredTaskElement,
  startDraggingTask,
  stopDraggingTask,
  dropTaskHandler,
  logHoveredElement,
  clearHoveredElement,
  dropHandler,
  removeUser,
  handleDeleteTask
} = defineProps([
  "listType",
  "todo",
  "logHoveredTaskElement",
  "clearHoveredTaskElement",
  "startDraggingTask",
  "stopDraggingTask",
  "dropTaskHandler",
  "logHoveredElement",
  "clearHoveredElement",
  "dropHandler",
  "removeUser",
  "handleDeleteTask"
]);

import { ref } from "vue";

let showRemoveButton = ref(false);
</script>

<template>
  <div
    @dragenter="logHoveredTaskElement(listType)"
    @dragover.prevent
    @drop="dropTaskHandler(listType)"
    @dragleave="clearHoveredTaskElement"
    class="flex flex-col gap-2 border-2 p-2 rounded-lg bg-gray-200"
    id="todo"
  >
    <p class="text-center border-b-2 capitalize font-[600]">{{ listType }}</p>
    <!-- LIST OF TASKS -->
    <div
      v-for="task in todo"
      class="flex flex-col gap-2 p-2 bg-white rounded-lg"
    >
      <div
        draggable="true"
        @dragstart="startDraggingTask(task)"
        @dragend="stopDraggingTask"
        class="flex flex-nowrap gap-2 w-full cursor-pointer"
        :class="{ 'line-through': task.completed }"
        @click="task.completed = !task.completed"
        @dragenter="logHoveredElement(task.taskName, listType)"
        @dragover.prevent
        @drop="dropHandler(`${listType}`, $event, task)"
        @dragleave="clearHoveredElement"
      >
        <input type="checkbox" v-model="task.completed" />
        <p class="flex-1 font-[600]">{{ task.taskName }}</p>
        <span>
          <svg
            class="size-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="#2e2e2e"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{0.744}"
              d="M12 3v18m0-18L9 6m3-3 3 3m-3 15 3-3m-3 3-3-3m-6-6h18M3 12l3 3m-3-3 3-3m15 3-3-3m3 3-3 3"
            />
          </svg>
        </span>
      </div>
      <div
        @dragenter="logHoveredElement(task.taskName, listType)"
        @dragover.prevent
        @drop="dropHandler(`${listType}`, $event, task)"
        @dragleave="clearHoveredElement"
        class="flex flex-wrap gap-2 w-full"
      >
        <!-- LIST OF USERS ASSIGNED TO THE TASK -->
        <div
          v-if="task.assignedToDo.length > 0"
          v-for="user in task.assignedToDo"
          :key="user.name"
          class="relative flex flex-col gap-x-2 border-2 m-1 p-1 text-xs items-center rounded-lg"
          @mouseenter="
            showRemoveButton = {
              userName: user.name,
              taskName: task.taskName,
            }
          "
          @mouseleave="showRemoveButton = null"
        >
          <p class="border-b-2">{{ user.name }}</p>
          <p class="text-[8px]">{{ user.role }}</p>
          <button
            v-if="
              showRemoveButton &&
              showRemoveButton.userName === user.name &&
              showRemoveButton.taskName === task.taskName
            "
            @click="removeUser(user, listType, task.taskName)"
            class="bg-white/50 rounded-full absolute w-full h-full text-3xl font-bold left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex justify-center items-center"
          >
            X
          </button>
        </div>
      </div>
      <div class="flex justify-end">
        <svg @click="handleDeleteTask(task.taskName, task.list)" class="size-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <g
            stroke="#292929"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{0.912}"
          >
            <path
              d="M10 11v6M14 11v6M4 7h16M6 7h12v11a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V7ZM9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9V5Z"
            />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

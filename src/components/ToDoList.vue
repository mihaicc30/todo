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
    <p class="text-center mb-2 border-b-2 capitalize">{{ listType }}</p>
    <!-- LIST OF TASKS -->
    <div v-for="task in todo" class="flex flex-col gap-2 p-2 bg-white rounded-lg">
      <div
        draggable="true"
        @dragstart="startDraggingTask(task)"
        @dragend="stopDraggingTask"
        class="flex flex-nowrap gap-2 w-full"
        :class="{ 'line-through': task.completed }"
        @click="task.completed = !task.completed"
        @dragenter="logHoveredElement(task.taskName, listType)"
        @dragover.prevent
        @drop="dropHandler(`${listType}`, $event, task)"
        @dragleave="clearHoveredElement"
      >
        <input type="checkbox" v-model="task.completed" />
        <p class="flex-1 cursor-pointer">{{ task.taskName }}</p>
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
    </div>
  </div>
</template>

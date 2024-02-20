// import HelloWorld from "./components/HelloWorld.vue";
<script setup>
import { ref, watch } from "vue";

// useState
let counter = ref(0);

// useEffect
watch(counter, (newValue, oldValue) => {
  console.log(`Counter changed from ${oldValue} to ${newValue}`);
});

let showRemoveButton = ref(false);

let newTaskInput = ref("");

let users = ref([{ name: "Mihai", role: "JSD" }]);
// JSD == junior software developer

let todo = ref([
  {
    completed: false,
    taskName: "Work on A",
    assignedToDo: [],
  },
  {
    completed: false,
    taskName: "Work on B",
    assignedToDo: [{ name: "Mihai", role: "JSD" }],
  },
  {
    completed: false,
    taskName: "Work on C",
    assignedToDo: [],
  },
]);
let doing = ref([]);
let done = ref([]);

const removeUser = (userToRemove, fromList, taskName) => {
  console.log(
    `trying to remove ${userToRemove.name} from TN:${taskName} - ${fromList}`
  );

  if (fromList === "todo") {
    // Check if taskName exists in the tasks
    const taskExists = todo.value.some((task) => task.taskName === taskName);

    if (taskExists) {
      todo.value = todo.value.map((tasky) => {
        if (tasky.taskName === taskName) {
          return {
            ...tasky,
            assignedToDo: tasky.assignedToDo.filter(
              (ATD) => ATD.name !== userToRemove.name
            ),
          };
        } else {
          return tasky;
        }
      });
    } else {
      console.error(`Task ${taskName} not found.`);
    }
  }
};

const addNewTask = () => {
  todo.value.push({
    completed: false,
    taskName: newTaskInput.value,
    assignedToDo: [],
  });
  newTaskInput.value = "";
};

// USER DRAGGING EVENTS
let draggingElement = ref(null);
let hoveredElement = null;

const logHoveredElement = (elementId, list) => {
  hoveredElement = elementId;
};

const clearHoveredElement = () => {
  hoveredElement = null;
};

const startDraggingUser = (user) => {
  draggingElement.value = user;
};
const stopDraggingUser = () => {
  draggingElement.value = null;
};

const dropHandler = (targetList, event, task) => {
  event.preventDefault();

  if (draggingElement.value) {
    // Implement your logic to move the user to the target list
    addUser(draggingElement.value, targetList, task.taskName);
  }

  clearHoveredElement();
};

const addUser = (userToAdd, toList, taskName) => {
  const targetTask = todo.value.find((task) => task.taskName === taskName);
  const userExists = targetTask.assignedToDo.some(
    (existingUser) => existingUser.name === userToAdd.name
  );

  if (!userExists) {
    targetTask.assignedToDo.push({
      name: userToAdd.name,
      role: userToAdd.role,
    });
    console.log("✅ Assigned task to user.");
  } else {
    console.log("⛔ User already assigned.");
  }
};

// TASK DRAGGING EVENTS

let draggingTaskElement = ref(null);

const logHoveredTaskElement = (elementId, list) => {
  hoveredElement = elementId;
};

const clearHoveredTaskElement = () => {
  hoveredElement = null;
};

const startDraggingTask = (task) => {
  draggingElement.value = task;
};
const stopDraggingTask = () => {
  draggingElement.value = null;
};

const dropTaskHandler = (targetList, event, task) => {
  event.preventDefault();

  if (draggingElement.value) {
    // Implement your logic to move the user to the target list
    addUser(draggingElement.value, targetList, task.taskName);
  }

  clearHoveredElement();
};
</script>

<template>
  <p class="text-center font-bold text-5xl my-4">To Do App</p>
  <div class="flex px-4">
    <!-- LIST OF AVAILABLE USERS -->
    <div
      v-for="user in users"
      class="flex flex-col border-2 aspect-square px-3 p-1 m-1 text-xs items-center justify-center rounded-full"
      draggable="true"
      @dragstart="startDraggingUser(user)"
      @dragend="stopDraggingUser"
    >
      🐱
      <p class="text-[8px]">{{ user.role }}</p>
      <p>{{ user.name }}</p>
    </div>
  </div>

  <div class="flex flex-nowrap">
    <button
      v-if="newTaskInput.length > 0"
      @click="newTaskInput = ''"
      class="p-2 ml-2"
    >
      ✖
    </button>
    <input
      type="text"
      v-model="newTaskInput"
      placeholder="New task..."
      class="m-4 p-4 border-b-2 w-full"
    />
    <button v-if="newTaskInput.length > 0" @click="addNewTask" class="p-2 mr-2">
      ▶
    </button>
  </div>

  <div class="grid grid-cols-3 gap-4 px-4">
    <div class="flex flex-col gap-2 border-2 p-2" id="todo">
      <p class="text-center mb-2 border-b-2">To Do</p>
      <!-- LIST OF TO-DO TASKS -->
      <div v-for="task in todo" class="flex flex-col gap-2">
        <div
          :class="{ 'line-through': task.completed }"
          @click="task.completed = !task.completed"
          class="flex flex-nowrap gap-2"
          @dragenter="logHoveredElement(task.taskName, 'todo')"
          @dragover.prevent
          @drop="dropHandler('todo', $event, task)"
          @dragleave="clearHoveredElement"
        >
          <input type="checkbox" v-model="task.completed" />
          <p>{{ task.taskName }}</p>
        </div>
        <div
          class="grid max-h-[64px]"
          :class="`grid-cols-${task.assignedToDo.length}`"
        >
          <div
            v-if="task.assignedToDo.length > 0"
            v-for="user in task.assignedToDo"
            :key="user.name"
            class="max-h-[64px] relative flex flex-col aspect-square px-5 py-2 text-xs items-center justify-center rounded-full"
            @mouseenter="showRemoveButton = true"
            @mouseleave="showRemoveButton = false"
          >
            🐱
            <p class="text-[8px]">{{ user.role }}</p>
            <p>{{ user.name }}</p>
            <button
              v-if="showRemoveButton"
              @click="removeUser(user, 'todo', task.taskName)"
              class="bg-white/50 rounded-full p-1 mt-1 absolute inset-0 text-3xl font-bold"
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      @dragenter="logHoveredTaskElement('doing')"
      @dragover.prevent
      @drop="dropTaskHandler('doing')"
      @dragleave="clearHoveredTaskElement"
      class="flex flex-col gap-2 border-2 p-2"
      id="doing"
    >
      <p class="text-center mb-2 border-b-2">Doing</p>
    </div>
    <div
      @dragenter="logHoveredTaskElement('done')"
      @dragover.prevent
      @drop="dropTaskHandler('done')"
      @dragleave="clearHoveredTaskElement"
      class="flex flex-col gap-2 border-2 p-2"
      id="done"
    >
      <p class="text-center mb-2 border-b-2">Done</p>
    </div>
  </div>

  <p class="my-20"></p>

  <!-- <div class="flex flex-col">
    <p>Test</p>
    <button @click="counter++" class="p-2 border-2">
      {{ counter }}
    </button>
  </div> -->
</template>

<!-- 
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->

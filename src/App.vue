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

let newUserInput = ref("");
let newTaskInput = ref("");

let users = ref([
  { name: "Mihai", role: "JSD" },
  { name: "Joe", role: "JSD" },
  { name: "Dan", role: "JSD" },
]);
// JSD == junior software developer

const addNewUser = () => {
  users.value.push({ name: newUserInput.value, role: "JSD" });
  newUserInput.value = "";
};

let todo = ref([
  {
    completed: false,
    taskName: "Work on A",
    assignedToDo: [],
    list: "todo",
  },
  {
    completed: false,
    taskName: "Work on B",
    assignedToDo: [{ name: "Mihai", role: "JSD" }],
    list: "todo",
  },
  {
    completed: false,
    taskName: "Work on C",
    assignedToDo: [],
    list: "todo",
  },
]);
let doing = ref([]);
let done = ref([]);

const removeUser = (userToRemove, fromList, taskName) => {
  console.log(
    `trying to remove ${userToRemove.name} from TN:${taskName} - ${fromList}`
  );
  switch (fromList) {
    case "todo":
      const todoTaskExists = todo.value.some(
        (task) => task.taskName === taskName
      );
      if (todoTaskExists) {
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
      }
      break;
    case "doing":
      const doingTaskExists = doing.value.some(
        (task) => task.taskName === taskName
      );
      if (doingTaskExists) {
        doing.value = doing.value.map((tasky) => {
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
      }
      break;
    case "done":
      const doneTaskExists = done.value.some(
        (task) => task.taskName === taskName
      );
      if (doneTaskExists) {
        done.value = done.value.map((tasky) => {
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
      }
      break;

    default:
      break;
  }
};

const addNewTask = () => {
  todo.value.push({
    completed: false,
    taskName: newTaskInput.value,
    assignedToDo: [],
    list: "todo",
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
  switch (toList) {
    case "todo":
      const todoTargetTask = todo.value.find(
        (task) => task.taskName === taskName
      );
      const userExists = todoTargetTask.assignedToDo.some(
        (existingUser) => existingUser.name === userToAdd.name
      );

      if (!userExists) {
        todoTargetTask.assignedToDo.push({
          name: userToAdd.name,
          role: userToAdd.role,
        });
        console.log("✅ Assigned task to user.");
      } else {
        console.log("⛔ User already assigned.");
      }
      break;
    case "doing":
      const doingTargetTask = doing.value.find(
        (task) => task.taskName === taskName
      );
      const userExists1 = doingTargetTask.assignedToDo.some(
        (existingUser) => existingUser.name === userToAdd.name
      );

      if (!userExists1) {
        doingTargetTask.assignedToDo.push({
          name: userToAdd.name,
          role: userToAdd.role,
        });
        console.log("✅ Assigned task to user.");
      } else {
        console.log("⛔ User already assigned.");
      }
      break;
    case "done":
      const doneTargetTask = done.value.find(
        (task) => task.taskName === taskName
      );
      const userExists2 = doneTargetTask.assignedToDo.some(
        (existingUser) => existingUser.name === userToAdd.name
      );

      if (!userExists2) {
        doneTargetTask.assignedToDo.push({
          name: userToAdd.name,
          role: userToAdd.role,
        });
        console.log("✅ Assigned task to user.");
      } else {
        console.log("⛔ User already assigned.");
      }
      break;

    default:
      break;
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
  console.log("🚀 ~ startDraggingTask ~ task:", task);
  draggingTaskElement.value = task;
};
const stopDraggingTask = () => {
  console.log("🚀 ~ stopDraggingTask ~ task:", draggingTaskElement);
  draggingTaskElement.value = null;
};

const dropTaskHandler = (list) => {
  console.log("🚀 Dropping on list:", list);
  // event.preventDefault();
  if (draggingTaskElement.value) {
    // Assuming 'list' is an array in the props
    const index = todo.value.indexOf(draggingTaskElement.value);
    console.log(">>>>>> ", draggingTaskElement.value.list);

    // remove task from initial group
    removeTaskFromInitialGroup(
      draggingTaskElement.value.list,
      draggingTaskElement.value.taskName
    );
    addTaskToGroup(list, draggingTaskElement.value);
  }

  clearHoveredTaskElement();
};

const removeTaskFromInitialGroup = (list, task) => {
  switch (list) {
    case "todo":
      todo.value = todo.value.filter((tasky) => tasky.taskName !== task);
      break;
    case "doing":
      doing.value = doing.value.filter((tasky) => tasky.taskName !== task);
      break;
    case "done":
      done.value = done.value.filter((tasky) => tasky.taskName !== task);
      break;
    default:
      break;
  }
};

const addTaskToGroup = (list, task) => {
  switch (list) {
    case "todo":
      todo.value.push({
        ...task,
        list: list,
      });
      break;
    case "doing":
      doing.value.push({
        ...task,
        list: list,
      });
      break;
    case "done":
      done.value.push({
        ...task,
        list: list,
      });
      break;
    default:
      break;
  }
};
</script>

<template>
  <p class="text-center font-bold text-5xl my-4">To Do App</p>

  <div class="flex flex-nowrap">
    <button
      v-if="newUserInput.length > 0"
      @click="newUserInput = ''"
      class="p-2 ml-2"
    >
      ✖
    </button>
    <input
      type="text"
      v-model="newUserInput"
      placeholder="New user..."
      class="m-4 p-4 border-b-2 w-full"
    />
    <button v-if="newUserInput.length > 0" @click="addNewUser" class="p-2 mr-2">
      ▶
    </button>
  </div>

  <div class="flex px-4">
    <!-- LIST OF AVAILABLE USERS -->
    <div
      v-for="user in users"
      class="flex flex-col border-2 h-20 w-20 m-1 text-xs items-center justify-center rounded-full"
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
    <div
      @dragenter="logHoveredTaskElement('todo')"
      @dragover.prevent
      @drop="dropTaskHandler('todo')"
      @dragleave="clearHoveredTaskElement"
      class="flex flex-col gap-2 border-2 p-2"
      id="todo"
    >
      <p class="text-center mb-2 border-b-2">To Do</p>
      <!-- LIST OF TO-DO TASKS -->
      <div v-for="task in todo" class="flex flex-col gap-2">
        <div
          draggable="true"
          @dragstart="startDraggingTask(task)"
          @dragend="stopDraggingTask"
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
          @dragenter="logHoveredElement(task.taskName, 'todo')"
          @dragover.prevent
          @drop="dropHandler('todo', $event, task)"
          @dragleave="clearHoveredElement"
          class="grid max-h-[80px] justify-items-center gap-2"
          :class="`grid-cols-4`"
        >
          <!-- LIST OF USERS ASSIGNED TO THE TASK -->
          <div
            v-if="task.assignedToDo.length > 0"
            v-for="user in task.assignedToDo"
            :key="user.name"
            class="relative flex flex-nowrap gap-x-2 border-2 m-1 p-2 text-xs items-center justify-center rounded-lg"
            @mouseenter="
              showRemoveButton = {
                userName: user.name,
                taskName: task.taskName,
              }
            "
            @mouseleave="showRemoveButton = null"
          >
            🐱
            <p>{{ user.name }}</p>
            <button
              v-if="
                showRemoveButton &&
                showRemoveButton.userName === user.name &&
                showRemoveButton.taskName === task.taskName
              "
              @click="removeUser(user, 'todo', task.taskName)"
              class="bg-white/50 rounded-full absolute w-full h-full text-3xl font-bold left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex justify-center items-center"
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
      <!-- LIST OF DOING TASKS -->
      <div v-for="task in doing" class="flex flex-col gap-2 cursor-pointer">
        <div
          draggable="true"
          @dragstart="startDraggingTask(task)"
          @dragend="stopDraggingTask"
          :class="{ 'line-through': task.completed }"
          @click="task.completed = !task.completed"
          class="flex flex-nowrap gap-2"
          @dragenter="logHoveredElement(task.taskName, 'doing')"
          @dragover.prevent
          @drop="dropHandler('doing', $event, task)"
          @dragleave="clearHoveredElement"
        >
          <input type="checkbox" v-model="task.completed" />
          <p>{{ task.taskName }}</p>
        </div>
        <div
          class="grid max-h-[80px] justify-items-center"
          :class="`grid-cols-4`"
        >
          <!-- LIST OF USERS ASSIGNED TO THE TASK -->
          <div
            v-if="task.assignedToDo.length > 0"
            v-for="user in task.assignedToDo"
            :key="user.name"
            class="relative flex flex-nowrap gap-x-2 border-2 m-1 p-2 text-xs items-center justify-center rounded-lg"
            @mouseenter="
              showRemoveButton = {
                userName: user.name,
                taskName: task.taskName,
              }
            "
            @mouseleave="showRemoveButton = null"
          >
            🐱
            <p>{{ user.name }}</p>
            <button
              v-if="
                showRemoveButton &&
                showRemoveButton.userName === user.name &&
                showRemoveButton.taskName === task.taskName
              "
              @click="removeUser(user, 'doing', task.taskName)"
              class="bg-white/50 rounded-full absolute w-full h-full text-3xl font-bold left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex justify-center items-center"
            >
              X
            </button>
          </div>
        </div>
      </div>
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
      <!-- LIST OF DONE TASKS -->
      <div v-for="task in done" class="flex flex-col gap-2">
        <div
          draggable="true"
          @dragstart="startDraggingTask(task)"
          @dragend="stopDraggingTask"
          :class="{ 'line-through': task.completed }"
          @click="task.completed = !task.completed"
          class="flex flex-nowrap gap-2"
          @dragenter="logHoveredElement(task.taskName, 'done')"
          @dragover.prevent
          @drop="dropHandler('done', $event, task)"
          @dragleave="clearHoveredElement"
        >
          <input type="checkbox" v-model="task.completed" />
          <p>{{ task.taskName }}</p>
        </div>
        <div
          class="grid max-h-[80px] justify-items-center"
          :class="`grid-cols-4`"
        >
          <!-- LIST OF USERS ASSIGNED TO THE TASK -->
          <div
            v-if="task.assignedToDo.length > 0"
            v-for="user in task.assignedToDo"
            :key="user.name"
            class="relative flex flex-nowrap gap-x-2 border-2 m-1 p-2 text-xs items-center justify-center rounded-lg"
            @mouseenter="
              showRemoveButton = {
                userName: user.name,
                taskName: task.taskName,
              }
            "
            @mouseleave="showRemoveButton = null"
          >
            🐱
            <p>{{ user.name }}</p>
            <button
              v-if="
                showRemoveButton &&
                showRemoveButton.userName === user.name &&
                showRemoveButton.taskName === task.taskName
              "
              @click="removeUser(user, 'done', task.taskName)"
              class="bg-white/50 rounded-full absolute w-full h-full text-3xl font-bold left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex justify-center items-center"
            >
              X
            </button>
          </div>
        </div>
      </div>
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

<script setup>
import TaskInput from "@/components/TaskInput.vue";
import ToDoList from "@/components/ToDoList.vue";
import UserInput from "@/components/UserInput.vue";
import Features from "@/components/Features.vue";

// useState
import { reactive, ref } from "vue";
let showDeleteButton = ref(false);

let users = ref([
  { name: "Mihai", role: "JSD" },
  { name: "Joe", role: "LSD" },
  { name: "Dan", role: "CTO" },
  // JSD == junior software developer
  // LSD == lead software developer
  // CTO == chief tech officer
]);
const jobs = reactive({
  todo: ref([
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
  ]),
  doing: ref([]),
  done: ref([]),
});

const removeUser = (userToRemove, fromList, taskName) => {
  switch (fromList) {
    case "todo":
      const todoTaskExists = jobs.todo.some(
        (task) => task.taskName === taskName
      );
      if (todoTaskExists) {
        jobs.todo = jobs.todo.map((tasky) => {
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
      const doingTaskExists = jobs.doing.some(
        (task) => task.taskName === taskName
      );
      if (doingTaskExists) {
        jobs.doing = jobs.doing.map((tasky) => {
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
      const doneTaskExists = jobs.done.some(
        (task) => task.taskName === taskName
      );
      if (doneTaskExists) {
        jobs.done = jobs.done.map((tasky) => {
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

const handleDeleteUser = (userName) => {
  const userIndex = users.value.findIndex((user) => user.name === userName);
  if (userIndex !== -1) {
    users.value.splice(userIndex, 1);
  }
};
const handleDeleteTask = (taskDescription, taskList) => {
  switch (taskList) {
    case "todo":
      const todoIndex = jobs.todo.findIndex(
        (task) => task.taskName === taskDescription
      );
      if (todoIndex !== -1) {
        jobs.todo.splice(todoIndex, 1);
      }
      break;
    case "doing":
      const doingIndex = jobs.doing.findIndex(
        (task) => task.taskName === taskDescription
      );
      if (doingIndex !== -1) {
        jobs.doing.splice(doingIndex, 1);
      }
      break;
    case "done":
      const doneIndex = jobs.done.findIndex(
        (task) => task.taskName === taskDescription
      );
      if (doneIndex !== -1) {
        jobs.done.splice(doneIndex, 1);
      }
      break;

    default:
      break;
  }
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
      const todoTargetTask = jobs.todo.find(
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
      const doingTargetTask = jobs.doing.find(
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
      const doneTargetTask = jobs.done.find(
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
  draggingTaskElement.value = task;
};
const stopDraggingTask = () => {
  draggingTaskElement.value = null;
};
const dropTaskHandler = (list) => {
  // event.preventDefault();
  if (draggingTaskElement.value) {
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
      // Check if jobs.todo.value is defined before filtering
      if (jobs.todo) {
        jobs.todo = jobs.todo.filter((tasky) => tasky.taskName !== task);
      }
      break;
    case "doing":
      // Check if jobs.doing is defined before filtering
      if (jobs.doing) {
        jobs.doing = jobs.doing.filter((tasky) => tasky.taskName !== task);
      }
      break;
    case "done":
      // Check if jobs.done is defined before filtering
      if (jobs.done) {
        jobs.done = jobs.done.filter((tasky) => tasky.taskName !== task);
      }
      break;
    default:
      break;
  }
};

const addTaskToGroup = (list, task) => {
  switch (list) {
    case "todo":
      jobs.todo.push({
        ...task,
        list: list,
      });
      break;
    case "doing":
      jobs.doing.push({
        ...task,
        list: list,
      });
      break;
    case "done":
      jobs.done.push({
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
  <p class="text-center font-bold text-5xl my-4">ToDo App</p>

  <p class="px-4 font-[600] my-2">Add new user</p>
  <UserInput :users="users" />

  <p class="px-4 font-[600] my-2">Add new Task</p>

  <TaskInput :todo="jobs.todo" :jobs="jobs" />

  <p class="px-4 font-[600] my-2">Users</p>
  <div class="flex flex-wrap px-4 py-2 mx-4 rounded-lg my-2 bg-gray-200">
    <!-- LIST OF AVAILABLE USERS -->
    <div
      v-for="user in users"
      class="relative flex flex-col gap-x-2 border-2 m-1 p-2 rounded-lg cursor-pointer bg-white"
      draggable="true"
      @dragstart="startDraggingUser(user)"
      @dragend="stopDraggingUser"
      @click="handleDeleteUser(user.name)"
      @mouseenter="showDeleteButton = user.name"
      @mouseleave="showDeleteButton = null"
    >
      <p class="border-b-2">{{ user.name }}</p>
      <p class="text-[8px]">{{ user.role }}</p>
      <button
        v-if="showDeleteButton === user.name"
        class="absolute inset-0 bg-white/70"
      >
        ✖
      </button>
    </div>
  </div>

  <div class="grid grid-cols-3 gap-4 px-4 max-sm:grid-cols-1 py-2">
    <ToDoList
      :listType="'todo'"
      :jobs="jobs"
      :todo="jobs.todo"
      :logHoveredTaskElement="logHoveredTaskElement"
      :clearHoveredTaskElement="clearHoveredTaskElement"
      :startDraggingTask="startDraggingTask"
      :stopDraggingTask="stopDraggingTask"
      :dropTaskHandler="dropTaskHandler"
      :logHoveredElement="logHoveredElement"
      :clearHoveredElement="clearHoveredElement"
      :handleDeleteTask="handleDeleteTask"
      :dropHandler="dropHandler"
      :removeUser="removeUser"
    />
    <ToDoList
      :listType="'doing'"
      :jobs="jobs"
      :todo="jobs.doing"
      :logHoveredTaskElement="logHoveredTaskElement"
      :clearHoveredTaskElement="clearHoveredTaskElement"
      :startDraggingTask="startDraggingTask"
      :stopDraggingTask="stopDraggingTask"
      :dropTaskHandler="dropTaskHandler"
      :logHoveredElement="logHoveredElement"
      :clearHoveredElement="clearHoveredElement"
      :handleDeleteTask="handleDeleteTask"
      :dropHandler="dropHandler"
      :removeUser="removeUser"
    />
    <ToDoList
      :listType="'done'"
      :jobs="jobs"
      :todo="jobs.done"
      :logHoveredTaskElement="logHoveredTaskElement"
      :clearHoveredTaskElement="clearHoveredTaskElement"
      :startDraggingTask="startDraggingTask"
      :stopDraggingTask="stopDraggingTask"
      :dropTaskHandler="dropTaskHandler"
      :logHoveredElement="logHoveredElement"
      :clearHoveredElement="clearHoveredElement"
      :handleDeleteTask="handleDeleteTask"
      :dropHandler="dropHandler"
      :removeUser="removeUser"
    />
  </div>
  <Features />
</template>

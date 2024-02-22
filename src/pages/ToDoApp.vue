<script setup>
import TaskInput from "@/components/TaskInput.vue";
import ToDoList from "@/components/ToDoList.vue";
import UsersList from "@/components/UsersList.vue";
import Features from "@/components/Features.vue";

// useState
import { ref } from "vue";

let users = ref([
  { name: "Mihai", role: "JSD" },
  { name: "Joe", role: "JSD" },
  { name: "Dan", role: "JSD" },
]);
// JSD == junior software developer

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
  draggingTaskElement.value = task;
};
const stopDraggingTask = () => {
  draggingTaskElement.value = null;
};
const dropTaskHandler = (list) => {
  // event.preventDefault();
  if (draggingTaskElement.value) {
    // Assuming 'list' is an array in the props
    const index = todo.value.indexOf(draggingTaskElement.value);

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
  <p class="text-center font-bold text-5xl my-4">ToDo App</p>

  <p class="px-4 font-[600]">Add new user</p>
  <UsersList :users="users" />

  <p class="px-4 font-[600]">Add new Task</p>

  <TaskInput :todo="todo" />


  <p class="px-4 font-[600]">Users</p>
  <div class="flex flex-wrap px-4">
    <!-- LIST OF AVAILABLE USERS -->
    <div
      v-for="user in users"
      class="relative flex flex-col gap-x-2 border-2 m-1 p-2 rounded-lg cursor-pointer"
      draggable="true"
      @dragstart="startDraggingUser(user)"
      @dragend="stopDraggingUser"
    >
      <p class="border-b-2">{{ user.name }}</p>
      <p class="text-[8px]">{{ user.role }}</p>
    </div>
  </div>
  

  <div class="grid grid-cols-3 gap-4 px-4 max-sm:grid-cols-1">
    <ToDoList
      :listType="'todo'"
      :todo="todo"
      :logHoveredTaskElement="logHoveredTaskElement"
      :clearHoveredTaskElement="clearHoveredTaskElement"
      :startDraggingTask="startDraggingTask"
      :stopDraggingTask="stopDraggingTask"
      :dropTaskHandler="dropTaskHandler"
      :logHoveredElement="logHoveredElement"
      :clearHoveredElement="clearHoveredElement"
      :dropHandler="dropHandler"
      :removeUser="removeUser"
    />
    <ToDoList
      :listType="'doing'"
      :todo="doing"
      :logHoveredTaskElement="logHoveredTaskElement"
      :clearHoveredTaskElement="clearHoveredTaskElement"
      :startDraggingTask="startDraggingTask"
      :stopDraggingTask="stopDraggingTask"
      :dropTaskHandler="dropTaskHandler"
      :logHoveredElement="logHoveredElement"
      :clearHoveredElement="clearHoveredElement"
      :dropHandler="dropHandler"
      :removeUser="removeUser"
    />
    <ToDoList
      :listType="'done'"
      :todo="done"
      :logHoveredTaskElement="logHoveredTaskElement"
      :clearHoveredTaskElement="clearHoveredTaskElement"
      :startDraggingTask="startDraggingTask"
      :stopDraggingTask="stopDraggingTask"
      :dropTaskHandler="dropTaskHandler"
      :logHoveredElement="logHoveredElement"
      :clearHoveredElement="clearHoveredElement"
      :dropHandler="dropHandler"
      :removeUser="removeUser"
    />
  </div>
  <Features />
</template>

<script setup>
import { ref } from "vue";

const { users } = defineProps(["users"]);

let newUserInput = ref("");
let newUserRoleInput = ref("");

const clearInputs = () => {
  newUserInput.value = "";
  newUserRoleInput.value = "";
};

const addNewUser = () => {
  if (
    isUserNameUnique(newUserInput.value) &&
    newUserRoleInput.value.length > 2
  ) {
    users.push({
      name: newUserInput.value,
      role: newUserRoleInput.value,
    });
    newUserInput.value = "";
    newUserRoleInput.value = "";
  }
};
const isUserNameUnique = (userName) => {
  return !users.some(
    (user) => String(user.name).toLowerCase() === String(userName).toLowerCase()
  );
};
</script>

<template>
  <div class="flex flex-nowrap gap-2 px-4 mx-4 my-2 bg-gray-200 rounded-lg">
    <button
      v-if="newUserRoleInput.length > 0 || newUserInput.length > 0"
      @click="clearInputs"
      class="p-2 border-2 rounded-lg"
    >
      ✖
    </button>
    <div class="flex gap-4 grow max-sm:flex-col my-4">
      <input
        type="text"
        v-model="newUserInput"
        placeholder="New user..."
        class="py-2 px-4 rounded-lg w-full outline-none"
        @keyup.enter="addNewUser"
        :class="{
          'ring-2 ring-red-400':
            !isUserNameUnique(newUserInput) ||
            (newUserInput.length > 0 && newUserInput.length < 2),
        }"
      /><input
        type="text"
        v-model="newUserRoleInput"
        placeholder="User role..."
        class="py-2 px-4 rounded-lg w-full outline-none"
        @keyup.enter="addNewUser"
        :class="{
          'ring-2 ring-red-400':
            newUserRoleInput.length > 0 && newUserRoleInput.length < 3,
        }"
      />
    </div>
    <button
      v-if="newUserRoleInput.length > 0 && newUserInput.length > 0"
      @click="addNewUser"
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

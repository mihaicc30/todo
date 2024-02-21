<script setup>
import { defineProps, ref } from "vue";

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
  <div class="flex flex-nowrap gap-2 px-4">
    <button
      v-if="newUserRoleInput.length > 0 || newUserInput.length > 0"
      @click="clearInputs"
      class="p-2 ml-2 border-2 rounded-lg"
    >
      ✖
    </button>
    <div
      class="flex gap-4 grow max-sm:flex-col my-4"
      :class="{
        'mx-20': newUserRoleInput.length < 1 && newUserInput.length < 1,
      }"
    >
      <input
        type="text"
        v-model="newUserInput"
        placeholder="New user..."
        class="p-2 border-b-2 w-full outline-none"
        @keyup.enter="addNewUser"
        :class="{ 'border-red-400': !isUserNameUnique(newUserInput) }"
      /><input
        type="text"
        v-model="newUserRoleInput"
        placeholder="User role..."
        class="p-2 border-b-2 w-full outline-none"
        @keyup.enter="addNewUser"
        :class="{
          'border-red-400':
            newUserRoleInput.length > 0 && newUserRoleInput.length < 3,
        }"
      />
    </div>
    <button
      v-if="newUserRoleInput.length > 0 && newUserInput.length > 0"
      @click="addNewUser"
      class="p-2 mr-2 border-2 rounded-lg"
    >
      ▶
    </button>
  </div>
</template>

<template>
  <div>
    <input v-model="newTodoTitle" placeholder="New Todo" />
    <input v-model="newTodoDescription" placeholder="Description" />
    <button @click="addTodo">Add</button>
    <ul>
      <li v-for="todo in todos" :key="todo.id">{{ todo.title }} - {{ todo.description }}</li>
    </ul>
  </div>
</template>

<script setup>
// 컴포넌트 레이어 : Vue 컴포넌트에서 Pinia 스토어를 사용하여 데이터를 표시하고, 사용자 입력을 처리

import { ref, onMounted } from 'vue'
import { useTodoStore } from '../stores/todoStore'

const newTodoTitle = ref('')
const newTodoDescription = ref('')
const todoStore = useTodoStore()

const addTodo = async () => {
  if (newTodoTitle.value.trim()) {
    await todoStore.addTodo(newTodoTitle.value, newTodoDescription.value)
    newTodoTitle.value = ''
    newTodoDescription.value = ''
  }
}

onMounted(() => {
  todoStore.loadTodos()
})
</script>

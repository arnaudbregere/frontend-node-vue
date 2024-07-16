<template>
  <h1>Ma todo List</h1>
      <ul>
        <li v-for="todo in todos" :key="todo.id">
        {{ todo.todo }}
        <input type="checkbox" id="isChecked" name="isChecked" value="{{ todo.completed }}" />
        <label for="isChecked">{{ todo.completed }}</label>
        Mon id: {{ todo.userId }}
      </li>
      </ul>
      <input type="text" id="mytodo" name="mytodo" v-model="newTodo"/>
      <button
      @click="addTodo"
      >
      Ajouter une Todo
      </button>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { ofetch } from 'ofetch'

const todos = ref([]);
const newTodo = ref('')

const fetchTodos = async () => {
  try {
    const response = await ofetch('http://localhost:8000/todos');
    todos.value = response.todos;
  } catch (error) {
    console.error('Erreur lors du fetch:', error);
  }
};

await fetchTodos();

const addTodo = async() => {
  try {
    await ofetch(
      'http://localhost:8000/todos',
      {
        method: "POST",
        body: { 
          "todo": newTodo.value,
          "completed": true,
          "userId": 26,
        },
      }
    )
  } catch {
    alert('UNe erreure s\'est produit')
  }
}


</script>

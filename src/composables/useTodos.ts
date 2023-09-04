import { ref } from 'vue'

export interface Todo {
  id: number
  title: string
}

const todos = ref<Todo[]>([])
let maxId = 200 // handle fake id with jsonplaceholder

export function useTodos() {
  async function addTodo(title: Todo['title']) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
      method: 'POST',
      body: JSON.stringify({ title })
    })

    if (res.ok) {
      todos.value.push({ id: ++maxId, title })
    } else {
      throw new Error('Something error happens in API')
    }
  }

  async function getTodos() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1')

    if (res.ok) {
      const data = (await res.json()) as Todo[]
      todos.value.length = 0
      data.forEach((item) => todos.value.push(item))
    } else {
      throw new Error('Something error happens in API')
    }
  }

  async function deleteTodo(id: Todo['id']) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE'
    })

    if (res.ok) {
      todos.value = todos.value.filter((todo) => todo.id !== id)
    } else {
      throw new Error('Something error happens in API')
    }
  }

  return { todos, addTodo, getTodos, deleteTodo }
}

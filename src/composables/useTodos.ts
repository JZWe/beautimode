import { ref, computed } from 'vue'

export type TodoStatus = 'completed' | 'undone'
export type TabStatus = 'all' | TodoStatus

export interface Todo {
  id: number
  title: string
  status: TodoStatus
}

const todos = ref<Todo[]>([])
const activeTab = ref<TabStatus>('all')

let maxId = 200 // handle fake id with jsonplaceholder

export function useTodos() {
  async function addTodo(title: Todo['title']) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
      method: 'POST',
      body: JSON.stringify({ title })
    })

    if (res.ok) {
      todos.value.push({ id: ++maxId, title, status: 'undone' })
    } else {
      throw new Error('Something error happens in API')
    }
  }

  async function getTodos() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1')

    if (res.ok) {
      const data = (await res.json()) as Todo[]
      todos.value.length = 0
      data.forEach((item) => todos.value.push({ ...item, status: 'undone' }))
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

  function setActiveTab(tab: TabStatus) {
    activeTab.value = tab
  }

  const filteredTodos = computed(() => {
    if (activeTab.value === 'all') {
      return todos.value
    } else if (activeTab.value === 'completed') {
      return todos.value.filter((todo) => todo.status === 'completed')
    } else {
      return todos.value.filter((todo) => todo.status === 'undone')
    }
  })
  return { addTodo, getTodos, deleteTodo, activeTab, setActiveTab, filteredTodos }
}

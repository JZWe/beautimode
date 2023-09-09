import { ref, computed } from 'vue'

const allDropdownState = ref<Record<string, boolean>>({})

export function useDropdown(id: string) {
  allDropdownState.value[id] = false

  function openDropdown() {
    console.log('openDropdown')
    console.log(id)
    Object.keys(allDropdownState.value)
      .filter((key) => key !== id)
      .forEach((key) => {
        allDropdownState.value[key] = false
      })
    allDropdownState.value[id] = true
  }

  function closeDropdown() {
    allDropdownState.value[id] = false
  }

  function getDropdownState() {
    return allDropdownState.value[id]
  }

  return { openDropdown, closeDropdown, getDropdownState }
}

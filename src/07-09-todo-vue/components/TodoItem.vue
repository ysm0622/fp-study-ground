<template>
  <li :class="done ? 'completed' : ''">
    <input class="toggle"
           type="checkbox"
           :checked="done">
    <label contenteditable>{{ title }}</label>
    <button class="delete"/>
  </li>
</template>

<script>
export default {
  props: ['done','title'],
  updated() {
    console.log('updated!')
  }
}
</script>

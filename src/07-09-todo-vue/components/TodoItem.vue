<template functional>
  <li :class="props.done ? 'completed' : ''">
    <input class="toggle"
           type="checkbox"
           :checked="props.done"
           @click="listeners.toggle">
    <label contenteditable>{{props.title}}</label>
    <button class="delete"
            @click="listeners.remove" />
  </li>
</template>

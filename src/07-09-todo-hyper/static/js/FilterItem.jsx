import { h } from 'hyperapp'

const isSelected = (filter, selected) => (filter == selected ? 'selected' : '')

export default ({ filter, selected, selectFilter }) => (
  <li>
    <a
      id={filter}
      class={isSelected(filter, selected)}
      onclick={() => selectFilter(filter)}
    >
      {filter}
    </a>
  </li>
)

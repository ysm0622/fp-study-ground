import React from 'react'

const isSelected = (filter, selected) => (filter == selected ? 'selected' : '')

export default ({ filter, selected, actions }) => (
  <li>
    <a
      id={filter}
      className={isSelected(filter, selected)}
      onClick={() => actions.selectFilter(filter)}
    >
      {filter}
    </a>
  </li>
)

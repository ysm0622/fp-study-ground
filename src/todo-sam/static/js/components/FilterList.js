import React from 'react'
import FilterItem from './FilterItem'

export default ({ selected, actions }) => {
  return ['all', 'active', 'completed'].map(filter => (
    <FilterItem
      key={filter}
      filter={filter}
      selected={selected}
      actions={actions}
    />
  ))
}

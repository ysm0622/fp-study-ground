import { h } from 'hyperapp'
import FilterItem from './FilterItem'

export default ({ selected, selectFilter }) =>
  ['all', 'active', 'completed'].map(filter => (
    <FilterItem
      filter={filter}
      selected={selected}
      selectFilter={selectFilter}
    />
  ))

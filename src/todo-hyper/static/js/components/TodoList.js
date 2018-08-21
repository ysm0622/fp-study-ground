import { h } from 'hyperapp'
import TodoItem from './TodoItem'

export default ({ todos, selected, actions }) =>
  todos
    .filter(todo => selected !== 'active' || !todo.done)
    .filter(todo => selected !== 'completed' || todo.done)
    .map(todo => <TodoItem todo={todo} actions={actions} />)
    .reverse()

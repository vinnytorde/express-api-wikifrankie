import { createStore } from "redux"

const reducer = state => state

const store = createStore(reducer)

export default () => store

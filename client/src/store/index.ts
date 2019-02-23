import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import thunk from "redux-thunk"
import { reducers } from "./reducers"

export const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

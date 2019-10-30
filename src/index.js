import React, { useReducer, useContext, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
function appReducer(state, action) {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          id: Date.now(),
          text: " ",
          completed: false
        }
      ];

    case "delete":
      return state.filter(x => x.id !== action.payload);

    case "complete":
      return state.map(x => {
        if (x.id === action.payload) {
          return { ...x, completed: !x.completed };
        }
        return x;
      });

    default:
      return state;
  }
}

const Context = React.createContext();

function App() {
  const [state, dispatch] = useReducer(appReducer, []);

  useEffect(() => {
    localStorage.setItem("data", state);
  }, [state]);

  return (
    <Context.Provider value={dispatch}>
      <div className="App">
        <h1>Todos App</h1>
        <button onClick={() => dispatch({ type: "add" })}>new task</button>
        <TodoList items={state} />
      </div>
    </Context.Provider>
  );
}

function TodoList({ items }) {
  return items.map(item => <TodoItem item={item} />);
}

function TodoItem({ item }) {
  const dispatch = useContext(Context);
  return (
    <div
      style={{
        width: "400px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
      }}
      key={item.id}
    >
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => dispatch({ type: "complete", payload: item.id })}
      />
      <input type="text" defaultValue={item.text} />
      <button onClick={() => dispatch({ type: "delete", payload: item.id })}>
        Delete
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

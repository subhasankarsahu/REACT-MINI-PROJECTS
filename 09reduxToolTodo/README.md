# Redux Toolkit Todo App

A simple React mini project that demonstrates how to build a todo list using **Redux Toolkit** for global state management. This project is designed as a learning exercise for understanding Redux actions, reducers, dispatching, and store setup in a small but practical app.

## What This Project Does

This app lets you:

- add a new todo item
- view the todo list
- delete a todo item from the list

The todo data is stored in Redux state, so the UI updates immediately when you dispatch an action.

## How It Is Designed

The project follows a clean component-based structure:

- `App.jsx` renders the main layout
- `AddTodo.jsx` handles the input form and dispatches the add action
- `Todo.jsx` displays all todos and dispatches the remove action
- `todoSlice.js` contains the Redux logic for todo actions and state updates
- `store.js` configures the Redux store

The design is intentionally minimal and focused on functionality. The interface uses utility classes for spacing, colors, buttons, and layout so the app stays easy to read and easy to extend.

## Tech Stack

- `React 19`
- `Redux Toolkit`
- `React Redux`
- `Vite`
- `Tailwind CSS`
- `JavaScript`

## Folder Structure

```bash
09reduxToolTodo/
|-- src/
|   |-- app/
|   |   `-- store.js
|   |-- components/
|   |   |-- AddTodo.jsx
|   |   `-- Todo.jsx
|   |-- features/
|   |   `-- todo/
|   |       `-- todoSlice.js
|   |-- App.jsx
|   |-- App.css
|   |-- index.css
|   `-- main.jsx
```

## State Management Flow

1. The app starts with an initial todo item in Redux state.
2. The user types a new todo into the input field.
3. On form submit, `addTodo` is dispatched.
4. Redux Toolkit updates the `todos` array in the store.
5. The todo list re-renders automatically.
6. Clicking the delete button dispatches `removeTodo`, which removes that item from state.

## How to Use

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app in your browser and start adding or deleting todos.

## What I Learned

This mini project is useful for learning:

- how Redux Toolkit simplifies Redux logic
- how to create slices with `createSlice`
- how to use `useDispatch` and `useSelector`
- how to share state across components
- how to structure a small React app cleanly

## Notes

- Todos are stored only in memory and reset when the page refreshes.
- This project is best used as a beginner-friendly Redux Toolkit demo for your GitHub portfolio.

import { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
function App() {
	const [todos, setTodos] = useState(() => {
		const savedTodos = localStorage.getItem("todos");
		return savedTodos ? JSON.parse(savedTodos) : [];
	});

	const [isModeDark, setIsModeDark] = useState(() => {
		const savedState = localStorage.getItem("mode");
		return savedState ? JSON.parse(savedState) : true;
	});

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
		localStorage.setItem("mode", JSON.stringify(isModeDark));
	}, [todos, isModeDark]);
	// localStorage.removeItem("todos");
	const [displyedTodos, setDisplyedTodos] = useState("all");
	const [show, setShown] = useState({
		all: true,
		active: false,
		completed: false,
	});
	const unCompletedTodos = todos.filter((todo) => !todo.isCompleted).length;

	function toggleActiveClass(filterType) {
		setDisplyedTodos(filterType);
		setShown({
			all: filterType === "all",
			active: filterType === "active",
			completed: filterType === "completed",
		});
	}

	function clearCompleted() {
		setTodos((prevTodos) => prevTodos.filter((todo) => !todo.isCompleted));
	}

	return (
		<main className={isModeDark ? "dark-container" : "light-container"}>
			<AddTodo
				setTodos={setTodos}
				isModeDark={isModeDark}
				setIsModeDark={setIsModeDark}
			/>
			<article className={isModeDark ? "dark" : "light"}>
				<TodoList
					todos={todos}
					displyedTodos={displyedTodos}
					setTodos={setTodos}
				/>
				{todos.length > 0 && (
					<div className="desktop">
						<span>{unCompletedTodos} items left</span>
						<button
							className={show.all ? "active" : undefined}
							onClick={() => toggleActiveClass("all")}
						>
							All
						</button>
						<button
							className={show.active ? "active" : undefined}
							onClick={() => toggleActiveClass("active")}
						>
							Active
						</button>
						<button
							className={show.completed ? "active" : undefined}
							onClick={() => toggleActiveClass("completed")}
						>
							Completed
						</button>
						<button onClick={clearCompleted}>Clear Copmpleted</button>
					</div>
				)}
				{todos.length > 0 && (
					<div className="mobile">
						<span>{unCompletedTodos} items left</span>
						<button onClick={clearCompleted}>Clear Completed</button>
					</div>
				)}
			</article>
			{todos.length > 0 && (
				<div className="mobile-btns">
					<button
						className={show.all ? "active" : undefined}
						onClick={() => toggleActiveClass("all")}
					>
						All
					</button>
					<button
						className={show.active ? "active" : undefined}
						onClick={() => toggleActiveClass("active")}
					>
						Active
					</button>
					<button
						className={show.completed ? "active" : undefined}
						onClick={() => toggleActiveClass("completed")}
					>
						Completed
					</button>
				</div>
			)}
		</main>
	);
}

export default App;

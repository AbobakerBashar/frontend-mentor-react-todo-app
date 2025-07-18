import sunIcon from "/images/icon-sun.svg";
import moonIcon from "/images/icon-moon.svg";
import { useRef } from "react";

export default function AddTodo({ setTodos, isModeDark, setIsModeDark }) {
	const formRef = useRef(null);

	function addTodo(event) {
		event.preventDefault();
		if (formRef.current) {
			const formData = new FormData(formRef.current);
			const newTodo = formData.get("todo").trim();
			if (newTodo) {
				setTodos((prevTodos) => [
					...prevTodos,
					{
						title: newTodo,
						id: Date.now(),
						isCompleted: false,
					},
				]);
				formRef.current.reset();
			}
		}
	}

	return (
		<section className="form-sec">
			<header>
				<h3>Todo</h3>
				<img
					src={isModeDark ? sunIcon : moonIcon}
					alt={isModeDark ? "Sun icon" : "Moon icon"}
					onClick={() => setIsModeDark((prevMode) => !prevMode)}
					aria-label={
						isModeDark ? "Switch to light mode" : "Switch to dark mode"
					}
				/>
			</header>
			<form ref={formRef}>
				<button onClick={(e) => addTodo(e)}></button>
				<input
					type="text"
					name="todo"
					placeholder="Create a new todo..."
					aria-label="Create a new todo"
				/>
			</form>
		</section>
	);
}

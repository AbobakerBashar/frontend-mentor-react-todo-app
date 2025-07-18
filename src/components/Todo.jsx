import checkIcon from "/images/icon-check.svg";
import crosskIcon from "/images/icon-cross.svg";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
export default function Todo({ todo, setTodos, id }) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });
	const style = { transform: CSS.Transform.toString(transform), transition };

	function toggleCompleted(id) {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				id === todo.id ? { ...todo, isCompleted: !todo.isCompleted } : todo
			)
		);
	}
	function deleteTodo(id) {
		setTodos((prevTodos) => prevTodos.filter((todo) => id !== todo.id));
	}
	return (
		<li
			className={todo.isCompleted ? "completed" : undefined}
			style={style}
			ref={setNodeRef}
			{...attributes}
		>
			<div>
				<div className="btn">
					<button onClick={() => toggleCompleted(todo.id)}>
						{todo.isCompleted && <img src={checkIcon} alt="Check marker" />}
					</button>
				</div>
				<span {...listeners}>{todo.title}</span>
			</div>
			<img
				src={crosskIcon}
				alt="Cross icon"
				className="cross-icon"
				onClick={() => deleteTodo(todo.id)}
			/>
		</li>
	);
}

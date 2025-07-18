import Todo from "./Todo";
import {
	closestCorners,
	DndContext,
	KeyboardSensor,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
export default function TodoList({ setTodos, todos, displyedTodos }) {
	const filteredTodos = todos.filter((todo) => {
		if (displyedTodos === "all") return true;
		if (displyedTodos === "completed") return todo.isCompleted;
		if (displyedTodos === "active") return !todo.isCompleted;
	});
	const todosElements = filteredTodos.map((todo) => (
		<Todo key={todo.id} todo={todo} setTodos={setTodos} id={todo.id} />
	));

	function handleDragEnd(event) {
		const { active, over } = event;
		if (active.id === over.id) return;
		setTodos((prevTodos) => {
			const originposition = () =>
				todos.findIndex((todo) => todo.id === active.id);
			const newPosition = () => todos.findIndex((todo) => todo.id === over.id);
			return arrayMove(prevTodos, originposition(), newPosition());
		});
	}

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
	);

	return (
		<DndContext
			collisionDetection={closestCorners}
			onDragEnd={handleDragEnd}
			sensors={sensors}
		>
			<ul className="todos-list">
				<SortableContext strategy={verticalListSortingStrategy} items={todos}>
					{todosElements}
				</SortableContext>
			</ul>
		</DndContext>
	);
}

import { Todo } from '@/app/actions';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    todos: Todo[];
}

export function TodoList({ todos }: TodoListProps) {
    if (todos.length === 0) {
        return (
            <div className="text-center py-10 text-gray-400 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                <p>No todos yet. Add one above!</p>
            </div>
        );
    }

    return (
        <div className="w-full space-y-3">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    );
}

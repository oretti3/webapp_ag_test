'use client';

import { Todo } from '@/app/actions';
import { updateTodoAction, deleteTodoAction } from '@/app/actions';
import { Check, Trash2 } from 'lucide-react';
import { useTransition } from 'react';

interface TodoItemProps {
    todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
    const [isPending, startTransition] = useTransition();

    const handleToggle = () => {
        startTransition(async () => {
            await updateTodoAction(todo.id, { ...todo, completed: !todo.completed });
        });
    };

    const handleDelete = () => {
        // if (!confirm('Are you sure you want to delete this specific todo?')) return;
        startTransition(async () => {
            await deleteTodoAction(todo.id);
        });
    };

    return (
        <div className={`
            flex items-center justify-between p-4 mb-3 rounded-xl backdrop-blur-md border shadow-lg transition-all duration-300
            ${todo.completed ? 'bg-green-500/10 border-green-500/30' : 'bg-white/10 border-white/20 hover:bg-white/20'}
            ${isPending ? 'opacity-50' : ''}
        `}>
            <div className="flex items-center gap-3">
                <button
                    onClick={handleToggle}
                    disabled={isPending}
                    className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer
                        ${todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-400 hover:border-white'}
                    `}
                >
                    {todo.completed && <Check size={14} className="text-white" />}
                </button>
                <div className="flex flex-col">
                    <span className={`text-lg transition-all ${todo.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                        {todo.title}
                    </span>
                    {todo.description && (
                        <span className="text-sm text-gray-400">{todo.description}</span>
                    )}
                </div>
            </div>
            <button
                onClick={handleDelete}
                disabled={isPending}
                className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-full hover:bg-red-500/10 cursor-pointer"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
}

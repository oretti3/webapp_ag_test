'use client';

import { useState, useTransition } from 'react';
import { createTodoAction } from '@/app/actions';
import { Plus } from 'lucide-react';

export function TodoForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            // We can also call createTodoAction(formData) directly if we use form action attribute
            // But here we want to clear state after success
            const res = await createTodoAction(formData);
            if (res?.success) {
                setTitle('');
                setDescription('');
            } else {
                alert('Failed to create todo');
            }
        });
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl transition-all hover:bg-white/10">
            <form action={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        name="title"
                        placeholder="What needs to be done?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-transparent border-b-2 border-gray-600 focus:border-purple-400 py-2 text-xl outline-none transition-colors placeholder:text-gray-600 focus:placeholder:text-gray-500"
                    />
                </div>
                <div className="flex gap-4">
                    <input
                        type="text"
                        name="description"
                        placeholder="Description (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="flex-1 bg-transparent border-b border-gray-700 focus:border-purple-400 py-1 text-sm outline-none transition-colors text-gray-300"
                    />
                    <button
                        type="submit"
                        disabled={!title.trim() || isPending}
                        className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-full transition-all duration-300 shadow-lg shadow-purple-900/20"
                    >
                        <Plus size={24} />
                    </button>
                </div>
            </form>
        </div>
    );
}

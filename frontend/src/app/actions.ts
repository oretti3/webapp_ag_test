'use server';

import { revalidatePath } from 'next/cache';

const API_URL = 'http://localhost:8000';

export interface Todo {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
}

export async function getTodosAction(): Promise<Todo[]> {
    try {
        const res = await fetch(`${API_URL}/todos`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch todos');
        return res.json();
    } catch (error) {
        console.error('getTodosAction error:', error);
        return [];
    }
}

export async function createTodoAction(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!title) return;

    try {
        const newTodo = {
            id: Math.floor(Math.random() * 1000000),
            title,
            description: description || undefined,
            completed: false,
        };

        const res = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTodo),
        });

        if (!res.ok) {
            throw new Error('Failed to create todo');
        }

        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('createTodoAction error:', error);
        return { success: false, error: 'Failed to create todo' };
    }
}

export async function updateTodoAction(id: number, data: Todo) {
    try {
        const res = await fetch(`${API_URL}/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error('Failed to update todo');

        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('updateTodoAction error:', error);
        return { success: false, error: 'Failed to update todo' };
    }
}

export async function deleteTodoAction(id: number) {
    try {
        await fetch(`${API_URL}/todos/${id}`, {
            method: 'DELETE',
        });

        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('deleteTodoAction error:', error);
        return { success: false, error: 'Failed to delete todo' };
    }
}

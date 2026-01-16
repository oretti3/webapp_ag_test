import { getTodosAction } from './actions';
import { TodoList } from '@/components/TodoList';
import { TodoForm } from '@/components/TodoForm';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default async function Home() {
  const todos = await getTodosAction();

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white p-6 sm:p-12 font-sans selection:bg-purple-500/30">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 pb-2">
            TodoFlow
          </h1>
          <p className="text-gray-400">FastAPI + Next.js Server Actions</p>
        </header>

        {/* Create Form */}
        <TodoForm />

        {/* Todo List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-300 flex items-center gap-2">
            Your Tasks
          </h2>

          <Suspense fallback={
            <div className="flex justify-center p-8">
              <Loader2 className="animate-spin text-purple-500" size={40} />
            </div>
          }>
            <TodoList todos={todos} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

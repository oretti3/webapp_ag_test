# Server Actions Migration Tasks

- [x] ドキュメント作成: 実装計画と現状比較 (docs/Server_Actions_Migration/) <!-- id: 0 -->
- [x] バックエンド疎通確認 (サーバー起動確認) <!-- id: 1 -->
- [x] `src/lib/api.ts` の内容を参考に `src/app/actions.ts` を作成 <!-- id: 2 -->
    - [x] `getTodosAction`
    - [x] `createTodoAction`
    - [x] `updateTodoAction`
    - [x] `deleteTodoAction`
- [x] コンポーネントの分割とリファクタリング <!-- id: 3 -->
    - [x] `src/components/TodoForm.tsx` (新規作成: Server Action呼び出し)
    - [x] `src/components/TodoItem.tsx` (修正: Update/Delete Action呼び出し)
- [x] `src/app/page.tsx` の Server Component 化 <!-- id: 4 -->
    - [x] `fetchTodos` ロジックを削除し、直接 Action/Fetch を初期ロードで使用
    - [x] Loading state の扱い (Suspense or loading.tsx)
- [x] 動作確認 <!-- id: 5 -->
    - [x] 新規作成、更新、削除が反映されるか (Build check)
    - [x] リロードしてもデータが保持されているか (Backend連携)

# Server Actions Migration Walkthrough

## Changes Implemented

### 1. Server Actions Implementation
`src/app/actions.ts` を作成し、以下のデータ操作を実装しました：
- `getTodosAction`: Todo一覧取得 (`cache: 'no-store'`)
- `createTodoAction`: 新規作成 (`revalidatePath('/')` 付き)
- `updateTodoAction`: 更新
- `deleteTodoAction`: 削除

### 2. Server Component Implementation
`src/app/page.tsx` を Server Component に変更しました。
- 初期データ取得をサーバーサイドで実行 (`await getTodosAction()`)
- クライアントサイドの `useEffect`, `Axios` 依存を排除

### 3. Component Refactoring
- **`TodoForm`**: 新規作成フォームを別コンポーネントに切り出し (`use client`)
- **`TodoItem`**: Server Actions を直接呼び出すように変更 (`useTransition` による状態管理)
- **`TodoList`**: 不要な props バケツリレーを削除

### 4. Cleanup
- `src/lib/api.ts` を削除 (APIコールを Server Actions に集約)
- `Axios` の使用箇所を排除 (Server Actions 内で `fetch` を使用)

## Verification Results

### Build Verification
`next build` が成功することを確認しました。
- Route `/` は Dynamic Rendering (`f`) として正しく構成されています。

### Improvements
- **Security**: APIエンドポイントの隠蔽
- **Performance**: 初期表示の高速化 (Waterfallの削減)
- **Maintainability**: コンポーネントの責任分離が明確化

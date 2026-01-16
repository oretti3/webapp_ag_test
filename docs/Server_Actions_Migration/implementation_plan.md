# Implementaion Plan - Server Actions Migration

## Goal Description
現在のクライアントサイドでのデータフェッチ (`useEffect` + `axios`) を、Next.js の **Server Actions** を使用したアーキテクチャに移行します。
これにより、以下のメリットを享受します：
- **セキュリティ向上**: APIのエンドポイントやロジックを隠蔽可能
- **パフォーマンス向上**: 初期表示のデータフェッチをサーバー側で行い、Waterfallを防ぐ
- **コードの簡素化**: クライアント側の `useEffect` や Loading 状態管理の一部を削除

## User Review Required
> [!IMPORTANT]
> `src/app/page.tsx` を Server Component に変更するため、既存のステート管理 (`title`, `description` 等) はクライアントコンポーネント (`TodoForm`) に移動します。

## Proposed Changes

### Frontend (`frontend/src`)

#### [NEW] `frontend/src/app/actions.ts`
- Backend API (`http://localhost:8000`) と通信する以下の Server Actions を定義
    - `getTodosAction()`
    - `createTodoAction(formData: FormData)` (または Object)
    - `updateTodoAction(id: number, data: Todo)`
    - `deleteTodoAction(id: number)`
- 各アクション内で `revalidatePath('/')` を呼び出し、データの更新を即座に反映させる

#### [MODIFY] `frontend/src/app/page.tsx`
- `use client` を削除
- `async function Home` に変更し、冒頭で `getTodosAction` を呼び出してデータを取得
- 取得した `todos` を下層コンポーネントに渡す形にリファクタリング

#### [NEW] `frontend/src/components/TodoForm.tsx`
- 現在 `page.tsx` にある「作成フォーム」部分を切り出し
- `use client` を付与
- フォーム送信時に `createTodoAction` を呼び出す

#### [MODIFY] `frontend/src/components/TodoItem.tsx` (or `TodoList.tsx`)
- インタラクティブな部分（完了トグル、削除ボタン）で Server Actions を呼び出せるように修正
- `useTransition` を利用して、Optimistic UI (楽観的更新) 的な挙動、またはスムーズなLoadingを実現することを推奨

## Verification Plan

### Automated Tests
- 現状、自動テスト環境はセットアップされていないため、手動検証を主とします。

### Manual Verification
1. **サーバー起動**: Backend (`uvicorn`) と Frontend (`next dev`) を起動
2. **初期表示**: ブラウザで `/` にアクセスし、Todoリストが表示されることを確認 (SSR/RSC確認)
3. **作成**: フォームからTodoを追加し、リストに即座に追加されることを確認
4. **更新**: 完了チェックボックスをトグルし、状態が維持されることを確認 (リロード後も)
5. **削除**: 削除ボタン押下で項目が消えることを確認

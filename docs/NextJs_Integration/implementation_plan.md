# 実装計画 - Next.js 統合

# 目標の説明
既存の FastAPI バックエンドとモダンな Next.js (App Router) フロントエンドを統合します。フロントエンドは Tailwind CSS を使用してスタイリングし、FastAPI エンドポイントを使用して CRUD 操作を行います。

## ユーザーレビューが必要な事項
- 特になし。標準的な統合です。

## 提案される変更

### Backend (バックエンド)
#### [MODIFY] [main.py](file:///workspaces/ainews_web_test/todo_api/main.py)
- `CORSMiddleware` を追加し、`http://localhost:3000` (Next.js のデフォルトポート) からのリクエストを許可します。

### Frontend (フロントエンド)
#### [NEW] [frontend/](file:///workspaces/ainews_web_test/frontend)
- `create-next-app` を使用して新しい Next.js アプリケーションを作成します。
- 設定: TypeScript, Tailwind CSS, App Router。
- 依存関係: `axios` (API リクエスト用), `lucide-react` (アイコン用)。

#### [NEW] [frontend/components/TodoItem.tsx](file:///workspaces/ainews_web_test/frontend/components/TodoItem.tsx)
- 単一の Todo アイテムを表示するコンポーネント。
- 機能: 完了チェックボックス、削除ボタン、編集モード（オプションまたは基本）。

#### [NEW] [frontend/components/TodoList.tsx](file:///workspaces/ainews_web_test/frontend/components/TodoList.tsx)
- Todo を取得してリスト表示するコンテナコンポーネント。

#### [NEW] [frontend/app/page.tsx](file:///workspaces/ainews_web_test/frontend/app/page.tsx)
- メインページのレイアウト。
- "モダン UI": グラスモーフィズムカード、グラデーション背景、アニメーション付きインタラクション。

## 検証計画

### 自動テスト
- `frontend` ディレクトリで `npm run build` を実行し、型安全性とビルドの成功を確認します。

### 手動検証
1. バックエンド起動: `python3 todo_api/main.py`
2. フロントエンド起動: `frontend` で `npm run dev`
3. `http://localhost:3000` を開く
4. 以下の操作を実行:
    - Todo "Hello Next.js" を作成
    - リストに表示されることを確認
    - ページをリロード（バックエンドからの永続性を確認）
    - 完了としてマーク
    - Todo を削除

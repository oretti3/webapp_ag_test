# タスクリスト: Next.js + FastAPI 統合

- [ ] **バックエンド設定**
    - [ ] `todo_api/main.py` を更新して CORS ミドルウェアを追加 (`http://localhost:3000` を許可)。
    - [ ] FastAPI サーバーを再起動。
- [x] **フロントエンドセットアップ**
    - [x] Next.js アプリをスキャフォールド (`npx create-next-app@latest frontend ...`)。
    - [x] Tailwind CSS 設定を確認。
- [x] **フロントエンド実装**
    - [x] API クライアントヘルパー (axios/fetch) を作成。
    - [x] `TodoItem` コンポーネント (モダン UI) を作成。
    - [x] `TodoList` コンポーネントを作成。
    - [x] `page.tsx` を実装し、作成フォームとリストを配置。
- [ ] **検証**
    - [ ] フロントエンドのビルドを確認。
    - [ ] フロントエンドがバックエンドから Todo を取得/作成/削除できることを確認。

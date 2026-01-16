# TodoFlow (WebApp Test)

Next.js (App Router) と FastAPI を統合した Todo アプリケーションのデモプロジェクトです。

## 技術スタック

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: FastAPI (Python)
- **Integration**: Next.js Server Actions (直接Backend APIを叩く構成)

## ディレクトリ構成

- `frontend/`: Next.js アプリケーション
- `todo_api/`: FastAPI バックエンド
- `docs/`: プロジェクトドキュメント、タスク管理、設計メモ

## ローカル環境の立ち上げ方

### 1. Backend (FastAPI)

```bash
# 仮想環境の作成と有効化 (推奨)
python3 -m venv venv
source venv/bin/activate

# 依存関係のインストール
pip install -r requirements.txt

# サーバー起動 (Port: 8000)
python3 -m uvicorn todo_api.main:app --host 0.0.0.0 --port 8000 --reload
```

### 2. Frontend (Next.js)

```bash
cd frontend

# 依存関係のインストール
npm install

# 開発サーバー起動 (Port: 3000)
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスしてください。

## 主な機能

- Todo の一覧表示 (Server Component + Fetch)
- Todo の新規作成 (Server Action)
- Todo の完了状態更新 (Server Action)
- Todo の削除 (Server Action)

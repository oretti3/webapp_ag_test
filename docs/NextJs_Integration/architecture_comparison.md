# アーキテクチャ比較: Client Side Fetching vs Server Actions

現在の実装（Client Side Fetching）と、提案する Server Actions のアプローチを比較し、なぜ Server Actions への移行が有益かを解説します。

## 比較表

| 項目 | Client Side Fetching (現状) | Server Actions (提案) |
| :--- | :--- | :--- |
| **データ取得の場所** | ブラウザ (Client) | サーバー (Next.js Server) |
| **通信経路** | Browser -> FastAPI | Browser -> Next.js Server -> FastAPI |
| **初回ロード速度** | 遅い (JSロード後にデータ取得開始) | 速い (HTML生成時にデータ取得済み) |
| **SEO** | 弱い (クローラがJSを実行する必要あり) | 強い (完全なHTMLが返される) |
| **セキュリティ** | APIキーやエンドポイントがブラウザに露出 | バックエンドの詳細は隠蔽可能 |
| **実装の簡潔さ** | `useEffect`, `isLoading` 管理が必要 | 非同期関数を呼ぶだけ (React Suspense連携) |
| **JSバンドルサイズ** | データ取得ライブラリ(Axios等)を含むため大きい | ロジックがサーバーにあるため小さい |

## 各アプローチのモチベーション

### 1. Client Side Fetching (CSR)
- **モチベーション**: 従来のSPA (Single Page Application) のように、ページ遷移なしでサクサク動くインタラクションを重視する場合。
- **メリット**: バックエンドAPIを直接叩くため、構成がシンプル（Next.jsサーバーが単なる静的ファイル配信に近い役割）。
- **デメリット**: クライアント端末のスペックや回線速度に依存しやすい。Waterfalls（データ取得の連鎖待ち）が起きやすい。

### 2. Server Actions (RSC + Server Actions)
- **モチベーション**: 「サーバーサイドでできることはサーバーでやる」という近年のWeb標準トレンド。UX（速度・操作性）とDX（開発体験）の両立。
- **メリット**:
    - **プログレッシブエンハンスメント**: JSが無効でも（ある程度）動作可能な堅牢性。
    - **セキュリティ**: 内部APIのエンドポイントを隠せる。
    - **パフォーマンス**: データの近く（サーバー）で処理するため高速。
- **デメリット**: サーバーリソースを消費する（BFF: Backend for Frontend の役割を持つ）。

## 今回の方針: Server Actions への移行

**理由**:
Next.js (App Router) のポテンシャルを最大限に引き出すため、**Server Actions** を採用します。これにより、以下のメリットを享受します。

1.  **コードの簡素化**: `useEffect` やローディング状態の手動管理を削除し、より宣言的なコードにします。
2.  **セキュリティ向上**: FastAPI との通信を Next.js サーバー内で行い、ブラウザから直接 FastAPI を叩かせないようにします（プロキシの役割）。

---
この方針に基づき、実装計画を策定します。

# CLAUDE.md — task-board

## プロジェクト概要

タスクボードアプリケーション。

## 技術スタック

- React 19 + TypeScript
- Vite (ビルドツール)
- GitHub Actions + GitHub Pages (CI/CD・ホスティング)
- localStorage (データ永続化)

## 開発コマンド

- `npm run dev` — 開発サーバー起動
- `npm run build` — プロダクションビルド
- `npx tsc --noEmit` — 型チェック

## Git 運用ルール

- コードを変更したら、その都度コミットし GitHub にプッシュする
- コミットメッセージは変更内容を簡潔に日本語で記述する
- `main` / `master` への force push は禁止

## デプロイ先

https://github.com/miyazaki-nkk/task-board/actions

## コーディング規約

- コメントは日本語で記述する
- 不要なコメントは書かない。コード自体が意図を伝えるようにする

## コンポーネント命名規約

- コンポーネントは PascalCase で命名する（例: `App`, `Board`）
- カスタムフックは `use` プレフィックス + camelCase（例: `useLocalStorage`）
- ファイル名はコンポーネント/フック名と一致させる（例: `Board.tsx`, `useLocalStorage.ts`）
- 型・インターフェースは PascalCase（例: `Task`, `BoardName`）

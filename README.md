# RYU Portfolio

React Three Fiber で作成した 3D ポートフォリオサイトです。

MacBook の画面内にターミナル風の自己紹介を表示し、木製デスクやデスクライトを配置したワークスペース風のシーンにしています。

## 概要

このポートフォリオでは、ソフトウェアエンジニアとしてのプロフィール、スキル、プロジェクト情報をインタラクティブな 3D 表現で見せています。

主な内容：

- 東京を拠点に活動するソフトウェアエンジニアの紹介
- AWS Serverless を中心としたバックエンド・データ開発経験
- 日本語学習者向けプロジェクト `ZTH (Zero to Hero)` の紹介
- ターミナル風 UI によるコマンド操作

## 使用技術

- React
- TypeScript / JavaScript
- Three.js
- React Three Fiber
- Drei
- Vite
- Leva

## 3D Scene

シーンには以下の要素を配置しています。

- MacBook model
- HTML terminal screen
- PBR wood desk
- Desk lamp GLB model
- Adjustable debug controls

木材テクスチャとデスクライトモデルは `asset/` 配下で管理しています。

## Setup

```bash
npm install
```

```bash
npm run dev
```

本番ビルド：

```bash
npm run build
```

## Directory

```text
src/
  Experience.jsx
  index.jsx
  zth-terminal.html
  resources/
    DeskLamp.jsx
    WoodDesk.jsx

asset/
  desk_lamp.glb
  Wood051_1K-JPG/
```

## Note

`node_modules/`、`dist/`、開発用の一時ファイルは Git 管理から除外しています。
実行に必要なモデル・テクスチャのみをコミット対象にしています。

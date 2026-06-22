# RYU

ソフトウェアエンジニア · 東京 · ZTH 開発中

## About

東京を拠点に活動しているソフトウェアエンジニアです。
ソフトウェアエンジニアとして約 2.5 年の実務経験があり、AWS Serverless を中心とした開発に携わってきました。

主にバックエンド開発およびデータ関連の業務を担当しており、現在は ZTH を開発しています。
ユーザーの学習体験を改善するプロダクト開発に関心があります。

## Skills

Backend: Python · FastAPI · AWS Lambda · DynamoDB  
Frontend: React · TypeScript  
Cloud / Data: AWS · Redshift · Tableau  
Certification: AWS Certified Solutions Architect - Associate

## Projects

### ZTH (Zero to Hero)

日本語学習者が自分に合った教材を選べるように、文章の読解難易度を可視化するツールです。

任意の日本語テキストに対して L1-L10 の難易度スコアを付与し、
語彙・文法・文章構造などの観点から、判定理由もあわせて提示します。

主な機能：

- 日本語テキストの読解難易度を L1-L10 で評価
- 語彙・文法・文章構造などの観点から判定理由を提示
- 学習者が自分に合った教材を選べるように支援

Tech Stack: FastAPI · Sudachi · React · TypeScript

## Experience

### Software Engineer · 2023 - Present · Tokyo

クライアント企業の業務システム開発に携わっています。

AWS Serverless を中心としたバックエンド開発、データ関連業務、既存システムの改善などを担当しています。

## Contact

GitHub · Email · X · Findy

## Portfolio Scene

This repository contains an interactive 3D portfolio scene built with React Three Fiber, Drei, Three.js, and Vite.

The scene includes:

- A MacBook model with an embedded terminal-style portfolio screen
- A PBR wood desk using color, roughness, normal, and displacement textures
- A GLB desk lamp model with adjustable warm light
- Leva debug controls for scene tuning
- `r3f-perf` performance monitoring

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Project Structure

```text
src/
  Experience.jsx
  index.jsx
  index.html
  style.css
  zth-terminal.html
  resources/
    DeskLamp.jsx
    WoodDesk.jsx

asset/
  desk_lamp.glb
  Wood051_1K-JPG/

public/
  bangers-v20-latin-regular.woff
```

## Git Notes

Generated and heavy local files are ignored, including `node_modules/`, `dist/`, and local tooling output.
Only runtime assets used by the scene should be committed.

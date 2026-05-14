# loudly-api

[Loudly Music API](https://www.loudly.com/developers)を使用して音楽を生成するためのAPIサービスおよびウェブインターフェースです。

このプロジェクトでは、以下の2つのシンプルなウェブインターフェースを提供しています:
1. **音楽ジェネレーター**: ジャンル、サブジャンル、BPMを選択して新しい音楽を生成するインターフェース。生成されたトラックの再生とダウンロードが可能です。
2. **ハウス音楽プレイヤー**: リポジトリに同梱されている、あらかじめ生成された10曲のハウスミュージックを再生するミニマルなプレイヤー。

## 機能
- ジャンル、BPM、キーなどのパラメータを指定してオリジナルの音楽を生成。
- 音楽の生成、再生、ダウンロードを試すことができるウェブベースのUI。
- あらかじめ生成された10曲のハウスミュージックのトラックを同梱。
- [Deno](https://deno.land/)ランタイムを使用して構築。

## 要件
- [Deno](https://deno.land/)
- Loudly APIキー（[Loudly for Developers](https://www.loudly.com/developers)のウェブサイトから取得可能）

## 使い方
1. リポジトリをクローンします。
2. ルートディレクトリに`.env`ファイルを作成し、Loudly APIキーを追加します:
   ```
   APIKEY=your_api_key_here
   ```
3. サーバーを起動します:
   ```sh
   deno run -A --watch server.js
   ```
4. ブラウザで以下のウェブインターフェースにアクセスします:
   - **音楽ジェネレーター**: http://localhost:8080/
   - **ハウス音楽プレイヤー**: http://localhost:8080/player.html

## データ / API
このプロジェクトは、音楽の生成に[Loudly Music API](https://www.loudly.com/developers)を使用しています。

## ライセンス
MIT License

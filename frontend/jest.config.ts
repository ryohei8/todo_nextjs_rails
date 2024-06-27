// next/jest はNext.jsによって提供されるJestの設定を簡単に行うためのヘルパー
const nextJest = require('next/jest');

// nextJest はNext.jsの設定を読み込むためのディレクトリを指定している
// これを使うことでnext.config.jsや.envをテスト環境に組み込める
const createJestConfig = nextJest({
  dir: './',
});

// Jestのカスタム設定
/** @type {import('jest').Config} */
const customJestConfig = {
  // Jestがテストを実行する環境を指定
  testEnvironment: 'jest-environment-jsdom',

  // テストセットアップファイルの指定
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // モジュール名のマッピング
  moduleNameMapper: {
    // CSSモジュールのマッピング
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',

    // 画像やその他の静的ファイルのマッピング
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // テストから無視するパス
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],

  // テストカバレッジを収集するファイルの指定
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],

  // カバレッジレポートのディレクトリ
  coverageDirectory: '<rootDir>/coverage',

  //Jestがテストファイルを検出するためのパターン指定
  testMatch: ['<rootDir>/components/**/*.test.{ts,tsx}'],
};

// 作成したJestのカスタム設定をエクスポートする
module.exports = createJestConfig(customJestConfig);

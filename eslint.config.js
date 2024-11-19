import { defineConfig } from 'eslint-define-config';
import typescriptParser from '@typescript-eslint/parser'; // TypeScript 파서 임포트

export default defineConfig([
  {
    languageOptions: {
      parser: typescriptParser, // TypeScript 파서 지정
      ecmaVersion: 12,
      sourceType: 'module',
      globals: {
        // 필요한 글로벌 변수를 여기에 추가
        // 예: myGlobal: 'readonly',
      },
    },
    rules: {
      // 사용자 정의 규칙 추가
    },
  },
  {
    files: ['*.ts', '*.js'], // 적용할 파일 확장자
    rules: {
      // 특정 파일에 대한 사용자 정의 규칙 추가
    },
  },
]);

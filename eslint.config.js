import { icebreaker } from '@icebreakers/eslint-config'

export default icebreaker(
  {
    miniProgram: true,
    vue: true,
    tailwindcss: {
      entryPoint: './src/app.css'
    },
    ignores: ['CHANGELOG.md', 'README.md', '.turbo/**', 'dist/**', '.weapp-vite/**'],
    root: true
  },
  {
    files: ['src/**/*.{ts,vue}'],
    rules: {
      'better-tailwindcss/enforce-canonical-classes': 'off',
      'better-tailwindcss/enforce-consistent-class-order': 'off',
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
      'better-tailwindcss/no-conflicting-classes': 'off',
      'better-tailwindcss/no-unknown-classes': 'off'
    }
  },
  {
    files: '`src/**/*.{ts,vue,js}',
    rules: {
      '@stylistic/comma-dangle': ['error', 'never']
    }
  }
)

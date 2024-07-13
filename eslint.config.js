module.exports = {
  root: true, // 이 설정을 ESLint의 루트 설정으로 만듦
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:prettier/recommended', // Prettier 추천 설정 확장
  ],
  plugins: [
    'prettier', // Prettier 플러그인 사용
  ],
  rules: {
    'prettier/prettier': 'error', // Prettier 규칙 위반을 에러로 표시
  },
}

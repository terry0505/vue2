## ✅ 공부하면서 메모

### 📦 개발 환경 및 명령어

| Vue 버전 | 사용 도구 / 프레임워크 | 개발 명령어     |
| -------- | ---------------------- | --------------- |
| Vue 2    | Vue CLI, Nuxt 2        | `npm run serve` |
| Vue 3    | Vite, Nuxt 3           | `npm run dev`   |

---

### 📌 Vue 2

- Options API 기반
- 항상 `export default {}` 형식 사용
- 상태 선언: `data()`
- 메서드 정의: `methods: {}`
- `ref`, `reactive` 기본 미지원 (사용하려면 `@vue/composition-api` 설치 필요)

---

### 📌 Vue 3

- Composition API 기반
- `script setup` 문법 사용 가능 → 코드 간결
- 상태 선언: `ref()`, `reactive()`
- 메서드 정의: 일반 함수로 직접 선언
- `v-model`을 통한 양방향 바인딩 가능
- `ref`, `reactive`, `computed`, `watch` 등 반응형 기능 기본 제공

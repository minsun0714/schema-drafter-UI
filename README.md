# Schema Drafter UI

문서 파일(.pdf, .xlsx)을 업로드하여 요구사항 분석 및 DB 스키마를 자동 생성하는 React UI입니다.

## 기능

| 기능 | API 엔드포인트 | 설명 |
|------|----------------|------|
| REQ Markdown 다운로드 | `POST /api/v1/design/document/requirements` | 문서에서 REQ-001 형식의 Markdown 파일을 생성하여 다운로드 |
| DB 설계 JSON 조회 | `POST /api/v1/design/document` | 문서에서 요구사항·분석·DB 스키마 JSON을 반환 |

## 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 설정
cp .env.example .env
# .env 파일에서 VITE_API_BASE_URL을 백엔드 서버 주소로 변경

# 3. 개발 서버 시작
npm run dev

# 4. 프로덕션 빌드
npm run build
```

## 환경 변수

| 변수명 | 설명 | 기본값 |
|--------|------|--------|
| `VITE_API_BASE_URL` | 백엔드 API 서버 주소 | 동일 오리진 (`''`) |

## 기술 스택

- React 19 + TypeScript
- Vite
- Tailwind CSS v4

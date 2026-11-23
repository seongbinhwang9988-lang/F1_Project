# F1: The 11 배포 안내

이 사이트는 HTML·CSS·JavaScript로 동작하는 정적 웹사이트입니다. 서버, 데이터베이스, 환경변수 및 별도 npm 의존성이 필요하지 않습니다.

## 배포용 빌드

이 폴더에서 다음을 실행합니다.

```sh
npm run build
```

npm 없이도 실행할 수 있습니다.

```sh
node scripts/build-site.mjs
```

생성되는 `dist/`가 실제 배포 폴더입니다. 빌드 과정은 원본 디자인과 기능을 유지하고, 현재 사이트에 필요한 HTML·문구 파일·이미지·영상·폰트·코드만 복사합니다. 작업 메모, 제출 원본, 중복 HTML, macOS 메타데이터는 배포하지 않습니다.

## 배포본 확인

```sh
npm run preview
```

`http://localhost:4173`에서 확인합니다.

## 정적 호스팅 설정

- 프로젝트 기준 폴더: `F1-The-11 6`
- 빌드 명령: `npm run build`
- 출력 디렉터리: `dist`
- 시작 페이지: `index.html`
- 서버나 API 주소: 필요 없음

정적 호스팅 서비스에는 생성된 `dist/`의 **내용물**을 업로드합니다. GitHub 저장소와 배포 사이트의 공개 범위는 각각 별도로 관리됩니다.

`dist/`와 `.deploy-source/`는 생성 결과 및 로컬 호스팅 연결용이므로 Git에서 제외됩니다. 수정할 파일은 원래 폴더의 `index.html`, `content.js`, `assets/`입니다.

## GitHub Pages 공개 배포

- 주소: https://seongbinhwang9988-lang.github.io/F1_Project/
- 공개 범위: 누구나 로그인 없이 접속
- 소스: 공개 GitHub 저장소 `seongbinhwang9988-lang/F1_Project`
- 자동 배포: `.github/workflows/pages.yml`이 `main` 변경 시 실행
- 배포 대상: `F1-The-11 6/dist`의 내용물

원본 파일을 수정하고 `main`에 push하면 자동으로 갱신됩니다. Actions의 배포 작업이 성공하면 변경사항이 반영됩니다.

## 기존 Sites 배포

- 주소: https://f1-the-eleven-seongbin.loundstudio-5336.chatgpt.site
- 상태: 배포 완료
- 공개 범위: 비공개, 소유자 계정으로 접속
- 호스팅: Sites
- 배포 정보: `deployment.json`

기존 Sites는 비공개로 유지하며, 위의 GitHub Pages 주소에서 공개 사이트를 제공합니다. `deployment.json`은 기존 Sites 배포 기록입니다.

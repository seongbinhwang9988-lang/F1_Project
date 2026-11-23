# F1_Project

F1 온라인 전시 사이트의 소스, 제작 자료, 수정본을 기록하는 비공개 작업 저장소입니다.

## 현재 작업본

최신 웹사이트는 `F1-The-11 6/index.html`입니다. 같은 폴더의 `assets/`와 `content.js`를 함께 유지한 상태로 브라우저에서 열면 됩니다.

로컬 서버로 확인하려면 저장소 루트에서 다음을 실행합니다.

```sh
python3 -m http.server 4173 --directory "F1-The-11 6"
```

그 뒤 `http://localhost:4173`에 접속합니다.

## 작업 기록

최종 작업 폴더 `F1-The-11 6/`만 프로젝트에 유지합니다. 다른 작업 폴더는 휴지통으로 옮겼습니다. 이전 소스와 수정본은 Git 커밋 기록에서도 확인할 수 있습니다.

## 저장 방법

```sh
git status
git add 수정한파일
git commit -m "변경 내용 설명"
git push origin main
```

`.gitignore`는 인증정보, 환경변수, 개인용 폴더, 캐시, 임시 파일 및 중복 배포 ZIP을 제외합니다. 실제 비밀값은 소스에 직접 적지 마세요. ZIP은 제외되지만 압축을 푼 소스 폴더는 기록됩니다.

## test.py로 저장·업로드 확인하기

`test.py`는 현재 웹사이트의 필수 파일이 있는지 확인하는 예제입니다.

```sh
python3 test.py
git add test.py
git commit -m "Update test.py"
git push origin main
```

업로드 후 GitHub의 `main` 브랜치에서 `test.py`를 열어 최신 내용과 커밋이 표시되는지 확인합니다. 로컬 실행 성공과 GitHub 업로드 성공은 각각 확인해야 합니다.

## 웹사이트 배포

최종 폴더에 배포용 빌드 명령을 추가했습니다.

```sh
cd "F1-The-11 6"
npm run build
npm run preview
```

배포할 파일은 생성된 `dist/`에 모입니다. 자세한 설정은 `F1-The-11 6/DEPLOYMENT.md`를 참고하세요. 호스팅 연결용 로컬 폴더와 빌드 결과는 Git에 업로드하지 않습니다.

현재 비공개 배포 주소: https://f1-the-eleven-seongbin.loundstudio-5336.chatgpt.site

소유자 계정으로 접속할 수 있으며, 배포 정보는 `F1-The-11 6/deployment.json`에 기록되어 있습니다.

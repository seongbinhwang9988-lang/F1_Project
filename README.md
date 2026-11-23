# F1_Project

F1 온라인 전시 사이트의 소스, 제작 자료, 수정본을 기록하는 비공개 작업 저장소입니다.

## 현재 작업본

최신 웹사이트는 `f1-the-11-final/index.html`입니다. 같은 폴더의 `assets/`와 `content.js`를 함께 유지한 상태로 브라우저에서 열면 됩니다.

로컬 서버로 확인하려면 저장소 루트에서 다음을 실행합니다.

```sh
python3 -m http.server 4173 --directory f1-the-11-final
```

그 뒤 `http://localhost:4173`에 접속합니다.

## 작업 기록

- `f1-the-11-final/`: 현재 웹사이트와 수정 전후 비교 자료
- `F1-The-11 2/`부터 이어지는 폴더: 이전 전달본 및 작업 기록
- `웹페이지 소스/`: 이미지, 영상, 폰트 등 제작 소스
- `기말과제_웹페이지_기획안/`: 기획 문서
- `f1-the-11/`: 초기 제작 소스

기존 하위 저장소의 Git 메타데이터는 `.local-history/`에 로컬로 보존합니다. 파일 소스는 이 저장소에서 함께 기록합니다.

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

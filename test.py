"""GitHub 저장 흐름 확인용 파일. 저장소 루트에서 python3 test.py로 실행합니다."""

from pathlib import Path


def main() -> int:
    project = Path(__file__).resolve().parent / "f1-the-11-final"
    required = (
        "index.html",
        "content.js",
        "assets/app.js",
        "assets/styles.css",
        "assets/reveal.js",
        "assets/hero-image.js",
        "assets/red-bull-hero-original.png",
    )
    missing = [name for name in required if not (project / name).is_file()]
    if missing:
        print("필수 파일이 없습니다:", ", ".join(missing))
        return 1
    print("F1_Project: test.py 실행 성공")
    print("웹사이트 필수 파일 7개 확인 완료")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

# Netflix Profile Prompt Skipper

Netflix에서 프로필 이메일 추가 안내창이 전체 화면을 가로막을 때 자동으로 숨겨 주는 Chrome 확장 프로그램입니다.

## 동작 방식

안내창 내부 요소만 삭제하면 전체 화면 클릭을 받는 `clcsModal+background`가 남아 검색과 클릭이 막힙니다. 반대로 React가 관리하는 모달 노드를 직접 삭제하면 Netflix가 다시 정리하는 과정에서 `NSES-UHX` 오류가 발생할 수 있습니다.

이 확장 프로그램은 React가 관리하는 DOM을 삭제하지 않습니다.

- 대상 안내창의 최상위 오버레이만 CSS로 숨깁니다.
- 오버레이의 포인터 입력을 비활성화합니다.
- 안내창이 설정한 페이지 스크롤 잠금을 해제합니다.
- Netflix 페이지에서만 실행되며 별도 권한을 요구하지 않습니다.

## 설치

1. 이 저장소를 다운로드하거나 복제합니다.
2. Chrome에서 `chrome://extensions`를 엽니다.
3. 오른쪽 위의 **개발자 모드**를 켭니다.
4. **압축해제된 확장 프로그램을 로드합니다**를 누릅니다.
5. 이 저장소 폴더를 선택합니다.
6. 이미 열려 있던 Netflix 탭을 새로고침합니다.

## 적용 범위

- URL: `https://www.netflix.com/*`
- 대상 버튼: `data-uia="1pdc-continue-button"`
- 대상 오버레이: `data-uia="clcsModal+background"`

Netflix가 화면 구조나 `data-uia` 값을 변경하면 선택자를 수정해야 할 수 있습니다.

## 파일

- `manifest.json`: Manifest V3 확장 프로그램 설정
- `content.css`: 안내창과 클릭 차단 오버레이 숨김
- `content.js`: 페이지 잠금 해제 및 동적 안내창 감지

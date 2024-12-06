# boardgame
추리 요소를 담은 다잉메시지 보드게임을 웹 버전으로 구현한 프로젝트입니다.
현재는 친구와의 이벤트를 위해 기획된 1회성 게임으로 설계되었지만, 추후 다회성 게임으로 확장하여 누구나 지속적으로 즐길 수 있는 콘텐츠로 발전시킬 계획입니다.

## 기간
2024.12.01 ~ 24.12.07

## 참여인원
- 기획: 이한나, 김은지
- React 개발: 김은지

## 주요 기능
1. 카드 구성
   - 세 가지 카테고리로 카드가 구성
   - 시작 시 카테고리별 랜덤으로 카드를 섞어 제공
   - 클릭을 통해 추리할 카드를 선택
2. 추리 및 힌트 기능
   - 6장의 카드 선택 시 팝업을 통해 추리 시도 여부를 선택
   - 추리를 시도할 경우, 정답 카드가 포함되어 있다면 추리 실패
   - 포함되지 않았다면 추리 성공으로 선택된 6장의 카드를 제거하고 새로운 힌트 추가 제공
3. 결과 처리 기능
   - 정답 카드를 제외한 모든 카드 제거시 게임 종료
   - 리다이렉션 버튼 제공
4. UI/UX 요소
   - 단어들을 즉각적으로 확인 가능하도록 네비게이션바 관리
   - 성공과 실패 결과를 시각적으로 표시

## 기술 스택
    - 프론트엔드: React, CSS
    - 컨테이너: Docker


참고자료
https://codesandbox.io/p/sandbox/react-card-flip-game-redi3

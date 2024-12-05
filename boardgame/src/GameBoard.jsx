import React, { useState } from "react";
import Card from "./Card";
import Popup from './Popup';
import GameOver from "./GameOver";
import HintNavbar from "./HintNavbar";


const GameBoard = () => {
  const cards = {
    Place: ["001", "002", "003", "004", "005", "006", "007", "008", "009"],
    Time: ["019", "020", "021", "022", "023", "024", "025", "026", "027"],
    Job: ["010", "011", "012", "013", "014", "015", "016", "017", "018"],
  };

  const initialHints = [
    { text: "따뜻한", part: "adj", loc: "Place", isVisible: true },
    { text: "겨울", part: "noun", loc: "Place", isVisible: true },
    { text: "숙련된", part: "adj", loc: "Job", isVisible: true },
    { text: "손", part: "noun", loc: "Job", isVisible: true },
    { text: "친절한", part: "adj", loc: "Time", isVisible: true },
    { text: "머리", part: "noun", loc: "Time", isVisible: true },
    { text: "똑똑한", part: "adj", loc: "etc", isVisible: true },
    { text: "낯선", part: "adj", loc: "etc", isVisible: true },
    { text: "답답한", part: "adj", loc: "etc", isVisible: true },
    { text: "생활", part: "noun", loc: "etc", isVisible: true },
    { text: "냉정", part: "noun", loc: "etc", isVisible: true },
    { text: "질서", part: "noun", loc: "etc", isVisible: true },
    { text: "향기", part: "noun", loc: "Place", isVisible: false },
    { text: "긴", part: "adj", loc: "etc", isVisible: false },
    { text: "아름다운", part: "adj", loc: "Job", isVisible: false },
    { text: "고통", part: "noun", loc: "etc", isVisible: false },
    { text: "곡선", part: "noun", loc: "Time", isVisible: false },
    { text: "저렴한", part: "adj", loc: "etc", isVisible: false },
  ];

  const specificNumbers = ["003","013","026"]

  ///////////// HELPER FUNCTION /////////////

  const shuffle = array => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  const toggleFirstTwoInvisibleHints = (hints) => {
    let count = 0;
    return hints.map((hint) => {
      if (!hint.isVisible && count < 2) {
        count += 1;
        return { ...hint, isVisible: true };
      }
      return hint;
    });
  };

  ///////////// SETUP /////////////

  // Shuffle the cards for each category
  const [cardList, setCardList] = useState(() => {
    const shuffledCardList = {};
    Object.keys(cards).forEach((key) => {
      shuffledCardList[key] = shuffle(cards[key]).map((name, index) => ({
        id: index,
        name,
        flipped: false,
        matched: false,
      }));
    });
    return shuffledCardList;
  });

  const [flippedCards, setFlippedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [results, setResults] = useState([]);
  const [hints, setHints] = useState(initialHints);
  const [selectedCount, setSelectedCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  ///////////// GAME LOGIC /////////////

  const handleClick = (name, index, category) => {
    // flip card
    const updatedCategoryCards = cardList[category].map((card) =>
      card.id === index ? { ...card, flipped: !card.flipped } : card
    );

    // update cardList
    setCardList({
      ...cardList,
      [category]: updatedCategoryCards
    });

    // 선택된 카드 관리
    let newCount = selectedCount;
    const flipped = flippedCards.find((card) => card.index === index && card.category === category);
    if (flipped) {
      newCount = newCount - 1;
      setFlippedCards(flippedCards.filter((card) => !(card.index === index && card.category === category)));
    } else {
      newCount = newCount + 1;
      setFlippedCards([...flippedCards, { name, index, category }]);
    }
//     console.log("fliped card",newCount,selectedCount,newCount > selectedCount);
    setSelectedCount(newCount);
    console.log(newCount,newCount > selectedCount, newCount % 6 === 0)
    // 6개 선택시 팝업
    if (newCount > selectedCount && newCount % 6 === 0) {
      setShowPopup(true);
    }
  };

  const handlePopupResponse = (response) => {
    setShowPopup(false); // 팝업 닫기

    if (response === "yes") {
      handleGuess();
    } else {
      const updatedCardList = { ...cardList };
      flippedCards.forEach(({ index, category }) => {
        updatedCardList[category] = updatedCardList[category].map((card) =>
          card.id === index ? { ...card, flipped: false } : card
        );
      });
      setCardList(updatedCardList);
      setFlippedCards([]);
      setSelectedCount((prev) => prev - 6);
    }
  };

  const handleGuess = () => {
    // check specificNumbers
    const containsSpecificNumbers = specificNumbers.some((number) =>
      flippedCards.some((card) => card.name === number)
    );

    // 실패시
    if (containsSpecificNumbers) {
      const updatedCardList = { ...cardList };
      flippedCards.forEach(({ index, category }) => {
        updatedCardList[category] = updatedCardList[category].map((card) =>
          card.id === index ? { ...card, flipped: false } : card
        );
      });
      setCardList(updatedCardList);
      setResults([...results, { type: "failure", label: "실패" }]);
      setFlippedCards([]);
      setSelectedCount((prev) => prev - 6);
      return;
    }

    // 성공시
    setResults([...results, { type: "success", label: "성공" }]);
    const updatedCardList = { ...cardList }; // 카드 리스트 복사
    flippedCards.forEach(({ name, index, category }) => {
      updatedCardList[category] = updatedCardList[category].map((card) =>
        card.id === index ? { ...card, matched: true, flipped: true } : card
      );
    });
    setCardList(updatedCardList);

    // 힌트 업데이트
    setHints((prevHints) => toggleFirstTwoInvisibleHints(prevHints));

    // game over
    if (selectedCount >= 24) {
      setGameOver(true);
    }
    setFlippedCards([]);
  };

  // loc별 그룹화
  const groupedByLoc = hints.reduce((acc, hint) => {
    if (!acc[hint.loc]) acc[hint.loc] = [];
    acc[hint.loc].push(hint);
    return acc;
  }, {});

  ///////////// DISPLAY /////////////

  return (
    <div className="container">
      <HintNavbar hints={groupedByLoc["etc"]} />
      <div className="game-board-container">
        <div className="trial-container">
          {results.map((result, index) => (
          <span key={index} className={result.type}>
            {result.label}
          </span>
          ))}
        </div>
        {!gameOver && (
          <div>
            {Object.keys(cardList).map((category) => (
              <div key={category}>
                <h2>
                  {category}
                  {groupedByLoc[category].map((hint, index) => (
                    <span
                      key={hint.text + index} // unique
                      className={`${hint.part}`}
                      style={{
                        display: hint.isVisible ? "inline" : "none",
                      }}
                    >
                      {hint.text}
                    </span>
                  ))}
                </h2>
                <div className="game-board">
                  {cardList[category].map((card) => (
                    <Card
                      key={card.id}
                      id={card.id}
                      name={card.name}
                      category = {category}
                      flipped={card.flipped}
                      matched={card.matched}
                      clicked={
                        () => handleClick(card.name, card.id, category)
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {showPopup && (
          <Popup onResponse={handlePopupResponse} />
        )}
      </div>
      {gameOver && <GameOver link="https://open.kakao.com/o/guSf392g" />}
    </div>
  );
};

export default GameBoard;

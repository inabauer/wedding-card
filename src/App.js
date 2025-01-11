import React, { useState } from "react";
import "./App.css"; // Assume your styles are in App.css
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  const handleTouchStart = (event) => {
    setStartY(event.touches[0].clientY);
    setStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    setCurrentY(event.touches[0].clientY);
    setCurrentX(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    // Handle vertical swipe for the bottom sheet
    if (startY - currentY > 50) {
      setIsOpen(true);
    } else if (currentY - startY > 50) {
      setIsOpen(false);
    }

    // Handle horizontal swipe for the carousel
    if (startX - currentX > 50) {
      // Swipe left
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, 2));
    } else if (currentX - startX > 50) {
      // Swipe right
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  return (
    <div className="app">
      {/* Header Section */}
      <div className="header">
        <h1 className="header-title">혜수 ❤ 형욱 결혼합니다</h1>
        {/* <p className="sub-title">
          2025년 3월 30일 14:30
          <br />
          로얄파크 컨밴션
        </p> */}
        <div className="carousel">
          <div
            className="carousel-images"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: "transform 0.5s ease",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img src="./img/image1.jpg" alt="1" />
            <img src="./img/image2.jpg" alt="2" />
            <img src="./img/image3.jpg" alt="3" />
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div
        className={`bottom-sheet ${isOpen ? "open" : ""}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="drag-handle"></div>
        <div className="sheet-content">
          <p>
            2025년 3월 30일 14:30
            <br />
            로얄파크 컨벤션
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;

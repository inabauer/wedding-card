import React, { useState, useEffect } from "react";

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pages = [
    [
      {
        position: "relative",

        height: "100vh",
        backgroundColor: "#f0f0f0",
        // clipPath:
        //   "path('M 150 0 A 150 150 0 0 0 0 150 V 400 H 300 V 150 A 150 150 0 0 0 150 0 Z')",
        overflow: "hidden",
      },
      `${process.env.PUBLIC_URL}/img/image1.png`,
    ],
    [
      {
        position: "relative",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        overflow: "hidden",
      },
      `${process.env.PUBLIC_URL}/img/image3.jpg`,
    ],
    [
      {
        position: "relative",
        height: "100vh",
        // width: "80%",
        // left: "10%",
        // right: "10%",
        backgroundColor: "#f0f0f0",
        // clipPath:
        //   "path('M 150 0 A 150 150 0 0 0 0 150 V 400 H 300 V 150 A 150 150 0 0 0 150 0 Z')",
        overflow: "hidden",
      },
      `${process.env.PUBLIC_URL}/img/image2.png`,
    ],
  ]; // 각 페이지 색상
  const [startY, setStartY] = useState(0); // 터치 시작 위치 저장

  const handleWheel = (event) => {
    event.preventDefault();
    const direction = event.deltaY > 0 ? 1 : -1; // 휠 방향
    scrollToPage(direction);
  };

  const handleTouchStart = (event) => {
    setStartY(event.touches[0].clientY); // 터치 시작 위치 저장
  };

  const handleTouchMove = (event) => {
    const endY = event.touches[0].clientY; // 터치 이동 위치
    const direction = startY - endY > 0 ? 1 : -1; // 위로 스와이프: 1, 아래로 스와이프: -1

    // 충분히 스와이프한 경우 페이지 변경
    if (Math.abs(startY - endY) > 50) {
      scrollToPage(direction);
      setStartY(endY); // 새로운 터치 시작 위치로 갱신
    }
  };

  const scrollToPage = (direction) => {
    let newPage = currentPage + direction;
    if (newPage < 0) newPage = 0;
    if (newPage >= pages.length) newPage = pages.length - 1;

    setCurrentPage(newPage);
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentPage]);

  return (
    <div
      style={{ height: "100vh", overflow: "hidden" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div
        style={{
          height: "100vh",
          transform: `translateY(-${currentPage * 100}vh)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {pages.map((style_list) => (
          <div style={style_list[0]}>
            <img
              src={style_list[1]}
              alt="Wedding Couple"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

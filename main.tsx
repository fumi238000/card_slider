import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const foodItems = [
  { id: 1, name: 'ピザ', image: '/api/placeholder/300/200' },
  { id: 2, name: '寿司', image: '/api/placeholder/300/200' },
  { id: 3, name: 'ハンバーガー', image: '/api/placeholder/300/200' },
  { id: 4, name: 'サラダ', image: '/api/placeholder/300/200' },
  { id: 5, name: 'アイスクリーム', image: '/api/placeholder/300/200' },
];

const FoodSwipeApp = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [preferences, setPreferences] = useState({});
  const [direction, setDirection] = useState(null);
  const [sliding, setSliding] = useState(false);

  useEffect(() => {
    if (sliding) {
      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % foodItems.length);
        setSliding(false);
        setDirection(null);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [sliding]);

  const handleSwipe = (liked) => {
    setPreferences({ ...preferences, [foodItems[currentIndex].id]: liked });
    setDirection(liked ? 'right' : 'left');
    setSliding(true);
  };

  const getCardStyle = (index) => {
    const offset = (index - currentIndex + foodItems.length) % foodItems.length;
    if (offset === 0) {
      return sliding
        ? `absolute transition-all duration-500 ease-in-out ${
            direction === 'left' ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'
          }`
        : 'absolute transition-all duration-500 ease-in-out opacity-100 translate-x-0 scale-100';
    } else if (offset === 1 || offset === -foodItems.length + 1) {
      return sliding
        ? 'absolute transition-all duration-500 ease-in-out opacity-100 translate-x-0 scale-100'
        : 'absolute transition-all duration-500 ease-in-out opacity-0 translate-x-0 scale-50';
    } else {
      return 'absolute transition-all duration-500 ease-in-out opacity-0 translate-x-0 scale-50';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-8">食べ物の好み判定アプリ</h1>
      <div className="relative w-80 h-80 overflow-hidden">
        {foodItems.map((food, index) => (
          <div key={food.id} className={getCardStyle(index)}>
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <img src={food.image} alt={food.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h2 className="text-xl font-semibold text-center mb-4">{food.name}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-8 mt-4">
        <button
          onClick={() => handleSwipe(false)}
          className="bg-red-500 text-white p-4 rounded-full flex items-center justify-center w-16 h-16 transition-all hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          disabled={sliding || Object.keys(preferences).length === foodItems.length}
          aria-label="嫌い"
        >
          <ThumbsDown size={32} />
        </button>
        <button
          onClick={() => handleSwipe(true)}
          className="bg-green-500 text-white p-4 rounded-full flex items-center justify-center w-16 h-16 transition-all hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          disabled={sliding || Object.keys(preferences).length === foodItems.length}
          aria-label="好き"
        >
          <ThumbsUp size={32} />
        </button>
      </div>
      {Object.keys(preferences).length === foodItems.length && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 w-80">
          <h3 className="text-xl font-semibold mb-4">結果</h3>
          <ul>
            {foodItems.map((food) => (
              <li key={food.id} className="flex justify-between items-center mb-2">
                <span>{food.name}</span>
                <span>{preferences[food.id] ? '好き' : '嫌い'}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FoodSwipeApp;

// простая реализация с применением прямоугольника

// export const detectCollision = (droneX, segment) => {
//   const [leftWall, rightWall] = segment;
//   const droneWidth = 30;

//   return (
//     droneX - droneWidth / 2 < 250 + leftWall ||
//     droneX + droneWidth / 2 > 250 + rightWall
//   );
// };

// более сложная реализация

// droneX, droneY - координаты центра дрона по оси х и верхней грани по y

export const checkCollision = (droneX, droneY, droneSize, caveSegments) => {
  const h = droneSize; // Высота треугольника = размер дрона
  const a = (2 * h) / Math.sqrt(3); // Длина стороны треугольника

  // Вычисление координат вершин
  const bottomVertex = { x: droneX, y: droneY + h };
  const topLeftVertex = { x: droneX - a / 2, y: droneY };
  const topRightVertex = { x: droneX + a / 2, y: droneY };

  // Получение текущего сегмента пещеры
  const segmentIndex = Math.floor(droneY / 5);
  const currentSegment = caveSegments[segmentIndex];
  const nextSegment = caveSegments[segmentIndex + 1];

  if (!currentSegment || !nextSegment) return false;

  const [leftWall1, rightWall1] = currentSegment;
  const [leftWall2, rightWall2] = nextSegment;

  // Интерполяция стенок пещеры
  const t = (droneY % 5) / 5;
  const leftWall = leftWall1 * (1 - t) + leftWall2 * t + 250;
  const rightWall = rightWall1 * (1 - t) + rightWall2 * t + 250;

  // Проверка столкновения основания
  if (topLeftVertex.x < leftWall || topRightVertex.x > rightWall) {
    return true;
  }

  // Проверка столкновения боковых сторон

  // угол наклона стороны треугольника, поскольку ось Y перевернута, нужно знак поменять у коэффициентов
  const leftSideSlope =
    -(bottomVertex.y - topLeftVertex.y) / (bottomVertex.x - topLeftVertex.x); // ниспадающая линия - должен быть отрицательный коэфф
  const rightSideSlope =
    -(bottomVertex.y - topRightVertex.y) / (bottomVertex.x - topRightVertex.x); // восходящая линия - должен быть положительный коэфф

  // Вычисление координаты Y на уровне стенки пещеры
  const leftSideYAtWall =
    bottomVertex.y + leftSideSlope * (leftWall - bottomVertex.x);
  const rightSideYAtWall =
    bottomVertex.y + rightSideSlope * (rightWall - bottomVertex.x);

  if (leftSideYAtWall < bottomVertex.y && leftSideYAtWall > topLeftVertex.y) {
    return true;
  }
  if (
    rightSideYAtWall < bottomVertex.y &&
    rightSideYAtWall > topRightVertex.y
  ) {
    return true;
  }

  // Проверка столкновения вершины
  const segmentNumber = (droneY + h) / 5; // сегмент пещеры на уровне вершины треугольника
  const topSegment = caveSegments[Math.floor(segmentNumber)]; // координаты сегмента

  if (topSegment) {
    if (
      (bottomVertex.x < topSegment[0] + 250 ||
        bottomVertex.x > topSegment[1] + 250) &&
      bottomVertex.y >= 5 * segmentNumber // проверка по вертикали
    ) {
      return true;
    }
  }

  return false;
};

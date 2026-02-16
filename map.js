const tileSize = 64;

const map = [
  [1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,1],
  [1,0,0,1,0,0,0,1],
  [1,0,0,1,0,0,0,1],
  [1,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1],
];

function isWall(x, y) {
  const mapX = Math.floor(x / tileSize);
  const mapY = Math.floor(y / tileSize);

  if (mapY < 0 || mapY >= map.length) return true;
  if (mapX < 0 || mapX >= map[0].length) return true;

  return map[mapY][mapX] === 1;
}

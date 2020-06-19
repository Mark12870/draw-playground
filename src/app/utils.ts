export function generateGraphPoints(
  pathsCount: number,
  width: number,
  height: number,
): number[][] {
  const pathsArray: number[][] = [];

  for (let currentCount = 0; currentCount <= pathsCount - 1; currentCount++) {
    const x = (width / (pathsCount - 1)) * currentCount;
    let y = getRandomInt(height - 20, 20);
    if (currentCount == 0 || currentCount == pathsCount - 1) {
      y = height;
    }
    pathsArray.push([x, y]);
  }
  return pathsArray;
}

export function getRandomInt(max: number, min: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

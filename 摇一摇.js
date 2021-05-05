function main() {
  const food = [
    '火炉火',
    '小猪查理',
    '羊排',
    '铁板',
  ];
  const index = Math.floor(Math.random() * (food.length - 1));
  return food[index];
}

const eat = main();
console.log(eat);

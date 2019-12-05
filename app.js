//array of quilt square possibilities
const squares = [
  "topleftcolor",
  "bottomrightcolor",
  "bottomleftcolor",
  "toprightcolor",
  "tophalfcolor",
  "bottomhalfcolor",
  "lefthalfcolor",
  "righthalfcolor",
  "solid",
  "none"
];

const roundedSquares = [
  ...squares,
  "topLeftRounded",
  "topRightRounded",
  "bottomLeftRounded",
  "bottomRightRounded"
];

let squaresToUse = squares;

const $box = $("#box");
const $parameters = $("#parameters");

function generateSquare() {
  const index = Math.floor(Math.random() * squaresToUse.length);
  return squaresToUse[index];
}

function generateRow(width) {
  const row = [];
  for (let i = 0; i < width; i++) {
    const square = generateSquare();
    row.push(square);
  }
  return row;
}

function generateQuilt(width, height) {
  const quilt = [];
  for (let i = 0; i < height; i++) {
    quilt.push(generateRow(width));
  }
  return quilt;
}

function displayRow(row) {
  const rowHtml = [];
  for (let i = 0; i < row.length; i++) {
    rowHtml.push(`<div class="square ${row[i]}"></div>`);
  }
  return `<div class="row">${rowHtml.join("")}</div>`;
}

function displayQuilt(quilt) {
  const quiltHtml = [];
  for (let i = 0; i < quilt.length; i++) {
    quiltHtml.push(displayRow(quilt[i]));
  }
  return `<div class="quilt">${quiltHtml.join("")}</div>`;
}

function create() {
  const [
    { value: width },
    { value: height },
    rounded
  ] = $parameters.serializeArray();
  squaresToUse = rounded ? roundedSquares : squares;
  const quilt = generateQuilt(parseInt(width), parseInt(height));
  const html = displayQuilt(quilt);
  $box.html(html);
}

create();

$parameters.submit(function(evt) {
  evt.preventDefault();
  create();
});

let firstSelection = undefined
let pickedBoxes = false

const setColour = function (colour, item){
  item.classList.remove("red")
  item.classList.remove("yellow")
  item.classList.remove("green")
  item.classList.remove("blue")
  item.classList.remove("covered")
  item.classList.add(colour)
}
const setGameBoard = function (gameBoard){
  gameBoard.forEach(function(card){
    setColour(card.colour, card.element)
  })
  setTimeout(function(){
    gameBoard.forEach(function(card){
        setColour("covered", card.element)
      }
    )
  }, 5000)
}
const handleClick = function (card){
  if (pickedBoxes) return; 
  setColour(card.colour, card.element)
  if (firstSelection){
    pickedBoxes = true
    if (firstSelection.colour === card.colour){
      alert (`${card.colour} match found`)
      pickedBoxes = false
      firstSelection = undefined
    } else {

      setTimeout(function(){
                    setColour("covered", card.element)
                    setColour("covered", firstSelection.element)
                    firstSelection = undefined
                    pickedBoxes = false
      }, 3000)
      
    }
  } else {
      firstSelection = card
  }
}
const getColour = function () {
  const colour = Math.random() * (4-0)+0
  const col = Math.floor(colour)
  if (col === 0) return "red"
  if (col === 1) return "yellow"
  if (col === 2) return "blue"
  if (col === 3) return "green"
  return col
}
const generateGameBoard = function(boardSize = 4){
  const root = document.getElementById("root")
  // initalize gameboard array
  let gameBoard = new Array(boardSize).fill(2)
  gameBoard = gameBoard.reduce(function(acc, _, index){
// create 1st card
    const currentCard = document.createElement("div")
    currentCard.id = `card${index + 1}`
    currentCard.classList.add ("card")
    root.appendChild(currentCard)
    const card = {
      element : currentCard,
      colour : getColour ()
      // use min and max values from what is required in the ()
    }
    currentCard.addEventListener ("click", handleClick.bind(currentCard, card))
    acc.push(card)
    return acc
  }, [])
  console.log(gameBoard)
  return gameBoard
}
let _gameBoard = generateGameBoard(30)
setGameBoard(_gameBoard)

// const red = document.getElementById("red");
// const yellow = document.getElementById("yellow");
// const blue = document.getElementById("blue");
// const green = document.getElementById("green");
// let firstSelection = "";

// red.addEventListener("click", function(evt){
//   if (firstSelection && firstSelection === "red")
//       alert("you win on red")

//   firstSelection = "red"
// });
// yellow.addEventListener("click", function(evt){
//   if (firstSelection){
//     if (firstSelection === "yellow"){
//       alert("you win on yellow")
//     }
//   }
//   firstSelection = "yellow"
// });
// blue.addEventListener("click", function(evt){
//   if (firstSelection){
//     if (firstSelection === "blue"){
//       alert("you win on blue")
//     }
//   }
//   firstSelection = "blue"
// });
// green.addEventListener("click", function(evt){
//   if (firstSelection){
//     if (firstSelection === "green"){
//       alert("you win on potato")
//     }
//   }
//   firstSelection = "green"
// });
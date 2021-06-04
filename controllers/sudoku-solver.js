class SudokuSolver {

  validate(puzzleString) {
  }
letterToNumber(row){
  switch(row.toUpperCase()){
    case "A":
    return 1;
    case "B":
    return 2;
    case "C":
    return 3;
    case "D":
    return 4;
    case "E":
    return 5;
    case "F":
    return 6;
    case "G":
    return 7;
    case "H":
    return 8;
    case "I":
    return 9;
    default:
    return "none";
  }
}
  checkRowPlacement(puzzleString, row, column, value) {
let grid=this.transform(puzzleString);
row=this.letterToNumber(row);
if(grid[row-1][column-1]!==0){
  return false;
}
for(let i=0;i<9;i++)
{
  if(grid[row-1][i]==value){
    return false;
  }
}
return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let grid=this.transform(puzzleString);
    row=this.letterToNumber(row);
    if(grid[row-1][column-1]!==0){
      return false;
    }
    for(let i=0;i<9;i++)
    {
      if(grid[i][column-i]==value){
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, col, value) {
    let grid=this.transform(puzzleString);
    row=this.letterToNumber(row);
    if(grid[row-1][col-1]!==0){
      return false;
    }
    let startRow=row-(row%3);
    let startCol=col-(col%3);
for(let i=0;i<3;i++)
{
  for(let j=0;j<3;j++)
  {
    if(grid[i+startRow][j+startCol]==value){
      return false;
    }
  }
}

    return true;
  }
  solveSuduko(grid,row,col)
    {

        /*if we have reached the 8th
           row and 9th column (0
           indexed matrix) ,
           we are returning true to avoid further
           backtracking       */
        if (row == 9 - 1 && col == 9)
            return grid;

        // Check if column value  becomes 9 ,
        // we move to next row
        // and column start from 0
        if (col == 9) {
            row++;
            col = 0;
        }

        // Check if the current position
        // of the grid already
        // contains value >0, we iterate
        // for next column
        if (grid[row][col] != 0)
            return this.solveSuduko(grid, row, col + 1);

        for (let num = 1; num < 10; num++) {

            // Check if it is safe to place
            // the num (1-9)  in the
            // given row ,col ->we move to next column
            if (this.isSafe(grid, row, col, num)) {

                /*  assigning the num in the current
                (row,col)  position of the grid and
                assuming our assined num in the position
                is correct */
                grid[row][col] = num;

                // Checking for next
                // possibility with next column
                if (this.solveSuduko(grid, row, col + 1))
                    return grid;
            }
            /* removing the assigned num , since our
               assumption was wrong , and we go for next
               assumption with diff num value   */
            grid[row][col] = 0;
        }
        return false;
    }
    isSafe(grid,row,col,num)
    {

        // Check if we find the same num
        // in the similar row , we
        // return false
        for (let x = 0; x <= 8; x++)
            if (grid[row][x] == num)
                return false;

        // Check if we find the same num
        // in the similar column ,
        // we return false
        for (let x = 0; x <= 8; x++)
            if (grid[x][col] == num)
                return false;

        // Check if we find the same num
        // in the particular 3*3
        // matrix, we return false
        let startRow = row - row % 3, startCol
                                      = col - col % 3;
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (grid[i + startRow][j + startCol] == num)
                    return false;

        return true;
    }
    transform(puzzleString){
      let grid=[
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
      ];
      let row=-1,col=0;
      for(let i=0;i<puzzleString.length;i++)
      {
        if((i%9)==0)
        row++;
        if(col%9==0)
        col=0;
        grid[row][col]=puzzleString[i]==="."? 0: +puzzleString[i];
        col++;
      }
      return grid;
    }
    transformBack(grid){
      return grid.flat().join("");

    }
  solve(puzzleString) {
let grid=this.transform(puzzleString);
let solved=this.solveSuduko(grid,0,0);
if(!solved){
  return false;
}
let solvedString=this.transformBack(solved);
console.log("solvedString=>",solvedString);
return solvedString;
  }
}

module.exports = SudokuSolver;

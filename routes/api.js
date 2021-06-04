'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
 const {puzzle,coordinate,value}=req.body;
 if(!puzzle||!coordinate||!value){
   res.json({error:"Required field(s) Missing"});
   return;
 }
 const row=coordinate.split("")[0];
 const col=coordinate.split("")[1];
 if(coordinate.length!==2||!/[a-i]/i.test(row)||!/[1-9]/i.test(col)){
console.log("Invalid coordinate:=>");
res.json({error:"Invalid coordinate"});
return;
 }
 if(!/[1-9]/i.test(value)){
   res.json({error:"Invalid Value"});
   return;
 }
 if(puzzle.length!=81)
 {
   res.json({error:"Expected Puzzle to be 81 characters long"});
   return;
 }
 if(/[^0-9.]/g.test(puzzle)){
   res.json({error:"Invalid characters in puzzle"});
   return;
 }
 let validCol=solver.checkColPlacement(puzzle,row,col,value);
 let validReg=solver.checkRegionPlacement(puzzle,row,col,value);
 let validRow=solver.checkRowPlacement(puzzle,row,col,value);
 let conflicts=[];
 if(validCol&&validReg&&validRow){
   res.json({valid:true});
 }else{
   if(!validRow){
     conflicts.push("row");
   }
   if(!validCol){
     conflicts.push("col");
   }
   if(!validReg){
     conflicts.push("region");
   }
   res.json({valid:false,conflict:conflicts});
 }

    });

  app.route('/api/solve')
    .post((req, res) => {
    const {puzzle}=req.body;
    if(!puzzle){
      res.json({error:"Required Field Missing"});
      return;
    }
    if(puzzle.length!=81){
      res.json({error:"Expected Puzzle to be 81 characters long"});
      return;
    }
    if(/[^0-9.]/g.test(puzzle)){
      res.json({error:"Invalid characters in puzzle"});
      return;
    }
    let solvedString=solver.solve(puzzle);
    if(!solvedString){
      res.json({error:"Puzzle cannot be solved"});
    }else{
      res.json({solution:solvedString});
    }
    });
};

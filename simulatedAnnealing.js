var knapsack = {items: [], maxWeight: 17, currentWeight: 0};
var items = [ // allowed multiple of each
  {name:'apple',    weight:3, value:20},
  {name:'blanket',  weight:4, value:40},
  {name:'lantern',  weight:5, value:10},
  {name:'radio',    weight:6, value:30}
];

function generateRandomSolution(){
  var solution = [];
  var itemToAdd = items[randomIndex(items)];
  while(knapsack.maxWeight >= weigh(solution) + itemToAdd.weight){
    solution.push(itemToAdd);
    itemToAdd = items[randomIndex(items)];
  }
  return solution;

};

function randomIndex(list){
  return Math.floor(Math.random()*list.length);
}
function weigh(solution){
  return solution.reduce(function(total, item){ return total + item.weight}, 0);
}

function generateNeighboringSolution(solution){
  // var currentSolution = currentSolution || random
  // add, swap, or remove item randomly

  var whatToDo = Math.floor(Math.random()*3);
  var index = randomIndex(solution);
  var newItem = items[randomIndex(items)];
  var numberOfAttemptsAtValidNeighborSolution = 0;
  while( numberOfAttemptsAtValidNeighborSolution || knapsack.maxWeight < weigh(solution) ){
    if(whatToDo === 0){
      // add
      solution.splice(index, 0, newItem);
    }else if(whatToDo === 1){
      // remove
      solution.splice(index, 1);
    }else{
      // replace
      solution[index] = newItem;
    }
    numberOfAttemptsAtValidNeighborSolution += 1;
  }
  console.log('numberOfAttemptsAtValidNeighborSolution',numberOfAttemptsAtValidNeighborSolution);
  return solution;
}

function calculateCost(solution){

  return 'cost';
}

function simulateAnnealing(generateNeighboringSolution, calculateCost, acceptanceProbability){
  // First, generate a random solution
  // 2. Calculate its cost using some cost function you've defined
  // 3. Generate a random neighboring solution
  // 4. Calculate the new solution's cost
  // 5. Compare them: If cnew < cold: move to the new solution; If cnew > cold: maybe move to the new solution
  // 6. Repeat steps 3-5 above until an acceptable solution is found or you reach some maximum number of iterations.
  var solution = generateSolution();
  var old_cost = calculateCost(solution);
  var temperature = 1.0;
  var temperature_min = 0.00001;
  var alpha = 0.9;
  while(temperature > temperature_min){
    var i = 1;
    while(i <= 100){
      var new_solution = generateNeighboringSolution(solution);
      var new_cost = calculateCost(new_solution);
      var ap = acceptance_probability(old_cost, new_cost, temperature);
      if(ap > Math.random()){
        solution = new_solution;
        old_cost = new_cost;
      }
      i += 1;
    }
    temperature = temperature*alpha;
  }
  return solution;
};

var soln1 = generateRandomSolution()
console.log('random', soln1.map(function(i){return i.name;}));
var soln2 = generateNeighboringSolution(soln1)
console.log('neighboring', soln2.map(function(i){return i.name;}));
// console.log(simulateAnnealing(generateRandomSolution, calculateCost));

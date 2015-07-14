var knapsack = {items: [], maxWeight: 17, currentWeight: 0}; // NP-hard
var items = [ // allowed multiple of each
  {name:'apple',    weight:3, value:20},
  {name:'blanket',  weight:4, value:40},
  {name:'lantern',  weight:5, value:10},
  {name:'radio',    weight:6, value:30}
];

var shuffleArray = function(newItems, maxWeight) {
	var solution = [];
	var accumulatedWeight = 0;
	var currentItem;
	var currentRandom;

	for(var i = 0; i < newItems.length; i++) {
		currentRandom = randomIndex(newItems);
		currentItem = newItems[currentRandom];

		accumulatedWeight += currentItem.weight;

		if (accumulatedWeight <= maxWeight) {
			solution.push(currentItem);
		}
	}
	return solution;
};

function generateRandomSolution() {
  return shuffleArray(items, knapsack.maxWeight); // array of items, must be <= maxWeight
}

function generateNeighboringSolution(oldSolution) {
  // add, swap, or remove item randomly

  return shuffleArray(oldSolution, knapsack.maxWeight); // array of items, must be <= maxWeight
}

function calculateCost(solution) {
  return solution.reduce(function(total, item) { return total + item.value}, 0);
}

function acceptance_probability(old_cost, new_cost, temperature) {
  return Math.pow(Math.E, (new_cost - old_cost)/temperature); // probability to jump
}

function simulateAnnealing() {

	var solution = generateRandomSolution();
	var oldCost = calculateCost(solution);

	var t = 1.0;
	var minT = 0.00001;
	var alpha = 0.9; // learning rate

	var i, newSolution, newCost, acceptanceProbability;

	while(t > minT) {
		i = 1;

		while(i <= 100) {
			newSolution = generateNeighboringSolution(solution);
			newCost = calculateCost(newSolution);
			acceptanceProbability = acceptance_probability(oldCost, newCost, t);

			// console.log(acceptanceProbability);

			if (acceptanceProbability > Math.random()) {
				solution = newSolution;
				oldCost = newCost;
			}

			i += 1;
		}

		t = t * alpha;
	}

  return solution; // array of items, must be <= maxWeight
}

// old_cost = cost(solution)
//     T = 1.0
//     T_min = 0.00001
//     alpha = 0.9
//     while T > T_min:
//         i = 1
//         while i <= 100:
//             new_solution = neighbor(solution)
//             new_cost = cost(new_solution)
//             ap = acceptance_probability(old_cost, new_cost, T)
//             if ap > random():
//                 solution = new_solution
//                 old_cost = new_cost
//             i += 1
//         T = T*alpha
//     return solution

///////////////////////////////////
// HELPER FUNCTIONS              //
// don't modify, but you can use //
///////////////////////////////////

function randomIndex(list) {
  return Math.floor(Math.random()*list.length);
}

function weigh(solution) {
  return solution.reduce(function(total, item) { return total + item.weight}, 0);
}

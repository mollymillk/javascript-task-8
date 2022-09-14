'use strict';

type Translation = Promise<() => string>;
type Translations =  Translation[];
type Counter = number;

const isStar = false;

function runParallel(jobs:Translations, parallelNum:number) {
	let index:Counter = 0;

	return new Promise((resolve) => {
		const result = [];

		if (jobs.length === 0) {
			return resolve(jobs);
		}

		async function getMidtermResult() {

			let parralelIndex = 0;
			const parallelOperations = [];

			while (parralelIndex < parallelNum) {
				parallelOperations.push(jobs[index]);
				index++;			
				parralelIndex++;
			}

			let operationIndex = 0;

			while (operationIndex < parallelNum) {
				const test = await parallelOperations[operationIndex];
				result.push(test);
				operationIndex++;
			}
			
		}

		async function getJob() {

			while (index < jobs.length) {
				await getMidtermResult();
			}			
			console.log(result);
			
			resolve(result);
		}

		void getJob();
	});
}


module.exports = {
	runParallel,

	isStar
};

'use strict';

interface Translation {
	text: string;
	detectedLanguageCode: string;
}

interface Translations {
	translations: Translation[];
}

type PromiseResult = Promise<Translations>[];
type Counter = number;

const isStar = false;


function runParallel(jobs:PromiseResult, parallelNum:number):Promise<PromiseSettledResult<Translations>[]>|Promise<null[]> {
	let index:Counter = 0;

	return new Promise((resolve) => {

		if (jobs.length === 0) {
			return resolve([]);
		}

		function getResult():PromiseResult {

			let parralelIndex:Counter = 0;
			const midtermResult:PromiseResult = [];

			while (parralelIndex < parallelNum) {
				const test = jobs[index];							
				midtermResult.push(test);
				index++;			
				parralelIndex++;

			}

			return midtermResult;
		}

		function getValue():void {

			const result:PromiseSettledResult<Translations>[] = [];

			while ( index < jobs.length) {
				const res = getResult();

				void Promise.allSettled(res)
	
					.then(res => {
						let resIndex = 0;

						while (resIndex < res.length) {
							result.push(res[resIndex]);
							resIndex++;
						}

						if (result.length === jobs.length) {
							resolve(result);
						}
						
					});	
			}			
		}

		getValue();

	});
}


module.exports = {
	runParallel,

	isStar
};

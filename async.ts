'use strict';

type Translation = string;
type Translations =  Translation[Counter];
type Counter = number;

const isStar = false;
let index:Counter = 0;

function runParallel(jobs:Translations, parallelNum:number, timeout = 1000):Promise<string[]> {

	async function getMidtermResult():Promise<string[]>{

		const promise:Promise<string[]> = new Promise(resolve => {
			let parallelCounter = 0;
			const result:string[] = [];

			setTimeout(() => {

				while (parallelCounter < parallelNum) {
					result.push(jobs[index]);
					parallelCounter++;
					index++;
					resolve(result);
				}
			}, timeout);

		});

		const midtermResult:string[] = await promise;
		return midtermResult; 
	}

	async function getWords() {
		const result:string[] = [];
		while (index < jobs.length) {
			const words = await getMidtermResult();
			result.push(...words);
		}
		return result;
	}

	const result:Promise<string[]> = new Promise(resolve => {
		void getWords().then(data => {
			resolve([...data]);
		});
	});

	return result;
}

module.exports = {
	runParallel,

	isStar
};

'use strict';
const isStar = false;
function runParallel(jobs, parallelNum) {
    let index = 0;
    return new Promise((resolve) => {
        if (jobs.length === 0) {
            return resolve([]);
        }
        function getResult() {
            let parralelIndex = 0;
            const midtermResult = [];
            while (parralelIndex < parallelNum) {
                const test = jobs[index];
                midtermResult.push(test);
                index++;
                parralelIndex++;
            }
            return midtermResult;
        }
        function getValue() {
            const result = [];
            while (index < jobs.length) {
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

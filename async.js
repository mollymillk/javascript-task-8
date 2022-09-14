'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const isStar = false;
function runParallel(jobs, parallelNum) {
    let index = 0;
    return new Promise((resolve) => {
        const result = [];
        if (jobs.length === 0) {
            return resolve(jobs);
        }
        function getMidtermResult() {
            return __awaiter(this, void 0, void 0, function* () {
                let parralelIndex = 0;
                const parallelOperations = [];
                while (parralelIndex < parallelNum) {
                    parallelOperations.push(jobs[index]);
                    index++;
                    parralelIndex++;
                }
                let operationIndex = 0;
                while (operationIndex < parallelNum) {
                    const test = yield parallelOperations[operationIndex];
                    result.push(test);
                    operationIndex++;
                }
            });
        }
        function getJob() {
            return __awaiter(this, void 0, void 0, function* () {
                while (index < jobs.length) {
                    yield getMidtermResult();
                }
                console.log(result);
                resolve(result);
            });
        }
        void getJob();
    });
}
module.exports = {
    runParallel,
    isStar
};

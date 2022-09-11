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
let index = 0;
function runParallel(jobs, parallelNum, timeout = 1000) {
    function getMidtermResult() {
        return __awaiter(this, void 0, void 0, function* () {
            const promise = new Promise(resolve => {
                let parallelCounter = 0;
                const result = [];
                setTimeout(() => {
                    while (parallelCounter < parallelNum) {
                        result.push(jobs[index]);
                        parallelCounter++;
                        index++;
                        resolve(result);
                    }
                }, timeout);
            });
            const midtermResult = yield promise;
            return midtermResult;
        });
    }
    function getWords() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            while (index < jobs.length) {
                const words = yield getMidtermResult();
                result.push(...words);
            }
            return result;
        });
    }
    const result = new Promise(resolve => {
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

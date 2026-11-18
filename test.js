const assert=require('node:assert/strict');const calculate=require('./calculator');
const base={price:100000,down:20,rate:0,term:10,years:10,closing:0,selling:0,pmi:0,tax:0,insurance:0,maintenance:0,hoa:0,rent:0,rentersInsurance:0,returnRate:0,appreciation:0,rentGrowth:0,expensesGrowth:0};
let r=calculate(base);assert.ok(Math.abs(r.firstBuy-80000/120)<1e-8);assert.ok(Math.abs(r.rows.at(-1).buy)<1e-6);assert.ok(Math.abs(r.rows.at(-1).rent)<1e-6);assert.ok(Math.abs(r.rows.at(-1).advantage)<1e-6);
r=calculate({...base,down:100,years:1,returnRate:10});assert.ok(Math.abs(r.rows.at(-1).advantage+10000)<1e-6);assert.ok(Math.abs((r.rows.at(-1).rent-r.rows.at(-1).buy)-r.rows.at(-1).advantage)<1e-6);
r=calculate({...base,down:10,years:1,pmi:1});assert.ok(r.firstBuy>90000/120);assert.equal(r.rows.length,2);console.log('Model checks passed');

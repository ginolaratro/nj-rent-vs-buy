(function(root){
  function calculate(x){
    const price=x.price, down=price*x.down/100, loan=price-down, rate=x.rate/1200, months=x.term*12;
    const payment=loan===0?0:rate===0?loan/months:loan*rate/(1-Math.pow(1+rate,-months));
    let balance=loan, portfolio=down+price*x.closing/100, buyCash=portfolio, rentCash=0;
    const rows=[]; let firstBuy=0;
    function snapshot(year){const value=price*Math.pow(1+x.appreciation/100,year); const proceeds=value*(1-x.selling/100)-balance; return {year,buy:buyCash-proceeds,rent:buyCash-portfolio, advantage:proceeds-portfolio};}
    rows.push(snapshot(0));
    for(let m=1;m<=x.years*12;m++){
      const year=Math.floor((m-1)/12), growth=Math.pow(1+x.expensesGrowth/100,year), rentGrowth=Math.pow(1+x.rentGrowth/100,year);
      const interest=balance*rate, principal=Math.min(balance,Math.max(0,payment-interest));
      const pmi=balance>price*0.8+1e-8?loan*x.pmi/1200:0;
      const housing=(balance>0?payment:0)+pmi+(price*x.tax/100+ x.insurance + price*x.maintenance/100)*growth/12+x.hoa;
      const rent=(x.rent+x.rentersInsurance)*rentGrowth;
      if(m===1) firstBuy=housing;
      balance=Math.max(0,balance-principal); buyCash+=housing; rentCash+=rent;
      portfolio=portfolio*Math.pow(1+x.returnRate/100,1/12)+(housing-rent);
      if(m%12===0) rows.push(snapshot(m/12));
    }
    return {rows,firstBuy,firstRent:x.rent+x.rentersInsurance};
  }
  if(typeof module!== 'undefined') module.exports=calculate; else root.calculate=calculate;
})(typeof window!=='undefined'?window:globalThis);

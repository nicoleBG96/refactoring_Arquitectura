export default function createStatementData (invoice, plays){
    const result = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map (enrichPerformance); 
    statementData.totalAmount = totalAmount (result);
    statementData.totalVolumeCredits = totalVolumeCredits (result);
    return result;
}

function enrichPerformance(aPerformance) {
    const calculator =  new PerformanceCalculator (aPerformance, playFor(aPerformance));
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = amountFor (result);
    result.volumeCredits = volumeCreditsFor (result);
    return result;
}
  
function amountFor (aPerformance) {
    return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
}
  
function playFor (aPerformance) {
    return plays [aPerformance.playID];
}
  
function volumeCreditsFor (aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);
     return result;
}
  
function totalVolumeCredits (data) {
    return data.performances
      .reduce ((total, p) => total + p.volumeCredits, 0);
}
  
function totalAmount (data) {
    return data.performances
    .reduce ((total, p) => total + p.amount, 0);
}
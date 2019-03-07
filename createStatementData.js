export default function createStatementData (invoice, plays){
    const result = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map (enrichPerformance); 
    statementData.totalAmount = totalAmount (result);
    statementData.totalVolumeCredits = totalVolumeCredits (result);
    return result;
}

function enrichPerformance(aPerformance) {
    const calculator =  createPerformanceCalculator (aPerformance, playFor(aPerformance));
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
}

function createPerformanceCalculator(aPerformance, aPlay) {
    switch(aPlay.type) {
        case "tragedy": return new TragedyCalculator(aPerformance, aPlay);
        case "comedy" : return new ComedyCalculator(aPerformance, aPlay);
        default:throw new Error(`unknown type: ${aPlay.type}`);
    }
}
  
function playFor (aPerformance) {
    return plays [aPerformance.playID];
}
  
  
function totalVolumeCredits (data) {
    return data.performances
      .reduce ((total, p) => total + p.volumeCredits, 0);
}
  
function totalAmount (data) {
    return data.performances
    .reduce ((total, p) => total + p.amount, 0);
}



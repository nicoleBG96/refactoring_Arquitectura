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

class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.aPlay = aPlay;
    }

    get amount() {
        let result = 0;
        switch (this.play.type) {
            case "tragedy":result = 40000;
            if (this.performance.audience > 30) {
                result += 1000 * (this.performance.audience -30);
            }
            break;
            case "comedy":result = 30000;
            if (this.performance.audience > 20) {
                result += 10000 + 500 * (this.performance.audience -20);
            }
            result += 300 * this.performance.audience;
            break;
            default:throw new Error(`unknown type: ${this.play.type}`);
        }
        return result;
    }

    get volumeCredits() {
        return Math.max(this.performance.audience -30, 0);
    }

    get amount() {
        throw new Error('subclass responsibility');
    }
}

class TragedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 40000;
        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience -30);
        }
        return result;
    }
}

class ComedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 30000;
        if (this.performance.audience > 20) {result += 10000 + 500 * (this.performance.audience -20);
        }
        result += 300 * this.performance.audience;
        return result;
    }

    get volumeCredits() {
        return super.volumeCredits + Math.floor(this.performance.audience / 5);
    }
}



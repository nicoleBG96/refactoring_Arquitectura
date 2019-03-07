function statement (invoice, plays) {
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    
    // print line for this order
    result += ` ${playFor (perf).name}: ${usd(amountFor(perf)/100)} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount ())}\n`;
  result += `You earned ${totalVolumeCredits} credits\n`;
  return result;

  function amountFor (aPerformance) {
    let result = 0;
    switch (playFor (perf).type) {
      case "tragedy":
      result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
      result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${playFor (perf).type}`);
    }
    return result;
  }

  function playFor (aPerformance) {
    return plays [aPerformance.playID];
  }

  function volumeCreditsFor (aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor (aPerformance).type) result += Math.floor(aPerformance.audience / 5);
    return result;
  }

  function usd (aNumber) {
    return new Int1.NumberFormat ("en-US",
                                { style: "currency", currency: "USD",
                                minimumFractionDigits: 2 }).format(aNumber/100);
  }

  function totalVolumeCredits () {
    let volumeCredits = 0;
    for (let perf of invoice.performances){
      volumeCredits += volumeCreditsFor (perf);
    }
    return volumeCredits;
  }

  function totalAmount () {
    let result = 0;
    for (let perf of invoice.performances){
      result += amountFor (perf);
    }
    return result;
  }

}

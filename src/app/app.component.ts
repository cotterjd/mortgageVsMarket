import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'mortageVsMarket';

  mortgageAmount:number = 150000
  mortgageRate:number = 0.05
  // mortgageTerm:number = 15
  mortgagePayment:number = 800 
  homeValue:number = 180000
  portfolioAmount:number = 32000
  portfolioRate:number = 0.12
  years:number = 30
  extraCash:number = 1200
  investment:string = `mortage`

  startNetWorth:number = this.homeValue - this.mortgageAmount + this.portfolioAmount
  endNetWorth:number = this.startNetWorth 

  calculateMarketInvestment:Function = (years:number, portfolioAmount:number, mortgageAmount:number, netWorth:number):void => {
    if (years === 0) {
      this.endNetWorth = netWorth
      return
    }

    const newMortgageAmount:number = this.getNewMortgageAmount(mortgageAmount)
    if (newMortgageAmount <= 0) {
      const newPortfolioAmount:number = this.getNewPortfolioAmount(portfolioAmount, this.extraCash, this.mortgagePayment)
      const newMarketGains:number = newPortfolioAmount - portfolioAmount
      const newNetWorth:number = netWorth = netWorth + newMarketGains
      return this.calculateMarketInvestment(years-1, newPortfolioAmount, newMortgageAmount, newNetWorth)
    }
    const newEquity:number = mortgageAmount - newMortgageAmount
    const newPortfolioAmount:number = this.getNewPortfolioAmount(portfolioAmount, this.extraCash)
    const newMarketGains:number = newPortfolioAmount - portfolioAmount
    const newNetWorth:number = netWorth = netWorth + newEquity + newMarketGains
    return this.calculateMarketInvestment(years-1, newPortfolioAmount, newMortgageAmount, newNetWorth)
  }
  calculateMortgageInvestment:Function = (years:number, portfolioAmount:number, mortgageAmount:number, netWorth:number):void => {
    if (years === 0) {
      this.endNetWorth = netWorth
      return
    }

    const newMortgageAmount:number = this.getNewMortgageAmount(mortgageAmount, this.extraCash)
    if (newMortgageAmount <= 0) {
      const newPortfolioAmount:number = this.getNewPortfolioAmount(portfolioAmount, this.extraCash, this.mortgagePayment)
      const newMarketGains:number = newPortfolioAmount - portfolioAmount
      const newNetWorth:number = netWorth = netWorth + newMarketGains
      return this.calculateMortgageInvestment(years-1, newPortfolioAmount, mortgageAmount, newNetWorth)
    }
    const newEquity:number = mortgageAmount - newMortgageAmount
    const newPortfolioAmount:number = this.getNewPortfolioAmount(portfolioAmount)
    const newMarketGains:number = newPortfolioAmount - portfolioAmount
    const newNetWorth:number = netWorth = netWorth + newEquity + newMarketGains
    return this.calculateMortgageInvestment(years-1, newPortfolioAmount, newMortgageAmount, newNetWorth)
  }

  getNewPortfolioAmount (amount:number, extraCash?:number, loanPayment?:number):number {
    let newAmount:number = amount
    if (extraCash) newAmount = newAmount + extraCash
    if (loanPayment) newAmount = newAmount + loanPayment
    // make this more precise. payments are monthly, not yearly
    return (newAmount * this.portfolioRate) + newAmount
  }
  getNewMortgageAmount (amount:number, extraCash?:number):number {
    let payment:number = this.mortgagePayment
    if (extraCash) payment = payment + extraCash
    // TODO: handle amount below 0
    return amount - (payment - (this.mortgageAmount * this.mortgageRate))
  }

  selectInvestment:Function = (x:string):void => {
    this.investment = x
  }
}

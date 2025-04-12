import { makeAutoObservable } from "mobx";

export class CounterStore {
  title = "Counter Store";
  count = 42;
  events: string[] = [`Initial count is ${this.count}`];
  constructor() {
    makeAutoObservable(this);
  }
  increment = (amount = 1) => {
    this.count += amount;
    this.events.push(`Incremented by ${amount} - new count is ${this.count}`);
  };
  // increment = () => {
  //   this.count++;
  // };
  decrement = (amount = 1) => {
    this.count-= amount;
    this.events.push(`Decremented by ${amount} - new count is ${this.count}`);
  };
  // decrement = () => {
  //   this.count--;
  // };
  get eventCount() {
    return this.count;
  }
}
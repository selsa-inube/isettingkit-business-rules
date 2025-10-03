import { OperatorStrategy } from "../types/operators/OperatorStrategy";

class OperatorRegistry {
  private strategies: OperatorStrategy<any>[] = [];

  register<T>(strategy: OperatorStrategy<T>) {
    this.strategies.push(strategy);
  }

  get(operator: string): OperatorStrategy<any> {
    const found = this.strategies.find(strategy => strategy.matches(operator));
    if (!found) throw new Error(`Operator strategy not found for '${operator}'`);
    return found;
  }
}

export { OperatorRegistry };
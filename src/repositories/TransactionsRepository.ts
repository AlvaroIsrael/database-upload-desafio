import {EntityRepository, Repository} from 'typeorm';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    /* Return everything from the database. */
    const transactions = await this.find();

    const operation = (income: number, transaction: Transaction): number => {
      return income + transaction.value;
    };

    const getTotal = (income: number, outcome: number): number => {
      return income - outcome;
    };

    const income = transactions.filter(t => t.type === 'income').reduce(operation, 0);
    const outcome = transactions.filter(t => t.type === 'outcome').reduce(operation, 0);
    const total = getTotal(income, outcome);

    return {income, outcome, total};
  }
}

export default TransactionsRepository;

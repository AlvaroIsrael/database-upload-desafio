import {EntityRepository, Repository} from 'typeorm';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  private readonly transactions: Transaction[];

  private balance: {};

  constructor() {
    super();
    this.transactions = [];
    this.balance = {};
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public async getBalance(): Promise<Balance> {
    const operation = (income: number, transaction: Transaction): number => {
      return income + transaction.value;
    };

    const getTotal = (income: number, outcome: number): number => {
      return income - outcome;
    };

    const income = this.transactions.filter(t => t.type === 'income').reduce(operation, 0);
    const outcome = this.transactions.filter(t => t.type === 'outcome').reduce(operation, 0);
    const total = getTotal(income, outcome);

    this.balance = {income, outcome, total};
    return {income, outcome, total};
  }
}

export default TransactionsRepository;

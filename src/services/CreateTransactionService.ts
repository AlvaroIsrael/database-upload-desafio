// import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public async execute({title, value, type, category}: Transaction): Promise<Transaction> {
    const transaction = this.transactionsRepository.create({title, value, type, category});
    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > balance.total) {
      throw Error('Forbidden Transaction.');
    }

    return transaction;
  }
}

export default CreateTransactionService;

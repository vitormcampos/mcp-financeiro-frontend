export enum CashFlowStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
}

export class CashFlow {
  private _status?: CashFlowStatus;

  description?: string;
  amount: number = 0;
  type?: 'INCOME' | 'EXPENSE' | 'INVESTMENT';
  month?: number;
  year?: number;

  get status(): CashFlowStatus | undefined {
    return this._status;
  }

  set status(value: CashFlowStatus | undefined) {
    if (value !== undefined && !(value in CashFlowStatus)) {
      throw new Error(`Invalid status: ${value}. Must be PENDING or PAID`);
    }
    this._status = value;
  }
}

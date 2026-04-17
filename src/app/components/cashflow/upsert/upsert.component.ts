import { Component, inject, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CashFlowService } from '../../../services/cash-flow.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { concatMap, tap } from 'rxjs';
import { CashFlow } from '../../../models/cash-flow';
import { CashflowStore } from '../../../stores/cashflow.store';

@Component({
  selector: 'app-upsert',
  imports: [ReactiveFormsModule],
  templateUrl: './upsert.component.html',
  styleUrl: './upsert.component.css',
})
export class UpsertComponent {
  private readonly cashFlowService = inject(CashFlowService);
  private readonly cashFlowStore = inject(CashflowStore);
  private readonly modalService = inject(NgbModal);
  private readonly fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    description: ['', [Validators.required, Validators.minLength(1)]],
    amount: [null, [Validators.required, Validators.min(0.01)]],
    status: ['', [Validators.required]],
    type: ['', [Validators.required]],
    month: [
      new Date().getMonth() + 1,
      [Validators.required, Validators.min(1), Validators.max(12)],
    ],
    year: [
      new Date().getFullYear(),
      [Validators.required, Validators.min(new Date().getFullYear())],
    ],
  });

  expectedStatuses = Object.entries({ PENDING: 'Pendente', PAID: 'Pago' });

  expectedTypes = Object.entries({
    INCOME: 'Entrada',
    EXPENSE: 'Saída',
    INVESTMENT: 'Investimento',
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.modalService.dismissAll();

    this.cashFlowService
      .create(this.form.value)
      .pipe(
        tap(() => {
          this.form.reset();
        }),
        concatMap(() => {
          return this.cashFlowService.getAll();
        }),
      )
      .subscribe((cashFlows: CashFlow[]) => this.cashFlowStore.set(cashFlows));
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'Novo Registro' });
  }

  close() {
    this.modalService.dismissAll();
  }
}

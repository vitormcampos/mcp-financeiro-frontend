import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CashflowStore } from '../../stores/cashflow.store';
import { LoggedInStore } from '../../stores/logged-in.store';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly loggedInStore = inject(LoggedInStore);
  private readonly cashFlowStore = inject(CashflowStore);
  private readonly themeService = inject(ThemeService);

  userIsLoggedIn = toSignal(this.loggedInStore.get());
  isDarkMode = this.themeService.isDarkMode;

  cashFlows = toSignal(this.cashFlowStore.get(), { initialValue: [] });

  totalCashFlow = computed(() => {
    const income = this.cashFlows().filter((cf) => cf.type === 'INCOME');
    const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);

    const expense = this.cashFlows().filter((cf) => cf.type === 'EXPENSE');
    const totalExpense = expense.reduce((acc, curr) => acc + curr.amount, 0);

    const investment = this.cashFlows().filter(
      (cf) => cf.type === 'INVESTMENT',
    );
    const totalInvestment = investment.reduce(
      (acc, curr) => acc + curr.amount,
      0,
    );

    return totalIncome - totalExpense - totalInvestment;
  });

  toggleTheme() {
    this.themeService.toggle();
  }

  logout() {
    this.authService.logout();

    this.loggedInStore.set(false);

    this.router.navigate(['/login']);
  }
}
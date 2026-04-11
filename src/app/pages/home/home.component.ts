import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  features = [
    {
      iconClass: 'bi-cash-stack',
      title: 'Fluxo de Caixa',
      description: 'Gerencie suas receitas, despesas e investimentos de forma simples e organizadas',
    },
    {
      iconClass: 'bi-chat-square-dots',
      title: 'Chat AI',
      description: 'Consulte, cadastre e altere registros através de conversa natural com IA',
    },
    {
      iconClass: 'bi-bar-chart-line',
      title: 'Relatórios',
      description: 'Visualize dashboards e análises detalhadas das suas finanças pessoais',
    },
    {
      iconClass: 'bi-shield-lock',
      title: 'Segurança',
      description: 'Seus dados protegidos com autenticação segura e criptografia',
    },
  ];

  benefits = [
    'Controle total das suas finanças',
    'IA integrada para consultas rápidas',
    'Cadastro simplificado por chat',
    'Atualização de registros via linguagem natural',
    'Histórico completo de transações',
  ];
}
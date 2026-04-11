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
      icon: '💰',
      title: 'Fluxo de Caixa',
      description: 'Gerencie suas receitas, despesas e investimentos de forma simples e organizadas',
    },
    {
      icon: '🤖',
      title: 'Chat AI',
      description: 'Consulte, cadastre e alterations registros através de conversación natural com IA',
    },
    {
      icon: '📊',
      title: 'Relatórios',
      description: 'Visualize dashboards e análises detalhadas das suas finanças pessoais',
    },
    {
      icon: '🔒',
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
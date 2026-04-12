import {
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-chat-ai',
  imports: [FormsModule, MarkdownComponent],
  templateUrl: './chat-ai.component.html',
  styleUrl: './chat-ai.component.css',
})
export class ChatAiComponent implements OnInit, OnDestroy {
  chatService = inject(ChatService);

  @Input() floating = false;

  showWindow = signal(false);
  chats = signal<ChatMessage[]>([]);
  isLoading = false;

  chatWindowElement = viewChild.required<ElementRef>('chatWindow');

  promptSub = this.chatService.prompt$.subscribe((prompt) => {
    this.addMessage({ content: prompt, origin: 'agent' });
    this.isLoading = false;
  });

  ngOnInit() {
    this.chatService.startConnection();
  }

  toggleWindow() {
    this.showWindow.update((w) => !w);
  }

  addMessage(message: ChatMessage) {
    this.chats.update((old) => [...old, message]);
    setTimeout(() => this.scrollToBottom(), 100);
  }

  sendQuickPrompt(prompt: string) {
    this.addMessage({ content: prompt, origin: 'user' });
    this.isLoading = true;
    this.chatService.sendPrompt(prompt, () => this.scrollToBottom());
  }

  submitMessage(f: NgForm) {
    const message = f.control.get('userMessage')?.value;
    if (!message?.trim()) return;

    this.isLoading = true;
    this.addMessage({ content: message, origin: 'user' });
    this.chatService.sendPrompt(message, () => {
      this.isLoading = false;
      this.scrollToBottom();
    });
    f.resetForm();
  }

  private scrollToBottom() {
    const el = this.chatWindowElement();
    if (el) {
      el.nativeElement.scrollTo({
        top: el.nativeElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  ngOnDestroy(): void {
    this.promptSub.unsubscribe();
    this.chatService.stopConnection();
  }
}

type ChatMessage = {
  origin: 'user' | 'agent';
  content: string;
};
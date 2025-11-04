import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class ContactElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getFieldName(): Locator {
    return this.page.locator('input[placeholder="Seu nome"]');
  }

  getFieldPhone(): Locator {
    return this.page.locator('input[placeholder="Seu telefone"]');
  }

  getFieldEmail(): Locator {
    return this.page.locator('input[placeholder="Seu e-mail"]');
  }

  getFieldMessage(): Locator {
    return this.page.locator('textarea[placeholder="Sua mensagem"]');
  }

  getSubmitButton(): Locator {
    return this.page.locator('button:has-text("Enviar")');
  }
}

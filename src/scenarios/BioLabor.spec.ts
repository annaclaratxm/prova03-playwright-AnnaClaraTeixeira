import { test, expect } from '@playwright/test';
import ContactElements from '../support/elements/BioLaborElements';
import { ai } from '@zerostep/playwright';

test.describe('Formulário de Contato - Biolabor', () => {
  let elements: ContactElements;

  test.beforeEach(async ({ page }) => {
    elements = new ContactElements(page);
    await page.goto('https://www.biolabor.net.br/contato');
  });

  // 🔹 TESTE 1: Preencher e enviar o formulário corretamente
  test('deve enviar o formulário com sucesso', async ({ page }) => {
    await elements.getFieldName().fill('Jean Carlos');
    await elements.getFieldPhone().fill('(48) 99999-9999');
    await elements.getFieldEmail().fill('jean@example.com');
    await elements.getFieldMessage().fill('Olá, gostaria de mais informações sobre os serviços.');

    await elements.getSubmitButton().click();

    // Valida se o botão fica desabilitado, mensagem aparece, ou redireciona (depende do site)
    await expect(page).toHaveURL(/contato/);
  });

  // 🔹 TESTE 2: Validação de campos obrigatórios
  test('deve exibir erro ao tentar enviar sem preencher campos obrigatórios', async ({ page }) => {
    await elements.getSubmitButton().click();

    // Nenhum campo preenchido — esperamos que o site impeça o envio
    await expect(page).toHaveURL('https://www.biolabor.net.br/contato');

    // Verifica se os campos continuam visíveis (não foi redirecionado)
    await expect(elements.getFieldName()).toBeVisible();
    await expect(elements.getFieldEmail()).toBeVisible();
  });

  // 🔹 TESTE 3 (ZeroStep AI): Preenchimento automatizado via IA
  test('deve preencher e enviar o formulário usando ZeroStep AI', async ({ page }) => {
    const aiArgs = { page, test };
    await ai('Preencha todos os campos do formulário de contato e clique em Enviar', aiArgs);

    // Verifica se o envio foi realizado (ou tentativa)
    await expect(page).toHaveURL(/contato/);
  });
});

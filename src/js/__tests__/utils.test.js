import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Utils from '../utils.js';

describe('Utils', () => {
  describe('copyToClipboard', () => {
    beforeEach(() => {
      // Mock navigator.clipboard
      global.navigator.clipboard = {
        writeText: vi.fn(() => Promise.resolve())
      };
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should copy text to clipboard', async () => {
      const text = 'test text';
      await Utils.copyToClipboard(text);

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text);
    });
  });

  describe('toast', () => {
    it('should create toast element', () => {
      Utils.toast('Test message', 'info');

      const toast = document.querySelector('.toast');
      expect(toast).toBeTruthy();
      expect(toast.textContent).toBe('Test message');
      expect(toast.classList.contains('toast-info')).toBe(true);
    });

    it('should remove toast after timeout', (done) => {
      Utils.toast('Test', 'success');

      setTimeout(() => {
        const toast = document.querySelector('.toast');
        expect(toast.classList.contains('toast-hiding')).toBe(true);
        done();
      }, 3100);
    }, 4000);
  });

  describe('XSS Prevention', () => {
    it('should not allow HTML injection in toast', () => {
      const maliciousContent = '<script>alert("XSS")</script>';
      Utils.toast(maliciousContent, 'info');

      const toast = document.querySelector('.toast');
      expect(toast.innerHTML).not.toContain('<script>');
      expect(toast.textContent).toBe(maliciousContent);
    });
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalMediaEditor } from './modal-media-editor';
import { ContentType } from '@/types/content-type/contentType';

vi.mock('@/components/modal/modal', () => ({
  Modal: ({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) =>
    isOpen ? <div data-testid="modal">{children}</div> : null,
}));

vi.mock('@/components/icons/x', () => ({
  default: () => <span data-testid="x-icon">✕</span>,
}));

vi.mock('@/img/download/download', () => ({
  Download: () => <span>📥</span>,
}));

vi.mock('react-dropzone', () => ({
  useDropzone: vi.fn(() => ({
    getRootProps: () => ({ 'data-testid': 'dropzone' }),
    getInputProps: () => ({ 'data-testid': 'file-input', type: 'file' }),
    isDragActive: false,
  })),
}));

vi.mock('react-hook-form', () => ({
  useForm: () => ({
    register: vi.fn((name) => ({ name })),
    handleSubmit: vi.fn((cb) => (e: any) => {
      e?.preventDefault?.();
      return cb({
        title: 'Тестовый фильм',
        genre: 'Драма, Комедия',
        discription: 'Отличное описание',
        rating: '8',
        status: 'completed',
        dateOfMedia: '2024-01-01',
      });
    }),
    formState: { errors: {} },
    reset: vi.fn(),
  }),
}));

describe('ModalMediaEditor', () => {
  const mockSetIsOpen = vi.fn();
  const mockAddMedia = vi.fn();
  const defaultProps = {
    isOpen: true,
    setIsOpen: mockSetIsOpen,
    addMedia: mockAddMedia,
    type: 'film' as ContentType,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Рендеринг', () => {
    it('рендерит модалку', () => {
      render(<ModalMediaEditor {...defaultProps} />);
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    it('рендерит кнопку "Добавить"', () => {
      render(<ModalMediaEditor {...defaultProps} />);
      expect(screen.getByText('Добавить')).toBeInTheDocument();
    });

    it('рендерит поле "Название"', () => {
      render(<ModalMediaEditor {...defaultProps} />);
      expect(screen.getByText('Название:')).toBeInTheDocument();
    });

    it('рендерит поле "Жанр"', () => {
      render(<ModalMediaEditor {...defaultProps} />);
      expect(screen.getByText('Жанр:')).toBeInTheDocument();
    });

    it('рендерит кнопку закрытия', () => {
      render(<ModalMediaEditor {...defaultProps} />);
      expect(screen.getByTestId('x-icon')).toBeInTheDocument();
    });

    it('не рендерится когда isOpen = false', () => {
      render(<ModalMediaEditor {...defaultProps} isOpen={false} />);
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  describe('Закрытие', () => {
    it('закрывает модалку по кнопке X', async () => {
      const user = userEvent.setup();
      render(<ModalMediaEditor {...defaultProps} />);

      const closeBtn = screen.getByTestId('x-icon').closest('button');
      if (closeBtn) {
        await user.click(closeBtn);
        expect(mockSetIsOpen).toHaveBeenCalledWith(false);
      }
    });
  });

  describe('Дополнительная информация', () => {
    it('добавляет новые поля при клике на "+"', async () => {
      const user = userEvent.setup();
      render(<ModalMediaEditor {...defaultProps} />);

      const addBtn = screen.getByText('+');
      expect(screen.getAllByText('Название блока:')).toHaveLength(1);

      await user.click(addBtn);
      expect(screen.getAllByText('Название блока:')).toHaveLength(2);

      await user.click(addBtn);
      expect(screen.getAllByText('Название блока:')).toHaveLength(3);
    });
  });

  describe('Типы контента', () => {
    it('работает с типом "film"', () => {
      render(<ModalMediaEditor {...defaultProps} type="film" />);
      expect(screen.getByText('Добавить')).toBeInTheDocument();
    });

    it('работает с типом "series"', () => {
      render(<ModalMediaEditor {...defaultProps} type="series" />);
      expect(screen.getByText('Добавить')).toBeInTheDocument();
    });

    it('работает с типом "anime"', () => {
      render(<ModalMediaEditor {...defaultProps} type="anime" />);
      expect(screen.getByText('Добавить')).toBeInTheDocument();
    });
  });
});
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Media } from '@/features/content/entity/media';
import ModalMediaViewer from '@/features/modal-card-info/modal-card-info';
import { ContentStatus } from '@/types/content-status/content-status';

vi.mock('@/components/icons/x', () => ({
  default: () => <span data-testid="x-icon">✕</span>,
}));

vi.mock('@/img/svg/no-image/no-image', () => ({
  NoImage: () => <div data-testid="no-image">Нет изображения</div>,
}));

vi.mock('react-icons/fa', () => ({
  FaRegStar: () => <span data-testid="star-icon">⭐</span>,
}));

vi.mock('@/components/animations/up-anim/up-anim', () => ({
  UpAnim: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('@/components/modal/modal-media-viewer/chips/geners-block/geners-block', () => ({
  GenersBlock: ({ genres }: { genres: string[] }) => (
    <div data-testid="genres">
      {genres?.map((g, i) => (
        <span key={i}>{g}</span>
      ))}
    </div>
  ),
}));

vi.mock('@/components/modal/modal-media-viewer/adict-text-block/text-block', () => ({
  TextBlock: ({ children, name }: { children: React.ReactNode; name: string }) => (
    <div data-testid="text-block">
      <strong>{name}:</strong> {children}
    </div>
  ),
}));

vi.mock('@/components/modal/modal-media-viewer/header/header', () => ({
  Header: ({ handlerDelete }: { handlerDelete: () => void }) => (
    <div>
      <button onClick={handlerDelete} data-testid="delete-btn">
        Удалить
      </button>
    </div>
  ),
}));

vi.mock('@/components/modal/modal', () => ({
  Modal: ({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) =>
    isOpen ? <div data-testid="modal">{children}</div> : null,
}));

vi.mock('react-hook-form', () => ({
  useForm: () => ({
    register: vi.fn(() => ({})),
    handleSubmit: vi.fn((fn) => (e: any) => {
      e?.preventDefault?.();
      return fn({});
    }),
    reset: vi.fn(),
  }),
}));

vi.mock('react-textarea-autosize', () => ({
  default: (props: any) => <textarea {...props} data-testid="textarea-autosize" />,
}));

const testMovie: Media = {
  id: 1,
  name: 'Тестовый фильм',
  genres: ['Драма', 'Комедия'],
  imgFile: undefined,
  rate: 8,
  contentType: 'film' as const,
  contentStatus: 'completed' as ContentStatus,
  dateOfAdd: new Date('2024-01-01'),
  dateOfMedia: new Date('2023-01-15'),
  discription: 'Отличный фильм для тестирования',
  tags: ['action'],
  adictInf: [
    { name: 'Режиссер', text: 'Кристофер Нолан' },
    { name: 'Страна', text: 'США' },
  ],
};

describe('ModalMediaViewer', () => {
  const mockOnUpdate = vi.fn();
  const mockOnDelete = vi.fn();
  const mockSetIsOpen = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Базовый рендеринг', () => {
    it('рендерит модалку с данными фильма', () => {
      render(
        <ModalMediaViewer
          isOpenCard={true}
          setIsOpenCard={mockSetIsOpen}
          movie={testMovie}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );

      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Тестовый фильм')).toBeInTheDocument();
      expect(screen.getByText('8')).toBeInTheDocument();
      expect(screen.getByText('Драма')).toBeInTheDocument();
      expect(screen.getByText('Комедия')).toBeInTheDocument();
      expect(screen.getByText('Сохранить')).toBeInTheDocument();
      expect(screen.getByText('Отмена')).toBeInTheDocument();
    });

    it('показывает заглушку вместо изображения', () => {
      render(
        <ModalMediaViewer
          isOpenCard={true}
          setIsOpenCard={mockSetIsOpen}
          movie={testMovie}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );

      expect(screen.getByTestId('no-image')).toBeInTheDocument();
    });

    it('показывает изображение, если оно есть', () => {
      const movieWithImage = {
        ...testMovie,
        imgFile: new File(['dummy content'], 'test.jpg', { type: 'image/jpeg' }),
      };

      render(
        <ModalMediaViewer
          isOpenCard={true}
          setIsOpenCard={mockSetIsOpen}
          movie={movieWithImage}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );

      const img = document.querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src');
    });

    it('не рендерится при isOpenCard=false', () => {
      render(
        <ModalMediaViewer
          isOpenCard={false}
          setIsOpenCard={mockSetIsOpen}
          movie={testMovie}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );

      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('не рендерится при movie=null', () => {
      render(
        <ModalMediaViewer
          isOpenCard={true}
          setIsOpenCard={mockSetIsOpen}
          movie={null}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );

      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  describe('Взаимодействие с пользователем', () => {
    it('закрывает модалку по кнопке "Отмена"', async () => {
      const user = userEvent.setup();
      
      render(
        <ModalMediaViewer
          isOpenCard={true}
          setIsOpenCard={mockSetIsOpen}
          movie={testMovie}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );

      await user.click(screen.getByText('Отмена'));
      expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    });

    it('закрывает модалку по крестику', async () => {
      const user = userEvent.setup();
      
      render(
        <ModalMediaViewer
          isOpenCard={true}
          setIsOpenCard={mockSetIsOpen}
          movie={testMovie}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );

      await user.click(screen.getByLabelText('Закрыть'));
      expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    });

    it('удаляет фильм', async () => {
      const user = userEvent.setup();
      
      render(
        <ModalMediaViewer
          isOpenCard={true}
          setIsOpenCard={mockSetIsOpen}
          movie={testMovie}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );
    });
  });

  describe('Типы контента', () => {
    const types = [
      { type: 'film', label: 'Фильм' },
      { type: 'series', label: 'Сериал' },
      { type: 'anime', label: 'Аниме' },
    ];

    types.forEach(({ type, label }) => {
      it(`показывает "${label}" для типа ${type}`, () => {
        render(
          <ModalMediaViewer
            isOpenCard={true}
            setIsOpenCard={mockSetIsOpen}
            movie={{ ...testMovie, contentType: type as any }}
            onUpdate={mockOnUpdate}
            onDelete={mockOnDelete}
          />
        );

        expect(screen.getByText(new RegExp(label))).toBeInTheDocument();
      });
    });
  });

  describe('Дополнительная информация', () => {
    it('показывает adictInf если есть', () => {
      render(
        <ModalMediaViewer
          isOpenCard={true}
          setIsOpenCard={mockSetIsOpen}
          movie={testMovie}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );

      expect(screen.getByText(/Режиссер/)).toBeInTheDocument();
      expect(screen.getByText(/Кристофер Нолан/)).toBeInTheDocument();
      expect(screen.getByText(/Страна/)).toBeInTheDocument();
      expect(screen.getByText(/США/)).toBeInTheDocument();
    });

    it('не показывает adictInf если его нет', () => {
      const movieWithoutAdict = { ...testMovie, adictInf: undefined };
      
      render(
        <ModalMediaViewer
          isOpenCard={true}
          setIsOpenCard={mockSetIsOpen}
          movie={movieWithoutAdict}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );

      expect(screen.queryByText(/Режиссер/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Кристофер Нолан/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Страна/)).not.toBeInTheDocument();
      expect(screen.queryByText(/США/)).not.toBeInTheDocument();
    });

    it('не показывает adictInf если массив пустой', () => {
      const movieWithEmptyAdict = { ...testMovie, adictInf: [] };
      
      render(
        <ModalMediaViewer
          isOpenCard={true}
          setIsOpenCard={mockSetIsOpen}
          movie={movieWithEmptyAdict}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );

      expect(screen.queryByText(/Режиссер/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Страна/)).not.toBeInTheDocument();
    });
  });

  describe('Год выхода', () => {
    it('показывает год выхода, если dateOfMedia есть', () => {
      render(
        <ModalMediaViewer
          isOpenCard={true}
          setIsOpenCard={mockSetIsOpen}
          movie={testMovie}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );

      expect(screen.getByText(/2023/)).toBeInTheDocument();
    });

    it('не показывает год, если dateOfMedia нет', () => {
      const movieWithoutDate = { ...testMovie, dateOfMedia: undefined };
      
      render(
        <ModalMediaViewer
          isOpenCard={true}
          setIsOpenCard={mockSetIsOpen}
          movie={movieWithoutDate}
          onUpdate={mockOnUpdate}
          onDelete={mockOnDelete}
        />
      );

      expect(screen.queryByText(/2023/)).not.toBeInTheDocument();
    });
  });
});
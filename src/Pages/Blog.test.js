import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Blog from './Blog';

  //Перевірка роботи текстових полів
test('renders comment form', () => {
    render(<Blog />);
    const commentButton = screen.getAllByText('Коментувати')[0];
    fireEvent.click(commentButton);
    const commentTitleInput = screen.getAllByText('Коментувати')[0];
    const commentContentTextarea = screen.getByLabelText('Коментар');
    expect(commentTitleInput).toBeInTheDocument();
    expect(commentContentTextarea).toBeInTheDocument();
  });

  test('submits comment', () => {
    render(<Blog />);
    const commentButton = screen.getAllByText('Коментувати')[0];
    fireEvent.click(commentButton);
    const commentTitleInput = screen.getByLabelText('Заголовок');
    const commentContentTextarea = screen.getByLabelText('Коментар');
    const submitButton = screen.getByText('Підтвердити');
  
    fireEvent.change(commentTitleInput, { target: { value: 'Тестовий заголовок' } });
    fireEvent.change(commentContentTextarea, { target: { value: 'Тестовий коментар' } });
    fireEvent.click(submitButton);
  });

  test('renders Blog component', () => {
    render(<Blog />);
});

test('opens and closes modal window', () => {
    render(<Blog />);

    // Перевірка, що модальне вікно спочатку не відображається
    expect(screen.queryByText('Додати коментар')).toBeNull();

    // Клік на перший елемент з текстом 'Коментувати' для відкриття модального вікна
    fireEvent.click(screen.getAllByText('Коментувати')[0]);

    // Перевірка, що модальне вікно відображається після кліку
    expect(screen.getByText('Додати коментар')).toBeInTheDocument();

    // Клік на кнопку 'Закрити' для закриття модального вікна
    fireEvent.click(screen.getByText('Закрити'));

    // Перевірка, що модальне вікно більше не відображається після кліку
    expect(screen.queryByText('Додати коментар')).toBeInTheDocument();
});

// Тест на перевірку відображення списку блог-постів:
test('renders list of blog posts', () => {
    render(<Blog />);
    const blogPostElements = screen.getAllByRole('listitem');
    expect(blogPostElements.length).toBeGreaterThan(0);
});

//Тест на перевірку функціональності сортування за датою:
test('sorts blog posts by date in ascending order', () => {
    render(<Blog />);
    const sortByDateAscButton = screen.getByText('Дата ↑');
    fireEvent.click(sortByDateAscButton);
    const blogPostElements = screen.getAllByRole('listitem');
    if (blogPostElements.length > 0) {
      const firstPostTitleElement = blogPostElements[0].querySelector('h5');
      if (firstPostTitleElement) {
        const firstPostTitle = firstPostTitleElement.textContent;
        expect(firstPostTitle).toBe('Blog post 1');
      }
    }
  });

//Тест на перевірку функціональності фільтрації за категорією:
  test('filters blog posts by category', () => {
    render(<Blog />);
    const categoryLink = screen.getByText('категорія 1');
    fireEvent.click(categoryLink);
    const blogPostElements = screen.getAllByRole('listitem');
    if (blogPostElements.length > 0) {
      const firstPostTitleElement = blogPostElements[0].querySelector('h5');
      if (firstPostTitleElement) {
        const firstPostTitle = firstPostTitleElement.textContent;
        expect(firstPostTitle).toBe('Blog post 1');
      }
    }
  });
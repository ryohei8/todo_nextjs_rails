// Todo.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todo from '@/components/Todo';
import { TodoType } from '@/types/Todo';

describe('Todo Component', () => {
  const todo: TodoType = {
    id: 1,
    title: 'Test Todo',
    content: 'This is a test todo content',
  };

  test('renders todo title and content', () => {
    render(<Todo todo={todo} />);
    
    // タイトルのテキストを確認
    const titleElement = screen.getByText('Test Todo');
    expect(titleElement).toBeInTheDocument();

    // コンテンツのテキストを確認
    const contentElement = screen.getByText('This is a test todo content');
    expect(contentElement).toBeInTheDocument();
  });
});

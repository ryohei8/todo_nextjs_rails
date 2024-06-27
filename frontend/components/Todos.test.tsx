import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Todos from './Todos';
import { TodoType } from '@/types/Todo';

//axiosのモック作成
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('Todos, Component', () => {
  const mockTodos: TodoType[] = [
    { id: 1, title: 'Test Todo 1', content: 'Content for test todo 1'},
    { id: 2, title: 'Test Todo 2', content: 'Content for test todo 2'}
  ];

  test('fetches and display todos', async () => {
    // axiosのGETリクエストのレスポンスをモック
    mockedAxios.get.mockResolvedValueOnce({ data: mockTodos});

    render(<Todos />);

    // Todo Index ラベルが表示されることを確認
    expect(screen.getByText('Todo Index')).toBeInTheDocument();

    //APIリクエストが完了し、データがレンダリングされるのを待つ
    await waitFor(() => {
      expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
      expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
    });
  });

  test('displays error message on API failure', async () => {
    // axiosのGETリクエストがエラーを返すようにモック
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

    render(<Todos />);

    // Todo Indexラベルが表示されることを確認
    expect(screen.getByText('Todo Index')).toBeInTheDocument();

    // コンソールログを確認
    const consoleSpy = jest.spyOn(console, 'log');
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(new Error('API Error'));
    });
  });
});
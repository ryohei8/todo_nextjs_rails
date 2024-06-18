import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Todo from "@/components/Todo";
import { TodoType } from "@/types/Todo";

// Todo詳細ページを表示するコンポーネント
const TodoDetail = () => {
  // ルーティング情報を取得する
  const router = useRouter();
  const { id } = router.query;

  // Todo情報を管理するState
  const [todo, setTodo] = useState<TodoType | null>(null);

  // idが変更されたら(Todo詳細ページを開いたら),Todoを取得する
  useEffect(() => {
    // Todoを取得する関数
    const fetchTodo = async () => {
      try {
        // APIからTodoを取得してStateにセットする
        const res = await axios.get(`http://localhost:3000/todos/${id}`);
        setTodo(res.data);
      } catch(err) {
        console.log(err);
      }
    };

    // idが存在する場合のみ、Todoを取得する
    if(id) {
      fetchTodo();
    }
    // 下記の依存配列[id]はユーザーの操作によってidが変わるたびにuseEffect内の関数を実行させるため。
  }, [id]); 

  // Todo取得中（todoがnull）の場合は「Loading...」を表示する
  if(!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col space-y-6 w-3/4 max-w-lg pt-10">
        <label className="block text-xl font-bold text-gray700">Todo</label>
        <Todo todo={todo} />{/* todoDetailsコンポーネントのtodo ステートを子コンポーネントのTodoコンポーネントに渡す */}
        <div className="flex justify-end">
          <Link
            href={`/todos/${id}/edit`}
            className="mt-auto font-medium text-blue-600 hover:bg-blue-300 focus:outline-none mr-12">
            Edit
          </Link>
          <Link href="/" className="mt-auto font-medium text-blue-600 hover:bg-blue-300 focus:outline-none">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;
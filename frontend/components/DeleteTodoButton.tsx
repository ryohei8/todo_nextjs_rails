import { useRouter } from "next/router";
import axios from "axios";

type DeleteTodoButtonProps = {
  id: number;
};

// Todoを削除するボタン
const DeleteTodoButton = ({id}: DeleteTodoButtonProps) => {
  // ルーターオブジェクトにアクセスするため
  const router = useRouter();

  // Todoを削除する関数
  const handleDelete = async () => {
    // 本当に削除するか確認ダイアログ
    if(!confirm('本当に削除しますか？')){
      return
    }

    try {
      // APIを呼び出してtodoを削除
      await axios.delete(`http://localhost:3000/todos/${id}`);

      // 削除に成功したらトップ画面へ遷移
      router.push('/');
    } catch(error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="mt-3 ml-auto flex justify-center py-2 px-8 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Delete
    </button>
  );
};

export default DeleteTodoButton;
import Todos from "@/components/Todos";
import CreateTodoForm from "@/components/CreateTodoForm";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <CreateTodoForm />
      <Todos />
    </div>
  );
}

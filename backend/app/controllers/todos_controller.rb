class TodosController < ApplicationController
  
  # Todo一覧
  def index
    # 日付が新しい順に10件表示する
    @todos = Todo.all.order(created_at: :desc).limit(10)

    render json: @todos
  end

  # GET/todos/:id
  def show
    @todo = Todo.find(params[:id])

    render json: @todo
  end

end

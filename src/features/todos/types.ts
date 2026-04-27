export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateTodoInput = {
  title: string;
  completed?: boolean;
};

export type UpdateTodoInput = {
  id: number;
  title?: string;
  completed?: boolean;
};

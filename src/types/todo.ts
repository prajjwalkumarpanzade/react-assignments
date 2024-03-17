export interface ITodoElement {
    id: string;
    task: string;
    description: string;
    isComplete: boolean;
  }
  
  export interface Props {
    todos: ITodoElement[];
  }
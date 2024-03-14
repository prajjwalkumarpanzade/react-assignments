import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ITodoElement {
  id: string;
  task: string;
  isComplete: boolean;
}

interface Props {
  todos: ITodoElement[];
}

const TodoList = ({ todos }: Props) => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleStatus = (item: ITodoElement) => {
    setChecked(!checked);
    item.isComplete = !item.isComplete;
  };

  const handleCard = (item: ITodoElement) => {
    navigate(`/task/${item.id}`);
  };

  return (
    <div>

      {todos.map((item) => (
          <div
            key={item.id}>
            <div>
              <div>
                <input
                  type="checkbox"
                  name={item.task}
                  checked={item.isComplete}
                  onChange={() => handleStatus(item)}
                />{" "} &nbsp;&nbsp;
                <h3 onClick={() => handleCard(item)}>
                {item.task}
                </h3>
              </div>
            </div>

            <div>
              <p>
                <strong>Status :</strong>{" "}
                {item.isComplete ? "Completed" : "Incomplete"}&nbsp;&nbsp;
              </p>
            </div>
          </div>
        
      ))}
    </div>
  );
};

export default TodoList;
import { Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { IToDo, toDoAtom } from '../atoms';
import DraggableCard from './DraggableCard';

const Wrapper = styled.div`
  padding: 0px 0px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

interface IAreaProps {
  draggingFromThisWith: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? '#dfe6e9'
      : props.draggingFromThisWith
      ? '#b2bec3'
      : 'transparent'};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const { setValue, register, handleSubmit } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoAtom);

  const onValid = ({ toDo }: IForm) => {
    setValue('toDo', '');
    const newToDo = {
      id: Date.now(),
      toDo: toDo,
    };
    setToDos((allBoards) => {
      const newArr = [...allBoards[boardId]];
      newArr.push(newToDo);
      return {
        ...allBoards,
        [boardId]: newArr,
      };

      //위 코드는 아래와 같이 단순화할 수 있다.
      // return {
      //     ...allBoards,
      //     [boardId]: [...allBoards[boardId], newToDo]}
    });
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          type="text"
          placeholder={`Add task on ${boardId}`}
          {...register('toDo', { required: 'Please write to do' })}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.toDo}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;

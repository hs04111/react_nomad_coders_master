import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoAtom } from './atoms';
import Board from './components/Board';

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoAtom);

  const onDragEnd = (info: DropResult) => {
    const { destination, source, draggableId } = info;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const newArr = [...allBoards[destination.droppableId]];
        const taskObj = newArr[source.index];
        newArr.splice(source.index, 1);
        newArr.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: newArr,
        };
        // object의 key에 변수로 쓰려면 대괄호로 감싼다.
      });
    } else if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceArr = [...allBoards[source.droppableId]];
        const taskObj = sourceArr[source.index];
        const destArr = [...allBoards[destination.droppableId]];
        sourceArr.splice(source.index, 1);
        destArr.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceArr,
          [destination.droppableId]: destArr,
        };
        // object의 key에 변수로 쓰려면 대괄호로 감싼다.
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

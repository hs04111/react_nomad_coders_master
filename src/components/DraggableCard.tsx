import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

interface IDraggableCardProps {
  toDo: string;
  index: number;
}

function DraggableCard({ toDo, index }: IDraggableCardProps) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
// React.memo는 prop이 바뀌는 경우에만 렌더링한다.
// Card를 drag하면 index가 바뀌므로, 바뀐 card만 렌더링된다.
// 만약에 카드가 api를 요청한다면? 복잡한 계산을 한다면?
// 그렇다면 반드시 전부 다시 렌더링되는 것을 막아야 할 것
// 여기서 memo를 사용하지 않으면 카드의 글자가 흔들릴 것
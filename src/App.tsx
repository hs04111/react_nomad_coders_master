import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {};

function App() {
  const x = useMotionValue(0);
  // x는 계속 추적되지만, 값이 바뀐다고 re-rendering이 일어나지는 않는다.
  // 계속 렌더링되면 퍼포먼스 측면에서 좋지 않다
  useEffect(() => {
    x.onChange(() => {
      console.log(x.get());
    });
  }, [x]);
  // useEffect 내부의 get(), set(), onChange() 함수들은 Framer motion에서 온 함수들이다.
  return (
    <Wrapper>
      {/* https://www.framer.com/docs/gestures/#drag */}

      <Box drag="x" style={{ x: x }} dragSnapToOrigin />
    </Wrapper>
  );
}

export default App;

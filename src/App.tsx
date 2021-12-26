import { motion } from 'framer-motion';
import { useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* overflow: hidden; */
  /* 넘어간 것이 보이지 않으려면 overflow: hidden */
`;

const Box = styled(motion.div)`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  click: { scale: 0.7, borderRadius: '100px' },
  hover: { rotateZ: 90, scale: 1.5 },
};

function App() {
  const biggerBoxRef = useRef(null);

  return (
    <Wrapper>
      {/* https://www.framer.com/docs/gestures/#drag */}
      <BiggerBox ref={biggerBoxRef}>
        <Box
          drag
          dragSnapToOrigin={true}
          dragConstraints={biggerBoxRef}
          dragElastic={0.3}
          // {left: -200, right:...} 이렇게 상하좌우를 직접 정해줘도 된다
          variants={boxVariants}
          whileTap="click"
          whileHover="hover"
        />
      </BiggerBox>
    </Wrapper>
  );
}

export default App;

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  position: absolute;
  top: 100px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

// https://www.framer.com/docs/component/###custom
// Box component에 custom으로 지정하면 variants에서 인자로 사용가능
// AnmatePresence에도 custom을 적지 않으면 오작동한다.
const boxVariants = {
  entry: (forward: boolean) => ({
    x: forward ? 300 : -300,
    opacity: 0,
    scale: 0,
  }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: (forward: boolean) => ({
    x: forward ? -300 : 300,
    opacity: 0,
    scale: 0,
    transition: { duration: 0.2 },
  }),
};

function App() {
  const [visible, setVisible] = useState(1);
  const [forward, setForward] = useState(true);

  const nextPlease = () => {
    setForward(true);
    setVisible((prev) => (prev === 6 ? 6 : prev + 1));
  };
  const prevPlease = () => {
    setForward(false);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };

  return (
    <Wrapper>
      <AnimatePresence custom={forward} exitBeforeEnter>
        {/* https://www.framer.com/docs/animate-presence/ */}
        {/* AnimatePresence 내부에는 조건문으로 특정 컴포넌트의 존재 유무를 따져야 한다 */}
        {/* exitBeforeEnter는 exit이 끝난 후 다음이 시작되도록 한다. */}
        <Box
          custom={forward}
          variants={boxVariants}
          initial="entry"
          animate="center"
          exit="exit"
          key={visible}
        >
          {visible}
        </Box>
        {/* Box 6개 만들기: key를 바꿔주기만 해도 element가 사라진 것으로 본다 */}
        {/* 그렇게 다시 렌더링이 일어날 것 */}
      </AnimatePresence>
      <button onClick={nextPlease}>Next</button>
      <button onClick={prevPlease}>Previous</button>
    </Wrapper>
  );
}

export default App;

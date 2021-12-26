import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from 'framer-motion';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled(motion.div)`
  height: 200vh;
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
  // https://www.framer.com/docs/motionvalue/
  const rotateZ = useTransform(x, [-800, 800], [-360, 720]);
  const gradient = useTransform(
    x,
    [-800, 0, 800],
    [
      'linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))',
      'linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))',
      'linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))',
    ],
  );
  const { scrollYProgress } = useViewportScroll();
  // https://www.framer.com/docs/motionvalue/##useviewportscroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
  useEffect(() => {
    x.onChange(() => {
      console.log(x.get());
    });
  }, [x]);
  // useEffect 내부의 get(), set(), onChange() 함수들은 Framer motion에서 온 함수들이다.
  return (
    <Wrapper style={{ background: gradient }}>
      <Box drag="x" style={{ x: x, rotateZ, scale }} dragSnapToOrigin />
    </Wrapper>
  );
}

export default App;

import { motion } from 'framer-motion';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  click: { scale: 0.7, borderRadius: '100px' },
  hover: { rotateZ: 90, scale: 1.5 },
  drag: {
    backgroundColor: '#173438',
    transition: {
      duration: 3,
    },
  },
  // color를 animate하려면 문자열로 된 ('blue') 색 말고 헥사코드나 rgb를 사용할것
  // 숫자여야 한다
};

function App() {
  return (
    <Wrapper>
      <Box
        drag
        whileDrag="drag"
        variants={boxVariants}
        whileTap="click"
        whileHover="hover"
      />
    </Wrapper>
  );
}

export default App;

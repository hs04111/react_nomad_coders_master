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
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
function App() {
  return (
    <Wrapper>
      <Box
        initial={{ scale: 0 }}
        animate={{ scale: 1, borderRadius: '50px', rotateZ: 360 }}
        transition={{ type: 'spring', damping: 5 }}
        // transition docs
        // https://www.framer.com/docs/transition
      />
    </Wrapper>
  );
}

export default App;

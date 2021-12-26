import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  width: 50vw;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const Box = styled(motion.div)`
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlap = styled(motion.div)`
  position: absolute;
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [index, setIndex] = useState('');
  return (
    <Wrapper>
      <Grid>
        <Box layoutId="1" onClick={() => setIndex('1')} />
        <Box layoutId="2" onClick={() => setIndex('2')} />
        <Box layoutId="3" onClick={() => setIndex('3')} />
        <Box layoutId="4" onClick={() => setIndex('4')} />
      </Grid>
      <AnimatePresence>
        {index !== '' ? (
          <Overlap
            initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            animate={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            onClick={() => setIndex('')}
          >
            <Box style={{ width: '200px' }} layoutId={index} />
          </Overlap>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;

import { atom, selector } from 'recoil';

export const toDoAtom = atom({
  key: 'toDos',
  default: ['a', 'b', 'c', 'd', 'e', 'f'],
});

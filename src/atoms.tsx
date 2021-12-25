import { atom, selector } from 'recoil';

interface IToDoState {
  [key: string]: string[];
}
// 이렇게 작성함으로써, atom에 현재 지정된 key 뿐만 아니라 다른 string으로 이루어진 key가 있을 가능성을 제시

export const toDoAtom = atom<IToDoState>({
  key: 'toDos',
  default: {
    to_do: ['a'],
    doing: ['c', 'd'],
    done: ['b'],
  },
});

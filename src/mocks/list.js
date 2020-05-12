import { v4 as uuidv4 } from 'uuid';

export default [
  {
    id: uuidv4(),
    content: 'First task',
    checked: false,
  },
  {
    id: uuidv4(),
    content: 'Second task',
    checked: false,
  },
  {
    id: uuidv4(),
    content: 'Third task',
    checked: false,
  },
];

export interface UserInput {
  id: number;
  username: string;
  input: string;
  score: number;
}

export const ListUserInput: UserInput[] = [
  {
    id: 1,
    username: 'Nguyen Phuc',
    input: 'today a won day',
    score: 689,
  },
  {
    id: 2,
    username: 'Hieu Trung',
    input: 'a wonder day',
    score: 568,
  },
  {
    id: 3,
    username: 'Minh Dai',
    input: 'today day',
    score: 456,
  },
  {
    id: 4,
    username: 'My Hanh',
    input: '',
    score: 345,
  },
];

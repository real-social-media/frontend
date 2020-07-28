import { v4 as uuid } from 'uuid'

export const formatDating = (data) => data.map((item) => ({
  ...item,
  datingId: uuid(),
}));

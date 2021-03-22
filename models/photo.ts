export type PhotoResponse = {
  id: number;
  created: string;
  src: string;
  width: number;
  height: number;
  is_grid: boolean;
};

export type Photo = {
  src: string;
  width: number;
  height: number;
};

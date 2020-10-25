export type PhotoResponse = {
  id: number;
  created: string;
  img: string;
  width: number;
  height: number;
  is_grid: boolean;
};

export type Photo = {
  src: string;
  width: number;
  height: number;
};

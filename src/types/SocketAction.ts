export interface SocketAction<T = any> {
  type: string;
  status: 404 | 200 | 201;
  result: T;
}

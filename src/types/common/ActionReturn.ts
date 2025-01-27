interface ActionReturn<T> {
  success: boolean;
  error: Error | null;
  data: T | null;
}

export default ActionReturn;

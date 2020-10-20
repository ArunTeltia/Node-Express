interface UseCase<Request = unknown, Response = unknown> {
  execute(request: Request): Promise<Response>;
}

export default UseCase;

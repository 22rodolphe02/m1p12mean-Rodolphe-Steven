export interface ApiResponse<T>{
  success: boolean,
  data: T,
  message: string,
  statusCode: number,
  pagination?: {
    total: number;
    totalPages: number;
    currentPage: number;
    hasNext: boolean;
    hasPrev: boolean;
    limit: number;
  };

}

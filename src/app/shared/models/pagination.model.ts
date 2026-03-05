
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;   // current page (0-indexed from Spring)
  first: boolean;
  last: boolean;
}
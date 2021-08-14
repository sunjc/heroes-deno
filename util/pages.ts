const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 10;

export type Order = "ASC" | "DESC";

export interface Pageable {
  page: number;
  size: number;
  sort?: { property: string; order: Order };
}

export interface Page<T> {
  content: T[];
  totalElements: number;
}

export function parsePageQuery(query: Record<string, string>): Pageable {
  const {page: pageString, size: sizeString, sort: sortString} = query;

  const page = parseInt(pageString);
  const size = parseInt(sizeString);

  const pageable: Pageable = {
    page: isNaN(page) ? DEFAULT_PAGE : page,
    size: isNaN(size) ? DEFAULT_SIZE : size
  };

  if (sortString) {
    const sort = sortString.split(",");
    const [property, order] = sort;
    pageable.sort = {property, order: order ? <Order>order : "ASC"};
  }

  return pageable;
}

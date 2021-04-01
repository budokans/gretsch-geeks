import { useRouter } from 'next/dist/client/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

export default function ProductsPage() {
  const { query } = useRouter();
  const pageNum = parseInt(query.pageNum);

  return (
    <>
      <Pagination pageNum={pageNum || 1} />
      <Products pageNum={pageNum || 1} />
      <Pagination pageNum={pageNum || 1} />
    </>
  );
}

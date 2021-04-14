import { useRouter } from 'next/dist/client/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';
import { useUser } from '../../components/User';

export default function ProductsPage() {
  const me = useUser();
  const { query } = useRouter();
  const pageNum = parseInt(query.pageNum);

  return (
    <>
      <Pagination pageNum={pageNum || 1} />
      <Products pageNum={pageNum || 1} user={me} />
      <Pagination pageNum={pageNum || 1} />
    </>
  );
}

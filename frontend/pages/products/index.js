import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

export default function ProductsPage() {
  return (
    <>
      <Pagination pageNum={1} />
      <Products />
      <Pagination pageNum={1} />
    </>
  );
}

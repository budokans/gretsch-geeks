import PropTypes from 'prop-types';
import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import Title from './styles/Title';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import AddToCart from './AddToCart';

export default function Product({ product, user }) {
  const currentUserId = user?.id;
  const productOwnerId = product.user?.id;
  const isOwner = currentUserId === productOwnerId;

  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link
          href={{
            pathname: `/product/${product.id}`,
            query: { isOwner, currentUserId },
          }}
        >
          {product.name}
        </Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        {user && isOwner && (
          <Link href={{ pathname: '/update', query: { id: product.id } }}>
            Edit
          </Link>
        )}

        <AddToCart id={product.id} isSignedIn={!!user} />
        {user && isOwner && (
          <DeleteProduct id={product.id}>Delete</DeleteProduct>
        )}
      </div>
    </ItemStyles>
  );
}

Product.propTypes = {
  product: PropTypes.object,
  user: PropTypes.object,
};

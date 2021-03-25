import PropTypes from 'prop-types';
import { ItemStyles } from './styles/ItemStyles';

export default function Product({ product }) {
  return <ItemStyles>{product.name}</ItemStyles>;
}

Product.propTypes = {
  product: PropTypes.object,
};

import useForm from '../lib/useForm';
import Form from './styles/Form';

export default function CreateProduct() {
  const { inputs, handleChange } = useForm({
    name: '',
    description: '',
    price: '',
  });

  return (
    <Form>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="name"
          value={inputs.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="description">
        Description
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          value={inputs.description}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="price">
        Price
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Price"
          value={inputs.price}
          onChange={handleChange}
        />
      </label>
      <button type="submit">+ Add Product</button>
    </Form>
  );
}

// Remove buttons and create Add Product button
// Modify handleChange such that if the type is file, then the value the destructured 0 index value of the e.target.files array.
// Change description input to textarea
// Wrap all in fieldset
// Add file input

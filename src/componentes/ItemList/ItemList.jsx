import Item from '../Item/Item';

function ItemList({ productos }) {
  return (
    <div className="flex flex-wrap gap-6 justify-center py-4">
      {productos.map((prod) => (
        <Item key={prod.id} {...prod} />
      ))}
    </div>
  );
}

export default ItemList;

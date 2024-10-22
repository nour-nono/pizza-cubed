export default function CartProduct() {
  return (
    <div className="flex items-center gap-4 border-b py-4">
        <div className="w-24">
            Image
        </div>
        <div className="grow">
            <h3 className="font-semibold">
                {/* {product.name} */}
            </h3>
            {/* {product.size && (
                <div className="text-sm">
                    size: <span>{product.size.name}</span>
                </div>
            )} */}
        </div>
    </div>
  );
}

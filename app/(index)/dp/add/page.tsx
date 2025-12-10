import AddProductForm from "@/components/forms/AddProductForm";

export default function AddProduct() {
  return (
    <div className="flex justify-center px-4 py-4">
      <div className="w-full max-w-md rounded-md">
        <div className="py-4">
          <h1 className="text-lg font-medium">Add Product</h1>
          <p className="text-sm">Add a product for sale</p>
        </div>
        <div>
          <AddProductForm />
        </div>
      </div>
    </div>
  )
}
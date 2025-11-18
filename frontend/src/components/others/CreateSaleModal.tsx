import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createSale } from "@/service/allApi";

interface Item {
  product_id: string;
  name: string;
  quantity: number;
}

interface BillItem {
  quantity: number;
  salePrice: number;
  product: any;
  billitem_id: string;
}

interface CreatedSale {
  amountToPay: number;
  billitem: BillItem[];
  discount: number;
  sales_id: string;
  soldAt: string;
  totalSalesPrice: number;
  totalTax: number;
}

export function CreateSaleModal({ products }: any) {
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [items, setItems] = useState<Item[]>([]);
  const [billCreated, setBillCreated] = useState(false);
  const [createdSale, setCreatedSale] = useState<CreatedSale | null>(null);

  const addItem = () => {
    if (!selectedProductId || !quantity) return;

    const product = products.find((p: any) => p.product_id === selectedProductId);
    if (!product) return;

    setItems([
      ...items,
      {
        product_id: product.product_id,
        name: product.name,
        quantity: Number(quantity),
      },
    ]);

    setQuantity("");
    setSelectedProductId("");
  };

  const handleSubmit = async () => {
    if (items.length === 0) return;
    
    const payload = items.map((i) => ({
      product_id: i.product_id,
      quantity: i.quantity
    }));

    const res = await createSale(payload);
    
    if (res) {
      setBillCreated(true);
      setCreatedSale(res.data.newSale);
      setItems([]);
    }
  };

  const resetForm = () => {
    setBillCreated(false);
    setCreatedSale(null);
    setItems([]);
    setSelectedProductId("");
    setQuantity("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Sale</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Create New Sale
          </DialogTitle>
        </DialogHeader>

        {!billCreated ? (

          <div className="space-y-4">
            <select
              className="border rounded p-2 w-full"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              <option value="">Select Product</option>
              {products.map((p: any) => (
                <option key={p.product_id} value={p.product_id}>
                  {p.name}
                </option>
              ))}
            </select>

            <input
              className="border rounded p-2 w-full"
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />

            <Button className="w-full" onClick={addItem}>
              Add Item
            </Button>

            {/* Items List */}
            {items.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold">Items to be sold:</h4>
                {items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between p-2 border rounded bg-gray-50"
                  >
                    <span>{item.name}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                ))}
              </div>
            )}

            <DialogFooter>
              <Button onClick={handleSubmit} disabled={items.length === 0}>
                Submit Sale
              </Button>
            </DialogFooter>
          </div>
        ) : (
          // Sale Details Display
          createdSale && (
            <div className="space-y-4">
              <div className="p-4 border rounded">
                <h3 className="font-semibold mb-2">Sale Created </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Sale ID:</span>
                    <span >{createdSale.sales_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{new Date(createdSale.soldAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>


              <div>
                <h4 className="font-semibold mb-2">Items Sold:</h4>
                <div className="space-y-2">
                  {createdSale.billitem.map((item) => (
                    <div key={item.billitem_id} className="flex justify-between p-2 border rounded">
                      <div>
                        <span className="font-medium">{item.product.name}</span>
                        <span className="text-sm text-gray-600 ml-2">: {item.quantity}</span>
                      </div>
                      <span>Rs.{item.salePrice}</span>
                    </div>
                  ))}
                </div>
              </div>
          
              <div className="border-t pt-3 space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>Rs.{createdSale.totalSalesPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>RS.{createdSale.totalTax}</span>
                </div>
                {createdSale.discount > 0 && (
                  <div className="flex justify-between">
                    <span>Discount:</span>
                    <span>-Rs.{createdSale.discount}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total Amount:</span>
                  <span>Rs.{createdSale.amountToPay}</span>
                </div>
              </div>

              <DialogFooter>
                <Button onClick={resetForm}>Close</Button>

              </DialogFooter>
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
}
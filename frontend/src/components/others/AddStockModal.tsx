import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addProduct, addStock } from "@/service/allApi"
import { useState } from "react"
import { toast } from "react-toastify"


interface addStockProps{
    productId:string,
    productFetch:() => void
}
export function AddStockModal({productId,productFetch}:addStockProps) {
    const [open,setOpen] = useState(false);
    const [quantity,setQuantity] = useState(0);
    const [purchasePrice,setPurchasePrice] = useState(0);

    const handleSubmit = async(e:any) =>{
        e.preventDefault();
        try{

        const payload = {
            product_id:productId,
            quantity:Number(quantity),
            purchasePrice:Number(purchasePrice)
        }
         const res = await addStock(payload);
         setQuantity(0);
         setPurchasePrice(0);
         productFetch();
         setOpen(false)
         
         toast.success("Stock Added Successfully");

        }catch(error){
            console.log(error)

        }

    }




  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="hover:bg-green-600  hover:text-white">Add Stock</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
      <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Stock</DialogTitle>
            <DialogDescription>
                Add the Product purchase price and Quantity to add Stock
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" name="quantity" value={quantity} onChange={(e:any)=>setQuantity(e.target.value)}  />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="purchasePrice">Purchase Price</Label>
              <Input id="purchasePrice" name="purchasePrice" value={purchasePrice} onChange={(e:any)=>setPurchasePrice(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add</Button>
          </DialogFooter>
      </form>
        </DialogContent>
    </Dialog>
  )
}

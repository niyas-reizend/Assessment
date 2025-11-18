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
import { updateProduct } from "@/service/allApi"
import { useState } from "react"
import { toast } from "react-toastify"


interface updateProductProps{
    productId:string,
    productFetch:() => void
}
export function UpdateModal({productId,productFetch}:updateProductProps) {
    const [open,setOpen] = useState(false);
    const [name,setName] = useState('')
    const [sku,setSku] = useState('')
    const [price,setPrice] = useState(0);
    const [currentStock,setCurrentStock] = useState(0);
    const [taxPercentage,setTaxPercentage] = useState(0);

    const handleSubmit = async(e:any) =>{
        e.preventDefault();
        try{

        const payload = {
            name:name,
            sku:sku,
            price:Number(price),
            currentStock:Number(currentStock),
            taxPercentage:Number(taxPercentage)
        }
         const res = await updateProduct(productId,payload);
         setName('');
         setSku('');
         setPrice(0);
         setCurrentStock(0);
         setTaxPercentage(0)
         productFetch();
         setOpen(false)
         
         toast.success("Product Updated Successfully");

        }catch(error){
            console.log(error)

        }

    }




  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="hover:bg-green-600  hover:text-white">Update</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
      <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
            {/* <DialogDescription>
                Update th
            </DialogDescription> */}
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" value={name} onChange={(e:any)=>setName(e.target.value)}  />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sku">SKU</Label>
              <Input id="sku" name="sku" value={sku} onChange={(e:any)=>setSku(e.target.value)}  />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" value={price} onChange={(e:any)=>setPrice(e.target.value)}  />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="currentStock">Quantity</Label>
              <Input id="currentStock" name="currentStock" value={currentStock} onChange={(e:any)=>setCurrentStock(e.target.value)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="taxPercentage">Tax percentage</Label>
              <Input id="taxPercentage" name="taxPercentage" value={taxPercentage} onChange={(e:any)=>setTaxPercentage(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Update</Button>
          </DialogFooter>
      </form>
        </DialogContent>
    </Dialog>
  )
}

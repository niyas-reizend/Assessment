
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";



export function SaleDetailsModal({ sale }:any) {

  console.log(sale)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">View Details</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sale: {sale.sales_id}</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600 mb-4"> sold At:{sale.soldAt}</p>
        <p className=""> Total Amount:{sale.totalSalesPrice}</p>
        <p className=""> Total tax:{sale.totalTax}</p>
        <p className=""> Amount Paid:{sale.amountToPay}</p>


        <div className="space-y-2">
          {sale.billitem.map((item:any) => (
            <div
              key={item.billitem_id}
              className="flex justify-between p-2 border  "
            >
              <span>{item.salePrice}</span>
              <span>Qty: {item.quantity}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

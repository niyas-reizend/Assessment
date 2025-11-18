
import { SaleDetailsModal } from "./SalesDetailsModal";



export function SalesTable({ sales }:any) {

  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Date</th>
          <th className="p-2 border">Amount To Pay</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>

      <tbody>
        {sales.map((sale:any) => (
          <tr key={sale.sales_id}>
            <td className="p-2 border">{sale.sales_id}</td>
            <td className="p-2 border">{sale.soldAt.split("T")[0]}</td>
            <td className="p-2 border">${sale.amountToPay}</td>
            <td className="p-2 border">
              <SaleDetailsModal sale={sale} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

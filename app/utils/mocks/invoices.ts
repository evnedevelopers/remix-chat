import { IInvoiceEntity } from "~/utils/typedefs";
import { subscriptions } from "~/utils/mocks/subscriptions";

export const invoices: IInvoiceEntity[] = [
  {
    id: "1",
    created_at: new Date(Date.now() - 3600 *  1000).toLocaleString(),
    invoice_number: "1",
    invoice_pdf: null,
    subscription_id: subscriptions[0].uuid
  },
  {
    id: "2",
    created_at: new Date(Date.now() - 1800 *  1000).toLocaleString(),
    invoice_number: "2",
    invoice_pdf: null,
    subscription_id: subscriptions[1].uuid
  },
];
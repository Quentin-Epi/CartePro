import BankCard from "../../components/FlipCard";
import { Watermark } from "../../components/Watermark";

export default function EmployeePaymentPage() {

  const paymentUrl = "http://10.10.255.154/quentin.png";

  return (
    <Watermark text="SIMULATION PAYMENT">
      <main className="mt-50 flex items-center justify-center">
        <BankCard paymentUrl={paymentUrl}/>
      </main>
    </Watermark>
  );
}

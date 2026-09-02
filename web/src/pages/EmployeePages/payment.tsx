import { useState } from "react";
<<<<<<< HEAD
import QRCodeComponent from "../../components/QrCode";
import { Header } from "../../components/Header";
import { Watermark } from "../../components/Watermark";
=======
import QRCodeComponent from "@/components/QrCode";
import { Watermark } from "@/components/Watermark";
>>>>>>> afe057b (feat: better header + logo)

export default function EmployeePaymentPage() {
  const [url] = useState("http://10.10.255.154/quentin.png");

  return (
<<<<<<< HEAD
    <Watermark text="SIMULATION PAYMENT">
      <div>
        <Header />
        <main>
          <h1>Générateur QR Code</h1>
          <QRCodeComponent value={url} size={300} />
        </main>
=======
    <Watermark text="SIMULATION PAYMENT">  
      <div>
          <main className=" m-25 flex items-center justify-center">
            <div className="p-4 bg-gray-200 rounded-lg shadow-lg">
              <QRCodeComponent value={url} size={300} />
            </div>
          </main>
>>>>>>> afe057b (feat: better header + logo)
      </div>
    </Watermark>
  );
}

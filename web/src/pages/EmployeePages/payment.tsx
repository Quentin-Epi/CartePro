import { useState } from "react";
import QRCodeComponent from "@/components/QrCode";
import { Header } from "@/components/Header";
import { Watermark } from "@/components/Watermark";

export default function EmployeePaymentPage() {
  const [url] = useState("http://10.10.255.154/quentin.png");

  return (
    <Watermark text="SIMULATION PAYMENT">
        <div>
            <Header />
            <main>
                <h1>Générateur QR Code</h1>
                <QRCodeComponent value={url} size={300} />
            </main>
        </div>
    </Watermark>
  );
}

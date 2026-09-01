import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeProps {
  value: string;
  size?: number;
}

export default function QRCodeComponent({
  value,
  size,
}: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    QRCode.toCanvas(
      canvasRef.current,
      value,
      {
        width: size,
        margin: 2,
        errorCorrectionLevel: "M",
      },
      (error) => {
        if (error) {
          console.error("Erreur génération QR Code :", error);
        }
      }
    );
  }, [value, size]);

  return <canvas ref={canvasRef} />;
}
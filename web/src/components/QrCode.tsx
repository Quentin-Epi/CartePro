import { useEffect, useRef } from "react";
import QRCode from "qrcode";

interface QRCodeProps {
  value: string;
  maxSize?: number;
}

export default function QRCodeComponent({
  value,
  maxSize = 180,
}: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const generateQRCode = () => {
      const availableWidth = container.clientWidth;

      if (!availableWidth) return;

      const size = Math.min(availableWidth, maxSize);

      QRCode.toCanvas(
        canvas,
        value,
        {
          width: size,
          margin: 1,
          errorCorrectionLevel: "M",
        },
        (error) => {
          if (error) {
            console.error(
              "Erreur génération QR Code :",
              error
            );
          }
        }
      );
    };

    generateQRCode();

    const resizeObserver = new ResizeObserver(() => {
      generateQRCode();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [value, maxSize]);

  return (
    <div
      ref={containerRef}
      className="
        w-full
        aspect-square
        flex
        items-center
        justify-center
      "
    >
      <canvas
        ref={canvasRef}
        className="
          block
          max-w-full
          max-h-full
        "
      />
    </div>
  );
}

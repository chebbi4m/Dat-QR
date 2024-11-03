import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import VCardForm from './VCardForm'; // Assuming you have this in the same directory

export default function Component() {
  const [inputData, setInputData] = useState('https://www.youtube.com/');
  const [qrCodeOptions, setQrCodeOptions] = useState({
    bgColor: '#ffffff',
    fgColor: '#000000',
    size: 256,
    level: 'L',
    imageSettings: {
      src: '',
      x: null,
      y: null,
      height: 24,
      width: 24,
      excavate: true,
    },
    logoShape: 0, // 0 for square, 1 for circle
  });

  const [qrType, setQrType] = useState('link'); // Default type
  const canvasRef = useRef(null);

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setQrCodeOptions((prevOptions) => ({
          ...prevOptions,
          imageSettings: {
            ...prevOptions.imageSettings,
            src: e.target.result,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadQRCode = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "qrcode.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    }
  };

  // Updated function to create a comma-separated string instead of vCard
  const generateTextData = (data) => {
    return `${data.name}, ${data.organization}, ${data.phone}, ${data.email}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">QR Code Generator</h1>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <label className="block mb-2 font-bold text-gray-700">Select QR Code Type</label>
          <select
            value={qrType}
            onChange={(e) => {
              setQrType(e.target.value);
              setInputData(''); // Reset input data when changing type
            }}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="link">Link</option>
            <option value="text">Text</option>
            <option value="vcard">vCard</option>
          </select>

          {qrType === 'link' || qrType === 'text' ? (
            <input
              type="text"
              placeholder={qrType === 'link' ? "Enter URL" : "Enter Text"}
              value={inputData}
              onChange={handleInputChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <VCardForm setInputData={setInputData} />
          )}

          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700">Upload Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700">Customization Options</label>
            <div className="flex flex-col">
              <label className="mb-1">Background Color:</label>
              <input
                type="color"
                value={qrCodeOptions.bgColor}
                onChange={(e) => setQrCodeOptions({ ...qrCodeOptions, bgColor: e.target.value })}
                className="w-full mb-2"
              />
              <label className="mb-1">Foreground Color:</label>
              <input
                type="color"
                value={qrCodeOptions.fgColor}
                onChange={(e) => setQrCodeOptions({ ...qrCodeOptions, fgColor: e.target.value })}
                className="w-full mb-2"
              />
              <label className="mb-1">Size:</label>
              <input
                type="range"
                min="100"
                max="500"
                value={qrCodeOptions.size}
                onChange={(e) => setQrCodeOptions({ ...qrCodeOptions, size: +e.target.value })}
                className="w-full mb-2"
              />
              <label className="mb-1">Logo Size:</label>
              <input
                type="range"
                min="10"
                max="100"
                value={qrCodeOptions.imageSettings.height}
                onChange={(e) => setQrCodeOptions((prev) => ({
                  ...prev,
                  imageSettings: { ...prev.imageSettings, height: +e.target.value, width: +e.target.value },
                }))}
                className="w-full mb-2"
              />
              <label className="mb-1">Logo Shape:</label>
              <input
                type="range"
                min="0"
                max="1"
                step="1"
                value={qrCodeOptions.logoShape}
                onChange={(e) => setQrCodeOptions((prev) => ({ ...prev, logoShape: +e.target.value }))}
                className="w-full mb-2"
              />
              <label className="mb-1">Error Correction Level:</label>
              <select
                value={qrCodeOptions.level}
                onChange={(e) => setQrCodeOptions({ ...qrCodeOptions, level: e.target.value })}
                className="border border-gray-300 rounded-md p-1"
              >
                <option value="L">L (Low)</option>
                <option value="M">M (Medium)</option>
                <option value="Q">Q (Quartile)</option>
                <option value="H">H (High)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            {inputData && (
              <div className="flex flex-col items-center">
                <QRCodeCanvas
                    ref={canvasRef}
                    value={qrType === 'vcard' ? inputData : inputData} // Ensure inputData is correctly formatted
                    size={qrCodeOptions.size}
                    bgColor={qrCodeOptions.bgColor}
                    fgColor={qrCodeOptions.fgColor}
                    level={qrCodeOptions.level}
                    includeMargin={false}
                    imageSettings={{
                        ...qrCodeOptions.imageSettings,
                        height: qrCodeOptions.logoShape === 1 ? qrCodeOptions.imageSettings.height : qrCodeOptions.imageSettings.width,
                        width: qrCodeOptions.logoShape === 1 ? qrCodeOptions.imageSettings.height : qrCodeOptions.imageSettings.width,
                    }}
                    />
                <button
                  onClick={downloadQRCode}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-colors"
                >
                  Download QR Code
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

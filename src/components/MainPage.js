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

  const colorCombos = [
    { bg: '#ffffff', fg: '#000000' },
    { bg: '#D3D3D3', fg: '#003366' },
    { bg: '#FFFDD0', fg: '#DC143C' },
    { bg: '#7FDBFF', fg: '#001f3f' },
    { bg: '#FFFFE0', fg: '#36454F' },
    { bg: '#F5F5DC', fg: '#800000' },
    { bg: '#ADD8E6', fg: '#4B0082' },   // Light Blue with Indigo
    { bg: '#FFE4E1', fg: '#0d7edb' },   // Misty Rose with Steel Blue
  ];
  

  const handleColorComboClick = (bgColor, fgColor) => {
    setQrCodeOptions((prevOptions) => ({
      ...prevOptions,
      bgColor,
      fgColor,
    }));
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
            <option value="vcard">Business Card</option>
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

          {/* Recommended Color Combos Section */}
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-4">Recommended Color Combinations</h2>
            <div className="flex flex-wrap gap-2"> {/* Changed to flex for close packing */}
              {colorCombos.map((combo, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-full cursor-pointer" // Add cursor pointer
                  style={{
                    background: `linear-gradient(45deg, ${combo.bg} 50%, ${combo.fg} 50%)`, // Gradient background
                  }}
                  onClick={() => handleColorComboClick(combo.bg, combo.fg)} // Add click handler
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            {inputData && (
              <div className="flex flex-col items-center">
                <QRCodeCanvas
                  ref={canvasRef}
                  value={qrType === 'vcard' ? inputData : inputData} // Use VCard input for vcard type
                  bgColor={qrCodeOptions.bgColor}
                  fgColor={qrCodeOptions.fgColor}
                  size={qrCodeOptions.size}
                  level={qrCodeOptions.level}
                  imageSettings={qrCodeOptions.imageSettings}
                  renderAs="canvas"
                />
                <button
                  onClick={downloadQRCode}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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

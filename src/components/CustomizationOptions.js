import React from 'react';

export default function CustomizationOptions({ qrCodeOptions, setQrCodeOptions }) {
  if (!qrCodeOptions) {
    return null; // or return a loading state
  }

  const handleOptionChange = (option, value) => {
    setQrCodeOptions((prevOptions) => ({ ...prevOptions, [option]: value }));
  };

  // Recommended color combinations
  const colorCombinations = [
    { bg: '#000000', fg: '#FFFFFF' }, // Classic Black & White
    { bg: '#003366', fg: '#D3D3D3' }, // Deep Blue & Light Gray
    { bg: '#004d00', fg: '#b3ffcc' }, // Dark Green & Pale Mint
    { bg: '#DC143C', fg: '#FFFDD0' }, // Crimson & Soft Cream
    { bg: '#001f3f', fg: '#7FDBFF' }, // Navy & Light Aqua
    { bg: '#5D3FD3', fg: '#E6E6FA' }, // Dark Purple & Lavender
    { bg: '#36454F', fg: '#FFFFE0' }, // Charcoal & Light Yellow
    { bg: '#800000', fg: '#F5F5DC' }, // Maroon & Beige
    { bg: '#008080', fg: '#FF7F50' }, // Teal & Coral
    { bg: '#A52A2A', fg: '#FFB6C1' }, // Dark Red & Light Pink
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-2 text-gray-800">Customization Options</h3>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Background Color</label>
        <input
          type="color"
          value={qrCodeOptions.bgColor}
          onChange={(e) => handleOptionChange('bgColor', e.target.value)}
          className="w-full h-10 rounded-md"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Foreground Color</label>
        <input
          type="color"
          value={qrCodeOptions.fgColor}
          onChange={(e) => handleOptionChange('fgColor', e.target.value)}
          className="w-full h-10 rounded-md"
        />
      </div>

      {/* Display recommended color combinations */}
      <div>
        <h4 className="mb-2 font-medium text-gray-700">Recommended Color Combinations:</h4>
        <div className="grid grid-cols-2 gap-4">
          {colorCombinations.map((combo, index) => (
            <div key={index} className="flex items-center justify-center">
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: `linear-gradient(to bottom right, ${combo.bg} 50%, ${combo.fg} 50%)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Size</label>
        <input
          type="range"
          min="128"
          max="512"
          step="32"
          value={qrCodeOptions.size}
          onChange={(e) => handleOptionChange('size', parseInt(e.target.value, 10))}
          className="w-full"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Logo Size</label>
        <input
          type="range"
          min="50" // Minimum logo size
          max="200" // Maximum logo size, adjust as needed
          step="10"
          value={qrCodeOptions.logoSize}
          onChange={(e) => handleOptionChange('logoSize', parseInt(e.target.value, 10))}
          className="w-full"
        />
      </div>

      {/* Display the QR code with logo */}
      {qrCodeOptions.logo && (
        <div className="mt-4">
          <h4 className="font-medium text-gray-700">QR Code Preview:</h4>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img
              src={qrCodeOptions.qrCodeData} // Ensure this is the QR code image data
              alt="QR Code"
              style={{ width: `${qrCodeOptions.size}px`, height: 'auto' }}
            />
            <img
              src={qrCodeOptions.logo} // Your logo/image URL here
              alt="Logo"
              style={{
                position: 'absolute',
                top: `calc(50% - ${qrCodeOptions.logoSize / 2}px)`, // Center the logo vertically
                left: `calc(50% - ${qrCodeOptions.logoSize / 2}px)`, // Center the logo horizontally
                width: `${qrCodeOptions.logoSize}px`,
                height: 'auto',
              }}
            />
          </div>
        </div>
      )}

      <div>
        <label className="block mb-1 font-medium text-gray-700">Error Correction Level</label>
        <select
          value={qrCodeOptions.level}
          onChange={(e) => handleOptionChange('level', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="L">Low</option>
          <option value="M">Medium</option>
          <option value="Q">Quartile</option>
          <option value="H">High</option>
        </select>
      </div>
    </div>
  );
}

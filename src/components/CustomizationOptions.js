import React from 'react';

export default function CustomizationOptions({ qrCodeOptions, setQrCodeOptions }) {
  if (!qrCodeOptions) {
    return null; // or return a loading state
  }

  const handleOptionChange = (option, value) => {
    setQrCodeOptions((prevOptions) => ({ ...prevOptions, [option]: value }));
  };

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

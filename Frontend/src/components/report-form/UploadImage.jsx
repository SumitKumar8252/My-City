// UploadImage.js
import React, { useRef, useState, useEffect } from "react";
import { AiOutlineCamera, AiOutlineClose, AiOutlineSwap, AiOutlineVideoCamera } from "react-icons/ai";
import { motion } from "framer-motion";

const UploadImage = ({ data, handleImageChange, maxImages = 5, onStopCamera }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [facingMode, setFacingMode] = useState("environment"); // back camera by default

  // Start camera whenever cameraOn or facingMode changes
  useEffect(() => {
    if (!cameraOn) return;

    const startCamera = async () => {
      try {
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
          audio: false,
        });

        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      } catch (err) {
        console.error("Camera access denied:", err);
        alert("Camera access is required to take photos.");
        setCameraOn(false);
      }
    };

    startCamera();

    // Cleanup on unmount or when camera should stop
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      // Notify parent that camera is stopped (optional feedback)
      if (onStopCamera) onStopCamera();
    };
  }, [cameraOn, facingMode, onStopCamera]);

  const capturePhoto = () => {
    if (data.images.length >= maxImages) {
      alert(`You can only take up to ${maxImages} photos`);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const file = new File([blob], `photo_${Date.now()}.png`, {
        type: "image/png",
      });
      handleImageChange([...data.images, file]);
    }, "image/png");
  };

  const removeImage = (index) => {
    const updated = data.images.filter((_, i) => i !== index);
    handleImageChange(updated);
  };

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-2xl font-semibold text-gray-800 mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Upload Images
      </motion.h2>
      <div className="space-y-4">
        {!cameraOn && (
          <button
            onClick={() => setCameraOn(true)}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition w-full flex items-center justify-center gap-2 text-sm font-medium"
          >
            <AiOutlineVideoCamera /> Start Camera
          </button>
        )}

        {cameraOn && (
          <div className="relative w-full border border-gray-300 rounded-md overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-48 sm:h-64 object-cover bg-black"
            />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
              <button
                type="button"
                onClick={capturePhoto}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition flex items-center gap-2"
              >
                <AiOutlineCamera />
              </button>
              <button
                type="button"
                onClick={toggleCamera}
                className="bg-gray-600 text-white p-2 rounded-full hover:bg-gray-700 transition flex items-center gap-2"
              >
                <AiOutlineSwap />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setCameraOn(false)}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition"
            >
              <AiOutlineClose />
            </button>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />

        {/* Captured Images */}
        <div className="flex flex-wrap gap-2 justify-center">
          {data.images.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt="captured"
                className="w-20 h-20 object-cover rounded-md border border-gray-300"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-1 text-xs hover:bg-red-700 transition"
              >
                <AiOutlineClose />
              </button>
            </div>
          ))}
        </div>

        <p className="text-gray-500 text-sm text-center">
          {`You can take ${maxImages - data.images.length} more photo(s)`}
        </p>
      </div>
    </motion.div>
  );
};

export default UploadImage;
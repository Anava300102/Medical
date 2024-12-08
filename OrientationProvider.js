import React, { createContext, useState, useEffect, useContext } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

// Crear el contexto
const OrientationContext = createContext();

// Crear el proveedor
export const OrientationProvider = ({ children }) => {
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    // Detectar cambios de orientación
    const orientationSubscription = ScreenOrientation.addOrientationChangeListener((event) => {
      const orientationType = event.orientationInfo.orientation;
      setOrientation(
        orientationType === ScreenOrientation.Orientation.LANDSCAPE
          ? 'landscape'
          : 'portrait'
      );
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListener(orientationSubscription);
    };
  }, []);

  return (
    <OrientationContext.Provider value={{ orientation }}>
      {children}
    </OrientationContext.Provider>
  );
};

// Hook para usar el contexto
export const useOrientation = () => useContext(OrientationContext);

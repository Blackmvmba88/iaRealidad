import {Translation} from './types';

export const es: Translation = {
  common: {
    ok: 'Aceptar',
    cancel: 'Cancelar',
    yes: 'Sí',
    no: 'No',
    save: 'Guardar',
    delete: 'Eliminar',
    edit: 'Editar',
    close: 'Cerrar',
    back: 'Atrás',
    next: 'Siguiente',
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
  },

  home: {
    title: 'Asistente de Reparación Electrónica',
    subtitle:
      'Selecciona un modo para comenzar el trabajo de electrónica guiado por RA',
    startButton: 'Iniciar Modo RA',
    featuresTitle: 'Características:',
    features: [
      'Superposición e identificación de componentes en tiempo real',
      'Resaltado de pines (VCC, GND, GPIO, etc.)',
      'Guía para sondas de multímetro',
      'Instrucciones de instalación de módulos',
      'Validación y prueba de circuitos',
    ],
  },

  modes: {
    inspection: {
      title: 'Inspección',
      description:
        'Identificar componentes, pines y conexiones en placas de circuito',
      shortLabel: 'Inspeccionar',
    },
    measurement: {
      title: 'Medición',
      description:
        'Guiar sondeo de multímetro con rangos de voltaje/resistencia esperados',
      shortLabel: 'Medir',
    },
    repair: {
      title: 'Reparación',
      description: 'Instrucciones paso a paso con resaltado de componentes',
      shortLabel: 'Reparar',
    },
    creation: {
      title: 'Creación',
      description:
        'Guiar la adición de módulos Bluetooth/WiFi y nuevos componentes',
      shortLabel: 'Crear',
    },
    validation: {
      title: 'Validación',
      description: 'Probar funcionalidad del circuito y verificar conexiones',
      shortLabel: 'Validar',
    },
  },

  arCamera: {
    title: 'Vista RA',
    noCameraPermission:
      'Se requiere permiso de cámara para usar funciones de RA',
    requestingPermission: 'Solicitando permiso de cámara...',
    noDevice: 'No hay dispositivo de cámara disponible',
    tapToCapture: 'Toca para capturar',
  },

  measurements: {
    voltage: 'Voltaje',
    current: 'Corriente',
    resistance: 'Resistencia',
    frequency: 'Frecuencia',
    continuity: 'Continuidad',
    expected: 'Esperado',
    measured: 'Medido',
    tolerance: 'Tolerancia',
    passed: 'Aprobado',
    failed: 'Fallido',
  },

  components: {
    resistor: 'Resistor',
    capacitor: 'Capacitor',
    ic: 'Circuito Integrado',
    connector: 'Conector',
    module: 'Módulo',
    pin: 'Pin',
    testpoint: 'Punto de Prueba',
    regulator: 'Regulador de Voltaje',
    microcontroller: 'Microcontrolador',
  },

  pins: {
    vcc: 'VCC (Alimentación)',
    gnd: 'GND (Tierra)',
    data: 'Datos',
    gpio: 'GPIO',
    analog: 'Analógico',
    vin: 'Entrada de Voltaje',
    vout: 'Salida de Voltaje',
    io: 'Entrada/Salida',
    tx: 'Transmisión',
    rx: 'Recepción',
  },

  repair: {
    inspect: 'Inspeccionar',
    measure: 'Medir',
    replace: 'Reemplazar',
    solder: 'Soldar',
    test: 'Probar',
    warning: 'Advertencia',
    expectedResult: 'Resultado Esperado',
  },

  validation: {
    testName: 'Nombre de Prueba',
    testDescription: 'Descripción',
    passCriteria: 'Criterios de Aprobación',
    failureActions: 'Acciones en caso de Falla',
    runTest: 'Ejecutar Prueba',
    testPassed: 'Prueba Aprobada',
    testFailed: 'Prueba Fallida',
  },

  settings: {
    title: 'Configuración',
    language: 'Idioma',
    theme: 'Tema',
    units: 'Unidades',
    notifications: 'Notificaciones',
    about: 'Acerca de',
  },

  errors: {
    generic: 'Ocurrió un error. Por favor, intenta de nuevo.',
    networkError: 'Error de red. Por favor, verifica tu conexión.',
    permissionDenied: 'Permiso denegado',
    deviceNotSupported: 'Este dispositivo no es compatible',
    saveFailed: 'Error al guardar datos',
    loadFailed: 'Error al cargar datos',
  },
};

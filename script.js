// Global variables
let isLoggedIn = false
let serverStatuses = {
  sprint: true,
  mtk: true,
  qualcomm: true,
  usa: false,
}
let lastUpdateTime = new Date()
let currentLanguage = "es"

// Motorola models data with process support - UPDATED with Edge 60, G86, G32
const motorolaModels = [
  // Serie G
  { name: "G20 (XT2141-1)", processor: "Snapdragon 662", processes: { imei: true, frp: true, mdm: true } },
  { name: "G30 (XT2129-1)", processor: "Snapdragon 662", processes: { imei: true, frp: true, mdm: true } },
  { name: "G32", processor: "Snapdragon 680", processes: { imei: true, frp: true, mdm: true } },
  { name: "G52 (XT2231-1)", processor: "MediaTek Helio G80", processes: { imei: true, frp: true, mdm: false } },
  { name: "G54 (XT2237-1)", processor: "MediaTek Dimensity 7020", processes: { imei: true, frp: true, mdm: false } },
  { name: "G86", processor: "Snapdragon 680", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G Styles (2022)", processor: "Snapdragon 480+", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G Power (2021)", processor: "Snapdragon 662", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G9 Plus", processor: "Snapdragon 730", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G9 Power", processor: "Snapdragon 662", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G 5G Plus", processor: "Snapdragon 765", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G50", processor: "Snapdragon 480", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G60", processor: "Snapdragon 732G", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G100", processor: "Snapdragon 870", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G Stylus (2021)", processor: "Snapdragon 480", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G9 Play", processor: "Snapdragon 662", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G10", processor: "Snapdragon 460", processes: { imei: true, frp: true, mdm: false } },
  { name: "Moto G40 Fusion", processor: "Snapdragon 720G", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G7 Plus", processor: "Snapdragon 636", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G7 Power", processor: "Snapdragon 632", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G7", processor: "Snapdragon 632", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G8 Power Lite", processor: "Helio P35", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto G8 Plus", processor: "Snapdragon 665", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G8", processor: "Snapdragon 665", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G8 Play", processor: "MediaTek Helio P70M", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto G8 Power", processor: "Snapdragon 665", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G9", processor: "Snapdragon 662", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G Stylus (2020)", processor: "Snapdragon 665", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G Fast", processor: "Snapdragon 665", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G Power (2020)", processor: "Snapdragon 665", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G Pro (2021)", processor: "Snapdragon 665", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G72 (2023)", processor: "Dimensity 930", processes: { imei: true, frp: true, mdm: false } },
  { name: "Moto G73 5G", processor: "MediaTek Dimensity 930", processes: { imei: true, frp: true, mdm: false } },
  { name: "Moto G84 5G", processor: "Snapdragon 695 5G", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G14", processor: "Unisoc Tiger T616", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto G24", processor: "MediaTek Helio G85", processes: { imei: true, frp: true, mdm: false } },
  { name: "Moto G34 5G", processor: "Snapdragon 695 5G", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G04", processor: "Unisoc Tiger T606", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto G22", processor: "MediaTek Helio G37", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto G42", processor: "Snapdragon 680", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G62 5G", processor: "Snapdragon 695 5G", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G71 5G", processor: "Snapdragon 695 5G", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G51 5G", processor: "Snapdragon 480+ 5G", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G41", processor: "MediaTek Helio G85", processes: { imei: true, frp: true, mdm: false } },
  { name: "Moto G31", processor: "MediaTek Helio G85", processes: { imei: true, frp: true, mdm: false } },
  { name: "Moto G200 5G", processor: "Snapdragon 888+", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G Pure", processor: "MediaTek Helio G25", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto G Play (2021)", processor: "Snapdragon 460", processes: { imei: true, frp: true, mdm: false } },
  { name: "Moto G Play (2022)", processor: "MediaTek Helio G37", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto G Play (2023)", processor: "MediaTek Helio G37", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto G Power (2022)", processor: "MediaTek Helio G37", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto G Stylus 5G (2022)", processor: "Snapdragon 695 5G", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G82 5G", processor: "Snapdragon 695 5G", processes: { imei: true, frp: true, mdm: true } },

  // Serie Edge - UPDATED with Edge 60 series
  { name: "Edge 20", processor: "Qualcomm Snapdragon 778G", processes: { imei: true, frp: true, mdm: true } },
  { name: "Edge 20 Lite", processor: "MediaTek Dimensity 720", processes: { imei: true, frp: true, mdm: false } },
  { name: "Edge 20 Fusion", processor: "MediaTek Dimensity 800U", processes: { imei: true, frp: true, mdm: false } },
  { name: "Edge 20 Pro", processor: "Snapdragon 870", processes: { imei: true, frp: true, mdm: true } },
  { name: "Edge 30", processor: "Qualcomm Snapdragon 778G+", processes: { imei: true, frp: true, mdm: true } },
  {
    name: "Edge 30 Ultra (Edge 30 Pro)",
    processor: "Qualcomm Snapdragon 8+ Gen 1",
    processes: { imei: true, frp: true, mdm: true },
  },
  { name: "Edge 30 Neo", processor: "Qualcomm Snapdragon 695", processes: { imei: true, frp: true, mdm: true } },
  { name: "Edge 30 Fusion", processor: "Snapdragon 888+", processes: { imei: true, frp: true, mdm: true } },
  { name: "Edge 40", processor: "MediaTek Dimensity 8020", processes: { imei: true, frp: true, mdm: false } },
  { name: "Edge 40 Pro", processor: "Snapdragon 8 Gen 2", processes: { imei: true, frp: true, mdm: true } },
  { name: "Edge 40 Neo", processor: "MediaTek Dimensity 7030", processes: { imei: true, frp: true, mdm: false } },
  { name: "Edge 50 Ultra", processor: "Snapdragon 8s Gen 3", processes: { imei: true, frp: true, mdm: true } },
  { name: "Edge 50 Pro", processor: "Snapdragon 7 Gen 3", processes: { imei: true, frp: true, mdm: true } },
  { name: "Edge 50 Fusion", processor: "Snapdragon 7s Gen 2", processes: { imei: true, frp: true, mdm: true } },
  { name: "Edge 50 Neo", processor: "MediaTek Dimensity 7300", processes: { imei: true, frp: true, mdm: false } },
  { name: "Edge 60", processor: "Snapdragon 8 Gen 3", processes: { imei: true, frp: true, mdm: true } },
  { name: "Edge 60 Pro", processor: "Snapdragon 8 Gen 3", processes: { imei: true, frp: true, mdm: true } },
  { name: "Edge 60 Fusion", processor: "Snapdragon 7+ Gen 3", processes: { imei: true, frp: true, mdm: true } },
  { name: "Edge (2021)", processor: "Snapdragon 778G", processes: { imei: true, frp: true, mdm: true } },
  { name: "Edge S", processor: "Snapdragon 870", processes: { imei: true, frp: true, mdm: true } },
  { name: "Edge Plus (2022)", processor: "Snapdragon 8 Gen 1", processes: { imei: true, frp: true, mdm: true } },

  // Serie E
  { name: "Moto E7 Plus", processor: "Snapdragon 460", processes: { imei: true, frp: true, mdm: false } },
  { name: "Moto E7 Power", processor: "MediaTek Helio G25", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto E6 Plus", processor: "Helio P22", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto E6", processor: "Snapdragon 435", processes: { imei: true, frp: true, mdm: false } },
  { name: "Moto E7", processor: "Helio G25", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto E6 Play", processor: "Helio P22", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto E13", processor: "Unisoc Tiger T606", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto E32", processor: "Unisoc Tiger T606", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto E32s", processor: "MediaTek Helio G37", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto E22", processor: "MediaTek Helio G37", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto E22i", processor: "MediaTek Helio G37", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto E40", processor: "Unisoc Tiger T700", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto E20", processor: "Unisoc T606", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto E30", processor: "Unisoc T700", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto E5 Plus", processor: "Snapdragon 430", processes: { imei: true, frp: true, mdm: false } },
  { name: "Moto E5 Play", processor: "Snapdragon 425", processes: { imei: true, frp: true, mdm: false } },
  { name: "Moto E5", processor: "Snapdragon 425", processes: { imei: true, frp: true, mdm: false } },
  { name: "Moto E4 Plus", processor: "MediaTek MT6737", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto E4", processor: "MediaTek MT6737", processes: { imei: false, frp: true, mdm: false } },

  // Serie One
  { name: "One 5G Ace", processor: "Snapdragon 750G", processes: { imei: true, frp: true, mdm: true } },
  { name: "One Fusion+", processor: "Snapdragon 730", processes: { imei: true, frp: true, mdm: true } },
  { name: "One Hyper", processor: "Snapdragon 675", processes: { imei: true, frp: true, mdm: true } },
  { name: "One Action", processor: "Samsung Exynos 9609", processes: { imei: false, frp: true, mdm: false } },
  { name: "One Vision", processor: "Samsung Exynos 9609", processes: { imei: false, frp: true, mdm: false } },
  { name: "One Macro", processor: "MediaTek Helio P70", processes: { imei: false, frp: true, mdm: false } },
  { name: "One Zoom", processor: "Snapdragon 675", processes: { imei: true, frp: true, mdm: true } },
  { name: "One Power", processor: "Snapdragon 636", processes: { imei: true, frp: true, mdm: true } },
  { name: "One Fusion", processor: "Snapdragon 710", processes: { imei: true, frp: true, mdm: true } },

  // Serie Z
  { name: "Moto Z4", processor: "Snapdragon 675", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto Z3 Play", processor: "Snapdragon 636", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto Z2 Force", processor: "Snapdragon 835", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto Z2 Play", processor: "Snapdragon 626", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto Z Play", processor: "Snapdragon 625", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto Z Force", processor: "Snapdragon 820", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto Z", processor: "Snapdragon 820", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto Z3", processor: "Snapdragon 835", processes: { imei: true, frp: true, mdm: true } },

  // Serie X
  { name: "Moto X4", processor: "Snapdragon 630", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto X (2014)", processor: "Snapdragon 801", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto X Style", processor: "Snapdragon 808", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto X Play", processor: "Snapdragon 615", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto X Force", processor: "Snapdragon 810", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto X Pure Edition", processor: "Snapdragon 808", processes: { imei: true, frp: true, mdm: true } },

  // Additional models
  { name: "Moto G53 5G", processor: "MediaTek Dimensity 700", processes: { imei: true, frp: true, mdm: false } },
  { name: "Moto G23", processor: "MediaTek Helio G85", processes: { imei: true, frp: true, mdm: false } },
  { name: "Moto G13", processor: "MediaTek Helio G85", processes: { imei: true, frp: true, mdm: false } },
  { name: "Moto C Plus", processor: "MediaTek MT6737", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto C", processor: "MediaTek MT6737M", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto G85 5G", processor: "Snapdragon 6s Gen 3", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G75 5G", processor: "Snapdragon 6 Gen 1", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G65 5G", processor: "Snapdragon 7s Gen 2", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G55 5G", processor: "Snapdragon 7s Gen 2", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G45 5G", processor: "Snapdragon 6s Gen 3", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G35 5G", processor: "Snapdragon 6 Gen 1", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G25 5G", processor: "Snapdragon 4 Gen 1", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G15 5G", processor: "Snapdragon 4 Gen 1", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G05 5G", processor: "Snapdragon 4 Gen 2", processes: { imei: true, frp: true, mdm: true } },
  { name: "Razr (2019)", processor: "Snapdragon 710", processes: { imei: true, frp: true, mdm: true } },
  { name: "Razr 5G (2020)", processor: "Snapdragon 765G", processes: { imei: true, frp: true, mdm: true } },
  { name: "Razr (2022)", processor: "Snapdragon 8+ Gen 1", processes: { imei: true, frp: true, mdm: true } },
  { name: "Razr 40", processor: "Snapdragon 7 Gen 1", processes: { imei: true, frp: true, mdm: true } },
  { name: "Razr 40 Ultra", processor: "Snapdragon 8+ Gen 1", processes: { imei: true, frp: true, mdm: true } },
  { name: "Razr 50", processor: "MediaTek Dimensity 7300", processes: { imei: true, frp: true, mdm: false } },
  { name: "Razr 50 Ultra", processor: "Snapdragon 8s Gen 3", processes: { imei: true, frp: true, mdm: true } },
  { name: "ThinkPhone", processor: "Snapdragon 8+ Gen 1", processes: { imei: true, frp: true, mdm: true } },
  { name: "Frontier", processor: "Snapdragon 8+ Gen 1", processes: { imei: true, frp: true, mdm: true } },
  { name: "Defy (2021)", processor: "Snapdragon 662", processes: { imei: true, frp: true, mdm: true } },
  { name: "Defy 2", processor: "MediaTek Helio G85", processes: { imei: false, frp: true, mdm: false } },
]

// Language translations
const translations = {
  es: {
    home: "Inicio",
    features: "Características",
    models: "Modelos Soportados",
    status: "Estado",
    contact: "Contacto",
    login: "Iniciar Sesión",
    adminPanel: "Panel Admin",
    heroSubtitle: "La herramienta más avanzada para desbloqueo de dispositivos móviles",
    heroDescription: "Solución profesional y confiable para técnicos especializados",
    exploreFeatures: "Explorar Características",
    joinSupport: "Unirse al Soporte",
    mainFeatures: "Características Principales",
    advancedUnlock: "Desbloqueo Avanzado",
    advancedUnlockDesc: "Soporte exclusivo para dispositivos móviles marca Motorola",
    safeReliable: "Seguro y Confiable",
    safeReliableDesc: "Procesos seguros que protegen la integridad de los dispositivos",
    fastEfficient: "Rápido y Eficiente",
    fastEfficientDesc: "Procesos optimizados para resultados en tiempo récord",
    support247: "Soporte 24/7",
    support247Desc: "Asistencia técnica especializada disponible todo el tiempo",
    supportedModels: "Modelos Soportados",
    searchModel: "Buscar modelo...",
    repairImei: "Repair IMEI",
    frpPhone: "Frp Phone",
    mdmPhone: "MDM Phone",
    noResults: "No se encontraron modelos que coincidan con tu búsqueda",
    serverStatus: "Estado del Servidor",
    serverControl: "Control de Servidores",
    online: "Online",
    offline: "Offline",
    contactSupport: "Contacto y Soporte",
    needHelp: "¿Necesitas ayuda?",
    joinTelegram: "Únete a nuestro grupo de soporte en Telegram para obtener asistencia inmediata",
    joinGroup: "Unirse al Grupo de Soporte",
    allRightsReserved: "Todos los derechos reservados",
    professionalTool: "Herramienta profesional para técnicos especializados",
    username: "Usuario:",
    password: "Contraseña:",
    loginButton: "Iniciar Sesión",
    noAccount: "¿No tienes cuenta?",
    register: "Registrarse",
    registration: "Registro",
    registerInfo: "Para registrarte y obtener acceso completo, únete a nuestro grupo de soporte en Telegram:",
    teamHelp: "Nuestro equipo te ayudará con el proceso de registro",
    administration: "Panel de Administración",
    logout: "Cerrar Sesión",
    serverConfig: "Configuración del Servidor",
    serversStatus: "Estado de los Servidores",
    modelProcesses: "Administrar Procesos de Modelos",
    searchModelAdmin: "Buscar modelo...",
    bulkActions: "Acciones Masivas",
    enableAll: "Habilitar Todo",
    disableAll: "Deshabilitar Todo",
    restoreDefaults: "Restaurar Predeterminados",
    siteConfig: "Configuración del Sitio",
    siteTitle: "Título del Sitio:",
    maintenanceMode: "Modo Mantenimiento:",
    supportEmail: "Email de Soporte:",
    telegramLink: "Link de Telegram:",
    saveSettings: "Guardar Configuración",
    statistics: "Estadísticas",
    users: "Usuarios",
    unlocks: "Desbloqueos",
    uptime: "Uptime",
    avgTime: "Tiempo Medio",
    loginSuccess: "Inicio de sesión exitoso",
    incorrectCredentials: "Credenciales incorrectas",
    sessionClosed: "Sesión cerrada",
    mustLogin: "Debes iniciar sesión para controlar el servidor",
    serverActivated: "Servidor {0} activado exitosamente",
    serverDeactivated: "Servidor {0} desactivado exitosamente",
    settingsSaved: "Configuración guardada exitosamente",
    mustLoginProcess: "Debes iniciar sesión para modificar los procesos",
    processEnabled: "Proceso {0} habilitado para {1}",
    processDisabled: "Proceso {0} deshabilitado para {1}",
    allProcessesEnabled: "Todos los procesos han sido habilitados",
    allProcessesDisabled: "Todos los procesos han sido deshabilitados",
    language: "Idioma",
    spanish: "Español",
    english: "English",
    downloadTool: "Descargar Herramienta",
    selectDownloadOption: "Selecciona una opción de descarga:",
    downloadOption1: "Descargar desde MEGA",
    downloadOption2: "Descargar desde MediaFire",
    downloadNote: "Asegúrate de tener Winrar instalado para descomprimir el archivo.",
  },
  en: {
    home: "Home",
    features: "Features",
    models: "Supported Models",
    status: "Status",
    contact: "Contact",
    login: "Login",
    adminPanel: "Admin Panel",
    heroSubtitle: "The most advanced tool for mobile device unlocking",
    heroDescription: "Professional and reliable solution for specialized technicians",
    exploreFeatures: "Explore Features",
    joinSupport: "Join Support",
    mainFeatures: "Main Features",
    advancedUnlock: "Advanced Unlocking",
    advancedUnlockDesc: "Exclusive support for Motorola mobile devices",
    safeReliable: "Safe & Reliable",
    safeReliableDesc: "Secure processes that protect device integrity",
    fastEfficient: "Fast & Efficient",
    fastEfficientDesc: "Optimized processes for record time results",
    support247: "24/7 Support",
    support247Desc: "Specialized technical assistance available all the time",
    supportedModels: "Supported Models",
    searchModel: "Search model...",
    repairImei: "Repair IMEI",
    frpPhone: "Frp Phone",
    mdmPhone: "MDM Phone",
    noResults: "No models found matching your search",
    serverStatus: "Server Status",
    serverControl: "Server Control",
    online: "Online",
    offline: "Offline",
    contactSupport: "Contact & Support",
    needHelp: "Need help?",
    joinTelegram: "Join our Telegram support group for immediate assistance",
    joinGroup: "Join Support Group",
    allRightsReserved: "All rights reserved",
    professionalTool: "Professional tool for specialized technicians",
    username: "Username:",
    password: "Password:",
    loginButton: "Login",
    noAccount: "Don't have an account?",
    register: "Register",
    registration: "Registration",
    registerInfo: "To register and get full access, join our Telegram support group:",
    teamHelp: "Our team will help you with the registration process",
    administration: "Administration Panel",
    logout: "Logout",
    serverConfig: "Server Configuration",
    serversStatus: "Servers Status",
    modelProcesses: "Manage Model Processes",
    searchModelAdmin: "Search model...",
    bulkActions: "Bulk Actions",
    enableAll: "Enable All",
    disableAll: "Disable All",
    restoreDefaults: "Restore Defaults",
    siteConfig: "Site Configuration",
    siteTitle: "Site Title:",
    maintenanceMode: "Maintenance Mode:",
    supportEmail: "Support Email:",
    telegramLink: "Telegram Link:",
    saveSettings: "Save Settings",
    statistics: "Statistics",
    users: "Users",
    unlocks: "Unlocks",
    uptime: "Uptime",
    avgTime: "Average Time",
    loginSuccess: "Login successful",
    incorrectCredentials: "Incorrect credentials",
    sessionClosed: "Session closed",
    mustLogin: "You must be logged in to control the server",
    serverActivated: "Server {0} successfully activated",
    serverDeactivated: "Server {0} successfully deactivated",
    settingsSaved: "Settings saved successfully",
    mustLoginProcess: "You must be logged in to modify processes",
    processEnabled: "Process {0} enabled for {1}",
    processDisabled: "Process {0} disabled for {1}",
    allProcessesEnabled: "All processes have been enabled",
    allProcessesDisabled: "All processes have been disabled",
    language: "Language",
    spanish: "Español",
    english: "English",
    downloadTool: "Download Tool",
    selectDownloadOption: "Select a download option:",
    downloadOption1: "Download from MEGA",
    downloadOption2: "Download from MediaFire",
    downloadNote: "Make sure you have Winrar installed to unzip the file.",
  },
}

function getText(key) {
  return translations[currentLanguage][key] || key
}
function changeLanguage(lang) {
  if (lang !== "es" && lang !== "en") return
  currentLanguage = lang
  localStorage.setItem("wklock_language", lang)
  updateUILanguage()
  showNotification(lang === "es" ? "Idioma cambiado a Español" : "Language changed to English", "info")
}
function toggleLanguageMenu() {
  document.getElementById("languageMenu").classList.toggle("active")
}
function createModelCard(model) {
  const card = document.createElement("div")
  card.className = "model-card"
  card.innerHTML = `<div class="model-brand">MOTOROLA</div><div class="model-name">${model.name}</div><div class="model-processor">${model.processor}</div><ul class="model-features"><li class="${model.processes.imei ? "" : "disabled"}"><i class="fas ${model.processes.imei ? "fa-check" : "fa-times"}"></i> ${getText("repairImei")}</li><li class="${model.processes.frp ? "" : "disabled"}"><i class="fas ${model.processes.frp ? "fa-check" : "fa-times"}"></i> ${getText("frpPhone")}</li><li class="${model.processes.mdm ? "" : "disabled"}"><i class="fas ${model.processes.mdm ? "fa-check" : "fa-times"}"></i> ${getText("mdmPhone")}</li></ul>`
  return card
}
function filterModels() {
  const searchTerm = document.getElementById("modelSearch").value.toLowerCase()
  const modelsGrid = document.getElementById("modelsGrid")
  if (searchTerm === "") {
    renderModels()
    return
  }
  const filteredModels = motorolaModels.filter(
    (model) => model.name.toLowerCase().includes(searchTerm) || model.processor.toLowerCase().includes(searchTerm),
  )
  modelsGrid.innerHTML = ""
  if (filteredModels.length === 0) {
    modelsGrid.innerHTML = `<div class="no-results">${getText("noResults")}</div>`
    return
  }
  filteredModels.forEach((model) => {
    const modelCard = createModelCard(model)
    modelsGrid.appendChild(modelCard)
  })
}
function handleLogin(event) {
  event.preventDefault()
  const username = document.getElementById("username").value.trim()
  const password = document.getElementById("password").value.trim()
  if (username === "wilunlock" && password === "Wilma3956as") {
    isLoggedIn = true
    localStorage.setItem("wklock_admin_logged_in", "true")
    closeLoginModal()
    showAdminPanel()
    showNotification(getText("loginSuccess"), "success")
  } else {
    showNotification(getText("incorrectCredentials"), "error")
  }
}
function logout() {
  isLoggedIn = false
  localStorage.removeItem("wklock_admin_logged_in")
  hideAdminPanel()
  showNotification(getText("sessionClosed"), "info")
}
function toggleServerStatus(server) {
  if (!isLoggedIn) {
    showNotification(getText("mustLogin"), "error")
    return
  }
  serverStatuses[server] = !serverStatuses[server]
  localStorage.setItem("wklock_server_statuses", JSON.stringify(serverStatuses))
  document.getElementById(`${server}Toggle`).checked = serverStatuses[server]
  document.getElementById(`admin${server.charAt(0).toUpperCase() + server.slice(1)}Toggle`).checked =
    serverStatuses[server]
  updateServerStatusDisplay()
  const status = serverStatuses[server]
    ? getText("serverActivated").replace("{0}", server.toUpperCase())
    : getText("serverDeactivated").replace("{0}", server.toUpperCase())
  showNotification(status, "success")
}
function updateSingleServerStatus(server, isOnline) {
  const statusLight = document.getElementById(`${server}Status`)
  const statusText = document.getElementById(`${server}StatusText`)
  if (isOnline) {
    statusLight.className = "status-light online"
    statusText.textContent = getText("online")
    statusText.style.color = "#4CAF50"
  } else {
    statusLight.className = "status-light offline"
    statusText.textContent = getText("offline")
    statusText.style.color = "#f44336"
  }
}
function saveSettings() {
  const siteTitle = document.getElementById("siteTitle").value
  const maintenanceMode = document.getElementById("maintenanceMode").checked
  const supportEmail = document.getElementById("supportEmail").value
  const telegramLink = document.getElementById("telegramLink").value
  localStorage.setItem("wklock_site_title", siteTitle)
  localStorage.setItem("wklock_maintenance_mode", maintenanceMode.toString())
  localStorage.setItem("wklock_support_email", supportEmail)
  localStorage.setItem("wklock_telegram_link", telegramLink)
  document.title = `${siteTitle} - Herramienta de Desbloqueo Profesional`
  const telegramLinks = document.querySelectorAll('a[href*="t.me"]')
  telegramLinks.forEach((link) => {
    link.href = telegramLink
  })
  showNotification(getText("settingsSaved"), "success")
}
function toggleModelProcess(modelIndex, processType) {
  if (!isLoggedIn) {
    showNotification(getText("mustLoginProcess"), "error")
    return
  }
  motorolaModels[modelIndex].processes[processType] = !motorolaModels[modelIndex].processes[processType]
  saveModelProcesses()
  renderModels()
  const status = motorolaModels[modelIndex].processes[processType]
    ? getText("processEnabled")
        .replace("{0}", processType.toUpperCase())
        .replace("{1}", motorolaModels[modelIndex].name)
    : getText("processDisabled")
        .replace("{0}", processType.toUpperCase())
        .replace("{1}", motorolaModels[modelIndex].name)
  showNotification(status, "success")
}
function enableAllProcesses() {
  if (!isLoggedIn) {
    showNotification(getText("mustLoginProcess"), "error")
    return
  }
  motorolaModels.forEach((model) => {
    model.processes.imei = true
    model.processes.frp = true
    model.processes.mdm = true
  })
  saveModelProcesses()
  renderModels()
  renderAdminModelsList()
  showNotification(getText("allProcessesEnabled"), "success")
}
function disableAllProcesses() {
  if (!isLoggedIn) {
    showNotification(getText("mustLoginProcess"), "error")
    return
  }
  motorolaModels.forEach((model) => {
    model.processes.imei = false
    model.processes.frp = false
    model.processes.mdm = false
  })
  saveModelProcesses()
  renderModels()
  renderAdminModelsList()
  showNotification(getText("allProcessesDisabled"), "warning")
}
function initializeApp() {
  const savedLanguage = localStorage.getItem("wklock_language")
  if (savedLanguage) {
    currentLanguage = savedLanguage
  }
  const savedLogin = localStorage.getItem("wklock_admin_logged_in")
  if (savedLogin === "true") {
    isLoggedIn = true
    showAdminPanel()
  }
  const savedServerStatuses = localStorage.getItem("wklock_server_statuses")
  if (savedServerStatuses !== null) {
    serverStatuses = JSON.parse(savedServerStatuses)
  } else {
    serverStatuses = { sprint: true, mtk: true, qualcomm: true, usa: false }
    localStorage.setItem("wklock_server_statuses", JSON.stringify(serverStatuses))
  }
  document.getElementById("sprintToggle").checked = serverStatuses.sprint
  document.getElementById("mtkToggle").checked = serverStatuses.mtk
  document.getElementById("qualcommToggle").checked = serverStatuses.qualcomm
  document.getElementById("usaToggle").checked = serverStatuses.usa
  document.getElementById("adminSprintToggle").checked = serverStatuses.sprint
  document.getElementById("adminMtkToggle").checked = serverStatuses.mtk
  document.getElementById("adminQualcommToggle").checked = serverStatuses.qualcomm
  document.getElementById("adminUsaToggle").checked = serverStatuses.usa
  loadModelProcesses()
  const currentLangElement = document.getElementById("currentLanguage")
  if (currentLangElement) {
    currentLangElement.textContent = currentLanguage === "es" ? "Español" : "English"
  }
  updateServerStatusDisplay()
}
function showDownloadModal() {
  let downloadModal = document.getElementById("downloadModal")
  if (!downloadModal) {
    downloadModal = document.createElement("div")
    downloadModal.id = "downloadModal"
    downloadModal.className = "modal"
    downloadModal.innerHTML = `<div class="modal-content"><div class="modal-header"><h2>${getText("downloadTool")}</h2><span class="close" onclick="closeDownloadModal()">&times;</span></div><div class="download-content"><p>${getText("selectDownloadOption")}</p><div class="download-buttons"><a href="https://mega.nz/folder/wwlWCKQA#gmE9wxUcMlTOkv0zfxkdzQ" target="_blank" class="download-btn mega-btn"><i class="fas fa-cloud-download-alt"></i> ${getText("downloadOption1")}</a><a href="https://www.mediafire.com/file/d7vbwmxf93yglqr/WLOCK-TOOL.rar/file" target="_blank" class="download-btn mediafire-btn"><i class="fas fa-download"></i> ${getText("downloadOption2")}</a></div><p class="download-note">${getText("downloadNote")}</p></div></div>`
    document.body.appendChild(downloadModal)
  }
  downloadModal.style.display = "block"
}
function closeDownloadModal() {
  const downloadModal = document.getElementById("downloadModal")
  if (downloadModal) {
    downloadModal.style.display = "none"
  }
}
function updateUILanguage() {
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href")
    if (href === "#home") link.textContent = getText("home")
    if (href === "#features") link.textContent = getText("features")
    if (href === "#models") link.textContent = getText("models")
    if (href === "#status") link.textContent = getText("status")
    if (href === "#contact") link.textContent = getText("contact")
  })
  const loginBtn = document.querySelector(".login-btn")
  if (loginBtn.textContent.includes("Admin")) {
    loginBtn.innerHTML = `<i class="fas fa-user-check"></i> ${getText("adminPanel")}`
  } else {
    loginBtn.innerHTML = `<i class="fas fa-user"></i> ${getText("login")}`
  }
  document.querySelector(".hero-subtitle").textContent = getText("heroSubtitle")
  document.querySelector(".hero-description").textContent = getText("heroDescription")
  const modelSearch = document.getElementById("modelSearch")
  if (modelSearch) {
    modelSearch.placeholder = getText("searchModel")
  }
  renderModels()
}
document.addEventListener("click", (event) => {
  const languageSelector = document.querySelector(".language-selector")
  const languageMenu = document.getElementById("languageMenu")
  if (languageSelector && !languageSelector.contains(event.target) && languageMenu.classList.contains("active")) {
    languageMenu.classList.remove("active")
  }
})
window.onclick = (event) => {
  const loginModal = document.getElementById("loginModal")
  const registerModal = document.getElementById("registerModal")
  const downloadModal = document.getElementById("downloadModal")
  if (event.target === loginModal) {
    closeLoginModal()
  }
  if (event.target === registerModal) {
    closeRegisterModal()
  }
  if (event.target === downloadModal) {
    closeDownloadModal()
  }
}
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
  updateServerStatuses()
  setInterval(updateServerStatuses, 30000)
  setTimeout(() => {
    renderModels()
    renderAdminModelsList()
    updateUILanguage()
  }, 100)
})
function renderModels() {
  const modelsGrid = document.getElementById("modelsGrid")
  modelsGrid.innerHTML = ""
  motorolaModels.forEach((model) => {
    const modelCard = createModelCard(model)
    modelsGrid.appendChild(modelCard)
  })
}
function renderAdminModelsList() {
  const adminModelsList = document.getElementById("adminModelsList")
  if (!adminModelsList) return
  adminModelsList.innerHTML = ""
  motorolaModels.forEach((model, index) => {
    const modelItem = document.createElement("div")
    modelItem.className = "admin-model-item"
    modelItem.innerHTML = `<div class="admin-model-header"><div><div class="admin-model-name">${model.name}</div><div class="admin-model-processor">${model.processor}</div></div></div><div class="admin-model-controls"><div class="process-control"><label for="imei-${index}">${getText("repairImei")}:</label><label class="mini-toggle"><input type="checkbox" id="imei-${index}" ${model.processes.imei ? "checked" : ""} onchange="toggleModelProcess(${index}, 'imei')"><span class="mini-slider"></span></label></div><div class="process-control"><label for="frp-${index}">${getText("frpPhone")}:</label><label class="mini-toggle"><input type="checkbox" id="frp-${index}" ${model.processes.frp ? "checked" : ""} onchange="toggleModelProcess(${index}, 'frp')"><span class="mini-slider"></span></label></div><div class="process-control"><label for="mdm-${index}">${getText("mdmPhone")}:</label><label class="mini-toggle"><input type="checkbox" id="mdm-${index}" ${model.processes.mdm ? "checked" : ""} onchange="toggleModelProcess(${index}, 'mdm')"><span class="mini-slider"></span></label></div></div>`
    adminModelsList.appendChild(modelItem)
  })
}
function filterAdminModels() {
  const searchTerm = document.getElementById("adminModelSearch").value.toLowerCase()
  const adminModelsList = document.getElementById("adminModelsList")
  if (!adminModelsList) return
  const modelItems = adminModelsList.querySelectorAll(".admin-model-item")
  modelItems.forEach((item) => {
    const modelName = item.querySelector(".admin-model-name").textContent.toLowerCase()
    const modelProcessor = item.querySelector(".admin-model-processor").textContent.toLowerCase()
    if (modelName.includes(searchTerm) || modelProcessor.includes(searchTerm)) {
      item.style.display = "block"
    } else {
      item.style.display = "none"
    }
  })
}
function toggleMenu() {
  const navMenu = document.querySelector(".nav-menu")
  navMenu.classList.toggle("active")
}
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}
function openLoginModal() {
  document.getElementById("loginModal").style.display = "block"
}
function closeLoginModal() {
  document.getElementById("loginModal").style.display = "none"
  document.getElementById("loginForm").reset()
}
function openRegisterModal() {
  closeLoginModal()
  document.getElementById("registerModal").style.display = "block"
}
function closeRegisterModal() {
  document.getElementById("registerModal").style.display = "none"
}
function showAdminPanel() {
  document.getElementById("adminPanel").style.display = "block"
  document.getElementById("adminControls").style.display = "block"
  document.getElementById("adminSprintToggle").checked = serverStatuses.sprint
  document.getElementById("adminMtkToggle").checked = serverStatuses.mtk
  document.getElementById("adminQualcommToggle").checked = serverStatuses.qualcomm
  document.getElementById("adminUsaToggle").checked = serverStatuses.usa
  renderAdminModelsList()
  const loginBtn = document.querySelector(".login-btn")
  loginBtn.innerHTML = `<i class="fas fa-user-check"></i> ${getText("adminPanel")}`
  loginBtn.onclick = toggleAdminPanel
}
function hideAdminPanel() {
  document.getElementById("adminPanel").style.display = "none"
  document.getElementById("adminControls").style.display = "none"
  const loginBtn = document.querySelector(".login-btn")
  loginBtn.innerHTML = `<i class="fas fa-user"></i> ${getText("login")}`
  loginBtn.onclick = openLoginModal
}
function toggleAdminPanel() {
  const panel = document.getElementById("adminPanel")
  panel.style.display = panel.style.display === "none" ? "block" : "none"
}
function updateServerStatuses() {
  lastUpdateTime = new Date()
  updateServerStatusDisplay()
}
function showNotification(message, type = "info") {
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => {
    document.body.removeChild(notification)
  })
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `<div class="notification-content"><i class="fas fa-${getNotificationIcon(type)}"></i><span>${message}</span></div>`
  notification.style.cssText = `position: fixed; top: 20px; right: 20px; background: ${getNotificationColor(type)}; color: white; padding: 1rem 1.5rem; border-radius: 10px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); z-index: 3000; transform: translateX(400px); transition: transform 0.3s ease; max-width: 300px; word-wrap: break-word;`
  document.body.appendChild(notification)
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)
  setTimeout(() => {
    notification.style.transform = "translateX(400px)"
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 3000)
}
function getNotificationColor(type) {
  switch (type) {
    case "success":
      return "#4CAF50"
    case "error":
      return "#f44336"
    case "warning":
      return "#ff9800"
    default:
      return "#2196F3"
  }
}
function getNotificationIcon(type) {
  switch (type) {
    case "success":
      return "check-circle"
    case "error":
      return "exclamation-circle"
    case "warning":
      return "exclamation-triangle"
    default:
      return "info-circle"
  }
}
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  })
})
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)"
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)"
  }
})
function updateServerStatusDisplay() {
  updateSingleServerStatus("sprint", serverStatuses.sprint)
  updateSingleServerStatus("mtk", serverStatuses.mtk)
  updateSingleServerStatus("qualcomm", serverStatuses.qualcomm)
  updateSingleServerStatus("usa", serverStatuses.usa)
}
function saveModelProcesses() {
  const processesData = motorolaModels.map((model) => ({ name: model.name, processes: model.processes }))
  localStorage.setItem("wklock_model_processes", JSON.stringify(processesData))
}
function loadModelProcesses() {
  const savedProcesses = localStorage.getItem("wklock_model_processes")
  if (savedProcesses) {
    const processesData = JSON.parse(savedProcesses)
    processesData.forEach((savedModel) => {
      const modelIndex = motorolaModels.findIndex((model) => model.name === savedModel.name)
      if (modelIndex !== -1) {
        motorolaModels[modelIndex].processes = savedModel.processes
      }
    })
  }
}
function resetToDefaults() {
  if (!isLoggedIn) {
    showNotification(getText("mustLoginProcess"), "error")
    return
  }
  localStorage.removeItem("wklock_model_processes")
  location.reload()
}

// Global variables
let isLoggedIn = false
let serverStatuses = {
  sprint: false,
  mtk: true,
  qualcomm: false,
  usa: false,
}
let lastUpdateTime = new Date()
let currentLanguage = "es" // Default language is Spanish

// Motorola models data with process support
const motorolaModels = [
  // Serie G existente
  { name: "G20 (XT2141-1)", processor: "Snapdragon 662", processes: { imei: true, frp: true, mdm: true } },
  { name: "G30 (XT2129-1)", processor: "Snapdragon 662", processes: { imei: true, frp: true, mdm: true } },
  { name: "G52 (XT2231-1)", processor: "MediaTek Helio G80", processes: { imei: true, frp: true, mdm: false } },
  { name: "G54 (XT2237-1)", processor: "MediaTek Dimensity 7020", processes: { imei: true, frp: true, mdm: false } },
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
  { name: "Moto G8 Play", processor: "MediaTek Helio P70M", processes: { imei: false, frp: true, mdm: false } }, // Modelo agregado
  { name: "Moto G8 Power", processor: "Snapdragon 665", processes: { imei: true, frp: true, mdm: true } }, // Modelo agregado
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
  { name: "Moto G32", processor: "Snapdragon 680", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G42", processor: "Snapdragon 680", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G62 5G", processor: "Snapdragon 695 5G", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G71 5G", processor: "Snapdragon 695 5G", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G51 5G", processor: "Snapdragon 480+ 5G", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G41", processor: "MediaTek Helio G85", processes: { imei: true, frp: true, mdm: false } },
  { name: "Moto G31", processor: "MediaTek Helio G85", processes: { imei: true, frp: true, mdm: false } },
  { name: "Moto G200 5G", processor: "Snapdragon 888+", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G Pure", processor: "MediaTek Helio G25", processes: { imei: false, frp: true, mdm: false } }, // Modelo agregado
  { name: "Moto G Play (2021)", processor: "Snapdragon 460", processes: { imei: true, frp: true, mdm: false } }, // Modelo agregado
  { name: "Moto G Play (2022)", processor: "MediaTek Helio G37", processes: { imei: false, frp: true, mdm: false } }, // Modelo agregado
  { name: "Moto G Play (2023)", processor: "MediaTek Helio G37", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto G Power (2022)", processor: "MediaTek Helio G37", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto G Stylus 5G (2022)", processor: "Snapdragon 695 5G", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G82 5G", processor: "Snapdragon 695 5G", processes: { imei: true, frp: true, mdm: true } },

  // Serie Edge
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
  { name: "Edge (2021)", processor: "Snapdragon 778G", processes: { imei: true, frp: true, mdm: true } }, // Modelo agregado
  { name: "Edge S", processor: "Snapdragon 870", processes: { imei: true, frp: true, mdm: true } }, // Modelo agregado
  { name: "Edge Plus (2022)", processor: "Snapdragon 8 Gen 1", processes: { imei: true, frp: true, mdm: true } }, // Modelo agregado

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
  { name: "Moto E20", processor: "Unisoc T606", processes: { imei: false, frp: true, mdm: false } }, // Modelo agregado
  { name: "Moto E30", processor: "Unisoc T700", processes: { imei: false, frp: true, mdm: false } }, // Modelo agregado
  { name: "Moto E5 Plus", processor: "Snapdragon 430", processes: { imei: true, frp: true, mdm: false } }, // Modelo agregado
  { name: "Moto E5 Play", processor: "Snapdragon 425", processes: { imei: true, frp: true, mdm: false } }, // Modelo agregado
  { name: "Moto E5", processor: "Snapdragon 425", processes: { imei: true, frp: true, mdm: false } }, // Modelo agregado
  { name: "Moto E4 Plus", processor: "MediaTek MT6737", processes: { imei: false, frp: true, mdm: false } }, // Modelo agregado
  { name: "Moto E4", processor: "MediaTek MT6737", processes: { imei: false, frp: true, mdm: false } }, // Modelo agregado

  // Serie One
  { name: "One 5G Ace", processor: "Snapdragon 750G", processes: { imei: true, frp: true, mdm: true } },
  { name: "One Fusion+", processor: "Snapdragon 730", processes: { imei: true, frp: true, mdm: true } },
  { name: "One Hyper", processor: "Snapdragon 675", processes: { imei: true, frp: true, mdm: true } },
  { name: "One Action", processor: "Samsung Exynos 9609", processes: { imei: false, frp: true, mdm: false } },
  { name: "One Vision", processor: "Samsung Exynos 9609", processes: { imei: false, frp: true, mdm: false } },
  { name: "One Macro", processor: "MediaTek Helio P70", processes: { imei: false, frp: true, mdm: false } },
  { name: "One Zoom", processor: "Snapdragon 675", processes: { imei: true, frp: true, mdm: true } },
  { name: "One Power", processor: "Snapdragon 636", processes: { imei: true, frp: true, mdm: true } },
  { name: "One Fusion", processor: "Snapdragon 710", processes: { imei: true, frp: true, mdm: true } }, // Modelo agregado

  // Serie Z
  { name: "Moto Z4", processor: "Snapdragon 675", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto Z3 Play", processor: "Snapdragon 636", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto Z2 Force", processor: "Snapdragon 835", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto Z2 Play", processor: "Snapdragon 626", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto Z Play", processor: "Snapdragon 625", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto Z Force", processor: "Snapdragon 820", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto Z", processor: "Snapdragon 820", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto Z3", processor: "Snapdragon 835", processes: { imei: true, frp: true, mdm: true } }, // Modelo agregado

  // Serie X
  { name: "Moto X4", processor: "Snapdragon 630", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto X (2014)", processor: "Snapdragon 801", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto X Style", processor: "Snapdragon 808", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto X Play", processor: "Snapdragon 615", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto X Force", processor: "Snapdragon 810", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto X Pure Edition", processor: "Snapdragon 808", processes: { imei: true, frp: true, mdm: true } }, // Modelo agregado

  // Modelos con MediaTek adicionales
  { name: "Moto G53 5G", processor: "MediaTek Dimensity 700", processes: { imei: true, frp: true, mdm: false } },
  { name: "Moto G23", processor: "MediaTek Helio G85", processes: { imei: true, frp: true, mdm: false } },
  { name: "Moto G13", processor: "MediaTek Helio G85", processes: { imei: true, frp: true, mdm: false } },
  { name: "Moto C Plus", processor: "MediaTek MT6737", processes: { imei: false, frp: true, mdm: false } },
  { name: "Moto C", processor: "MediaTek MT6737M", processes: { imei: false, frp: true, mdm: false } },

  // Modelos con Qualcomm adicionales
  { name: "Moto G85 5G", processor: "Snapdragon 6s Gen 3", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G75 5G", processor: "Snapdragon 6 Gen 1", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G65 5G", processor: "Snapdragon 7s Gen 2", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G55 5G", processor: "Snapdragon 7s Gen 2", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G45 5G", processor: "Snapdragon 6s Gen 3", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G35 5G", processor: "Snapdragon 6 Gen 1", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G25 5G", processor: "Snapdragon 4 Gen 1", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G15 5G", processor: "Snapdragon 4 Gen 1", processes: { imei: true, frp: true, mdm: true } },
  { name: "Moto G05 5G", processor: "Snapdragon 4 Gen 2", processes: { imei: true, frp: true, mdm: true } },

  // Modelos Razr
  { name: "Razr (2019)", processor: "Snapdragon 710", processes: { imei: true, frp: true, mdm: true } },
  { name: "Razr 5G (2020)", processor: "Snapdragon 765G", processes: { imei: true, frp: true, mdm: true } },
  { name: "Razr (2022)", processor: "Snapdragon 8+ Gen 1", processes: { imei: true, frp: true, mdm: true } },
  { name: "Razr 40", processor: "Snapdragon 7 Gen 1", processes: { imei: true, frp: true, mdm: true } },
  { name: "Razr 40 Ultra", processor: "Snapdragon 8+ Gen 1", processes: { imei: true, frp: true, mdm: true } },
  { name: "Razr 50", processor: "MediaTek Dimensity 7300", processes: { imei: true, frp: true, mdm: false } }, // Modelo agregado
  { name: "Razr 50 Ultra", processor: "Snapdragon 8s Gen 3", processes: { imei: true, frp: true, mdm: true } }, // Modelo agregado

  // Modelos ThinkPhone
  { name: "ThinkPhone", processor: "Snapdragon 8+ Gen 1", processes: { imei: true, frp: true, mdm: true } },

  // Modelos Frontier
  { name: "Frontier", processor: "Snapdragon 8+ Gen 1", processes: { imei: true, frp: true, mdm: true } },

  // Modelos Defy
  { name: "Defy (2021)", processor: "Snapdragon 662", processes: { imei: true, frp: true, mdm: true } },
  { name: "Defy 2", processor: "MediaTek Helio G85", processes: { imei: false, frp: true, mdm: false } },
]

// Language translations
const translations = {
  es: {
    // Navigation
    home: "Inicio",
    features: "Características",
    models: "Modelos Soportados",
    status: "Estado",
    contact: "Contacto",
    login: "Iniciar Sesión",
    adminPanel: "Panel Admin",

    // Hero Section
    heroSubtitle: "La herramienta más avanzada para desbloqueo de dispositivos móviles",
    heroDescription: "Solución profesional y confiable para técnicos especializados",
    exploreFeatures: "Explorar Características",
    joinSupport: "Unirse al Soporte",

    // Features Section
    mainFeatures: "Características Principales",
    advancedUnlock: "Desbloqueo Avanzado",
    advancedUnlockDesc: "Soporte exclusivo para dispositivos móviles marca Motorola",
    safeReliable: "Seguro y Confiable",
    safeReliableDesc: "Procesos seguros que protegen la integridad de los dispositivos",
    fastEfficient: "Rápido y Eficiente",
    fastEfficientDesc: "Procesos optimizados para resultados en tiempo récord",
    support247: "Soporte 24/7",
    support247Desc: "Asistencia técnica especializada disponible todo el tiempo",

    // Models Section
    supportedModels: "Modelos Soportados",
    searchModel: "Buscar modelo...",
    repairImei: "Repair IMEI",
    frpPhone: "Frp Phone",
    mdmPhone: "MDM Phone",
    noResults: "No se encontraron modelos que coincidan con tu búsqueda",

    // Server Status Section
    serverStatus: "Estado del Servidor",
    serverControl: "Control de Servidores",
    online: "Online",
    offline: "Offline",

    // Contact Section
    contactSupport: "Contacto y Soporte",
    needHelp: "¿Necesitas ayuda?",
    joinTelegram: "Únete a nuestro grupo de soporte en Telegram para obtener asistencia inmediata",
    joinGroup: "Unirse al Grupo de Soporte",

    // Footer
    allRightsReserved: "Todos los derechos reservados",
    professionalTool: "Herramienta profesional para técnicos especializados",

    // Login Modal
    username: "Usuario:",
    password: "Contraseña:",
    loginButton: "Iniciar Sesión",
    noAccount: "¿No tienes cuenta?",
    register: "Registrarse",

    // Register Modal
    registration: "Registro",
    registerInfo: "Para registrarte y obtener acceso completo, únete a nuestro grupo de soporte en Telegram:",
    teamHelp: "Nuestro equipo te ayudará con el proceso de registro",

    // Admin Panel
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

    // Notifications
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

    // Language
    language: "Idioma",
    spanish: "Español",
    english: "English",
  },
  en: {
    // Navigation
    home: "Home",
    features: "Features",
    models: "Supported Models",
    status: "Status",
    contact: "Contact",
    login: "Login",
    adminPanel: "Admin Panel",

    // Hero Section
    heroSubtitle: "The most advanced tool for mobile device unlocking",
    heroDescription: "Professional and reliable solution for specialized technicians",
    exploreFeatures: "Explore Features",
    joinSupport: "Join Support",

    // Features Section
    mainFeatures: "Main Features",
    advancedUnlock: "Advanced Unlocking",
    advancedUnlockDesc: "Exclusive support for Motorola mobile devices",
    safeReliable: "Safe & Reliable",
    safeReliableDesc: "Secure processes that protect device integrity",
    fastEfficient: "Fast & Efficient",
    fastEfficientDesc: "Optimized processes for record time results",
    support247: "24/7 Support",
    support247Desc: "Specialized technical assistance available all the time",

    // Models Section
    supportedModels: "Supported Models",
    searchModel: "Search model...",
    repairImei: "Repair IMEI",
    frpPhone: "Frp Phone",
    mdmPhone: "MDM Phone",
    noResults: "No models found matching your search",

    // Server Status Section
    serverStatus: "Server Status",
    serverControl: "Server Control",
    online: "Online",
    offline: "Offline",

    // Contact Section
    contactSupport: "Contact & Support",
    needHelp: "Need help?",
    joinTelegram: "Join our Telegram support group for immediate assistance",
    joinGroup: "Join Support Group",

    // Footer
    allRightsReserved: "All rights reserved",
    professionalTool: "Professional tool for specialized technicians",

    // Login Modal
    username: "Username:",
    password: "Password:",
    loginButton: "Login",
    noAccount: "Don't have an account?",
    register: "Register",

    // Register Modal
    registration: "Registration",
    registerInfo: "To register and get full access, join our Telegram support group:",
    teamHelp: "Our team will help you with the registration process",

    // Admin Panel
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

    // Notifications
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

    // Language
    language: "Language",
    spanish: "Español",
    english: "English",
  },
}

// Agregar después de la declaración de motorolaModels y antes de la función initializeApp()
// Función para obtener texto traducido
function getText(key) {
  return translations[currentLanguage][key] || key
}

// Función para cambiar el idioma
function changeLanguage(lang) {
  if (lang !== "es" && lang !== "en") return

  currentLanguage = lang
  localStorage.setItem("wklock_language", lang)
  updateUILanguage()
  showNotification(lang === "es" ? "Idioma cambiado a Español" : "Language changed to English", "info")
}

// Función para actualizar la interfaz con el idioma seleccionado
function updateUILanguage() {
  // Actualizar navegación
  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href")
    if (href === "#home") link.textContent = getText("home")
    if (href === "#features") link.textContent = getText("features")
    if (href === "#models") link.textContent = getText("models")
    if (href === "#status") link.textContent = getText("status")
    if (href === "#contact") link.textContent = getText("contact")
  })

  // Actualizar botón de login
  const loginBtn = document.querySelector(".login-btn")
  if (loginBtn.textContent.includes("Admin")) {
    loginBtn.innerHTML = `<i class="fas fa-user-check"></i> ${getText("adminPanel")}`
  } else {
    loginBtn.innerHTML = `<i class="fas fa-user"></i> ${getText("login")}`
  }

  // Actualizar sección hero
  document.querySelector(".hero-subtitle").textContent = getText("heroSubtitle")
  document.querySelector(".hero-description").textContent = getText("heroDescription")

  // Actualizar botones hero
  const exploreBtn = document.querySelector(".btn-primary")
  if (exploreBtn) {
    exploreBtn.innerHTML = `<i class="fas fa-rocket"></i> ${getText("exploreFeatures")}`
  }

  const joinBtn = document.querySelector(".btn-secondary")
  if (joinBtn) {
    joinBtn.innerHTML = `<i class="fas fa-users"></i> ${getText("joinSupport")}`
  }

  // Actualizar títulos de secciones
  document.querySelectorAll(".section-title").forEach((title) => {
    if (title.parentElement.closest("#features")) title.textContent = getText("mainFeatures")
    if (title.parentElement.closest("#models")) title.textContent = getText("supportedModels")
    if (title.parentElement.closest("#status")) title.textContent = getText("serverStatus")
    if (title.parentElement.closest("#contact")) title.textContent = getText("contactSupport")
  })

  // Actualizar placeholder del buscador de modelos
  const modelSearch = document.getElementById("modelSearch")
  if (modelSearch) {
    modelSearch.placeholder = getText("searchModel")
  }

  // Actualizar características de modelos
  document.querySelectorAll(".model-features li").forEach((item) => {
    const text = item.textContent.trim()
    if (text.includes("Repair IMEI")) {
      item.innerHTML = `<i class="fas ${item.querySelector("i").className.includes("fa-check") ? "fa-check" : "fa-times"}"></i> ${getText("repairImei")}`
    } else if (text.includes("Frp Phone")) {
      item.innerHTML = `<i class="fas ${item.querySelector("i").className.includes("fa-check") ? "fa-check" : "fa-times"}"></i> ${getText("frpPhone")}`
    } else if (text.includes("MDM Phone")) {
      item.innerHTML = `<i class="fas ${item.querySelector("i").className.includes("fa-check") ? "fa-check" : "fa-times"}"></i> ${getText("mdmPhone")}`
    }
  })

  // Actualizar textos del panel de administración si está visible
  if (document.getElementById("adminPanel").style.display !== "none") {
    document.querySelector(".admin-header h3").innerHTML = `<i class="fas fa-cog"></i> ${getText("administration")}`
    document.querySelector(".admin-header button").innerHTML =
      `<i class="fas fa-sign-out-alt"></i> ${getText("logout")}`

    // Actualizar títulos de secciones admin
    document.querySelectorAll(".admin-section h4").forEach((title, index) => {
      if (index === 0) title.textContent = getText("serverConfig")
      if (index === 1) title.textContent = getText("modelProcesses")
      if (index === 2) title.textContent = getText("siteConfig")
      if (index === 3) title.textContent = getText("statistics")
    })

    // Actualizar botones de acciones masivas
    const bulkButtons = document.querySelectorAll(".bulk-controls button")
    if (bulkButtons.length >= 3) {
      bulkButtons[0].innerHTML = `<i class="fas fa-check-double"></i> ${getText("enableAll")}`
      bulkButtons[1].innerHTML = `<i class="fas fa-times"></i> ${getText("disableAll")}`
      bulkButtons[2].innerHTML = `<i class="fas fa-undo"></i> ${getText("restoreDefaults")}`
    }

    // Actualizar botón de guardar configuración
    const saveBtn = document.querySelector(".admin-section button.btn-primary")
    if (saveBtn) {
      saveBtn.innerHTML = `<i class="fas fa-save"></i> ${getText("saveSettings")}`
    }

    // Actualizar etiquetas de estadísticas
    document.querySelectorAll(".stat-label").forEach((label, index) => {
      if (index === 0) label.textContent = getText("users")
      if (index === 1) label.textContent = getText("unlocks")
      if (index === 2) label.textContent = getText("uptime")
      if (index === 3) label.textContent = getText("avgTime")
    })
  }

  // Actualizar modales
  updateModalLanguage()

  // Actualizar footer
  document.querySelectorAll(".footer-text p").forEach((p, index) => {
    if (index === 0) {
      p.textContent = `© 2024 WKLOCK-TOOL. ${getText("allRightsReserved")}`
    } else if (index === 1) {
      p.textContent = getText("professionalTool")
    }
  })

  // Renderizar modelos para actualizar textos
  renderModels()
}

function updateModalLanguage() {
  // Modal de login
  const loginModal = document.getElementById("loginModal")
  if (loginModal) {
    loginModal.querySelector(".modal-header h2").textContent = getText("login")
    loginModal.querySelectorAll(".form-group label")[0].textContent = getText("username")
    loginModal.querySelectorAll(".form-group label")[1].textContent = getText("password")
    loginModal.querySelector(".btn-login").innerHTML = `<i class="fas fa-sign-in-alt"></i> ${getText("loginButton")}`
    loginModal.querySelector(".modal-footer p").innerHTML =
      `${getText("noAccount")} <a href="#" onclick="openRegisterModal()">${getText("register")}</a>`
  }

  // Modal de registro
  const registerModal = document.getElementById("registerModal")
  if (registerModal) {
    registerModal.querySelector(".modal-header h2").textContent = getText("registration")
    registerModal.querySelector(".register-content p").textContent = getText("registerInfo")
    registerModal.querySelector(".telegram-btn").innerHTML = `<i class="fab fa-telegram"></i> ${getText("joinGroup")}`
    registerModal.querySelector(".register-note").textContent = getText("teamHelp")
  }
}

// Agregar funciones para el selector de idioma
// Agregar después de la función updateModalLanguage()

// Función para mostrar/ocultar el menú de idiomas
function toggleLanguageMenu() {
  const languageMenu = document.getElementById("languageMenu")
  languageMenu.classList.toggle("active")
}

// Actualizar la función createModelCard para usar traducciones
function createModelCard(model) {
  const card = document.createElement("div")
  card.className = "model-card"
  card.innerHTML = `
    <div class="model-brand">MOTOROLA</div>
    <div class="model-name">${model.name}</div>
    <div class="model-processor">${model.processor}</div>
    <ul class="model-features">
      <li class="${model.processes.imei ? "" : "disabled"}">
        <i class="fas ${model.processes.imei ? "fa-check" : "fa-times"}"></i> 
        ${getText("repairImei")}
      </li>
      <li class="${model.processes.frp ? "" : "disabled"}">
        <i class="fas ${model.processes.frp ? "fa-check" : "fa-times"}"></i> 
        ${getText("frpPhone")}
      </li>
      <li class="${model.processes.mdm ? "" : "disabled"}">
        <i class="fas ${model.processes.mdm ? "fa-check" : "fa-times"}"></i> 
        ${getText("mdmPhone")}
      </li>
    </ul>
  `
  return card
}

// Actualizar la función filterModels para usar traducciones
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

// Modificar la función handleLogin para usar traducciones
function handleLogin(event) {
  event.preventDefault()

  const username = document.getElementById("username").value.trim()
  const password = document.getElementById("password").value.trim()

  // Check credentials - Updated password
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

// Modificar la función logout para usar traducciones
function logout() {
  isLoggedIn = false
  localStorage.removeItem("wklock_admin_logged_in")
  hideAdminPanel()
  showNotification(getText("sessionClosed"), "info")
}

// Modificar la función toggleServerStatus para usar traducciones
function toggleServerStatus(server) {
  if (!isLoggedIn) {
    showNotification(getText("mustLogin"), "error")
    return
  }

  // Toggle the server status
  serverStatuses[server] = !serverStatuses[server]

  // Save to localStorage
  localStorage.setItem("wklock_server_statuses", JSON.stringify(serverStatuses))

  // Update all toggle switches
  document.getElementById(`${server}Toggle`).checked = serverStatuses[server]
  document.getElementById(`admin${server.charAt(0).toUpperCase() + server.slice(1)}Toggle`).checked =
    serverStatuses[server]

  // Update display
  updateServerStatusDisplay()

  const status = serverStatuses[server]
    ? getText("serverActivated").replace("{0}", server.toUpperCase())
    : getText("serverDeactivated").replace("{0}", server.toUpperCase())
  showNotification(status, "success")
}

// Modificar la función updateSingleServerStatus para usar traducciones
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

// Modificar la función saveSettings para usar traducciones
function saveSettings() {
  const siteTitle = document.getElementById("siteTitle").value
  const maintenanceMode = document.getElementById("maintenanceMode").checked
  const supportEmail = document.getElementById("supportEmail").value
  const telegramLink = document.getElementById("telegramLink").value

  // Save settings to localStorage
  localStorage.setItem("wklock_site_title", siteTitle)
  localStorage.setItem("wklock_maintenance_mode", maintenanceMode.toString())
  localStorage.setItem("wklock_support_email", supportEmail)
  localStorage.setItem("wklock_telegram_link", telegramLink)

  // Update page title
  document.title = `${siteTitle} - Herramienta de Desbloqueo Profesional`

  // Update telegram links
  const telegramLinks = document.querySelectorAll('a[href*="t.me"]')
  telegramLinks.forEach((link) => {
    link.href = telegramLink
  })

  showNotification(getText("settingsSaved"), "success")
}

// Modificar la función toggleModelProcess para usar traducciones
function toggleModelProcess(modelIndex, processType) {
  if (!isLoggedIn) {
    showNotification(getText("mustLoginProcess"), "error")
    return
  }

  // Toggle the process status
  motorolaModels[modelIndex].processes[processType] = !motorolaModels[modelIndex].processes[processType]

  // Save to localStorage
  saveModelProcesses()

  // Update the frontend display
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

// Modificar la función enableAllProcesses para usar traducciones
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

// Modificar la función disableAllProcesses para usar traducciones
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

// Actualizar la función initializeApp para cargar el idioma guardado
function initializeApp() {
  // Check if user is already logged in
  const savedLogin = localStorage.getItem("wklock_admin_logged_in")
  if (savedLogin === "true") {
    isLoggedIn = true
    showAdminPanel()
  }

  // Initialize server statuses
  const savedServerStatuses = localStorage.getItem("wklock_server_statuses")
  if (savedServerStatuses !== null) {
    serverStatuses = JSON.parse(savedServerStatuses)
  }

  // Initialize toggle switches
  document.getElementById("sprintToggle").checked = serverStatuses.sprint
  document.getElementById("mtkToggle").checked = serverStatuses.mtk
  document.getElementById("qualcommToggle").checked = serverStatuses.qualcomm
  document.getElementById("usaToggle").checked = serverStatuses.usa

  // Initialize admin toggle switches
  document.getElementById("adminSprintToggle").checked = serverStatuses.sprint
  document.getElementById("adminMtkToggle").checked = serverStatuses.mtk
  document.getElementById("adminQualcommToggle").checked = serverStatuses.qualcomm
  document.getElementById("adminUsaToggle").checked = serverStatuses.usa

  // Load saved model processes
  loadModelProcesses()

  // Update language display
  document.getElementById("currentLanguage").textContent = currentLanguage === "es" ? "Español" : "English"

  updateServerStatusDisplay()
}

// Cerrar el menú de idiomas al hacer clic fuera de él
document.addEventListener("click", (event) => {
  const languageSelector = document.querySelector(".language-selector")
  const languageMenu = document.getElementById("languageMenu")

  if (languageSelector && !languageSelector.contains(event.target) && languageMenu.classList.contains("active")) {
    languageMenu.classList.remove("active")
  }
})

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  // Cargar preferencia de idioma
  const savedLanguage = localStorage.getItem("wklock_language")
  if (savedLanguage) {
    currentLanguage = savedLanguage
  }

  initializeApp()
  updateServerStatuses()
  setInterval(updateServerStatuses, 30000) // Update every 30 seconds
  renderModels()
  renderAdminModelsList()

  // Actualizar la interfaz con el idioma seleccionado
  updateUILanguage()
})

// Models functions
function renderModels() {
  const modelsGrid = document.getElementById("modelsGrid")
  modelsGrid.innerHTML = ""

  motorolaModels.forEach((model) => {
    const modelCard = createModelCard(model)
    modelsGrid.appendChild(modelCard)
  })
}

// Admin Models Management
function renderAdminModelsList() {
  const adminModelsList = document.getElementById("adminModelsList")
  if (!adminModelsList) return

  adminModelsList.innerHTML = ""

  motorolaModels.forEach((model, index) => {
    const modelItem = document.createElement("div")
    modelItem.className = "admin-model-item"
    modelItem.innerHTML = `
      <div class="admin-model-header">
        <div>
          <div class="admin-model-name">${model.name}</div>
          <div class="admin-model-processor">${model.processor}</div>
        </div>
      </div>
      <div class="admin-model-controls">
        <div class="process-control">
          <label for="imei-${index}">${getText("repairImei")}:</label>
          <label class="mini-toggle">
            <input type="checkbox" id="imei-${index}" ${model.processes.imei ? "checked" : ""} 
              onchange="toggleModelProcess(${index}, 'imei')">
            <span class="mini-slider"></span>
          </label>
        </div>
        <div class="process-control">
          <label for="frp-${index}">${getText("frpPhone")}:</label>
          <label class="mini-toggle">
            <input type="checkbox" id="frp-${index}" ${model.processes.frp ? "checked" : ""} 
              onchange="toggleModelProcess(${index}, 'frp')">
            <span class="mini-slider"></span>
          </label>
        </div>
        <div class="process-control">
          <label for="mdm-${index}">${getText("mdmPhone")}:</label>
          <label class="mini-toggle">
            <input type="checkbox" id="mdm-${index}" ${model.processes.mdm ? "checked" : ""} 
              onchange="toggleModelProcess(${index}, 'mdm')">
            <span class="mini-slider"></span>
          </label>
        </div>
      </div>
    `
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

// Navigation functions
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

// Modal functions
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

// Admin panel functions
function showAdminPanel() {
  document.getElementById("adminPanel").style.display = "block"
  document.getElementById("adminControls").style.display = "block"

  // Sync admin toggle switches with server statuses
  document.getElementById("adminSprintToggle").checked = serverStatuses.sprint
  document.getElementById("adminMtkToggle").checked = serverStatuses.mtk
  document.getElementById("adminQualcommToggle").checked = serverStatuses.qualcomm
  document.getElementById("adminUsaToggle").checked = serverStatuses.usa

  // Render admin models list
  renderAdminModelsList()

  // Update login button
  const loginBtn = document.querySelector(".login-btn")
  loginBtn.innerHTML = `<i class="fas fa-user-check"></i> ${getText("adminPanel")}`
  loginBtn.onclick = toggleAdminPanel
}

function hideAdminPanel() {
  document.getElementById("adminPanel").style.display = "none"
  document.getElementById("adminControls").style.display = "none"

  // Reset login button
  const loginBtn = document.querySelector(".login-btn")
  loginBtn.innerHTML = `<i class="fas fa-user"></i> ${getText("login")}`
  loginBtn.onclick = openLoginModal
}

function toggleAdminPanel() {
  const panel = document.getElementById("adminPanel")
  panel.style.display = panel.style.display === "none" ? "block" : "none"
}

// Server control functions
function updateServerStatuses() {
  lastUpdateTime = new Date()
  updateServerStatusDisplay()
}

// Settings functions

// Notification system
function showNotification(message, type = "info") {
  // Remove any existing notifications
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => {
    document.body.removeChild(notification)
  })

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${getNotificationIcon(type)}"></i>
      <span>${message}</span>
    </div>
  `

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${getNotificationColor(type)};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    z-index: 3000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 300px;
    word-wrap: break-word;
  `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 3 seconds
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

// Close modals when clicking outside
window.onclick = (event) => {
  const loginModal = document.getElementById("loginModal")
  const registerModal = document.getElementById("registerModal")

  if (event.target === loginModal) {
    closeLoginModal()
  }
  if (event.target === registerModal) {
    closeRegisterModal()
  }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add scroll effect to header
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)"
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)"
  }
})

// Initialize tooltips and other interactive elements
document.addEventListener("DOMContentLoaded", () => {
  // Add loading animation to buttons
  const buttons = document.querySelectorAll("button")
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (!this.classList.contains("loading") && !this.classList.contains("close")) {
        this.classList.add("loading")
        setTimeout(() => {
          this.classList.remove("loading")
        }, 1000)
      }
    })
  })

  // Load saved settings
  const savedTitle = localStorage.getItem("wklock_site_title")
  if (savedTitle) {
    document.getElementById("siteTitle").value = savedTitle
    document.title = `${savedTitle} - Herramienta de Desbloqueo Profesional`
  }

  const savedMaintenanceMode = localStorage.getItem("wklock_maintenance_mode")
  if (savedMaintenanceMode) {
    document.getElementById("maintenanceMode").checked = savedMaintenanceMode === "true"
  }

  const savedSupportEmail = localStorage.getItem("wklock_support_email")
  if (savedSupportEmail) {
    document.getElementById("supportEmail").value = savedSupportEmail
  }

  const savedTelegramLink = localStorage.getItem("wklock_telegram_link")
  if (savedTelegramLink) {
    document.getElementById("telegramLink").value = savedTelegramLink
    const telegramLinks = document.querySelectorAll('a[href*="t.me"]')
    telegramLinks.forEach((link) => {
      link.href = savedTelegramLink
    })
  }
})

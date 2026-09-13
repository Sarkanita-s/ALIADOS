/**
 * ===================================================================
 * ALIADOS - DATOS MAESTROS DEL PROTOTIPO MVP
 * ===================================================================
 * Basado en los casos de estudio y el Acta de Constitución CAJ San Miguel.
 */

const ALIADOS_DATA = {
  currentRole: 'mama', // 'mama' | 'papa' | 'abuela'
  currentKid: 'mateo',  // 'mateo' | 'sofia'

  roles: {
    mama: {
      id: 'mama',
      name: 'Claudia Gómez',
      title: 'Mamá (Custodia Principal)',
      badgeTag: 'Mamá (Admin)',
      avatar: '👩',
      isAdmin: true,
      canEditHealth: true,
      canManageUsers: true
    },
    papa: {
      id: 'papa',
      name: 'Carlos Schmied',
      title: 'Papá (Co-parentalidad)',
      badgeTag: 'Papá (Admin)',
      avatar: '👨',
      isAdmin: true,
      canEditHealth: true,
      canManageUsers: true
    },
    abuela: {
      id: 'abuela',
      name: 'Marta Riquelme',
      title: 'Abuela Marta (Familia Extendida)',
      badgeTag: 'Abuela (Consulta)',
      avatar: '👵',
      isAdmin: false,
      canEditHealth: false,
      canManageUsers: false
    }
  },

  children: {
    mateo: {
      id: 'mateo',
      name: 'Mateo',
      fullName: 'Mateo Gómez Schmied',
      age: 7,
      avatarEmoji: '🧒',
      custodyCurrent: 'Esta semana con Mamá (Claudia) 🏡',
      custodyDetails: 'Próximo traspaso: Viernes 18:00 hrs en el colegio',
      parentingNote: '“Mateo durmió excelente anoche. Practicó su lectura y llevó su dinosaurio favorito en la mochila.”',
      parentingAuthor: 'Nota dejada por Claudia • Hoy 08:15 hrs',
      
      habits: {
        favoriteFoods: ['Lasaña casera', 'Puré de papas con huevo frito', 'Manzanas rojas picadas', 'Leche cultivada'],
        dislikedFoods: ['Cebolla cruda en ensaladas', 'Pescado frito (prefiere atún)', 'Mayonesa'],
        bedtimeRitual: 'Lavarse los dientes a las 20:30, leer 1 cuento de dinosaurios y dejar la lamparita azul del pasillo encendida.',
        favoriteMusic: 'Canciones de 31 Minutos y banda sonora de "Coco".'
      },

      fears: [
        {
          title: 'Truenos y Tormentas Eléctricas ⚡',
          description: 'Se asusta con los destellos y relámpagos fuertes.',
          sootheAdvice: 'Poner música suave de lluvia o ruido blanco, abrazarlo fuerte y recordarle que la casa es 100% segura.'
        },
        {
          title: 'Oscuridad Total en la Noche 🌙',
          description: 'No le gusta que la puerta de la pieza quede completamente cerrada.',
          sootheAdvice: 'Dejar encendida su luz quitamiedos de dinosaurio y la puerta con una rendija abierta.'
        },
        {
          title: 'Ruidos de Herramientas o Taladros 🔨',
          description: 'Se tapa los oídos ante sonidos de construcción repentinos.',
          sootheAdvice: 'Avisarle minutos antes si se hará algún arreglo en casa y ponerle sus audífonos protectores.'
        }
      ],

      hobbies: [
        { icon: '🦖', title: 'Dinosaurios', desc: 'Sabe distinguir carnívoros y herbívoros. Su favorito es el Ankylosaurus.' },
        { icon: '⚽', title: 'Fútbol Sub-8', desc: 'Juega de arquero los sábados. Le encanta usar guantes y buzo largo.' },
        { icon: '🎨', title: 'Pintura y LEGOs', desc: 'Le gusta armar naves espaciales y castillos de bloques de colores.' }
      ],

      sizes: {
        shoes: { val: '31', label: 'Calzado', icon: '👟', updated: 'Actualizado hace 2 semanas' },
        shirt: { val: 'Talla 8', label: 'Polera / Buzo', icon: '👕', updated: 'Actualizado hace 1 mes' },
        pants: { val: 'Talla 8', label: 'Pantalón', icon: '👖', updated: 'Actualizado hace 1 mes' }
      },

      health: {
        bloodType: 'O+',
        insurance: 'Fonasa B (CESFAM San Miguel)',
        allergies: [
          { name: 'Penicilina', severity: 'Severa (Shock anafiláctico)' },
          { name: 'Maní / Frutos Secos', severity: 'Leve (Evitar por precaución)' }
        ],
        emergencyContacts: [
          { name: 'Claudia (Mamá)', phone: '+56 9 9123 4567' },
          { name: 'Carlos (Papá)', phone: '+56 9 8234 5678' },
          { name: 'Marta (Abuela)', phone: '+56 9 7345 6789' }
        ],
        doctor: {
          name: 'Dra. Marcela Vega S.',
          role: 'Pediatra de Cabecera',
          clinic: 'Centro Médico San Miguel • Box 4',
          phone: '+56 9 8765 4321'
        },
        medications: [
          {
            id: 'med-1',
            name: 'Amoxicilina 250mg / 5ml',
            dose: '5 ml cada 8 horas (Tratamiento amigdalitis)',
            times: '08:00 - 16:00 - 23:00',
            finishDate: 'Viernes 19 de Septiembre',
            checkedToday: false,
            alarmTime: '16:00 hrs'
          },
          {
            id: 'med-2',
            name: 'Salbutamol Inhalador SOS',
            dose: '2 puff con aerocámara solo en caso de tos/dificultad',
            times: 'Dosis de rescate SOS',
            finishDate: 'Permanente según necesidad',
            checkedToday: false,
            alarmTime: 'Solo SOS'
          }
        ]
      }
    },

    sofia: {
      id: 'sofia',
      name: 'Sofía',
      fullName: 'Sofía Gómez Schmied',
      age: 4,
      avatarEmoji: '👧',
      custodyCurrent: 'Esta semana con Mamá (Claudia) 🏡',
      custodyDetails: 'Próximo traspaso: Viernes 18:00 hrs en el jardín infantil',
      parentingNote: '“Sofi comió toda su fruta hoy. Estuvo pintando un dibujo para su abuela.”',
      parentingAuthor: 'Nota dejada por Claudia • Hoy 09:30 hrs',

      habits: {
        favoriteFoods: ['Fideos con salsa blanca', 'Plátano machacado con miel', 'Yogurt de frutilla'],
        dislikedFoods: ['Verduras cocidas con vinagre', 'Queso fuerte'],
        bedtimeRitual: 'Cantarle "Estrellita dónde estás" y darle su muñeca conejito de felpa.',
        favoriteMusic: 'Canciones infantiles de La Granja y princesas de Disney.'
      },

      fears: [
        {
          title: 'Perros Grandes que Ladran Fuerte 🐕',
          description: 'Se sobresalta cuando escucha ladridos sorpresivos en la calle.',
          sootheAdvice: 'Tomarla en brazos, hablarle con cariño y cruzar de vereda sin aspavientos.'
        }
      ],

      hobbies: [
        { icon: '🩰', title: 'Danza y Baile', desc: 'Baila frente al espejo con canciones infantiles.' },
        { icon: '🖍️', title: 'Plastilina y Dibujo', desc: 'Le gusta mezclar colores y hacer figuras.' }
      ],

      sizes: {
        shoes: { val: '26', label: 'Calzado', icon: '👟', updated: 'Actualizado hace 3 semanas' },
        shirt: { val: 'Talla 4', label: 'Polera / Vestido', icon: '👗', updated: 'Actualizado hace 1 mes' },
        pants: { val: 'Talla 4', label: 'Pantalón', icon: '👖', updated: 'Actualizado hace 1 mes' }
      },

      health: {
        bloodType: 'A+',
        insurance: 'Fonasa B (CESFAM San Miguel)',
        allergies: [
          { name: 'Picaduras de Avispa', severity: 'Reacción local importante' }
        ],
        emergencyContacts: [
          { name: 'Claudia (Mamá)', phone: '+56 9 9123 4567' },
          { name: 'Carlos (Papá)', phone: '+56 9 8234 5678' }
        ],
        doctor: {
          name: 'Dra. Marcela Vega S.',
          role: 'Pediatra de Cabecera',
          clinic: 'Centro Médico San Miguel • Box 4',
          phone: '+56 9 8765 4321'
        },
        medications: []
      }
    }
  },

  events: [
    {
      id: 'ev-1',
      kidId: 'mateo',
      title: 'Acto de Fiestas Patrias Escolar 🇨🇱',
      category: 'school',
      catLabel: 'Escuela',
      date: 'Jueves 17 Sept • 10:30 hrs',
      location: 'Colegio San Bernardo (Gimnasio Principal)',
      description: 'Mateo bailará cueca con su curso. Se solicita llegar 15 minutos antes.',
      attendees: ['Mamá Claudia', 'Papá Carlos'],
      abuelaConfirmed: false
    },
    {
      id: 'ev-2',
      kidId: 'mateo',
      title: 'Partido de Fútbol Sub-8 ⚽',
      category: 'sport',
      catLabel: 'Deporte',
      date: 'Sábado 20 Sept • 11:00 hrs',
      location: 'Complejo Deportivo San Miguel • Cancha 2',
      description: 'Mateo juega de arquero contra Deportivo La Cisterna.',
      attendees: ['Papá Carlos', 'Tío Andrés'],
      abuelaConfirmed: false
    },
    {
      id: 'ev-3',
      kidId: 'mateo',
      title: 'Control Pediátrico y Vacunación 🩺',
      category: 'health',
      catLabel: 'Salud',
      date: 'Martes 23 Sept • 16:30 hrs',
      location: 'Centro Médico San Miguel (Box 4)',
      description: 'Revisión semestral de peso, talla y control de amígdalas.',
      attendees: ['Mamá Claudia'],
      abuelaConfirmed: false
    }
  ],

  wishlist: [
    {
      id: 'wish-1',
      kidId: 'mateo',
      title: 'Set LEGO Jurassic World (T-Rex)',
      category: 'Cumpleaños (Octubre)',
      icon: '🦖',
      priceApprox: '$24.990 CLP',
      status: 'reserved',
      reservedBy: 'Abuelo Pedro 🎁',
      canClaim: false
    },
    {
      id: 'wish-2',
      kidId: 'mateo',
      title: 'Zapatillas Deportivas con Luces (Talla 31)',
      category: 'Necesidad / Calzado',
      icon: '👟',
      priceApprox: '$19.990 CLP',
      status: 'available',
      reservedBy: null,
      canClaim: true
    },
    {
      id: 'wish-3',
      kidId: 'mateo',
      title: 'Libro Ilustrado: "El Atlas del Espacio"',
      category: 'Curiosidad y Lectura',
      icon: '🪐',
      priceApprox: '$12.500 CLP',
      status: 'available',
      reservedBy: null,
      canClaim: true
    },
    {
      id: 'wish-4',
      kidId: 'mateo',
      title: 'Mochila Escolar Ergonómica con Ruedas',
      category: 'Necesidad Escolar',
      icon: '🎒',
      priceApprox: '$29.990 CLP',
      status: 'reserved',
      reservedBy: 'Mamá Claudia ✔️',
      canClaim: false
    }
  ]
};

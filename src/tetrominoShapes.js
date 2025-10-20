// Definiciones de todas las piezas de Tetris (Tetrominos) con sus rotaciones
// Cada pieza se define como una matriz 4x4 donde 1 representa parte de la pieza y 0 espacio vacío

export const TETROMINO_SHAPES = {
  I: {
    color: 'bg-cyan-400',
    glowColor: 'shadow-cyan-400/50',
    shapes: [
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
      ]
    ]
  },
  O: {
    color: 'bg-yellow-400',
    glowColor: 'shadow-yellow-400/50',
    shapes: [
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ]
    ]
  },
  T: {
    color: 'bg-purple-500',
    glowColor: 'shadow-purple-500/50',
    shapes: [
      [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0]
      ]
    ]
  },
  S: {
    color: 'bg-green-400',
    glowColor: 'shadow-green-400/50',
    shapes: [
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [1, 1, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0]
      ]
    ]
  },
  Z: {
    color: 'bg-red-500',
    glowColor: 'shadow-red-500/50',
    shapes: [
      [
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 1, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 0, 0, 0]
      ]
    ]
  },
  J: {
    color: 'bg-blue-500',
    glowColor: 'shadow-blue-500/50',
    shapes: [
      [
        [0, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 1, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 0]
      ]
    ]
  },
  L: {
    color: 'bg-orange-500',
    glowColor: 'shadow-orange-500/50',
    shapes: [
      [
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0]
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [1, 0, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
      ]
    ]
  }
};

// Array con todos los tipos de piezas para selección aleatoria
export const TETROMINO_TYPES = Object.keys(TETROMINO_SHAPES);

// Función para obtener una pieza aleatoria
export const getRandomTetromino = () => {
  const randomType = TETROMINO_TYPES[Math.floor(Math.random() * TETROMINO_TYPES.length)];
  return {
    type: randomType,
    shape: TETROMINO_SHAPES[randomType].shapes[0], // Empezamos con la primera rotación
    rotation: 0,
    color: TETROMINO_SHAPES[randomType].color,
    glowColor: TETROMINO_SHAPES[randomType].glowColor,
    x: 3, // Posición inicial en el centro del tablero
    y: 0
  };
};

// Función para rotar una pieza
export const rotateTetromino = (tetromino) => {
  const nextRotation = (tetromino.rotation + 1) % 4;
  return {
    ...tetromino,
    rotation: nextRotation,
    shape: TETROMINO_SHAPES[tetromino.type].shapes[nextRotation]
  };
};

// Constantes del juego
export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const INITIAL_DROP_TIME = 1000; // milisegundos
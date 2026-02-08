# 🐍 Snake Game

A fully functional Snake game built with **React**, **Vite**, and **TypeScript**, rendered on an **HTML5 Canvas**.

![Snake Game](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2+-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.2+-646CFF?style=flat&logo=vite&logoColor=white)

## 🎮 Features

- **Smooth Gameplay**: Continuous snake movement with responsive controls
- **Arrow Key Controls**: Use ⬆️ ⬇️ ⬅️ ➡️ to control the snake
- **Score Tracking**: Keep track of your current score and high score
- **High Score Persistence**: High score saved in localStorage
- **Collision Detection**: Game ends on wall or self-collision
- **Food System**: Random food spawning that doesn't overlap with snake
- **Game States**: Start screen, playing, and game over states
- **Responsive Design**: Clean, modern UI with dark theme
- **Visual Effects**: Glowing effects and smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed on your system
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MohamedAbouelwafa68/snake-game.git
cd snake-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Build for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## 🎯 How to Play

1. **Starting the Game**: 
   - Press any arrow key or click the "Start Game" button
   
2. **Controls**:
   - ⬆️ **Up Arrow**: Move up
   - ⬇️ **Down Arrow**: Move down
   - ⬅️ **Left Arrow**: Move left
   - ➡️ **Right Arrow**: Move right

3. **Objective**:
   - Eat the red food to grow and score points
   - Avoid hitting the walls or your own body
   - Try to beat your high score!

4. **Scoring**:
   - Each food eaten = 10 points
   - High score is automatically saved

## 📁 Project Structure

```
snake-game/
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── src/
│   ├── main.tsx            # Application entry point
│   ├── App.tsx             # Main App component
│   ├── App.css             # App styling
│   ├── index.css           # Global styles
│   ├── components/
│   │   └── GameBoard.tsx   # Canvas game board component
│   ├── hooks/
│   │   └── useSnakeGame.ts # Custom hook with game logic
│   └── types/
│       └── game.ts         # TypeScript types/interfaces
```

## 🛠️ Technologies Used

- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **HTML5 Canvas**: For rendering the game
- **CSS3**: Styling with modern features

## 🎨 Game Logic

The game logic is implemented in the `useSnakeGame` custom hook, which manages:

- Snake position and movement
- Food generation and collision
- Direction changes (with reverse prevention)
- Collision detection (walls and self)
- Score tracking and persistence
- Game state management
- Keyboard event handling
- Game loop with setInterval

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

## 👏 Acknowledgments

Built as a demonstration of React hooks, TypeScript, and Canvas API integration.

---

**Enjoy the game! 🐍**
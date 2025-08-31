// Initialize Kontra.js
let { canvas, context } = kontra.init('mainCanvas');
kontra.initKeys();

// Text to write out typewriter style
const message = 'QR Cat The Game';
let currentIndex = 0;
let timer = 0;

// Starting position for letters
let letterX = 50;
let letterY = 200;

// Cursor sprite that acts like typewriter head
let cursor = kontra.Sprite({
  x: 40,
  y: letterY - 20, // Align cursor with text baseline
  width: 3,
  height: 25,
  color: 'black',
  blinkTimer: 0,
  visible: true,
  
  update() {
    // Make cursor blink like old typewriters
    this.blinkTimer += 1;
    if (this.blinkTimer > 30) {
      this.visible = !this.visible;
      this.blinkTimer = 0;
    }
    
    // Calculate final cursor position (5 spaces after last letter)
    const finalPosition = letterX + (message.length + 5) * 25 - 2;
    
    // Move cursor to current letter position while typing
    if (currentIndex < message.length) {
      this.x = letterX + currentIndex * 25 - 2;
    } else {
      // After typing is done, move cursor 5 spaces after last letter
      this.x = finalPosition;
    }
  },
  
  render() {
    if (this.visible) {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
});

// Array to hold the typed letters
let letters = [];

// Game loop
let loop = kontra.GameLoop({
  update() {
    cursor.update();
    timer += 1;
    
    // Add a new letter every 45 frames (typewriter speed)
    if (timer > 45 && currentIndex < message.length) {
      // Create text sprite for each letter
      letters.push(kontra.Text({
        x: letterX + currentIndex * 25,
        y: letterY,
        text: message[currentIndex],
        font: '24px monospace',
        color: 'black'
      }));
      
      currentIndex++;
      timer = 0;
    }
  },
  
  render() {
    // Render all typed letters
    letters.forEach(letter => letter.render());
    
    // Render blinking cursor
    cursor.render();
  }
});

loop.start();

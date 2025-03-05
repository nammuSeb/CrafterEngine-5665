import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure temp directory exists
const tempDir = join(__dirname, 'temp');
try {
  await fs.mkdir(tempDir, { recursive: true });
} catch (err) {
  console.error('Failed to create temp directory:', err);
}

// Compile endpoint
app.post('/api/compile', async (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    return res.status(400).json({ 
      success: false, 
      output: 'No code provided' 
    });
  }

  try {
    // Save code to temporary file
    const tempFile = join(tempDir, 'main.rs');
    await fs.writeFile(tempFile, code);
    
    // Execute Bevy compilation
    exec('cargo build', { 
      cwd: tempDir 
    }, (error, stdout, stderr) => {
      if (error) {
        console.error('Compilation error:', error);
        res.json({ 
          success: false, 
          output: stderr || error.message 
        });
        return;
      }
      res.json({ 
        success: true, 
        output: stdout 
      });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// WebSocket setup
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      wss.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});
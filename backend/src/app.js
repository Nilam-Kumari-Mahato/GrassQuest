import express from 'express';
import cors from 'cors';
import questRoutes from './routes/questRoutes.js';

const app = express();
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: (origin, callback) => {
  if (!origin || origin === allowedOrigin || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return callback(null, true);
  return callback(new Error('Origin not allowed'));
} }));
app.use(express.json({ limit: '20kb' }));
app.get('/api/health', (_req, res) => res.json({ success: true, service: 'grassquest-api' }));
app.use('/api/quests', questRoutes);
app.use((err, _req, res, _next) => {
  if (err?.type === 'entity.parse.failed') return res.status(400).json({ success: false, error: 'Request body must be valid JSON.' });
  if (err?.type === 'entity.too.large') return res.status(413).json({ success: false, error: 'Request body is too large.' });
  if (err?.type === 'encoding.unsupported') return res.status(415).json({ success: false, error: 'Request encoding is not supported.' });
  if (err?.message === 'Origin not allowed') return res.status(403).json({ success: false, error: 'Request origin is not allowed.' });
  console.error('API error:', err?.message || err);
  return res.status(500).json({ success: false, error: 'The server could not process this request.' });
});

export default app;

import { createQuest } from '../services/questService.js';

export async function generateQuest(req, res) {
  try {
    const quest = await createQuest(req.body);
    return res.json({ success: true, quest });
  } catch (error) {
    const status = error.status || 502;
    return res.status(status).json({ success: false, error: error.publicMessage || 'Quest generation failed. Please try again.' });
  }
}

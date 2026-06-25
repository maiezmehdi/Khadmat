import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

const client = new Anthropic();

const SYSTEM_PROMPT = `Tu es un assistant de recherche pour Khadamat, une marketplace tunisienne de services à domicile.
Ta mission : identifier la catégorie de service correspondant à la requête de l'utilisateur (en français ou darija tunisien).

Catégories disponibles :
- plomberie : fuite, tuyau, robinet, évier, WC, chauffe-eau, canalisation, وقفة ماء, سباك
- electricite : panne électrique, prise, disjoncteur, câblage, lumière, كهربا, عطلة كهربا
- menage : nettoyage, ménage, femme de ménage, lavage, نضافة, صابون
- peinture : peindre, peinture, mur, plafond, صبغ, طلاء
- jardinage : jardin, gazon, taille, plantes, arbres, جردان, نباتات
- climatisation : clim, climatiseur, chauffage, chaud, فريد, كليماتيزور, سخانة
- demenagement : déménagement, transport, déplacer, مبيضة, نقل
- informatique : ordinateur, PC, virus, réseau, wifi, كمبيوتر, انترنت

Réponds UNIQUEMENT avec du JSON valide, sans texte autour :
{"category": "slug_ou_null", "confidence": "high|medium|low", "label_fr": "nom en français", "label_dr": "nom en darija"}

Si la requête ne correspond à aucune catégorie, mets category: null.`;

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ category: null, confidence: 'low' });
    }

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 128,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: query.trim() }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '{}';
    const result = JSON.parse(text);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ category: null, confidence: 'low' });
  }
}

// Controlled vocabulary for the AI to pick from.
// The AI selects from these lists — it does not invent heraldic terms.

const TINCTURES = {
  metals: {
    or: { name: 'Or', colour: '#FFD700', description: 'Gold' },
    argent: { name: 'Argent', colour: '#FFFFFF', description: 'Silver/White' }
  },
  colours: {
    gules: { name: 'Gules', colour: '#CE1126', description: 'Red' },
    azure: { name: 'Azure', colour: '#0032A0', description: 'Blue' },
    sable: { name: 'Sable', colour: '#1C1C1C', description: 'Black' },
    vert: { name: 'Vert', colour: '#008000', description: 'Green' },
    purpure: { name: 'Purpure', colour: '#7B2D8B', description: 'Purple' }
  }
};

const FIELD_DIVISIONS = {
  plain: { name: 'Plain', description: 'Single tincture, undivided' },
  per_pale: { name: 'Per Pale', description: 'Divided vertically, left and right' },
  per_fess: { name: 'Per Fess', description: 'Divided horizontally, top and bottom' },
  per_bend: { name: 'Per Bend', description: 'Divided diagonally, top-left to bottom-right' },
  per_bend_sinister: { name: 'Per Bend Sinister', description: 'Divided diagonally, top-right to bottom-left' },
  quarterly: { name: 'Quarterly', description: 'Divided into four quarters' },
  per_chevron: { name: 'Per Chevron', description: 'Divided by an inverted V' },
  gyronny: { name: 'Gyronny', description: 'Divided into eight triangular sections from the centre' }
};

const ORDINARIES = {
  fess: { name: 'Fess', description: 'Horizontal band across the middle' },
  pale: { name: 'Pale', description: 'Vertical band down the centre' },
  bend: { name: 'Bend', description: 'Diagonal band from top-left to bottom-right' },
  chevron: { name: 'Chevron', description: 'Inverted V shape' },
  cross: { name: 'Cross', description: 'Vertical and horizontal bands crossing at centre' },
  saltire: { name: 'Saltire', description: 'Diagonal cross (X shape)' },
  chief: { name: 'Chief', description: 'Horizontal band across the top' },
  bordure: { name: 'Bordure', description: 'Border around the edge of the shield' },
  pile: { name: 'Pile', description: 'Triangle pointing downward from the top' }
};

const CHARGES = {
  // Beasts
  lion_rampant: { name: 'Lion Rampant', description: 'Lion rearing up on hind legs', file: 'lion-rampant' },
  lion_passant: { name: 'Lion Passant', description: 'Lion walking, one paw raised', file: 'lion-passant' },
  bear: { name: 'Bear', description: 'Bear, typically rampant', file: 'bear' },
  bull: { name: 'Bull', description: 'Bull passant or statant', file: 'bull' },
  serpent: { name: 'Serpent', description: 'Snake or serpent, typically coiled', file: 'serpent' },
  // Birds
  eagle_displayed: { name: 'Eagle Displayed', description: 'Eagle with wings spread, facing viewer', file: 'eagle-displayed' },
  // Objects
  castle: { name: 'Castle', description: 'Three-towered castle or fortress', file: 'castle' },
  tower: { name: 'Tower', description: 'Single tower', file: 'tower' },
  sword: { name: 'Sword', description: 'Sword, typically upright', file: 'sword' },
  crown: { name: 'Crown', description: 'Royal or similar crown', file: 'crown' },
  key: { name: 'Key', description: 'Key, typically with bow at top', file: 'key' },
  hammer: { name: 'Hammer', description: 'Hammer, typically upright', file: 'hammer' },
  wheel: { name: 'Wheel', description: 'Cartwheel or similar', file: 'wheel' },
  anchor: { name: 'Anchor', description: 'Ship\'s anchor', file: 'anchor' },
  ship: { name: 'Ship', description: 'Sailing vessel', file: 'ship' },
  // Botanical
  fleur_de_lis: { name: 'Fleur-de-lis', description: 'Stylised lily', file: 'fleur-de-lis' },
  rose: { name: 'Rose', description: 'Heraldic rose, typically five-petalled', file: 'rose' },
  oak_tree: { name: 'Oak Tree', description: 'Oak tree, full or trunk', file: 'oak-tree' },
  // Celestial
  sun: { name: 'Sun in Splendour', description: 'Sun with face and rays', file: 'sun' },
  crescent: { name: 'Crescent', description: 'Crescent moon', file: 'crescent' },
  star: { name: 'Mullet', description: 'Five-pointed star', file: 'star' },
  // Abstract / other
  cross_charge: { name: 'Cross', description: 'Plain cross charge on the field', file: 'cross-charge' },
  hand: { name: 'Dexter Hand', description: 'Open hand, palm forward', file: 'hand' },
  flame: { name: 'Flame', description: 'Flame or fire', file: 'flame' }
};

const POSITIONS = {
  centre: 'centre',
  dexter: 'dexter',
  sinister: 'sinister',
  chief: 'chief',
  base: 'base',
  dexter_chief: 'dexter_chief',
  sinister_chief: 'sinister_chief',
  dexter_base: 'dexter_base',
  sinister_base: 'sinister_base'
};

module.exports = { TINCTURES, FIELD_DIVISIONS, ORDINARIES, CHARGES, POSITIONS };

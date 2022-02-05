import * as Keys from './keys';

interface LayoutCell {
  key: any;
  style: string;
  icon?: string | null;
  rowspan?: number | null;
  colspan?: number | null;
}

const DartsLayout: LayoutCell[][] = [
  [
    { key: Keys.ONE, style: 'number' },
    { key: Keys.TWO, style: 'number' },
    { key: Keys.THREE, style: 'number' },
    { key: Keys.DEL, icon: 'bi bi-backspace', rowspan: 2, style: 'action' },
  ],
  [
    { key: Keys.FOUR, style: 'number' },
    { key: Keys.FIVE, style: 'number' },
    { key: Keys.SIX, style: 'number' },
  ],
  [
    { key: Keys.SEVEN, style: 'number' },
    { key: Keys.EIGHT, style: 'number' },
    { key: Keys.NINE, style: 'number' },
    {
      key: Keys.ENTER,
      icon: 'bi bi-check-square',
      rowspan: 2,
      style: 'action',
    },
  ],
  [
    { key: Keys.X, icon: 'bi bi-emoji-dizzy', style: 'action' },
    { key: Keys.ZERO, style: 'number' },
    { key: Keys.MENU, icon: 'bi bi-list', style: 'action' },
  ],
  [
    { key: Keys.LEFT, icon: 'bi bi-arrow-left', style: 'action', colspan: 2 },
    { key: Keys.RIGHT, icon: 'bi bi-arrow-right', style: 'action', colspan: 2 },
  ],
];

export default {
  darts: DartsLayout,
};


# SpendIQ – Design System

## 1. Design Direction
- Product: SpendIQ Subscription Management Dashboard
- Style: Premium dark dashboard
- Visual reference: Uploaded SpendIQ screenshot
- Main theme: Dark navy with electric blue accents
- Page background: Light neutral grey
- Overall appearance: Modern, minimal, polished, financial SaaS

## 2. Color System

### Brand Colors
| Token | Hex | Usage |
|---|---|---|
| Primary | #2563EB | Primary buttons, charts, links |
| Primary Hover | #1D4ED8 | Hover states |
| Primary Light | #3B82F6 | Active elements |
| Secondary | #7655E9 | Purple accents |
| Accent | #60A5FA | Highlights |
| Accent Purple | #8B5CF6 | Gradients |

### Background Colors
| Token | Hex | Usage |
|---|---|---|
| Page Background | #E7E7E8 | Main page |
| Card Background | #171722 | Main cards |
| Card Elevated | #1D1D2B | Elevated panels |
| Input Background | #10101B | Inputs |
| Surface Hover | #252536 | Hover surfaces |
| Darkest | #10101B | Dark elements |

### Text Colors
| Token | Hex | Usage |
|---|---|---|
| Primary Text | #FFFFFF | Main headings |
| Secondary Text | #C4C4CE | Supporting text |
| Muted Text | #9292A3 | Labels and captions |
| Disabled Text | #666675 | Disabled content |

### Semantic Colors
| Token | Hex | Usage |
|---|---|---|
| Success | #22C55E | Active, paid, income |
| Success Background | #10291E | Success badges |
| Warning | #FBBF24 | Unpaid, pending |
| Warning Background | #302714 | Warning badges |
| Error | #F87171 | Failed payments, expenses |
| Error Background | #30191D | Error badges |
| Info | #38BDF8 | Informational states |
| Info Background | #102738 | Info badges |

## 3. Gradients

### Brand Gradient
linear-gradient(120deg, #111827 0%, #293C80 45%, #7655E9 70%, #F2A77F 100%)

### Blue Gradient
linear-gradient(180deg, #2563EB 0%, #1D4ED8 70%, #A5C7FF 100%)

### Promotional Gradient
linear-gradient(115deg, #171722 10%, #292C53 48%, #D58F83 100%)

## 4. Typography

Font family: Inter, sans-serif

| Element | Size | Weight |
|---|---:|---:|
| Main Amount | 46px | 600 |
| Page Heading | 24px | 600 |
| Card Heading | 16px | 500 |
| Body | 14px | 400 |
| Table Text | 14px | 400 |
| Labels | 12px | 400 |
| Small Captions | 12px | 400 |

## 5. Layout

- Reference screenshot: 1379 × 1057px
- Main content horizontal padding: 35px
- Main content vertical padding: 23px
- Main grid gap: 17px
- Card border radius: 17px
- Small element radius: 10px
- Button radius: 22px
- Card padding: 22px

### Dashboard Structure

1. Top section:
   - Promotional subscription card
   - Monthly recurring spend card
   - Payment alert

2. Middle section:
   - Annual spending history chart
   - Transaction history panel

3. Bottom section:
   - Subscription list table
   - Information panel
   - Brand promotional card

## 6. Component Rules

### Cards
- Background: #171722
- Border: 1px solid rgba(255,255,255,0.04)
- Radius: 17px
- No excessive shadows

### Primary Buttons
- Background: #FFFFFF
- Text: #10101B
- Font weight: 600
- Border radius: 22px

### Secondary Buttons
- Background: #252536
- Text: #FFFFFF
- Border radius: 20px

### Status Badges
- Active: Green
- Unpaid: Amber
- Failed: Red
- Informational: Blue

### Tables
- Transparent background
- White primary text
- Muted column headers
- No heavy borders
- Subtle row separation

### Charts
- Rounded bar segments
- Electric blue active bars
- Deep blue inactive bars
- Blue gradient for selected month
- Dark tooltip background

## 7. Design Consistency

- Do not introduce additional brand colors.
- Do not use pure black for dashboard cards.
- Do not replace the light grey outer background.
- Maintain consistent spacing and corner radii.
- Use semantic colors only for their intended states.
- Use gradients sparingly.
- Keep all dashboard cards dark navy.
- Avoid unnecessary borders and shadows.

## 8. Responsive Behavior

Desktop:
- Preserve the three-section dashboard composition.
- Use two-column and three-column grid layouts.

Tablet:
- Reduce grid columns.
- Keep chart and transaction panels readable.

Mobile:
- Stack cards vertically.
- Make tables horizontally scrollable.
- Preserve typography hierarchy.
- Keep buttons accessible.

## 9. Accuracy Requirement

The supplied screenshot is the visual reference.

Any implementation must prioritize:
1. Color accuracy
2. Layout proportions
3. Typography
4. Spacing
5. Component dimensions
6. Gradients
7. Icons and decorative details

Do not independently redesign the interface.

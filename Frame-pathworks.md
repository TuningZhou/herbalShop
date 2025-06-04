src/
├── App.tsx
├── main.tsx
├── assets/
│   ├── icons/
│   │   ├── Cart.svg
│   │   ├── Order-Info.svg
│   │   ├── Referral-icon.svg
│   │   ├── Setting.svg
│   │   ├── Shop.svg
│   │   ├── Telegram-icon.svg
│   │   ├── Terms-of-use.svg
│   │   ├── Ton.svg
│   │   ├── YourInfo.svg
│   │   └── payment/
│   │       ├── ApplePay.svg
│   │       ├── CryptoPay.svg
│   │       └── GooglePay.svg
│   └── images/
│       ├── 01 Nature's Touch Naturally Yours - Banner.png
│       ├── 01-02-0001-Chamomile-Tea.png
│       ├── 01-02-0002-Peppermint-Tea.png
│       ├── 01-02-0003-Goji-Berry-Chrysanthemum-Tea.png
│       ├── 01-02-0004-Ginseng-Oolong-Tea.png
│       ├── 02 Herbal Harmony for Your Life - Banner.png
│       ├── 03 Pure Herbs, Pure Wellnesss - Banner.png
│       ├── 04 From Earth to You, Naturally - Banner.png
│       ├── avatars/
│       │   ├── Alex.png
│       │   ├── Alex@2x.png
│       │   ├── Alex@3x.png
│       │   ├── Sophia.png
│       │   ├── Sophia@2x.png
│       │   ├── Sophia@3x.png
│       │   ├── avatar.png
│       │   ├── avatar@2x.png
│       │   └── avatar@3x.png
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── herbs-collection.png
│       └── logo.png
├── components/
│   ├── layout/
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── Layout.tsx
│   ├── transitions/
│   │   └── PageTransition.tsx
│   └── ui/
│       ├── ChatButton.tsx
│       ├── CustomMainButton.tsx
│       ├── LoadingSpinner.tsx
│       ├── OrderCard.tsx
│       ├── OrderSummary.tsx
│       ├── PaymentMethods.tsx
│       ├── ProductCard.tsx
│       ├── ProductDetailCard.tsx
│       └── ReviewCard.tsx
├── config/
│   └── env.ts
├── context/
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   └── UserContext.tsx
├── pages/
│   ├── LandingPage01.tsx
│   ├── LandingPage02.tsx
│   ├── LandingPageFinal.tsx
│   ├── cart/
│   │   └── Checkout.tsx
│   ├── shop/
│   │   ├── ProductDetail.tsx
│   │   └── ProductHome.tsx
│   └── user/
│       ├── Profile.tsx
│       └── Settings.tsx
├── services/
│   ├── api/
│   │   ├── cartApi.ts
│   │   └── productApi.ts
│   └── telegramsdk/
│       ├── TelegramBackButton.ts
│       └── TelegramMainButton.ts
├── styles/
│   ├── button-transitions.css
│   ├── cart-item.css
│   ├── landing-pages.css
│   ├── product-card.css
│   ├── telegram-button.css
│   └── telegram-theme.css
└── types/
    ├── Order.ts
    ├── Product.ts
    ├── global.d.ts
    └── svg.d.ts
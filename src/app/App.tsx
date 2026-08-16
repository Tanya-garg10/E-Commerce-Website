import { useState } from "react";
import {
  ShoppingBag, Heart, Search, Menu, X,
  Star, ChevronDown, Plus, Minus, ArrowRight,
} from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";

// ─── Types ────────────────────────────────────────────────────────────────────

type Page = "home" | "shop" | "product" | "cart";

interface Product {
  id: number;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  bestseller: boolean;
  size: string;
  rating: number;
  reviews: number;
  img: string;
  description: string;
  benefits: string[];
  ingredients: string[];
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  img: string;
  size: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Hydra Glow Serum",
    subtitle: "Hyaluronic Acid",
    category: "serums",
    price: 699,
    bestseller: true,
    size: "30 ml",
    rating: 4.8,
    reviews: 126,
    img: "1679394270597-e90694d70350",
    description:
      "A lightweight hydrating serum designed to support soft, healthy and glowing skin.",
    benefits: ["Deep Hydration", "Barrier Support", "Lightweight Formula", "Suitable for Daily Use"],
    ingredients: ["Hyaluronic Acid", "Niacinamide", "Aloe Vera", "Vitamin E"],
  },
  {
    id: 2,
    name: "Daily Barrier Cream",
    subtitle: "Ceramides + Squalane",
    category: "moisturizers",
    price: 599,
    bestseller: true,
    size: "50 ml",
    rating: 4.7,
    reviews: 98,
    img: "1623143445418-40c192fa3d11",
    description:
      "Rich yet non-greasy moisturizer that strengthens your skin barrier for all-day comfort.",
    benefits: ["Barrier Repair", "24hr Moisture", "Non-Comedogenic", "All Skin Types"],
    ingredients: ["Ceramide NP", "Squalane", "Shea Butter", "Panthenol"],
  },
  {
    id: 3,
    name: "Gentle Cloud Cleanser",
    subtitle: "Aloe + Oat",
    category: "cleansers",
    price: 449,
    bestseller: true,
    size: "150 ml",
    rating: 4.9,
    reviews: 214,
    img: "1633171036157-78d53387fdc0",
    description:
      "A gentle foaming cleanser that removes impurities while preserving your natural moisture.",
    benefits: ["Gentle Cleansing", "Soothes Redness", "pH Balanced", "No Sulfates"],
    ingredients: ["Oat Extract", "Aloe Vera", "Glycerin", "Chamomile"],
  },
  {
    id: 4,
    name: "Sun Veil SPF 50",
    subtitle: "Lightweight Sunscreen",
    category: "sunscreen",
    price: 749,
    bestseller: true,
    size: "40 ml",
    rating: 4.6,
    reviews: 77,
    img: "1715750968540-841103c78d47",
    description: "A featherlight sunscreen that melts into skin with zero white cast.",
    benefits: ["SPF 50 PA++++", "No White Cast", "Hydrating", "Reapply Friendly"],
    ingredients: ["Zinc Oxide", "Titanium Dioxide", "Niacinamide", "Hyaluronic Acid"],
  },
  {
    id: 5,
    name: "Glow Toner",
    subtitle: "Niacinamide + Rose",
    category: "serums",
    price: 549,
    bestseller: false,
    size: "150 ml",
    rating: 4.5,
    reviews: 63,
    img: "1741896135512-084b251887f7",
    description:
      "A brightening toner that preps skin for your serums while evening skin tone.",
    benefits: ["Brightening", "Pore Minimizing", "Hydrating Mist", "Alcohol Free"],
    ingredients: ["Niacinamide 5%", "Rose Water", "Witch Hazel", "Aloe"],
  },
  {
    id: 6,
    name: "Radiance Mask",
    subtitle: "Kaolin + Papaya Enzyme",
    category: "moisturizers",
    price: 649,
    bestseller: false,
    size: "75 ml",
    rating: 4.4,
    reviews: 41,
    img: "1670201203208-055d6d79db4a",
    description:
      "A weekly treatment mask that gently resurfaces and brightens dull skin.",
    benefits: ["Exfoliating", "Brightening", "Pore Cleansing", "Glow Boosting"],
    ingredients: ["Kaolin Clay", "Papaya Enzyme", "Turmeric", "Vitamin C"],
  },
  {
    id: 7,
    name: "Eye Revival Gel",
    subtitle: "Caffeine + Peptides",
    category: "serums",
    price: 799,
    bestseller: false,
    size: "15 ml",
    rating: 4.7,
    reviews: 52,
    img: "1715750968540-841103c78d47",
    description:
      "Targets puffiness, dark circles, and fine lines for brighter, younger-looking eyes.",
    benefits: ["De-Puffing", "Dark Circle Reduction", "Firming", "Cooling Gel"],
    ingredients: ["Caffeine", "Argireline", "Vitamin K", "Cucumber Extract"],
  },
  {
    id: 8,
    name: "Pore Refine Serum",
    subtitle: "Salicylic Acid + BHA",
    category: "cleansers",
    price: 699,
    bestseller: false,
    size: "30 ml",
    rating: 4.5,
    reviews: 88,
    img: "1623143445418-40c192fa3d11",
    description: "A targeted BHA serum that unclogs pores and controls excess oil.",
    benefits: ["Pore Minimizing", "Oil Control", "Acne-Prone Friendly", "Exfoliating"],
    ingredients: ["Salicylic Acid 2%", "Niacinamide", "Tea Tree", "Zinc PCA"],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function img(id: string, w: number, h: number) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;
}

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={11}
          className={
            i <= Math.round(rating)
              ? "fill-foreground text-foreground"
              : "fill-border text-border"
          }
        />
      ))}
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({
  product,
  onView,
  onAddToCart,
}: {
  product: Product;
  onView: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}) {
  return (
    <div className="group cursor-pointer" onClick={() => onView(product)}>
      <div className="relative overflow-hidden bg-muted aspect-[3/4] mb-4">
        <img
          src={img(product.img, 600, 800)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {product.bestseller && (
          <span className="absolute top-3 left-3 bg-foreground text-background text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 font-medium">
            Bestseller
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-0 left-0 right-0 bg-foreground text-background text-[11px] tracking-[0.18em] uppercase py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-medium"
        >
          Add to Bag
        </button>
      </div>
      <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase mb-1">
        {product.subtitle}
      </p>
      <h3 className="font-display text-[15px] font-semibold text-foreground mb-1 leading-snug">
        {product.name}
      </h3>
      <p className="text-sm text-foreground font-medium">₹{product.price}</p>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({
  setPage,
  cartCount,
  mobileMenu,
  setMobileMenu,
}: {
  setPage: (p: Page) => void;
  cartCount: number;
  mobileMenu: boolean;
  setMobileMenu: (v: boolean) => void;
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setPage("home")}
          className="font-display text-lg tracking-[0.25em] font-semibold text-foreground uppercase"
        >
          Noura
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Shop", page: "shop" as Page },
            { label: "Best Sellers", page: "home" as Page },
            { label: "About", page: "home" as Page },
            { label: "Journal", page: "home" as Page },
          ].map(({ label, page }) => (
            <button
              key={label}
              onClick={() => setPage(page)}
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex text-foreground/50 hover:text-foreground transition-colors">
            <Search size={17} />
          </button>
          <button className="text-foreground/50 hover:text-foreground transition-colors">
            <Heart size={17} />
          </button>
          <button
            onClick={() => setPage("cart")}
            className="relative text-foreground/50 hover:text-foreground transition-colors"
          >
            <ShoppingBag size={17} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-[17px] h-[17px] rounded-full bg-foreground text-background text-[9px] flex items-center justify-center font-semibold">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="md:hidden text-foreground/50 hover:text-foreground transition-colors"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenu && (
        <div className="md:hidden bg-background border-t border-border px-6 py-8 flex flex-col gap-6">
          {["Shop", "Best Sellers", "About", "Journal"].map((label) => (
            <button
              key={label}
              onClick={() => {
                if (label === "Shop") setPage("shop");
                setMobileMenu(false);
              }}
              className="text-left font-display text-2xl text-foreground"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

function HomePage({
  setPage,
  setSelectedProduct,
  onAddToCart,
}: {
  setPage: (p: Page) => void;
  setSelectedProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}) {
  const bestSellers = PRODUCTS.filter((p) => p.bestseller);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="pt-[60px] min-h-screen grid md:grid-cols-2">
        <div className="flex flex-col justify-center px-8 md:px-14 lg:px-20 py-20 order-2 md:order-1">
          <span className="text-[10px] tracking-[0.35em] uppercase text-accent font-semibold mb-8 inline-block">
            Clean · Gentle · Everyday
          </span>
          <h1 className="font-display text-[clamp(3rem,6vw,5.5rem)] font-semibold text-foreground leading-[1.02] mb-7">
            Everyday<br />
            Skincare,<br />
            Simplified
          </h1>
          <p className="text-muted-foreground text-[17px] leading-relaxed mb-10 max-w-sm">
            Thoughtfully formulated skincare for healthy, confident skin.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setPage("shop")}
              className="bg-foreground text-background px-7 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-foreground/80 transition-colors flex items-center gap-2"
            >
              Shop Best Sellers <ArrowRight size={13} />
            </button>
            <button
              onClick={() => setPage("shop")}
              className="border border-foreground px-7 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-foreground/5 transition-colors"
            >
              Explore Collection
            </button>
          </div>
        </div>

        <div className="relative bg-secondary/30 overflow-hidden min-h-[55vw] md:min-h-0 order-1 md:order-2">
          <img
            src={img("1581182800629-7d90925ad072", 960, 1100)}
            alt="Woman with healthy, glowing skin"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent" />
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section className="border-y border-border bg-muted/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-center md:justify-between items-center gap-5">
          {["Vegan", "Cruelty Free", "Clean Formula", "Dermatologically Tested"].map((item) => (
            <div key={item} className="flex items-center gap-2.5 text-[12px] text-muted-foreground tracking-widest uppercase">
              <div className="w-1 h-1 rounded-full bg-accent" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ── Best Sellers ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-semibold block mb-4">
              Best Sellers
            </span>
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-semibold text-foreground leading-tight">
              {"Your Skin's"}<br />New Essentials
            </h2>
          </div>
          <button
            onClick={() => setPage("shop")}
            className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 self-start md:self-end"
          >
            View All <ArrowRight size={11} />
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {bestSellers.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onView={(product) => {
                setSelectedProduct(product);
                setPage("product");
              }}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>

      {/* ── Build Your Routine ── */}
      <section className="bg-foreground text-background py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[10px] tracking-[0.35em] uppercase text-accent font-semibold block mb-5">
                The NOURA Method
              </span>
              <h2 className="font-display text-[clamp(2.5rem,4vw,4rem)] font-semibold mb-6 leading-tight">
                Build Your<br />Routine
              </h2>
              <p className="text-background/50 leading-relaxed mb-10 max-w-xs text-[15px]">
                Four simple steps. Real results. A routine that works for your skin,
                morning and night.
              </p>
              <button
                onClick={() => setPage("shop")}
                className="bg-background text-foreground px-7 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-secondary transition-colors flex items-center gap-2 w-fit"
              >
                Build My Routine <ArrowRight size={13} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { step: "01", label: "Cleanse", desc: "Start fresh. Remove impurities without stripping your skin." },
                { step: "02", label: "Treat", desc: "Target your concerns with active serums." },
                { step: "03", label: "Moisturize", desc: "Lock in hydration and support your barrier." },
                { step: "04", label: "Protect", desc: "SPF every single morning, no exceptions." },
              ].map(({ step, label, desc }) => (
                <div
                  key={step}
                  className="border border-background/15 p-6 hover:border-accent/60 transition-colors"
                >
                  <span className="text-accent text-[10px] tracking-[0.25em] uppercase font-semibold block mb-3">
                    {step}
                  </span>
                  <h3 className="font-display text-[1.25rem] font-semibold text-background mb-2">
                    {label}
                  </h3>
                  <p className="text-background/45 text-[13px] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand Story ── */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative bg-secondary/20 overflow-hidden aspect-[4/5]">
          <img
            src={img("1581182815808-b6eb627a8798", 800, 1000)}
            alt="Natural skincare philosophy"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <span className="text-[10px] tracking-[0.35em] uppercase text-accent font-semibold block mb-5">
            Our Story
          </span>
          <h2 className="font-display text-[clamp(2.2rem,3.5vw,3.5rem)] font-semibold text-foreground mb-6 leading-tight">
            Simple Skincare.<br />Real Confidence.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-5 text-[15px]">
            NOURA was born from a belief that skincare should be simple, honest, and
            effective. We strip away the unnecessary so what remains truly works.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-10 text-[15px]">
            Every formula is backed by dermatologists and tested for real results —
            not just claims. Because your skin deserves honesty.
          </p>
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
            {[
              ["12+", "Active Ingredients"],
              ["0", "Harmful Chemicals"],
              ["100%", "Dermatologist Tested"],
            ].map(([val, label]) => (
              <div key={label}>
                <p className="font-display text-[2rem] font-semibold text-foreground mb-1">
                  {val}
                </p>
                <p className="text-[11px] text-muted-foreground leading-snug tracking-wide">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer setPage={setPage} />
    </main>
  );
}

// ─── Shop Page ────────────────────────────────────────────────────────────────

function ShopPage({
  setPage,
  setSelectedProduct,
  onAddToCart,
  activeFilter,
  setActiveFilter,
}: {
  setPage: (p: Page) => void;
  setSelectedProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  activeFilter: string;
  setActiveFilter: (f: string) => void;
}) {
  const categories = ["all", "cleansers", "serums", "moisturizers", "sunscreen"];
  const filtered =
    activeFilter === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeFilter);

  return (
    <main className="pt-[60px] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-14">
          <span className="text-[10px] tracking-[0.35em] uppercase text-accent font-semibold block mb-4">
            Collection
          </span>
          <h1 className="font-display text-[clamp(3rem,5vw,4.5rem)] font-semibold text-foreground mb-3">
            Shop All
          </h1>
          <p className="text-muted-foreground text-[15px]">
            Discover simple formulas designed for your everyday routine.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-border">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-[10px] tracking-[0.2em] uppercase transition-colors ${
                  activeFilter === cat
                    ? "bg-foreground text-background"
                    : "border border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
            <span>Sort by: Featured</span>
            <ChevronDown size={13} />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onView={(product) => {
                setSelectedProduct(product);
                setPage("product");
              }}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
      <Footer setPage={setPage} />
    </main>
  );
}

// ─── Product Page ─────────────────────────────────────────────────────────────

function ProductPage({
  product,
  onAddToCart,
  setPage,
}: {
  product: Product;
  onAddToCart: (p: Product) => void;
  setPage: (p: Page) => void;
}) {
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  const images = [
    product.img,
    "1679394270597-e90694d70350",
    "1715750968540-841103c78d47",
  ];

  function handleAdd() {
    for (let i = 0; i < qty; i++) onAddToCart(product);
    setPage("cart");
  }

  return (
    <main className="pt-[60px] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] text-muted-foreground mb-10 tracking-wide">
          <button onClick={() => setPage("home")} className="hover:text-foreground transition-colors">
            Home
          </button>
          <span>/</span>
          <button onClick={() => setPage("shop")} className="hover:text-foreground transition-colors">
            Shop
          </button>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image gallery */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-2.5 w-[60px]">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square overflow-hidden bg-muted border-[1.5px] transition-colors ${
                    activeImg === i ? "border-foreground" : "border-transparent"
                  }`}
                >
                  <img
                    src={`https://images.unsplash.com/photo-${src}?w=120&h=120&fit=crop&auto=format`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="flex-1 bg-muted overflow-hidden aspect-[3/4]">
              <img
                src={`https://images.unsplash.com/photo-${images[activeImg]}?w=700&h=900&fit=crop&auto=format`}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>
          </div>

          {/* Details */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-accent font-semibold mb-3">
              {product.category}
            </p>
            <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-foreground mb-4 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mb-5">
              <Stars rating={product.rating} />
              <span className="text-[12px] text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            <div className="flex items-baseline gap-3 mb-2">
              <p className="font-display text-[2rem] font-semibold text-foreground">
                ₹{product.price}
              </p>
            </div>
            <p className="text-[12px] text-muted-foreground mb-6 tracking-wide">
              {product.size}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 text-[15px]">
              {product.description}
            </p>

            {/* Qty */}
            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Minus size={13} />
                </button>
                <span className="w-12 text-center text-sm font-medium">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Plus size={13} />
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="w-full bg-foreground text-background py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-foreground/80 transition-colors mb-3"
            >
              Add to Bag
            </button>
            <button
              onClick={() => setWished(!wished)}
              className="w-full border border-border py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2"
            >
              <Heart size={13} className={wished ? "fill-foreground" : ""} />
              {wished ? "Saved to Wishlist" : "Add to Wishlist"}
            </button>

            {/* Benefits */}
            <div className="mt-10 pt-6 border-t border-border">
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-5 font-medium">
                Product Benefits
              </p>
              <div className="grid grid-cols-2 gap-3">
                {product.benefits.map((b) => (
                  <div key={b} className="flex items-center gap-2.5 text-[13px] text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-5 font-medium">
                Key Ingredients
              </p>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="bg-secondary/50 text-foreground text-[11px] px-3 py-1.5 tracking-wide"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Accordion */}
            <Accordion.Root type="single" collapsible className="mt-6 border-t border-border">
              {[
                {
                  title: "Description",
                  content: `${product.description} Formulated without parabens, sulfates, or artificial fragrances. Suitable for all skin types.`,
                },
                {
                  title: "How to Use",
                  content:
                    "Apply 2–3 drops to cleansed skin morning and night. Gently press into skin until fully absorbed. Follow with moisturizer and SPF (AM).",
                },
                {
                  title: "Full Ingredients",
                  content: `${product.ingredients.join(", ")}, Aqua, Glycerin, Propanediol, Carbomer, Phenoxyethanol. Full INCI list on outer packaging.`,
                },
                {
                  title: "Shipping & Returns",
                  content:
                    "Free shipping on orders above ₹999. Standard delivery 3–5 business days. Easy 30-day returns on unopened products in original packaging.",
                },
              ].map(({ title, content }) => (
                <Accordion.Item
                  key={title}
                  value={title}
                  className="border-b border-border"
                >
                  <Accordion.Trigger className="group flex items-center justify-between w-full py-4 text-[13px] tracking-wide font-medium text-foreground hover:text-muted-foreground transition-colors">
                    {title}
                    <ChevronDown
                      size={13}
                      className="text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
                    />
                  </Accordion.Trigger>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-none text-[13px] text-muted-foreground leading-relaxed pb-5">
                    {content}
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </div>
      </div>
      <Footer setPage={setPage} />
    </main>
  );
}

// ─── Cart Page ────────────────────────────────────────────────────────────────

function CartPage({
  cart,
  setCart,
  setPage,
  setSelectedProduct,
}: {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setPage: (p: Page) => void;
  setSelectedProduct: (p: Product) => void;
}) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  function updateQty(id: number, qty: number) {
    if (qty <= 0) setCart((c) => c.filter((i) => i.id !== id));
    else setCart((c) => c.map((i) => (i.id === id ? { ...i, qty } : i)));
  }

  const recs = PRODUCTS.filter((p) => !cart.find((c) => c.id === p.id)).slice(0, 2);

  if (cart.length === 0) {
    return (
      <main className="pt-[60px] min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-4xl font-semibold text-foreground mb-4">
          Your bag is empty
        </p>
        <p className="text-muted-foreground mb-10 text-[15px]">
          Add some products to get started.
        </p>
        <button
          onClick={() => setPage("shop")}
          className="bg-foreground text-background px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-foreground/80 transition-colors"
        >
          Shop Now
        </button>
      </main>
    );
  }

  return (
    <main className="pt-[60px] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <h1 className="font-display text-[clamp(2.5rem,4vw,3.5rem)] font-semibold text-foreground mb-14">
          Your Bag
        </h1>

        <div className="grid lg:grid-cols-3 gap-14">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-5 pb-7 border-b border-border">
                <div className="w-24 h-32 bg-muted flex-shrink-0 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${item.img}?w=200&h=260&fit=crop&auto=format`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4 mb-1">
                    <h3 className="font-display text-[17px] font-semibold text-foreground leading-snug">
                      {item.name}
                    </h3>
                    <p className="font-medium text-foreground whitespace-nowrap">
                      ₹{item.price * item.qty}
                    </p>
                  </div>
                  <p className="text-[11px] text-muted-foreground tracking-wide mb-5">
                    {item.size}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="w-10 text-center text-[13px] font-medium">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                    <button
                      onClick={() => updateQty(item.id, 0)}
                      className="text-[11px] text-muted-foreground hover:text-foreground transition-colors tracking-wide"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="bg-muted/50 border border-border p-7 sticky top-24">
              <p className="text-[10px] tracking-[0.3em] uppercase font-medium text-muted-foreground mb-7">
                Order Summary
              </p>
              <div className="space-y-3 mb-7">
                <div className="flex justify-between text-[13px]">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-accent font-medium">FREE</span>
                </div>
              </div>
              <div className="border-t border-border pt-5 mb-7 flex justify-between items-baseline">
                <span className="text-[13px] font-medium text-foreground">Total</span>
                <span className="font-display text-[1.6rem] font-semibold text-foreground">
                  ₹{subtotal}
                </span>
              </div>
              <button className="w-full bg-foreground text-background py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-foreground/80 transition-colors flex items-center justify-center gap-2">
                Checkout <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {recs.length > 0 && (
          <div className="mt-24">
            <h2 className="font-display text-[1.8rem] font-semibold text-foreground mb-10">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {recs.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onView={(product) => {
                    setSelectedProduct(product);
                    setPage("product");
                  }}
                  onAddToCart={(product) => {
                    setCart((c) => {
                      const exists = c.find((i) => i.id === product.id);
                      if (exists)
                        return c.map((i) =>
                          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
                        );
                      return [
                        ...c,
                        {
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          qty: 1,
                          img: product.img,
                          size: product.size,
                        },
                      ];
                    });
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer setPage={setPage} />
    </main>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <p className="font-display text-xl tracking-[0.25em] uppercase font-semibold mb-4">
            Noura
          </p>
          <p className="text-background/45 text-[13px] leading-relaxed">
            Simple skincare.<br />Real confidence.
          </p>
        </div>
        {[
          {
            title: "Shop",
            links: ["All Products", "Best Sellers", "Cleansers", "Serums", "Moisturizers", "Sunscreen"],
          },
          {
            title: "Company",
            links: ["About Us", "Journal", "Sustainability", "Press"],
          },
          {
            title: "Help",
            links: ["FAQ", "Shipping & Returns", "Contact Us", "Store Locator"],
          },
        ].map(({ title, links }) => (
          <div key={title}>
            <p className="text-[10px] tracking-[0.3em] uppercase font-medium text-background/35 mb-5">
              {title}
            </p>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      if (link === "All Products" || link === "Best Sellers") setPage("shop");
                    }}
                    className="text-[13px] text-background/55 hover:text-background transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-background/10 max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-[11px] text-background/25">© 2024 NOURA. All rights reserved.</p>
        <p className="text-[11px] text-background/25 tracking-wide">
          Clean Beauty · Made with care
        </p>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [mobileMenu, setMobileMenu] = useState(false);

  function addToCart(product: Product) {
    setCart((c) => {
      const exists = c.find((i) => i.id === product.id);
      if (exists) return c.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [
        ...c,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          qty: 1,
          img: product.img,
          size: product.size,
        },
      ];
    });
  }

  function navigate(p: Page) {
    setPage(p);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar
        setPage={navigate}
        cartCount={cartCount}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
      />

      {page === "home" && (
        <HomePage
          setPage={navigate}
          setSelectedProduct={setSelectedProduct}
          onAddToCart={addToCart}
        />
      )}
      {page === "shop" && (
        <ShopPage
          setPage={navigate}
          setSelectedProduct={setSelectedProduct}
          onAddToCart={addToCart}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      )}
      {page === "product" && (
        <ProductPage
          product={selectedProduct}
          onAddToCart={addToCart}
          setPage={navigate}
        />
      )}
      {page === "cart" && (
        <CartPage
          cart={cart}
          setCart={setCart}
          setPage={navigate}
          setSelectedProduct={setSelectedProduct}
        />
      )}
    </div>
  );
}

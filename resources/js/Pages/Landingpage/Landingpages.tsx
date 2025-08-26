import React, { useEffect, useState } from "react";

const carouselData = [
  {
    img: "/img/au.webp",
    caption: "Membangun Akhlak, Menguasai Teknologi dan Menebar Manfaat",
  },
  {
    img: "/img/au2.webp",
    caption: "Lingkungan Nyaman untuk Belajar dan Berkarya",
  },
  {
    img: "/img/sad.webp",
    caption: "Mencetak Generasi Islami Berbasis Teknologi",
  },
];

const founders = [
  {
    name: "Alm. Drs. H. Ahmad Irfan, M.Pd",
    title: "Pendiri Pondok Pesantren",
    img: "/img/founder1.jpg",
  },
  {
    name: "Dra. Hj. Jauharoh Said, M.Pd.I",
    title: "Pendiri Pondok Pesantren",
    img: "/img/founder2.jpg",
  },
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection('right');
      setCurrent((prev) => (prev + 1) % carouselData.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setDirection('left');
    setCurrent((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const goToNext = () => {
    setDirection('right');
    setCurrent((prev) => (prev + 1) % carouselData.length);
  };

  return (
    <div className="relative w-full h-[520px] md:h-[700px] overflow-hidden rounded-b-2xl">
      {carouselData.map((item, idx) => (
        <img
          key={item.img}
          src={item.img}
          alt={`slide-${idx}`}
          className={`absolute w-full h-full object-cover transition-all duration-700
            ${idx === current ? 'opacity-100 z-10 scale-100 translate-x-0' :
              direction === 'right' && idx === (current - 1 + carouselData.length) % carouselData.length ? 'opacity-0 z-0 scale-95 -translate-x-full' :
              direction === 'left' && idx === (current + 1) % carouselData.length ? 'opacity-0 z-0 scale-95 translate-x-full' :
              'opacity-0 z-0 scale-95'}
          `}
          style={{ pointerEvents: idx === current ? 'auto' : 'none' }}
        />
      ))}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
      <div className="absolute left-32 top-1/3 md:top-1/2 text-white z-20 text-left flex items-center gap-4">
        <div className="w-1 h-12 bg-yellow-500 rounded" />
        <h1 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow">
          {carouselData[current].caption}
        </h1>
      </div>
      {/* Tombol Kiri */}
      <button
        onClick={goToPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl focus:outline-none"
        aria-label="Sebelumnya"
      >
        &#60;
      </button>
      {/* Tombol Kanan */}
      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl focus:outline-none"
        aria-label="Selanjutnya"
      >
        &#62;
      </button>
      {/* Indikator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {carouselData.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full ${idx === current ? 'bg-white' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}

function FounderCard({ name, title, img }: { name: string; title: string; img: string }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-lg shadow p-3 mb-2">
      <img src={img} alt={name} className="w-12 h-12 rounded-full object-cover border" />
      <div>
        <div className="font-semibold text-sm">{name}</div>
        <div className="text-xs text-gray-500">{title}</div>
      </div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-colors duration-300 font-black ${
        scrolled
          ? "bg-white shadow text-black"
          : "bg-transparent backdrop-blur-md text-white"
      }`}
    >
      <div className="flex items-center justify-between px-12 py-6 text-xl">
        <div className="flex items-center gap-8">
          <img src="/img/sma.webp" alt="logo" className="w-50 h-20" />
          <div className={`text-2xl md:text-3xl leading-tight uppercase tracking-tight ${
            scrolled ? 'text-black' : 'text-white'
          }`}>
            <div>SMA UNGGULAN BP</div>
            <div>AMANATUL UMMAH</div>
          </div>
        </div>
        <div className="flex gap-6 font-semibold">
          <a href="#" className="hover:text-blue-600">Beranda</a>
          <a href="#" className="hover:text-blue-600">Layanan</a>
          <a href="#" className="hover:text-blue-600">Berita</a>
          <a href="#" className="hover:text-blue-600">Tentang Kami</a>
          <a href="#" className="hover:text-blue-600">Kontak</a>
        </div>
      </div>
    </nav>
  );
}

export default function Landingpages() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <HeroCarousel />

      {/* Main Card Section */}
      <div className="max-w-5xl mx-auto -mt-32 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-8">
          {/* Left: Welcome */}
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-2">
              Selamat Datang di  Pondok Pesantren Teknologi Informasi Al-Hidayah
            </h2>
            <p className="text-gray-700 text-sm mb-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in......
            </p>
            <div className="font-semibold text-gray-800 mb-2 flex items-center gap-1">
              Tentang Pendiri...
              <span className="text-xs text-gray-400" title="Pendiri Pesantren">&#9432;</span>
            </div>
            {founders.map((f) => (
              <FounderCard key={f.name} {...f} />
            ))}
          </div>
          {/* Right: Data Pondok */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold text-blue-700 mb-4">Data Pondok Pesantren</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-800">6</span>
                <span className="text-xs text-gray-500">Layanan</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-800">99</span>
                <span className="text-xs text-gray-500">Guru</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-800">99</span>
                <span className="text-xs text-gray-500">Prestasi</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-800">99</span>
                <span className="text-xs text-gray-500">Estrakulikuler</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs">Tentang Kami</button>
              <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs flex items-center gap-1">
                Visi dan Misi <span>&#187;</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-32" />
    </div>
  );
}

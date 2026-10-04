// src/utils/courseImages.js
// ✅ All course images central mapping

import diplomacover from "../image/diplomabanner.jpg";
import AlimiyahBannerImg from "../image/arbiyaprogrambabanner.jpg";
import alemiaImg from "../image/Coursecover.png";
import KidsImg from "../image/quranstudis.jpg";
import NuraniyaCourseImg from "../image/nuranicourse.jpg";
import NuraniyaBannerIMG from "../image/nuranibanner.jpg";
import NazerakidsImg from "../image/Thumb.jpg";
import HifjulBannerImg from "../image/hifjulbanner.png";
import courseImg from "../image/hifzthumbal.jpg";
import HIfjthumbelImg from "../image/Hifjcover.jpg";
import OnetoOneImg from "../image/OnetoOnebanner.jpg";
import Quranforeldersbanner from "../image/Quranforeldersbanner.jpg";
import Adalthifzbanner from "../image/adalthifzbanner.jpg";
import adaltsbannerImg from "../image/Besic Tazweed.jpg";
import Qurannajeracover from "../image/najerabanner.jpg";
import Quidanuraniyah from "../image/quidanuraniyahcover.png";
import BakarahBannerImg from "../image/Bakarah.png";

// ✅ Default fallback (external URL)
const DEFAULT_IMG = "https://i.ibb.co.com/7tWnV1pB/banner.jpg";

/**
 * ✅ Course নাম/টাইটেল দেখে সঠিক image দেয়
 */
export const getCourseImage = (course) => {
  if (!course) return DEFAULT_IMG;

  // Combine all possible title sources (lowercase)
  const rawTitle = String(
    course.course ||
      course.title ||
      course.titleEn ||
      course.name ||
      course.batchCourse ||
      course.className ||
      "",
  )
    .toLowerCase()
    .trim();

  const rawBatch = String(course.batchName || "")
    .toLowerCase()
    .trim();

  const rawDept = String(course.department || course.category || "")
    .toLowerCase()
    .trim();

  const c = `${rawTitle} ${rawBatch} ${rawDept}`;

  // ═══════════════════════════════════════════════════════════════
  // 🔍 MATCH ORDER matters — specific আগে, generic পরে
  // ═══════════════════════════════════════════════════════════════

  // ─── 1. DIPLOMA IN ISLAMIC STUDIES ───
  if (c.includes("diploma") || c.includes("islamic studies")) {
    return diplomacover;
  }

  // ─── 2. BAKARAH HIFZ (Hifz এর আগে check করছি) ───
  if (c.includes("bakarah") || c.includes("baqarah") || c.includes("বাকারা")) {
    return BakarahBannerImg;
  }

  // ─── 3. ONE-TO-ONE PROGRAM ───
  if (
    c.includes("one-to-one") ||
    c.includes("one to one") ||
    c.includes("1-to-1") ||
    c.includes("1 to 1")
  ) {
    return OnetoOneImg;
  }

  // ─── 4. HIFZ REVISION ───
  if (c.includes("revision") && (c.includes("hifz") || c.includes("hifjul"))) {
    return courseImg;
  }

  // ─── 5. HIFZUL QURAN (Hifzul / Hifjul) ───
  if (c.includes("hifzul") || c.includes("hifjul")) {
    return HifjulBannerImg;
  }

  // ─── 6. ADULT / ELDERS HIFZ ───
  if ((c.includes("adult") || c.includes("elders")) && c.includes("hifz")) {
    return Adalthifzbanner;
  }

  // ─── 7. GENERAL HIFZ ───
  if (c.includes("hifz") || c.includes("hifj")) {
    return HIfjthumbelImg;
  }

  // ─── 8. BASIC TAJWEED ───
  if (c.includes("tajweed") || c.includes("tajwid") || c.includes("তাজউইদ")) {
    return adaltsbannerImg;
  }

  // ─── 9. QURAN FOR ELDERS ───
  if (
    c.includes("quran for elders") ||
    c.includes("quran elders") ||
    c.includes("elders quran")
  ) {
    return Quranforeldersbanner;
  }

  // ─── 10. QAIDA / NOORANI / NURANI ───
  if (
    c.includes("qaida") ||
    c.includes("noorani") ||
    c.includes("nurani") ||
    c.includes("quida") ||
    c.includes("কায়দা")
  ) {
    // International হলে course image, nahole cover
    if (c.includes("international")) {
      return NuraniyaCourseImg;
    }
    return Quidanuraniyah;
  }

  // ─── 11. NAZERA / NAJERA ───
  if (
    c.includes("nazera") ||
    c.includes("najera") ||
    c.includes("nazira") ||
    c.includes("নাজেরা")
  ) {
    // Kids version হলে kids image
    if (c.includes("kids") || c.includes("child")) {
      return NazerakidsImg;
    }
    return Qurannajeracover;
  }

  // ─── 12. ALIMIYAH ───
  if (
    c.includes("alimiyah") ||
    c.includes("alimiya") ||
    c.includes("alemiyah") ||
    c.includes("alimia") ||
    c.includes("আলিমিয়া")
  ) {
    // Kids version
    if (c.includes("kids") || c.includes("child")) {
      return KidsImg;
    }
    // Kids English version — AlimiyahBannerImg
    if (c.includes("english")) {
      return AlimiyahBannerImg;
    }
    return alemiaImg;
  }

  // ─── 13. QURAN STUDIES (general dept) ───
  if (c.includes("quran studies") || c.includes("quran-studies")) {
    return KidsImg;
  }

  // ─── 14. Fallback: course already has image ───
  if (course.image && String(course.image).trim() !== "") {
    return course.image;
  }

  return DEFAULT_IMG;
};

export default getCourseImage;

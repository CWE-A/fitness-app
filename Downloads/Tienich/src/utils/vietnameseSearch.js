/**
 * Hàm loại bỏ dấu tiếng Việt chuẩn xác
 * Chuyển đổi "Tính phần trăm" -> "tinh phan tram", "đếm từ" -> "dem tu"
 */
export function removeVietnameseTones(str) {
  if (!str) return '';
  str = String(str).toLowerCase().trim();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // Xóa các ký tự tổ hợp unicode phụ
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return str;
}

/**
 * Tìm kiếm công cụ với thuật toán tính điểm độ liên quan (Relevance Scoring)
 * Hỗ trợ gõ tiếng Việt có dấu, không dấu, gõ dở từng ký tự, từ đồng nghĩa/keywords
 */
export function searchTools(tools, query) {
  if (!query || !query.trim()) return [];

  const rawQuery = query.toLowerCase().trim();
  const normQuery = removeVietnameseTones(rawQuery);
  const queryTokens = normQuery.split(/\s+/).filter(Boolean);

  const scoredTools = [];

  for (const tool of tools) {
    const rawName = (tool.name || '').toLowerCase();
    const normName = removeVietnameseTones(tool.name);

    const rawDesc = (tool.description || '').toLowerCase();
    const normDesc = removeVietnameseTones(tool.description);

    const rawKeywords = (tool.keywords || []).join(' ').toLowerCase();
    const normKeywords = removeVietnameseTones(rawKeywords);

    const rawSlug = (tool.slug || '').toLowerCase();

    let score = 0;

    // 1. Khớp chính xác tên (chính xác có dấu hoặc không dấu)
    if (rawName === rawQuery || normName === normQuery) {
      score += 1000;
    } else if (rawName.startsWith(rawQuery) || normName.startsWith(normQuery)) {
      score += 500;
    } else if (normName.includes(normQuery)) {
      score += 300;
    }

    // 2. Khớp trong keywords
    if (rawKeywords.includes(rawQuery) || normKeywords.includes(normQuery)) {
      score += 200;
    }

    // 3. Khớp trong slug
    if (rawSlug.includes(normQuery)) {
      score += 150;
    }

    // 4. Khớp trong mô tả
    if (rawDesc.includes(rawQuery) || normDesc.includes(normQuery)) {
      score += 100;
    }

    // 5. Khớp tất cả các tokens (nếu người dùng gõ "gop pdf" hoặc "tinh lai")
    if (queryTokens.length > 1) {
      const allTokensMatchName = queryTokens.every(tok => normName.includes(tok));
      const allTokensMatchAny = queryTokens.every(tok => 
        normName.includes(tok) || normKeywords.includes(tok) || normDesc.includes(tok)
      );

      if (allTokensMatchName) {
        score += 250;
      } else if (allTokensMatchAny) {
        score += 120;
      }
    }

    // Bonus cho công cụ phổ biến
    if (tool.isPopular && score > 0) {
      score += 20;
    }

    if (score > 0) {
      scoredTools.push({ tool, score });
    }
  }

  // Sắp xếp theo điểm giảm dần
  scoredTools.sort((a, b) => b.score - a.score);

  return scoredTools.map(item => item.tool);
}

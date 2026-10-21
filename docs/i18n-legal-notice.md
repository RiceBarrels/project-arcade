# Legal notice for translated terms and privacy pages

- **Date:** 2026-10-20
- **Status:** machine-assisted draft — needs native-speaker review. Not reviewed by a native speaker or a lawyer.
- **Decision (user, relayed by the coordinator):** the site launches in all 10 languages at once. The translated /terms and /privacy pages show the translation, with a notice that it is unofficial and that the English version prevails.
- **Used with:** `docs/legal-drafts/<code>/terms.md` and `privacy.md`. The notice is not inside those files; the page component renders it above the content, so the wording lives in one place and the link can point to the English page for the current route.

## English source strings

These English strings are now in `docs/copy-en.md` section 21 (added by the copy owner on 2026-10-20, marked needs lawyer review), word for word as below, including the tagged key the code uses. Each `docs/copy-<code>.md` has a matching section 21.

| Key | English | Where |
|---|---|---|
| N1 | This is an unofficial translation. If it differs from the English version, the English version applies. | Banner at the top of a translated /terms or /privacy page, above the DRAFT note. |
| N2 | Read the English version | Link in or under the banner, to `/en/terms` or `/en/privacy`. |
| N3 | Unofficial translation | Short label, e.g. page metadata, or next to the language name in a language switcher on legal pages. |

Not shown on the English pages. Suggested message keys for 1号: `legal.notice.banner`, `legal.notice.readEnglish`, `legal.notice.label` (final names follow docs/i18n.md).

## Dictionary key used by the code (1号, components/legal/legal-page.tsx)

The page component already renders the notice as one string with a link tag, so N1 and N2 are merged there. Key (English): `This is an unofficial translation. If it differs from the <link>English version</link>, the English version applies.` Translations for `i18n/messages/<code>.json` once dictionary work starts (same wording as N1 below, with the tag around the words "English version"):

| Language | Value |
|---|---|
| zh | 本页为非官方译文。如与<link>英文版</link>不一致，以英文版为准。 |
| zh-hant | 此為非官方翻譯。如內容與<link>英文版</link>不一致，以英文版為準。 |
| es | Esta es una traducción no oficial. Si difiere de la <link>versión en inglés</link>, se aplica la versión en inglés. |
| fr | Ceci est une traduction non officielle. Si elle diffère de la <link>version anglaise</link>, la version anglaise s'applique. |
| ar | هذه ترجمة غير رسمية. إذا اختلفت عن <link>النسخة الإنجليزية</link>، يُعمل بالنسخة الإنجليزية. |
| tl | Ito ay hindi opisyal na salin. Kung may pagkakaiba ito sa <link>bersyong English</link>, ang bersyong English ang masusunod. |
| vi | Đây là bản dịch không chính thức. Nếu bản dịch này có điểm khác với <link>bản tiếng Anh</link>, bản tiếng Anh sẽ được áp dụng. |
| ko | 이 문서는 비공식 번역본입니다. <link>영어판</link>과 다른 경우에는 영어판이 적용됩니다. |
| pt | Esta é uma tradução não oficial. Em caso de divergência entre esta tradução e a <link>versão em inglês</link>, prevalece a versão em inglês. |
| ru | Это неофициальный перевод. Если он расходится с <link>английской версией</link>, применяется английская версия. |

Note for 1号: the link element has `lang="en"`, but its text is in the page language (英文版, versión en inglés...). Use `hreflang="en"` on the link instead, so screen readers do not read translated words with English pronunciation. In ko the particle 과 after `</link>` is right for 영어판 (ends in a consonant).

## All languages at a glance (recommended wording)

| Language | N1 banner | N2 link | N3 label |
|---|---|---|---|
| zh | 本页为非官方译文。如与英文版不一致，以英文版为准。 | 查看英文版 | 非官方译文 |
| zh-hant | 此為非官方翻譯。如內容與英文版不一致，以英文版為準。 | 閱讀英文版 | 非官方翻譯 |
| es | Esta es una traducción no oficial. Si difiere de la versión en inglés, se aplica la versión en inglés. | Lea la versión en inglés | Traducción no oficial |
| fr | Ceci est une traduction non officielle. Si elle diffère de la version anglaise, la version anglaise s'applique. | Lire la version anglaise | Traduction non officielle |
| ar | هذه ترجمة غير رسمية. إذا اختلفت عن النسخة الإنجليزية، يُعمل بالنسخة الإنجليزية. | قراءة النسخة الإنجليزية | ترجمة غير رسمية |
| tl | Ito ay hindi opisyal na salin. Kung may pagkakaiba ito sa bersyong English, ang bersyong English ang masusunod. | Basahin ang bersyong English | Hindi opisyal na salin |
| vi | Đây là bản dịch không chính thức. Nếu bản dịch này có điểm khác với bản tiếng Anh, bản tiếng Anh sẽ được áp dụng. | Đọc bản tiếng Anh | Bản dịch không chính thức |
| ko | 이 문서는 비공식 번역본입니다. 영어판과 다른 경우에는 영어판이 적용됩니다. | 영어판 보기 | 비공식 번역 |
| pt | Esta é uma tradução não oficial. Em caso de divergência entre esta tradução e a versão em inglês, prevalece a versão em inglês. | Ler a versão em inglês | Tradução não oficial |
| ru | Это неофициальный перевод. Если он расходится с английской версией, применяется английская версия. | Читать английскую версию | Неофициальный перевод |

Register: every N1 avoids direct address, so it fits both the formal legal pages and the informal UI. Where a language needs a verb form for N2, it uses a neutral or formal form (es "Lea" is the usted form; fr, pt, ru and ar use an infinitive or verbal noun; tl "Basahin" is a neutral imperative; ko and zh use a noun phrase).

Verb strength: English says "applies". Most languages use the plain equivalent. zh and zh-hant use the set phrase 以英文版为准 / 以英文版為準, which is the normal Chinese way to say this. pt uses "prevalece" (the usual Brazilian wording for which text governs); a closer "applies" option is listed below. A lawyer may prefer the stronger "prevails" wording everywhere; the alternatives below include it for each language.

## Per language: back-translation, alternatives, notes

### Simplified Chinese (zh)

- **N1:** 本页为非官方译文。如与英文版不一致，以英文版为准。  
  Back-translation: This page is an unofficial translation. If it differs from the English version, the English version prevails.
- **N2:** 查看英文版  
  Back-translation: View the English version
- **N3:** 非官方译文  
  Back-translation: Unofficial translation (translated text)
- **N1 alternatives:**
  - 此为非官方译文。如与英文版不一致，以英文版为准。 (Back: 'This is an unofficial translation. If it differs from the English version, the English version prevails.' Closer to 'This is'. Use it if the notice may appear somewhere other than a full page, such as a banner over a section.)
  - 本页为非官方译文。如与英文版不一致，适用英文版。 (Back: '...the English version applies.' Word-for-word closest to 'applies', but 适用英文版 reads less natural than the set phrase 以英文版为准.)
- **Notes:** I checked the builder's wording and kept it. It is faithful and adds no claims (no 仅供参考, no 具有法律约束力, no disclaimer of liability). It uses no pronoun, so it fits both the 您 legal pages and the 你 UI. It reads naturally and is formal written Chinese, the same level as sections 8 and 15. 以……为准 is the idiomatic Chinese for a language-precedence clause and is what 'the English version applies' means here. It is not an added claim, but a lawyer should still confirm the intended legal effect. N2: 查看英文版 is the usual link label. 阅读英文版 is closer to 'Read' and is also fine. N3: 非官方译文 is preferred over 非官方翻译, which can also mean the act of translating. Punctuation is full-width (。 and U+FF0C ，), with no spaces. In a label next to a language name, use full-width brackets: 简体中文（非官方译文）. Follow-up for whoever owns copy-zh.md: coordination note 6 (copy-zh.md:695) still says a lawyer must decide which version prevails. This notice now gives the product's answer, so that note is out of date (not edited, outside my scope). Nothing here has been reviewed by a native speaker or a lawyer.
- **Checker changes:** No wording changes. I confirmed the builder's N1, N2 and N3. The final N1 is written with explicit full-width punctuation (U+FF0C comma, 。) to avoid ambiguity. The alternatives were reworded: one is closer to 'This is' (此为), one is the literal 'applies' (适用) option.

### Traditional Chinese (zh-hant, Taiwan base)

- **N1:** 此為非官方翻譯。如內容與英文版不一致，以英文版為準。  
  Back-translation: This is an unofficial translation. If the content is inconsistent with the English version, the English version prevails.
- **N2:** 閱讀英文版  
  Back-translation: Read the English version
- **N3:** 非官方翻譯  
  Back-translation: Unofficial translation
- **N1 alternatives:**
  - 此為非官方翻譯。如內容與英文版不同，以英文版為準。 (The builder's version. Faithful and grammatical. The risk: a translation always 'differs' from the English in wording, so 不同 is slightly less precise than 不一致.)
  - 此為非官方翻譯。如與英文版有出入，以英文版為準。 (Back: 'If there is any discrepancy with the English version, the English version prevails.' 有出入 is natural, everyday Taiwanese for a mismatch in content. It is a little less formal than 不一致.)
  - 本頁為非官方翻譯。如內容與英文版不一致，以英文版為準。 (Says 'this page'. Use it only if the notice is always shown as a page banner.)
- **Notes:** One change from the builder: 不同 became 不一致 in N1. The English 'differs' means 'differs in content'. A translation is always 'different' from the English in wording, so 如內容與英文版不同 could be read as always true. 不一致 ('inconsistent') says exactly the intended thing and stays plain, without the stiff contract word 歧異. Everything else in the builder's N1-N3 checks out: faithful, no added claims (no 僅供參考, no 具法律效力, no 概 or 任何), and formal written register (此為, 如, 以…為準) with no pronoun, so it fits the 您 register of sections 8 and 15. Full-width 。 and ，; N2 and N3 have no final punctuation. N2: 查看英文版 is an equal alternative if other links in the UI use 查看. N3 can sit in full-width parentheses after the language name: 繁體中文（非官方翻譯）. Still open, as the builder noted: copy-zh-hant.md coordination note 6 says a lawyer must decide which language version prevails and whether that clause is effective for Taiwan or Hong Kong consumers. 非官方 could be misread as 'not from the government'; 非正式翻譯 is a possible alternative, but it can also read as 'informal'. A native speaker has not reviewed these strings, and neither has a lawyer.
- **Checker changes:** N1: 如內容與英文版不同 changed to 如內容與英文版不一致. The builder's wording is faithful but slightly ambiguous, because a translation always differs from the English in wording; 不一致 means 'inconsistent in content'. The builder's version is kept as alternative 1. N2 (閱讀英文版) and N3 (非官方翻譯) are unchanged.

### Spanish (es, neutral Latin American)

- **N1:** Esta es una traducción no oficial. Si difiere de la versión en inglés, se aplica la versión en inglés.  
  Back-translation: This is an unofficial translation. If it differs from the English version, the English version applies.
- **N2:** Lea la versión en inglés  
  Back-translation: Read (formal 'usted' imperative) the English version
- **N3:** Traducción no oficial  
  Back-translation: Unofficial translation
- **N1 alternatives:**
  - Esta es una traducción no oficial. Si difiere de la versión en inglés, prevalece la versión en inglés. (Back: '... the English version prevails.') 'Prevalece' is the usual verb in bilingual contracts and sounds more legal. 'Se aplica' is closer to the English 'applies'. Which verb to use is a question for a lawyer.
  - Esta es una traducción no oficial. Si hay diferencias con la versión en inglés, se aplica la versión en inglés. (Back: 'If there are differences with the English version, the English version applies.') This avoids the implied subject of 'difiere', but the sentence is a little longer.
- **Notes:** I checked the builder's wording and kept it unchanged. N1 and N3 are faithful, add no claims and use no second person, so they work in either register. N2 uses the usted imperative 'Lea', which matches sections 8 and 15. The tú form would be 'Lee'. If the link label also appears outside the legal pages, the infinitive 'Leer la versión en inglés' is a register-neutral and common alternative. Spelling is correct: 'inglés' with an accent and lowercase, 'no oficial' as two words. Punctuation matches the English: a period only in N1. N1-N3 are not yet in copy-en.md. No native-speaker or lawyer review has taken place.

### French (fr)

- **N1:** Ceci est une traduction non officielle. Si elle diffère de la version anglaise, la version anglaise s'applique.  
  Back-translation: This is an unofficial translation. If it differs from the English version, the English version applies.
- **N2:** Lire la version anglaise  
  Back-translation: Read the English version
- **N3:** Traduction non officielle  
  Back-translation: Unofficial translation
- **N1 alternatives:**
  - Ceci est une traduction non officielle. En cas de divergence avec la version anglaise, la version anglaise prévaut. (Back: 'In case of divergence with the English version, the English version prevails.') This is a more conventional legal register. 'prévaut' is slightly stronger than 'applies'.
  - Ceci est une traduction non officielle. En cas de divergence, seule la version anglaise fait foi. (Back: 'only the English version is authoritative.') This is the standard contract formula, but 'seule' and 'faire foi' add meaning beyond the English. Use it only if the lawyer chooses it.
- **Notes:** I accept the builder's wording unchanged. It is faithful, adds no claim, and has no pronoun, so it fits the formal register of the legal pages without needing vous. 'elle' agrees with 'traduction', and 'non officielle' is feminine. N2 uses the infinitive, the usual French form for a link label. 'Consulter la version anglaise' is a slightly more formal option. None of N1-N3 has : ; ? !, so there are no non-breaking-space issues. N1 is understandable and correct; legal French more often uses 'prévaut' or 'fait foi', so a lawyer may prefer alternative 1 or 2. The builder's legal flag stands, as a question for a lawyer, not for the translation: under the Quebec Charter of the French language (as amended by Bill 96), and possibly French and EU consumer law, an English-prevails clause may not hold for those users. copy-fr.md coordination note 6 already raises the question of which language version prevails. No native-speaker or lawyer review has happened.

### Arabic (ar, MSA, RTL)

- **N1:** هذه ترجمة غير رسمية. إذا اختلفت عن النسخة الإنجليزية، يُعمل بالنسخة الإنجليزية.  
  Back-translation: This is an unofficial translation. If it differs from the English version, the English version is applied (is the one acted upon).
- **N2:** قراءة النسخة الإنجليزية  
  Back-translation: Reading the English version (verbal noun; works as the link label 'Read the English version' without a masculine or feminine imperative).
- **N3:** ترجمة غير رسمية  
  Back-translation: Unofficial translation
- **N1 alternatives:**
  - هذه ترجمة غير رسمية. إذا اختلفت عن النسخة الإنجليزية، فالنسخة الإنجليزية هي المعتمدة. (Back: '...the English version is the authoritative one.') Common in bilingual contracts, but slightly stronger than 'applies'.
  - هذه ترجمة غير رسمية. في حال وجود اختلاف بينها وبين النسخة الإنجليزية، تسري النسخة الإنجليزية. (Back: 'In case of a difference between it and the English version, the English version applies / is in force.') This is the precise legal verb but reads heavier. I dropped the builder's «أي» ('any') so nothing is added.
- **Notes:** I accept the builder's wording unchanged. N1 is faithful: it has two sentences, adds no claim, and makes no direct address (impersonal passive يُعمل بـ), which matches the register of sections 8 and 15 and leaves no gendered 'you'. The grammar is correct: after إذا with a past verb, a present-tense main clause needs no فـ. N2 uses a verbal noun, which is gender-neutral and matches the file's neutral button style (إرسال، حذف حسابي). The shorter alternative عرض النسخة الإنجليزية ('View the English version') is also neutral; قراءة is closer to 'Read'. N3 is exact. No digits or Latin text appear inside N1 to N3. If any of them sits next to a Latin word such as 'English', wrap that word in <bdi>. Open for a lawyer: whether this precedence wording has the intended effect in Arabic-speaking jurisdictions, and whether any of them requires Arabic consumer terms. copy-ar.md translator question 6 (the lawyer decides which language version is authoritative) is out of date after the user's decision that English prevails. I did not edit it; the coordinator may want to. No native-speaker or lawyer review has happened.

### Tagalog / Filipino (tl)

- **N1:** Ito ay hindi opisyal na salin. Kung may pagkakaiba ito sa bersyong English, ang bersyong English ang masusunod.  
  Back-translation: This is an unofficial translation. If it differs from the English version, the English version will be followed.
- **N2:** Basahin ang bersyong English  
  Back-translation: Read the English version
- **N3:** Hindi opisyal na salin  
  Back-translation: Unofficial translation
- **N1 alternatives:**
  - ... ang bersyong English ang mananaig. ('prevails': the usual wording in Philippine contracts. It reads more legal and is slightly stronger than 'applies'.)
  - ... ang bersyong Ingles ang masusunod. (Standard Filipino language name, more formal. If used, all three strings must change to 'Ingles', and copy-tl.md currently says 'English'.)
- **Notes:** Checked and accepted without changes. N1 is faithful: 'masusunod' (will be followed) is a natural, neutral rendering of 'applies' and is common in Philippine bilingual notices. There are no added claims. All three strings are impersonal or pronoun-free imperatives, so they fit the formal legal-page register without 'po' (the glossary allows 'po' once, only in the privacy contact line). 'English' matches the copy file's usage ('bersyong English', copy-tl.md line 701). I do not recommend the 'may bisa' alternative: it can suggest the Filipino text has no validity at all. 'hindi opisyal' and 'di-opisyal' are both acceptable; pick one and use it everywhere. These are machine-assisted drafts. No native-speaker or lawyer review has been done.

### Vietnamese (vi)

- **N1:** Đây là bản dịch không chính thức. Nếu bản dịch này có điểm khác với bản tiếng Anh, bản tiếng Anh sẽ được áp dụng.  
  Back-translation: This is an unofficial translation. If this translation differs on any point from the English version, the English version will apply.
- **N2:** Đọc bản tiếng Anh  
  Back-translation: Read the English version
- **N3:** Bản dịch không chính thức  
  Back-translation: Unofficial translation
- **N1 alternatives:**
  - Đây là bản dịch không chính thức. Nếu bản dịch này khác với bản tiếng Anh, bản tiếng Anh được áp dụng. (The builder's original wording. Back: '... If this translation differs from the English version, the English version is applied.' Faithful too. A bare 'khác với' can also read as the trivially true 'is different from', since it is in another language, so I prefer 'có điểm khác'.)
  - Đây là bản dịch không chính thức. Nếu có điểm khác biệt giữa bản dịch này và bản tiếng Anh, bản tiếng Anh sẽ được áp dụng. (Back: 'If there is any difference between this translation and the English version, the English version will apply.' A more formal written style. Same meaning.)
  - Đây là bản dịch không chính thức. Trường hợp có sự khác biệt giữa bản dịch này và bản tiếng Anh, bản tiếng Anh được ưu tiên áp dụng. (Back: '... the English version prevails.' This is the usual Vietnamese contract formula, but 'ưu tiên áp dụng' (prevails) is stronger than the source's 'applies'. Use it only if the owner or a lawyer wants 'prevails'.)
- **Notes:** I changed only N1: 'Nếu bản dịch này khác với' became 'Nếu bản dịch này có điểm khác với', and I added 'sẽ'. The reason is clarity: it pins the condition to a difference in content, not the language itself. It adds no claim and stays faithful to 'If it differs ... applies'. 'sẽ được áp dụng' (will apply) reads slightly more natural in Vietnamese, with the same meaning. N2 and N3 are kept: they are faithful, short and natural. 'Xem bản tiếng Anh' (View the English version) works as a link-label alternative to N2. Register: the English has no 'you', so I added no 'Quý vị', no 'bạn' and no 'hãy'. The neutral written style matches the formal legal pages. 'vui lòng' is not needed in a short link label. There are no added claims: no 'tham khảo' (reference only) and no 'có giá trị pháp lý' (legally binding). Punctuation: sentence case; 'bản tiếng Anh' with a capital A in Anh. Open question for a lawyer, not a claim: whether an English-governs notice is effective for users in Vietnam. No native-speaker or lawyer review has happened; the naturalness judgement here is mine and machine-assisted.
- **Checker changes:** N1 changed slightly. I changed 'Nếu bản dịch này khác với bản tiếng Anh, bản tiếng Anh được áp dụng' to 'Nếu bản dịch này có điểm khác với bản tiếng Anh, bản tiếng Anh sẽ được áp dụng'. This is a clarity and naturalness fix ('differs on a point' rather than a bare 'is different from') with the same meaning and no added claim. The builder's wording is kept as alternative 1. N2 'Đọc bản tiếng Anh' and N3 'Bản dịch không chính thức' are unchanged. I added an alternative to the alternatives list: a formal 'Nếu có điểm khác biệt giữa ...' version. The 'ưu tiên áp dụng' (prevails) alternative is kept with its warning that it is stronger than the source. The builder's short 'Nếu có khác biệt' variant is dropped, because it leaves out what is being compared.

### Korean (ko)

- **N1:** 이 문서는 비공식 번역본입니다. 영어판과 다른 경우에는 영어판이 적용됩니다.  
  Back-translation: This document is an unofficial translation. Where it differs from the English version, the English version applies.
- **N2:** 영어판 보기  
  Back-translation: View the English version
- **N3:** 비공식 번역  
  Back-translation: Unofficial translation
- **N1 alternatives:**
  - 이 문서는 비공식 번역본입니다. 영어판과 내용이 다른 경우에는 영어판이 적용됩니다. (Back: '...if the content differs from the English version, the English version applies.') Adds 내용 ('content'). This reads a little more naturally in Korean and keeps 적용됩니다.
  - 이 문서는 비공식 번역본입니다. 영어판과 다른 경우에는 영어판이 우선합니다. ('...the English version prevails.') This is the usual Korean bilingual-contract idiom, but it means 'prevails', not 'applies'. Use it only if the English changes to 'prevails'.
- **Notes:** I accept the builder's wording unchanged. N1 is faithful: 비공식 번역본 = unofficial translation, 영어판과 다른 경우 = if it differs from the English version, 영어판이 적용됩니다 = the English version applies. It uses 합니다체, which matches sections 8 and 15, and it adds no claims (no 'for convenience', no liability text). 이 문서는 for 'This' is needed because a bare 이것은 is unnatural; use 이 페이지는 if the banner appears outside the legal pages. N2 and N3 are noun-phrase labels, so speech level does not apply. 보기 ('view') is the idiomatic link verb; 영어판 읽기 is the literal 'Read the English version' if exact wording is required. 영어판 matches existing copy-ko.md usage. 영문판 is more common in Korean legal documents, and if a reviewer switches to it, N1 and N2 should change together. Whether a prevailing-language clause is effective toward Korean users is a question for a lawyer. No native-speaker or lawyer review has taken place.
- **Checker changes:** No wording changes to N1-N3. I added one alternative ('영어판과 내용이 다른 경우에는', which is slightly more natural and keeps 적용됩니다) and noted that 영어판 읽기 is the literal form of N2 if 'Read' must be kept word for word.

### Portuguese (pt-BR)

- **N1:** Esta é uma tradução não oficial. Em caso de divergência entre esta tradução e a versão em inglês, prevalece a versão em inglês.  
  Back-translation: This is an unofficial translation. In case of divergence between this translation and the English version, the English version prevails.
- **N2:** Ler a versão em inglês  
  Back-translation: Read the English version (infinitive, the usual neutral form for a Brazilian link label)
- **N3:** Tradução não oficial  
  Back-translation: Unofficial translation
- **N1 alternatives:**
  - Esta é uma tradução não oficial. Em caso de divergência com a versão em inglês, prevalece a versão em inglês. (Back: 'This is an unofficial translation. In case of divergence from the English version, the English version prevails.') Shorter for a phone banner, and it still names the comparison point.
  - Esta é uma tradução não oficial. Se houver diferença em relação à versão em inglês, vale a versão em inglês. (Back: 'If there is a difference from the English version, the English version is what counts.') Closer to the plain English 'applies', but 'vale' is a little colloquial for a legal notice.
  - Esta é uma tradução não oficial. Em caso de divergência, prevalece a versão em inglês. (Back: 'In case of divergence, the English version prevails.') Shortest. The comparison point is only implied.
- **Notes:** I checked the builder's wording and kept it unchanged. It is faithful: 'prevalece' is the standard Brazilian contract verb for which text governs, and it carries the meaning of 'applies' without adding a claim. Nothing like 'for convenience only', 'legally binding' or a disclaimer was added. Register: impersonal, with no você and no o usuário, so it fits the formal third-person legal pages and also reads fine next to the UI. 'não oficial' has no hyphen, which is correct under the 2009 orthographic agreement. 'inglês' is lowercase. N3 is in sentence case with no final period. N2 uses the infinitive. The infinitive is a common link and button form in pt-BR, and the file already uses it ('Enviar feedback'). 'Ver a versão em inglês' is an equally good alternative. Open item: copy-pt.md coordination note 6 (line 711) says the translation adds no prevailing-language clause. Showing this notice supersedes that note, so the coordinator side should update it. For the lawyer: Brazilian consumer law (CDC) may limit how far an English-prevails clause holds against consumers in Brazil. This is a point to check, not a conclusion. No native-speaker or lawyer review has taken place.

### Russian (ru)

- **N1:** Это неофициальный перевод. Если он расходится с английской версией, применяется английская версия.  
  Back-translation: This is an unofficial translation. If it differs from the English version, the English version applies.
- **N2:** Читать английскую версию  
  Back-translation: Read the English version (infinitive link form, neutral between ты and вы).
- **N3:** Неофициальный перевод  
  Back-translation: Unofficial translation
- **N1 alternatives:**
  - Это неофициальный перевод. В случае расхождений с английской версией действует английская версия. (Back: "This is an unofficial translation. In case of discrepancies with the English version, the English version is in effect.") This is the more common formula in Russian documents and has the same meaning. A reviewer or lawyer may prefer it.
  - Это неофициальный перевод. При расхождении с английской версией преимущество имеет английская версия. (Back: "...the English version has precedence.") It says more than the English "applies", so a lawyer should choose it, not the translator.
- **Notes:** I kept the builder's wording because it is accurate. N1 matches the English sentence by sentence ("differs" is расходится, "applies" is применяется), adds no claims, and has no direct address, so it fits the formal neutral register of sections 8 and 15. The comma before применяется is required, and английской is lowercase as it should be. N2 uses the infinitive, which is standard for Russian links. Do not use the ты form Прочитай on legal pages. If someone wants an explicit formal form, use Прочитайте английскую версию. N3: sentence case, no full stop when used as a label. No native-speaker or lawyer review has taken place.

## Open points

1. **English source.** Resolved: N1, N1 with link, N2 and N3 are in `docs/copy-en.md` section 21 and match this file exactly.
2. **Legal effect is a lawyer question.** Whether an "English version applies" notice has the intended effect is not something this translation can decide. Reviewers flagged places to ask about, as questions only: Quebec (Charter of the French language, as amended by Bill 96) for French-speaking users in Canada; Brazilian consumer law (CDC) for pt-BR; consumer rules in Korea, Vietnam, the Philippines, Taiwan/Hong Kong and Arabic-speaking countries. The site data is stored in Canada (ca-central-1).
3. **Stronger wording.** "prevails" (es prevalece, fr prévaut / fait foi, ar المعتمدة, tl mananaig, vi ưu tiên áp dụng, ko 우선합니다, ru имеет преимущество) is listed as an alternative only. If the lawyer wants "prevails", change the English N1 first, then switch every language to its listed alternative.
4. **Translator notes updated.** Note 6 ("which language version prevails is the lawyer's decision") in each `docs/copy-<code>.md` now has a dated line pointing here; the old text is kept.
5. **Order on the page.** Suggested: N1 banner (with N2 link) first, then the DRAFT note from the page file, then the title. 1号 decides the layout.
6. **Arabic.** Wrap any Latin word or link text next to Arabic in `<bdi>`; the banner itself has no Latin text.

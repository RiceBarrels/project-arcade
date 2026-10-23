# project-arcade — translation glossary

- **Date:** 2026-10-20 (updated after the round-2 sync: Send feedback, fee wording; then the i18n audit and the privacy "Analytics and cookies" sync, sections 6 and 7). Japanese (ja) rows added 2026-10-21.
- **Status:** machine-assisted draft — needs native-speaker review. No term below has been reviewed by a native speaker or approved by the user.
- **Source:** `docs/copy-en.md`. Translations: `docs/copy-<code>.md` for zh, zh-hant, es, fr, ar, tl, vi, ko, pt, ru, and ja (added 2026-10-21).
- **Japanese (ja):** added later than the other ten languages (2026-10-21) and checked by the same process: translated in parts, with each part checked by an independent checker against the decided ja term list (the same terms as the ja rows below). The ja choices, alternatives and reasons were decided in one term list before translation; `docs/copy-ja.md` does not yet end with its own term table, so the ja alternatives below are the place to look. Machine-assisted draft, not reviewed by a native speaker.

Each language file ends with its own full term table (all candidates and reasons). This page collects the core terms in one place so a reviewer can check them all at once. When a term is decided, change it here and in the matching `copy-<code>.md`.

## Ground rules for every language

- Kept in English everywhere: `project-arcade`, the `pre-alpha` badge, `DELETE` (code matches it exactly), `[message removed]` (database literal), placeholders `{amount} {item} {left} {Lender} {Name} {n} {email} {listing / user}`, `[contact email]`, `[Link to privacy policy]`.
- Damage price is never translated as a deposit, escrow or guarantee (the site holds no money).
- Lender/borrower avoid banking or money-lending words where the language allows.

## 1. Core terms (decision needed)

| Language | damage price | queue (noun / verb) | lend / borrow | lender / borrower | pre-alpha (prose) |
|---|---|---|---|---|---|
| zh 简体 | 损坏赔偿价 | 队列 / 排队 | 出借 / 借用 | 出借人 / 借用人 | 早期版本 |
| zh-hant 繁體 (Taiwan base) | 損壞賠償價 | 排隊清單 (tab 排隊) / 排隊 | 出借 / 借用 | 出借人 / 借用人 | 早期版本 |
| es (neutral Latin American) | precio por daños | fila / hacer fila | prestar / pedir prestado | prestador / prestatario | versión temprana |
| fr (international, Canada-compatible) | montant de dédommagement | file / rejoindre la file | prêter / emprunter | prêteur / emprunteur | version préliminaire |
| ar (MSA, RTL) | قيمة التعويض | قائمة الانتظار / الانضمام إلى قائمة الانتظار | يُعير / يستعير | المُعير / المستعير | نسخة مبكرة |
| tl (Filipino) | bayad-pinsala | pila / pumila | magpahiram / manghiram | nagpapahiram / nanghihiram | (badge only) |
| vi | giá đền bù | hàng chờ / xếp hàng | cho mượn / mượn | người cho mượn / người mượn | (badge only) |
| ko | 파손 배상금 | 대기열 / 줄 서다 | 빌려주다 / 빌리다 | 빌려주는 사람 / 빌리는 사람 | (badge only) |
| pt (pt-BR) | valor por danos | fila / entrar na fila | emprestar / pegar emprestado | emprestador / tomador | (badge only) |
| ru | сумма возмещения | очередь / встать в очередь | давать на время / брать на время | владелец / заёмщик | (badge only) |
| ja | 弁償額 | 順番待ち (list 順番待ちリスト) / 順番待ちに並ぶ | 貸す / 借りる (noun 貸し出し, status 貸出中) | 貸し手 / 借り手 | 初期バージョン (where the English says "pre-alpha": pre-alpha版) |

The `pre-alpha` badge stays in English in all ten languages and in ja; "(badge only)" means the file keeps the badge and explains it in its own words where the English prose does.

### Main alternatives and open points

**damage price**
- zh 损坏赔偿金 / 赔偿价. zh-hant 損壞賠償金 / 賠償價.
- es monto por daños / cargo por daños. fr prix de casse (does not cover loss) / valeur de remplacement.
- ar مبلغ التعويض / قيمة الضرر. Note: تعويض is also the legal word for "indemnity", so `indemnity` is kept in English in the ar lawyer to-do.
- tl halaga ng danyos / the English "damage price". vi mức đền bù / giá bồi thường. ko 변상금 / 파손·분실 배상금.
- pt preço por danos / valor de ressarcimento. ru стоимость ущерба / компенсация за ущерб.
- ja 弁償金 / 賠償額 (heavier, legal: 損害賠償) / 損害額 / 修理・弁償費用; long gloss where space allows: 破損・紛失時の弁償額. Never 保証金, デポジット, 敷金, 預り金 or 担保 (money held by someone; the site holds none).

**queue**
- zh-hant: 佇列 reads as a computer term in Taiwan; Hong Kong would say 輪候.
- es: cola sounds like Spain; formarse is Mexico-only. fr: faire la queue (France) / faire la file (Quebec) both avoided.
- ar: طابور is closer to colloquial. tl: waitlist is a common loanword alternative. ko: 웨이팅 is a common loanword alternative.
- ja: キュー rejected (a computing term). 予約 / 予約待ち rejected (suggest a confirmed booking for a set date, which the 48-hour turn system does not promise). 待ちリスト and ウェイティング are weaker alternatives.

**listing**
- ja: 出品 / 出品する rejected: Japanese readers know it from Mercari and auctions as putting something up for sale. 掲載 / 掲載する is neutral. 登録 rejected (also means sign-up), 投稿 rejected (reads like a social media post).

**lender / borrower**
- es prestatario has a slight banking tone (alternative: quien pide prestado).
- ar avoids المُقرض / المقترض (money lending).
- pt tomador has a slight banking tone (alternative: quem pega emprestado).
- ja: 貸主 / 借主 rejected (lease and loan-contract vocabulary, suggests rent). 出品者 rejected (implies a seller). 貸す人 / 借りる人 is the friendliest alternative but long when repeated. 貸し手 / 借り手 is used on the UI and legal pages alike.
- **ru needs a decision:** владелец literally means "owner", which is broader than "lender", especially in the terms and privacy sections. The reviewer clarified terms item 1 so it no longer says "not the owner". Legal alternative: ссудодатель / ссудополучатель; plain alternative: тот, кто даёт / тот, кто берёт.

## 2. Other recurring terms

| Language | gear | listing / list (verb) | handoff | Returned OK | Damaged or lost |
|---|---|---|---|---|---|
| zh | 装备 | 物品信息 / 上架 | 交接 | 完好归还 | 损坏或丢失 |
| zh-hant | 裝備 | 刊登 / 刊登 | 交接 | 完好歸還 | 損壞或遺失 |
| es | equipo | publicación / publicar | entrega | Devuelto en buen estado | Dañado o perdido |
| fr | matériel | annonce / proposer | remise | Rendu en bon état | Endommagé ou perdu |
| ar | المعدّات | عرض / اعرض | التسليم | أُعيد بحالة جيدة | تالف أو مفقود |
| tl | gamit | listing / i-list | abutan | Naibalik nang maayos | Nasira o nawala |
| vi | đồ dùng | tin đăng / đăng | giao nhận | Trả lại nguyên vẹn | Hư hỏng hoặc mất |
| ko | 장비 | 게시글 / 등록하다 | 전달 | 문제없이 반납 | 파손 또는 분실 |
| pt | equipamentos | publicação / publicar | entrega | Devolvido em bom estado | Danificado ou perdido |
| ru | вещи | объявление / выложить | передача | Возвращено в порядке | Повреждено или утеряно |
| ja | 道具 | 掲載 / 掲載する | 受け渡し | 問題なく返却 | 破損・紛失 |

| Language | the arcade | Report | Me (bottom bar) | tagline "Repeat" | address form (UI; legal pages: see section 4) |
|---|---|---|---|---|---|
| zh | 街机厅 | 举报 | 我的 | 再来一局 | 你 |
| zh-hant | 遊樂場 | 檢舉 | 我的 | 再來一局 | 你 |
| es | el arcade | Reportar | Perfil | Otra partida | tú |
| fr | l'arcade | Signaler | Moi | Rejoue. | tu |
| ar | صالة الأركيد | إبلاغ | حسابي | جولة جديدة | أنت, neutral forms where possible, else masculine generic |
| tl | arcade | I-report | Ako | Isa pang round. | ka/mo, no po |
| vi | hội arcade | Báo cáo | Tôi | Chơi lại. | bạn |
| ko | 오락실 | 신고 | 마이 | 한 판 더 | 해요체 (terms/privacy: 합니다체) |
| pt | o fliperama | Denunciar | Perfil | Mais uma partida | você |
| ru | аркада | Пожаловаться | Профиль | Ещё раунд | ты |
| ja | アーケード | 通報 | マイページ | もう一回。 | です・ます; subject dropped, あなた only as a last resort (at most once per screen); other people {Name}さん |

## 3. Cross-language decisions for the user

1. **Report vs Send feedback.** RESOLVED (2026-10-20): English now has a separate Send feedback entry (section 19); Report is only for abusive, unsafe or fake listings and users. Every language keeps its Report term, which now fits better. See section 5.
2. **Register on legal pages.** DECIDED by the user (2026-10-20): sections 8 (/terms) and 15 (privacy) use the formal form in every language; all other pages stay informal. See section 4.
3. **Gender and inclusive language.** es, fr, pt, ru and ar use the masculine as the generic form for lender/borrower/user; Arabic also has gendered "you". Needs a product decision.
4. **"the arcade".** Chosen words range from a literal arcade (街机厅, 오락실, o fliperama, صالة الأركيد) to the loanword (es, fr, tl, vi, ru, ja アーケード, which in Japanese also means a covered shopping street) to 遊樂場 (zh-hant; can mean a children's playground). Fallback in every language: project-arcade.
5. **Variants.** zh-hant is Taiwan-based (Hong Kong terms listed in its file). fr is international French (Quebec terms listed: courriel, fin de semaine, pourriel, témoins). pt is pt-BR only; pt-PT not done (differences listed: tela/ecrã, celular/telemóvel). es is neutral Latin American. vi lists northern/southern word choices. ar uses أكتوبر for October (Levant/Iraq would use تشرين الأول).
6. **Digits in Arabic.** Recommended Western digits 0-9 used consistently; the alternative is Eastern Arabic ٠-٩.

## 4. Formal address on the legal pages (sections 8 and 15)

User decision, 2026-10-20: the terms and privacy pages use formal address in every language; the rest of the site keeps the informal UI form. Choices below are the translators' and still need native-speaker review.

| Language | UI (informal) | Sections 8 and 15 (formal) | Why / rejected alternatives |
|---|---|---|---|
| zh | 你 | 您 / 您的 | Standard for Chinese terms and privacy pages. Plural 您们 avoided (nonstandard): "settled between you" became 由双方自行结算, "your conversations" became 与您的对话. |
| zh-hant | 你 | 您 | Taiwan convention for legal pages. 您們 avoided: 您與對方, 與您的對話. |
| es | tú | usted (su, sus, usted imperatives) | Usual register for terms in Latin America. Plural ustedes unchanged (same in both registers). vos and vosotros rejected (regional). |
| fr | tu | vous (votre, vos, vous imperatives) | Standard for French legal pages. Impersonal rewrites rejected (would change wording beyond the register). |
| ar | أنت, neutral where possible | No direct address: passive and impersonal wording (يجب، يُرجى، يمكن لـ) and third-person المستخدم | Arabic has no tu/vous split; this is the usual Arabic legal style ("يلتزم المستخدم"). It also removes masculine/feminine "you" from the legal pages. Respectful plural أنتم rejected. |
| tl | ka / mo / ikaw | kayo / ninyo / inyo (respectful plural); "po" used once, in "makipag-ugnayan po kayo sa amin" | Written formal Filipino marks respect with kayo/ninyo; "po" in every sentence reads spoken and heavy. |
| vi | bạn | Quý vị (capitalised; site stays chúng tôi; imperatives with vui lòng) | Usual polite form in Vietnamese notices, neutral between North and South. Quý khách (customer-service tone) and third-person người dùng (stiff) rejected. |
| ko | 해요체 | 합니다체 / 하십시오체, reader as 이용자 / 본인 or subject omitted | Already formal before this change; checked, no edits needed. |
| pt (pt-BR) | você | Third person "o usuário" (site as "nós"), no "seu/sua" | What a Brazilian lawyer would find most normal. "o senhor / a senhora" rejected (very unusual in Brazilian terms, forces gender); formal "você" rejected (same pronoun as the UI, so the switch is invisible). |
| ru | ты | вы (lowercase), ваш, вы imperatives | Russian legal texts use вы; capitalised Вы looks old-fashioned on a public page. |
| ja | です・ます, subject dropped, あなた as a last resort | です・ます (calm, no game tone), reader is 利用者 or the subject is omitted, possessives 利用者の / ご自身の; site 本サイト, "we" 私たち; never あなた | Japanese marks formality by verb endings, not a tu/vous pronoun, so both registers use です・ます; the legal pages differ in vocabulary (利用者, 本サイト, 物品). である体 rejected (would mix styles with the UI); 当サイト, 当方, 当社 rejected (当社 wrongly claims a company). |

Note for the code session: /terms and /privacy must not reuse UI strings (for example the 18+ line), or the two registers will mix on one page.

## 5. Send feedback (section 19, added 2026-10-20)

Report is abuse-only; Send feedback is for bugs, ideas and anything else about the site. Each language uses one Send feedback term in sections 1, 8, 9, 15 and 19, clearly different from its Report term.

| Language | Send feedback (label / button) | feedback (noun) | Report (unchanged) |
|---|---|---|---|
| zh | 发送反馈 | 反馈 | 举报 |
| zh-hant | 傳送意見回饋 | 意見回饋 | 檢舉 |
| es | Enviar comentarios | comentarios | Reportar |
| fr | Envoyer des commentaires | commentaires | Signaler |
| ar | إرسال ملاحظات | ملاحظات | إبلاغ |
| tl | Magpadala ng feedback | feedback | I-report |
| vi | Gửi góp ý | góp ý | Báo cáo |
| ko | 의견 보내기 | 의견 | 신고 |
| pt (pt-BR) | Enviar feedback | feedback | Denunciar |
| ru | Отправить отзыв | отзыв | Пожаловаться |
| ja | フィードバックを送る | フィードバック | 通報 |

Feedback type options (Bug / Idea / Other) are listed in each file's term table. zh keeps the Latin word "Bug" as the option label; to confirm.

New legal marker: `[NEEDS LAWYER CONFIRMATION: wording on fees.]` in section 8 item 13 is kept verbatim in all languages (text after the colon translated), like `[TO CONFIRM`.


## 6. Accepted variants and extra terms (audit, 2026-10-20)

Each language file was checked against this glossary on 2026-10-20 (one checker per language, plus an independent second check). Clear slips were fixed in the copy files (zh 2, zh-hant 2, fr 2, ar 1, ru 2; all listed in the coordinator report). These are not slips: they are accepted forms each file's own term table already allows, recorded here so the next audit does not flag them.

**pre-alpha in prose (all languages).** Where the English prose says "pre-alpha", the translations keep the word "pre-alpha" (for example 处于 pre-alpha 阶段, en pre-alpha). The prose terms in section 1 (早期版本, versión temprana, version préliminaire, and so on) are used only where the English says "early version". "(badge only)" in section 1 means the same thing; the prose gloss for those languages is: tl maagang bersyon, vi phiên bản thử nghiệm sớm, ko 초기 버전, ru ранняя версия. ja (added 2026-10-21) follows the same rule: pre-alpha版 where the English says "pre-alpha", 初期バージョン where it says "early version".

| Language | Accepted extra forms |
|---|---|
| zh | 借出 / 借 in casual UI sentences (legal sections use 出借); 物品 for a single item (gear = 装备); catalogue 装备目录 |
| zh-hant | queue alternatives also 隊列, 候補名單 (HK 輪候名單); damage-price alternative 損壞價 |
| es | feminine forms prestadora / prestataria; Perfil is both the bottom-bar tab and part of "Perfil y cuenta" in 18.3 (open point) |
| fr | queue verb also "ajouter à ta file" (step text); section 4 button keeps "Publier l'annonce"; Quebec variants also téléverser, clavarder, bogue, OBNL |
| ar | queue step title «احجز دورك»; bottom bar «الانتظار»; single item «غرض»; verbal nouns الإعارة / الاستعارة; report noun بلاغ |
| tl | lend also ipahiram, borrow also hiramin, list also mag-list; report (noun); puna for "your notes" in prose |
| vi | short forms đồ / món đồ; catalogue kho đồ; Browse Khám phá; damage claim yêu cầu đền bù hư hỏng |
| ko | queue verb also 대기열에 넣다 (adding an item); short button 문제없음 for Returned OK; user = 사용자 (UI) / 이용자 (legal sections) |
| pt | feminine forms emprestadora / tomadora; tagline uses singular "equipamento" |
| ru | loan выдача; your turn твой ход; site owner автор проекта (владелец is reserved for lender, pending decision); feedback types Ошибка / Идея / Другое |
| ja | single item アイテム (UI) / 物品 (legal sections 8 and 15); user ユーザー (UI) / 利用者 (legal); catalogue 道具一覧; Browse 探す; 掲載ページ where a concrete page is meant; your turn 順番が来ました / 順番が回ってきました！; Claim it / Pass for now 確保する / 今回は見送る; decline 断る; feedback types 不具合 / アイデア / その他. Open point: UI prose uses both このサイト and 本サイト (本サイト is decided only for the legal pages) |

**Known overlaps to watch.**
- ar: ملاحظات means both "feedback" (Send feedback) and "notes" (related notes, damage notes). On the privacy page the two appear two bullets apart. Native reviewer to decide whether one of them needs another word.
- ja: フィードバック (Send feedback) is kept apart from the vibration setting, which is バイブレーション, not 触覚フィードバック. 見送る is reserved for the borrower passing a turn; a lender declining is 断る.
- "What other users can see" (privacy): resolved 2026-10-20. The English now lists the real public profile contents and "simple counts" (listed, lent out, borrowed, came back OK, damaged or lost) instead of "lending history"; all ten files were resynced, which also removes the narrower Korean 빌려준 기록.

**Legal pages: precedence notice.** Strings for "unofficial translation, the English version applies" are in `docs/i18n-legal-notice.md`. Page-ready terms and privacy files are in `docs/legal-drafts/`.

## 7. Analytics and cookies (privacy section 15, added 2026-10-20)

New English text from the copy owner, marked "DRAFT, needs review" with several [TO CONFIRM] items; the wording may still change. Synced into all ten files and `docs/legal-drafts/<code>/privacy.md`, formal register, hedges kept ("based on Vercel's documentation", "can include"). `Vercel Web Analytics`, `beforeSend`, the doc title "Privacy and Compliance" and `NEEDS REVIEW.` stay in English everywhere.

| Language | Heading (translated part) | analytics | cookies | hash |
|---|---|---|---|---|
| zh | 网站分析和 Cookie | 网站分析 | Cookie | 哈希值 |
| zh-hant | 分析和 Cookie | 分析 | Cookie | 雜湊值 |
| es | Analítica y cookies | analítica | cookies | hash (un hash) |
| fr | Mesure d'audience et cookies | mesure d'audience | cookies | valeur de hachage (hash) |
| ar | التحليلات وملفات تعريف الارتباط | التحليلات | ملفات تعريف الارتباط | قيمة تجزئة (hash) |
| tl | Analytics at cookies | analytics | cookies | hash |
| vi | Phân tích truy cập và cookie | phân tích truy cập | cookie | giá trị băm (hash) |
| ko | 분석 도구와 쿠키 | 분석 | 쿠키 | 해시 |
| pt (pt-BR) | Análise de acessos e cookies | análise de acessos | cookies | hash (um hash) |
| ru | Аналитика и файлы cookie | аналитика | файлы cookie | хеш |
| ja | アクセス解析とCookie | アクセス解析 | Cookie (Latin script, not クッキー) | ハッシュ |

ja (added 2026-10-21) is in `docs/copy-ja.md` section 15 and `docs/legal-drafts/ja/privacy.md` (page language only there). Each heading is followed by the English marker "(DRAFT, needs review)" and its translation. Alternatives and reasons are in each file's term table.


## 8. Appearance / dark mode (section 24, added 2026-10-21)

Dictionary values for the 11 keys from `components/theme.tsx` match section 24 of each `docs/copy-<code>.md`. The three option labels are also used for `{theme}` in "Theme: {theme}", and the privacy local-storage sentence (section 15) uses the same words (it names Light and Dark as stored, and says nothing is stored on System). Machine-assisted draft — needs native-speaker review.

| Code | Appearance | System / Light / Dark | Theme (radio group label) | Change theme |
|---|---|---|---|---|
| zh | 外观 | 跟随系统 / 浅色 / 深色 | 主题 | 切换主题 |
| zh-hant | 外觀 | 跟隨系統 / 淺色 / 深色 | 主題 | 變更主題 |
| ja | 外観 | システム / ライト / ダーク | テーマ | テーマを変更する |
| es | Apariencia | Sistema / Claro / Oscuro | Tema | Cambiar tema |
| fr | Apparence | Système / Clair / Sombre | Thème | Changer de thème |
| ar | المظهر | تلقائي / فاتح / داكن | المظهر | تغيير المظهر |
| tl | Hitsura | System / Maliwanag / Madilim | Tema | Palitan ang tema |
| vi | Giao diện | Tự động / Sáng / Tối | Giao diện | Đổi giao diện |
| ko | 화면 모드 | 시스템 / 라이트 / 다크 | 테마 | 테마 바꾸기 |
| pt (pt-BR) | Aparência | Sistema / Claro / Escuro | Tema | Mudar tema |
| ru | Оформление | Системная / Светлая / Тёмная | Тема | Сменить тему |

- zh-hant uses 跟隨系統 (not 系統) to match zh 跟随系统 and so the label is not read as "the operating system".
- ar and vi use "Automatic" (تلقائي, Tự động) for System, and the Appearance word (المظهر, Giao diện) also for Theme (translator choice, not checked against current OS wording). tl keeps "System" in English (translator choice; native reviewer to confirm).
- ru labels are feminine (Системная / Светлая / Тёмная) to agree with тема; they read as "Тема: Тёмная".
- ja: native reviewer to choose システム or 自動 (Apple's Japanese term) for System. If it changes, update section 24, the dictionary, privacy section 15 and the legal draft together.
- The keys "System", "Light", "Dark" have no context prefix. If the same English word is ever used elsewhere with another meaning (for example "Light" for weight), it needs a context key such as "theme::Light", since several languages inflect these labels for "theme".

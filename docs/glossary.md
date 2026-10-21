# project-arcade — translation glossary

- **Date:** 2026-10-20 (updated after the round-2 sync: Send feedback, fee wording)
- **Status:** machine-assisted draft — needs native-speaker review. No term below has been reviewed by a native speaker or approved by the user.
- **Source:** `docs/copy-en.md`. Translations: `docs/copy-<code>.md` for zh, zh-hant, es, fr, ar, tl, vi, ko, pt, ru.

Each language file ends with its own full term table (all candidates and reasons). This page collects the core terms in one place so a reviewer can check them all at once. When a term is decided, change it here and in the matching `copy-<code>.md`.

## Ground rules for every language

- Kept in English everywhere: `project-arcade`, the `pre-alpha` badge, `DELETE` (code matches it exactly), `[message removed]` (database literal), placeholders `{amount} {item} {time left} {Lender} {Name} {n} {email} {listing / user}`, `[contact email]`, `[Link to privacy policy]`.
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

The `pre-alpha` badge stays in English in all ten languages; "(badge only)" means the file keeps the badge and explains it in its own words where the English prose does.

### Main alternatives and open points

**damage price**
- zh 损坏赔偿金 / 赔偿价. zh-hant 損壞賠償金 / 賠償價.
- es monto por daños / cargo por daños. fr prix de casse (does not cover loss) / valeur de remplacement.
- ar مبلغ التعويض / قيمة الضرر. Note: تعويض is also the legal word for "indemnity", so `indemnity` is kept in English in the ar lawyer to-do.
- tl halaga ng danyos / the English "damage price". vi mức đền bù / giá bồi thường. ko 변상금 / 파손·분실 배상금.
- pt preço por danos / valor de ressarcimento. ru стоимость ущерба / компенсация за ущерб.

**queue**
- zh-hant: 佇列 reads as a computer term in Taiwan; Hong Kong would say 輪候.
- es: cola sounds like Spain; formarse is Mexico-only. fr: faire la queue (France) / faire la file (Quebec) both avoided.
- ar: طابور is closer to colloquial. tl: waitlist is a common loanword alternative. ko: 웨이팅 is a common loanword alternative.

**lender / borrower**
- es prestatario has a slight banking tone (alternative: quien pide prestado).
- ar avoids المُقرض / المقترض (money lending).
- pt tomador has a slight banking tone (alternative: quem pega emprestado).
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

## 3. Cross-language decisions for the user

1. **Report vs Send feedback.** RESOLVED (2026-10-20): English now has a separate Send feedback entry (section 19); Report is only for abusive, unsafe or fake listings and users. Every language keeps its Report term, which now fits better. See section 5.
2. **Register on legal pages.** DECIDED by the user (2026-10-20): sections 8 (/terms) and 15 (privacy) use the formal form in every language; all other pages stay informal. See section 4.
3. **Gender and inclusive language.** es, fr, pt, ru and ar use the masculine as the generic form for lender/borrower/user; Arabic also has gendered "you". Needs a product decision.
4. **"the arcade".** Chosen words range from a literal arcade (街机厅, 오락실, o fliperama, صالة الأركيد) to the loanword (es, fr, tl, vi, ru) to 遊樂場 (zh-hant; can mean a children's playground). Fallback in every language: project-arcade.
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

Feedback type options (Bug / Idea / Other) are listed in each file's term table. zh keeps the Latin word "Bug" as the option label; to confirm.

New legal marker: `[NEEDS LAWYER CONFIRMATION: wording on fees.]` in section 8 item 13 is kept verbatim in all languages (text after the colon translated), like `[TO CONFIRM`.


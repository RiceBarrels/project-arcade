# UI dictionary review notes (i18n/messages/<code>.json)

- **Date:** 2026-10-20
- **Status:** machine-assisted draft — needs native-speaker review. Each dictionary was written by one agent and reviewed key by key by a second, independent agent; `bun run i18n:check` passes for all 10 languages (422 keys). No native speaker has reviewed any of it.
- **Source of the wording:** existing translations in `docs/copy-<code>.md` were reused wherever the same English sentence exists there; `docs/glossary.md` for fixed terms. UI register is informal (glossary section 4).
- **Not checked:** rendering in a browser (button and badge widths were judged from the source files only).

## zh

**Reviewer fixes:**
- "Offered to next · {count} in line" (item status badge): 已提供给下一位 · {count} 人排队 -> 已轮到下一位 · {count} 人排队 (提供给 reads as stiff translationese; 轮到 matches copy-zh 轮到你了 / section 10)
- "Offered to the person ahead of you. {count} people ahead." (plural, other): 已提供给排在你前面的人。... -> 已轮到排在你前面的人。你前面还有 {count} 人。
- "You're first in line. It's offered to you as soon as the lender confirms.": 你排在第一位。出借人一确认，就会提供给你。 -> 你排在第一位。出借人一确认，就轮到你。
- "{count} returned OK" (profile stats hint under Borrowed): {count} 件完好归还 -> {count} 次完好归还. It counts loans, not distinct items, and now matches the item page string {returned} 次完好归还 · {damaged} 次损坏归还

**Words chosen by the translator (not from the glossary or copy file):**
- Reviewer: 轮到 (it is someone's turn) is used for 'offered to' in the three queue strings, in place of the translator's 提供给
- Reviewer: 次 (times) is the counter for loan counts in profile stats ({count} 次完好归还), and 件 is kept for item counts ({count} listed -> 已上架 {count} 件)
- Kept the translator's choices after review: full-width Chinese punctuation throughout (copy-zh.md uses half-width , : ? ( ), so wording matches the copy doc but punctuation differs); half-width spaces around Latin and number placeholders, none around {category} (a Chinese category name, e.g. {category}类共 {count} 件物品)
- Kept: Damage: {damage} (item card) -> 赔偿价：{damage}. 赔偿价 is a glossary-listed short alternative to 损坏赔偿价, chosen for the compact card. The full term is used in every other string
- Kept: stat labels 已借出 / 已借用 / 收回时损坏 (lender view) / 归还时损坏 (borrower view), with hints 作为出借人 / 作为借用人
- Kept: category names 手动工具, 相机, 露营, 游戏, 乐器, 运动, 厨房用品, 派对和活动; conditions 全新 / 几乎全新 / 良好 / 一般 / 使用较多; loan badges 已请求 / 已批准 / 已交接 / 已归还 / 已拒绝 / 已取消
- Kept: e.g. Portland, OR -> 例如：俄勒冈州波特兰 (localized example city)

**Values left the same as English, or containing English on purpose:**
- Bug -> Bug (feedback type label; copy-zh term table and glossary section 5 keep the Latin word)

**For native review:**
- Condition labels: 几乎全新 (Like new) and 使用较多 (Well used)
- Profile stat labels 收回时损坏 / 归还时损坏 and the item-page line {returned} 次完好归还 · {damaged} 次损坏归还: check they read naturally side by side
- Damage: {damage} -> 赔偿价：{damage}; when waived it renders 赔偿价：损坏不收费 (slightly repetitive)
- {count} items in {category} -> {category}类共 {count} 件物品, and 在{category}类中找到 ...: check with each category name (e.g. 派对和活动类, 厨房用品类)
- The three queue strings now using 轮到 (offered to next / person ahead of you / first in line)
- Small fee -> 少量收费 and Fee period -> 计费周期 (form radio and select labels)

**Not verified:**
- Not rendered in a browser: button, badge and tab widths were judged from the source files only (Chinese is shorter than English, so truncation risk is low)
- Code issue, not fixable in JSON: components/list-form.tsx:118 joins the blocked category names with ', ' and calls toLowerCase(), so Chinese shows 电动工具, 交通工具, ... instead of 、. Needs a per-locale join in code
- No native-speaker review. git diff --stat showed no output for zh.json, so I could not confirm its tracked status through git. The file content was checked directly: key order matches en.json, 422 keys, 2-space indent, final newline
- The task brief mentions a 'Not found' key, but en.json has no such key; the 404 title key is 'Page not found' -> 找不到页面 (copy-zh section 22)
- Nothing committed or pushed, production not touched, no code changed; only /Users/muhengfan/project-arcade/i18n/messages/zh.json was edited

## zh-hant

**Reviewer fixes:**
- Small fee: 少許費用 -> 收一點費用 (stiff label; now matches copy section 4 wording 收一點費用)
- Listing published.: 刊登已發布。 -> 已成功刊登。 (more natural success notice)
- On loan. You're in line for when it comes back.: 借出中。等它回來時，你已經在排隊了。 -> 借出中。你已經在排隊，等它回來。 (word order)
- e.g. Portland, OR: 例如：台北市大安區 -> 例如：奧勒岡州波特蘭 (the form asks for USD prices and the English example is a US city; the zh file also keeps Portland)

**Words chosen by the translator (not from the glossary or copy file):**
- Small fee = 收一點費用 (reviewer)
- Listing published. = 已成功刊登。 (reviewer)
- e.g. Portland, OR = 例如：奧勒岡州波特蘭 (reviewer: kept the US example instead of a Taiwan one)
- Kept the translator's other choices: Damage: {damage} = 損壞賠償：{damage} (short card label, drops 價); Lent out 出借過 / Borrowed 借用過; Came back damaged 收回時已損壞 vs Returned damaged 損壞歸還, told apart by the hints 身為出借人 / 身為借用人; Well used 使用痕跡明顯; Like new 近全新; {count} items in {category} = {category}：{count} 件物品; dropping '#' in 第 {pos} 位
- Reports (data kept after account deletion) = 檢舉, as in copy 17.7. 檢舉紀錄 would be clearer, but I kept the copy-doc text

**Values left the same as English, or containing English on purpose:**
- none

**For native review:**
- Small fee 收一點費用 and Well used 使用痕跡明顯 (short labels with no copy-doc source)
- Damage: {damage} = 損壞賠償：{damage} on item cards. With a waived price it renders 損壞賠償：損壞時不收費 (slightly redundant; the English is redundant too)
- Profile stats labels 出借過 / 借用過 / 收回時已損壞 / 損壞歸還: possibly 出借次數 / 借用次數 would read better above a number
- All your items and their photos = 你所有的物品和其照片 (copy-doc text; 和其 is slightly stilted, 你所有的物品及照片 is an alternative)
- Something else and Other both 其他; Report and Reports both 檢舉 (as in the copy doc)
- Plural 'other' covers 0: the queue heading can show 你的排隊清單裡有 0 件物品 (the code only passes 0 there; zh-hant has only the 'other' category)
- Badge length: 已提供給下一位 · {count} 人排隊 on 2-column mobile item cards

**Not verified:**
- Browser rendering: badge, tab and button lengths, and spacing around placeholders
- Code issue, not translatable: components/list-form.tsx:119 joins blocked categories with ', ' and calls toLowerCase(), so zh-hant shows 電動工具, 交通工具, ... with an ASCII comma instead of 、
- Code issue: memberSince (lib/domain.ts:158) passes a raw 'YYYY-MM' string, so the profile shows e.g. 2026-10 加入 rather than a localised date
- No native-speaker review; this is a machine-assisted review only

## es

**Reviewer fixes:**
- "You're first in line. It's offered to you as soon as the lender confirms.": "Te toca primero..." -> "Estás primero en la fila. Se te ofrece en cuanto el prestador lo confirme." The old text said "it's your turn first" instead of "you are first in line". The new text has no gender agreement.
- "Nobody in line. Request it and you're first.": "...Pídelo y te toca primero." -> "No hay nadie en la fila. Pídelo y quedas primero." This is more natural and has no gender agreement.
- "On loan. Join the queue and you're first when it's back.": "Prestado. Haz fila y te toca primero cuando vuelva." -> "Prestado. Haz fila y quedas primero para cuando vuelva." This matches the wording of the previous fix.
- "Ready to borrow now" (home shelf heading): "Listos para pedir prestado ya" -> "Listos para pedir prestado ahora". The colloquial "ya" is removed.
- Process note: another process overwrote a generic script name in the shared scratchpad, so its output showed zh-hant values. The review script was moved to /private/tmp/claude-501/-Users-muhengfan-project-arcade/5ed0df83-368a-4a38-8d5f-eaf281136f28/scratchpad/es_review/. es.json was not affected; the translator's build script build_es.py may be overwritten the same way.

**Words chosen by the translator (not from the glossary or copy file):**
- Kept the translator's choices after review, apart from the 4 fixes above: "All" -> "Todas" (a browse chip under the Categories nav, checked in browse/page.tsx:50); profile stats "Lent out" -> "Prestados", "Came back damaged" -> "Volvieron con daños" and "Returned damaged" -> "Devueltos con daños"; count hints written as labels ("Publicados: {count}", "Devueltos en buen estado: {count}", "En buen estado: {returned} · Con daños: {damaged}"), so plural agreement isn't needed in non-plural keys
- "Search tents..." -> "Busca carpas...": the copy doc's illustration note says "tienda de campaña", but "carpa" is the more neutral Latin American word and it fits the placeholder better
- "Welcome back" -> "Qué bueno verte de nuevo" (from copy-es.md, so no gendered Bienvenido/a)
- "Publish listing" -> "Publicar" (copy-es.md button)
- "Claim it" / "Pass for now" -> "Lo tomo" / "Paso por ahora" (copy-es.md)
- "Last call: {left} left to respond." -> "Última llamada: tienes {left} para responder." (copy-es.md)

**Values left the same as English, or containing English on purpose:**
- Idea: the same word in Spanish (feedback type option: Error / Idea / Otro)
- Spam: copy-es.md section 9 keeps "Spam"

**For native review:**
- "Borrowed" (profile stat label, components/profile-stats.tsx:12) -> "Pedidos prestados" uses the copy doc's verb (pedido prestados). As a short uppercase label it can be misread as "lent orders". "Recibidos en préstamo" is an alternative, paired with "Dados en préstamo" for "Lent out".
- "Offered to next · {count} in line" -> "Ofrecido a quien sigue · {count} en la fila" is long for a status badge (components/status-badge.tsx:11).
- "Me" and "Profile" are both "Perfil" (glossary), so on mobile the bottom tab and the page title read the same.
- Masculine generics remain pending glossary decision 3: prestador, prestatario, "¿Eres nuevo?", "Listo(s) para pedir prestado", "miembro desde", "Reportar a este usuario".
- "e.g. Socket wrench set" was changed to "p. ej., juego de destornilladores" (screwdriver set), because the regional words for a socket set differ (dados/tubos/llaves de vaso).
- "#" is kept in "Estás en el lugar #{pos} de {total}" because the English has it; Spanish often writes "n.º".
- "Messages can be up to 2,000 characters." -> "2000" (RAE style, the same as copy-es.md). If the site formats numbers with es-419, other numbers will show as 2,000.

**Not verified:**
- The strings were not rendered in the running site, so wrapping or truncation of buttons, badges and the 4-column profile stats grid was not checked.
- No native speaker has reviewed this dictionary; it is a machine-assisted draft.
- The plural many branches equal other, as the task specifies. i18n-notes.md suggests leaving many out instead. Either form passes the check, and many only applies to exact millions.
- Each key's value was not compared word by word with every copy-es.md occurrence. Only the strings I flagged were spot-checked against the copy file.

## fr

**Reviewer fixes:**
- '{item}, borrowed by {name}. Check the item and tell us. This closes the loan.' (return-check.tsx:77): '{name} a emprunté {item}.' changed to '{name} a emprunté « {item} ».' The item title (user text) now sits in guillemets, as i18n-notes section 3 recommends and as the translator already did for '{name} about {item}'. Uses no-break spaces inside the guillemets.
- 'Offered to the person ahead of you. {count} people ahead.' (all 3 plural branches): 'Proposé à la personne avant toi.' changed to 'Proposé à la personne qui te précède.' 'ahead of you' is not 'avant toi', and the new wording does not repeat 'devant toi', which already ends the sentence.
- 'Number {position} of {total} in line' (queue-list.tsx:112, aria-label only): 'N° {position} sur ...' changed to 'Numéro {position} sur {total} dans la file'. This is read aloud by screen readers, which may read 'N°' badly. The visible '#' strings keep 'n°'.
- 'Rejoin' (queue-list.tsx:97, button after the 48 h window expired): 'Rejoindre' changed to 'Revenir dans la file'. Bare 'Rejoindre' has no object and loses the 're-' meaning. The button is size sm in a flex-wrap row, so the longer label fits.
- 'Ready to borrow now' (home shelf title, page.tsx:86): 'Disponible dès maintenant' changed to 'À emprunter dès maintenant'. The singular adjective did not agree with a shelf of several items. The new wording keeps 'borrow' and avoids agreement.
- '<b>{site}</b> is a non-profit community project. No ads, no platform fees, no payments through the site.': 'Sans pub, sans frais de plateforme, aucun paiement par le site.' changed to '... sans paiement par le site.' The list now uses 'sans' three times instead of switching to 'aucun', which matches the meta-description wording in copy-fr ('Sans pub, sans frais de plateforme').

**Words chosen by the translator (not from the glossary or copy file):**
- Revenir dans la file (Rejoin button)
- À emprunter dès maintenant (Ready to borrow now shelf title)
- Numéro {position} sur {total} dans la file (screen-reader label)
- Proposé à la personne qui te précède (Offered to the person ahead of you)
- Kept the translator's own choices after review. These are not in copy-fr or the glossary: Tout (All), Menu principal (Main), La communauté en chiffres, Tout voir, Voir ma file, Prêtés en ce moment, the status badges Demandé/Approuvé/Remis/Rendu/Refusé/Annulé, the profile stats Prêtés/Empruntés/Revenus endommagés/Rendus endommagés, the 'Label : {count}' stat pattern, the conditions Neuf/Comme neuf/Bon état/État correct/Très utilisé, Petite somme, Frais, Période des frais, Aucun montant, Rien à payer si endommagé, Choisis une option, Emprunt gratuit, 'Proposé au suivant' (masculine generic), and 'Tiens-t'en aux faits'.
- 'Tiens-t'en aux faits.' and '{name} au sujet de « {item} »' differ on purpose from copy-fr ('Reste factuel.' / no quotes). The first avoids gender agreement and the second follows i18n-notes section 3. copy-fr.md was not changed, so the doc and the site differ on these two strings.

**Values left the same as English, or containing English on purpose:**
- Bio, Bug, Camping, Description, Instruments, Message, Messages, Photos, Spam, Sports, Type: the French word is spelled the same (Bug is the copy-fr choice for the feedback type). I checked each one and all are correct as they are.
- DELETE, pre-alpha, [message removed] and USD are inside values and kept verbatim, as required.
- 'e.g. Portland, OR' became 'p. ex. Portland, OR'. Only 'e.g.' is translated; the US city example is kept.

**For native review:**
- Every value: this is a machine-assisted draft. Neither the translator nor I is a native speaker or a lawyer.
- 'Ready to borrow' (card badge): 'Disponible à l'emprunt' comes from copy-fr section 7 but is long for a badge. 'Disponible' would be shorter.
- 'Well used': Très utilisé (other options: Usé, État d'usage).
- 'Small fee' radio option: Petite somme. 'Payant' would mirror the field label 'Gratuit ou payant' but would lose 'small'.
- 'Claim it': Je le prends (copy-fr section 10). 'Réserver' would be an alternative.
- 'You're #{pos} of {total} in line.' → 'Tu es n° {pos} sur {total} dans la file.' French has no natural ordinal here without a plural/ordinal rule.
- '{name} a emprunté « {item} ». Vérifie l'objet et dis-le-nous.' Check whether 'dis-le-nous' reads naturally there, or whether 'dis-nous dans quel état il est' is better.
- Plural 'one' covers 0 ('0 objet', '0 personne dans la file'). It is grammatical but reads mechanically. The dictionary format has no =0 branch. The queue and item-page counts already handle zero in code; the browse counts ('{count} items…') can show '0 objet'.
- Masculine generic: 'Proposé au suivant', 'Approuvé/Remis/Rendu' and the 'prêteur/emprunteur' labels (glossary section 3 point 3 is still open).

**Not verified:**
- No rendering check in a browser. I did not check truncation of the longer labels on narrow screens: 'Revenir dans la file', 'Disponible à l'emprunt', 'Proposé au suivant · {count} dans la file' and 'Enregistrer le nouveau mot de passe'.
- Whether the next.js runtime shows the no-break spaces (U+00A0 and the U+202F in '2 000') correctly and keeps them through t.rich. They are stored in the JSON; the check script accepts them.
- Screen-reader output for the aria-labels.
- Native-speaker or lawyer review: none was done.

## ar

**Reviewer fixes:**
- Review done: I read all 422 keys in /Users/muhengfan/project-arcade/i18n/messages/ar.json and fixed 6 values. Nothing was committed or pushed, production was not touched, no code was changed, and i18n:extract was not run. Key order still matches en.json, the file is UTF-8 with 2-space indent and a final newline, and there are no RTL control characters, Eastern Arabic digits, emoji, or values left identical to their English key.
- Plural key 'Offered to the person ahead of you. {count} people ahead.': the zero branch contradicted itself (offered to the person ahead of you / nobody is ahead of you). It is now just the first sentence: عُرض الغرض على من يسبقك في قائمة الانتظار. The code never sends 0 here (queue-list.tsx uses another string when ahead === 0), but the branch is no longer contradictory.
- 'Pick one' (placeholder of the Category and Condition selects, list-form.tsx:107/126): اختر واحدًا -> اختر من القائمة. Both nouns (فئة, حالة) are feminine, so the masculine واحدًا did not agree; the new text has no gender agreement.
- 'Out on loan' (h2 over the list of your lent-out items, profile/page.tsx:78): مُعار حاليًا -> المُعار حاليًا, so it reads as a section heading rather than a single item's status.
- 'Uses sample data, so you can see how messaging will look...' (messages/page.tsx:113): تستخدم بيانات تجريبية could be read as 'you use sample data'. Changed to تعتمد هذه المعاينة على بيانات تجريبية لترى كيف ستبدو المراسلة. لا شيء فيها حقيقي.
- 'Party & events': الحفلات والمناسبات -> حفلات ومناسبات, to match the other categories in the same list (أدوات يدوية, كاميرات, تخييم, ألعاب ...), none of which have the article ال.
- 'Damage price (USD)' (visible label, list-form.tsx:182): قيمة التعويض (USD) -> قيمة التعويض (بالدولار الأمريكي), so it matches 'Fee in USD' = الرسم بالدولار الأمريكي. This fixes the inconsistency the translator flagged.

**Words chosen by the translator (not from the glossary or copy file):**
- Pick one = اختر من القائمة (reviewer)
- Out on loan (profile heading) = المُعار حاليًا (reviewer)
- Party & events = حفلات ومناسبات (reviewer)
- Damage price (USD) = قيمة التعويض (بالدولار الأمريكي) (reviewer)
- Kept the translator's own choices after checking them in context: Lent out / Borrowed = الإعارات / الاستعارات; as lender / as borrower = بصفة المُعير / بصفة المستعير; Came back damaged / Returned damaged = عاد تالفًا / أُعيد تالفًا; counts as 'label: {count}' (المعروض: {count}, في الانتظار: {count}); character limits as يجب ألا يتجاوز عدد أحرف X {max}; statuses تمت الموافقة / تم الطلب / تم التسليم / مرفوض / ملغى / أُعيد; Claimed: {title} = تم الطلب: {title}; {item}، المستعير: {name}; e.g. Portland, OR = مثلًا: بورتلاند، أوريغون

**Values left the same as English, or containing English on purpose:**
- No value is identical to its English key.
- These literals stay in Latin script inside Arabic values, as the rules and copy-ar.md require: {site} and the other placeholders, pre-alpha, DELETE, [message removed], iPhone/iPad. (USD) was removed from the damage price label.

**For native review:**
- 'Queue' = الانتظار: one key serves both the bottom-bar tab (lib/nav.ts:14) and the item-page h2 (item/[id]/page.tsx:101). It is fine on the tab but bare as a heading; قائمة الانتظار would need a separate key in code.
- 'Claimed: {title}...' = تم الطلب: {title}. This is the same wording as the 'Requested' status badge. تم التأكيد: {title} is an alternative.
- 'Skip' = تخطٍّ (verbal noun, from copy-ar 18.1). Many Arabic apps use تخطي.
- Generic masculine imperatives (كن أول من, اختر, ردّ, التقِ, جرّب), following the copy-ar.md convention.
- 'Came back damaged' (عاد تالفًا) and 'Returned damaged' (أُعيد تالفًا) are close in meaning; only the hints بصفة المُعير / بصفة المستعير tell them apart.
- 'Respond within {left} to keep your spot.' = ردّ خلال {left}. This is only grammatical because {left} uses the abbreviated units س / د; the long form (ساعتان) would need the oblique case after خلال.
- Dual forms in the plurals (غرضان, شخصان) are nominative in every sentence used; worth a native check.
- 'Sign up' and 'Create account' are both إنشاء حساب (as in copy-ar.md).

**Not verified:**
- The Arabic text has not been rendered in a browser. I did not check RTL layout, bidi isolation of placeholders, or truncation of long buttons and tabs (for example الانضمام إلى قائمة الانتظار, إرسال رابط إعادة التعيين, قيمة التعويض (بالدولار الأمريكي)) at phone width.
- Code issue, not fixable in the JSON: list-form.tsx:118 joins the blocked categories with ", " and .toLowerCase(), so the Arabic line 'غير مسموح حاليًا: {categories}.' will show a Latin comma. It should use Intl.ListFormat(locale) and drop toLowerCase for ar.
- The checker only covers keys, placeholders, tags and plural categories. No native speaker or lawyer has reviewed this machine-assisted draft.
- en.json had no 'Not found' key (the 404 strings are 'Page not found' = الصفحة غير موجودة and 'Nothing on this shelf' = لا شيء على هذا الرف, both from copy-ar.md section 22). There was no Source error.

## tl

**Reviewer fixes:**
- "Fair" (condition label, lib/domain.ts:96): "Puwede na" -> "Katamtaman". "Puwede na" reads as colloquial 'good enough' and is weak as a grade in the New / Like new / Good / Fair / Well used scale. The translator had flagged this one.
- "Fee period" (aria-label on the per loan/day/week select, components/list-form.tsx:156): "Bawat kailan ang bayad" -> "Dalas ng bayad". The old text was ungrammatical as a label. The translator had flagged this one too.
- "On loan. You're in line for when it comes back." (queue-list.tsx waitingText): "May nakahiram pa. Nakapila ka para pagbalik nito." -> "May nakahiram pa. Nakapila ka na para sa pagbalik nito." The old text was missing the "sa" after "para".

**Words chosen by the translator (not from the glossary or copy file):**
- Fair = Katamtaman (reviewer change, replacing Puwede na)
- Fee period = Dalas ng bayad (reviewer change, replacing Bawat kailan ang bayad)
- Kept the translator's other choices after checking them in context. On loan badge = Nakapahiram. Out on loan heading = Nakapahiram ngayon. Profile stats: Naipahiram / Nahiram / Bumalik nang sira / Ibinalik nang sira, with hints bilang nagpapahiram / bilang nanghihiram. Loan badges: Ni-request / Aprubado / Naiabot na / Naibalik / Tinanggihan / Kinansela. Request to borrow = I-request na hiramin. Waiting for your turn. = Hinihintay ang turn mo. Fragments without markers: "{item}, kausap: {name}", "{item}. Nanghiram: {name}." and "Kondisyon sa pagbalik: {item}".

**Values left the same as English, or containing English on purpose:**
- Bio, Display name, Email, Password, Profile, Settings, Item, Spam, Bug, Home: these loanwords match the loanword list in copy-tl.md and the bottom bar in section 18.2
- Camping, Sports: category chips kept as common loanwords
- Kept verbatim on purpose inside translated values: DELETE, [message removed], Portland, OR, USD, pre-alpha, all placeholders and tags

**For native review:**
- "{item} with {name}" = "{item}, kausap: {name}" (an uppercase h1 in thread-view.tsx:46). It differs from copy-tl.md 17.6 ("{item} kasama si {Name}") because {name} can be "Binurang account", and si goes only before personal names. Either the copy doc or the dictionary needs updating so they agree.
- "{item}, borrowed by {name}. ..." = "{item}. Nanghiram: {name}. ...". This avoids ni for the same reason.
- "Fair" = "Katamtaman": please confirm against "Puwede na".
- "Fee period" = "Dalas ng bayad" (aria-label only). "per loan" is not strictly a frequency.
- "Request to borrow" = "I-request na hiramin" (main button on the item page). "Mag-request na manghiram" is an alternative.
- "Your place in line for each item. First come, first served.": the second sentence is the idiom "Kung sino ang nauna, siya ang uunahin."
- "{count} items in {category}" gives "5 item sa Mga camera", with a capitalised Mga in the middle of the sentence because the category name is inserted as-is. The English has the same capitalisation.
- Countdown units "{h} oras {m} min" and "{m} min" (from copy-tl.md section 22)
- Button length: Tingnan ang katalogo, Ipadala ulit ang verification email, Naibalik nang maayos and Mag-browse (bottom bar) are about 20-40% longer than the English. Check them on a phone.

**Not verified:**
- None of this has been reviewed by a native speaker or a lawyer.
- I did not check rendering in the browser (truncation of badges or buttons, the uppercase h1, line wrapping on mobile).
- I did not look at the tl plural forms at runtime with Intl.PluralRules('fil'). Both branches have the same text and zero is handled by separate strings in the code, as i18n-notes says.
- I could not run git diff --stat on tl.json because it produced no output, so I cannot show a diff summary. No git command that changes anything was run, and nothing was committed or pushed.

## vi

**Reviewer fixes:**
- Changed the profile stat label 'Came back damaged' (lender view, profile-stats.tsx:13) from 'Bị trả về hư hỏng' to 'Nhận lại bị hư hỏng'. Changed 'Returned damaged' (borrower view, profile-stats.tsx:14) from 'Đã trả về hư hỏng' to 'Trả lại bị hư hỏng'. The old pair was almost identical in Vietnamese. The new labels contrast 'got it back damaged' with 'returned it damaged', and the second now matches 'Trả lại nguyên vẹn' (Returned OK).
- No other changes. All 422 keys were read in order and checked against copy-vi.md (sections 1-19, including the 17.7 deleted/kept lists and the 19 feedback types Lỗi / Ý tưởng / Khác), the glossary terms and the code context in key-sources. The file was rewritten in en.json key order with UTF-8, 2-space indent and a final newline. Nothing was committed or pushed, production was not touched, and no code was changed.

**Words chosen by the translator (not from the glossary or copy file):**
- Profile stats (reviewer change): Came back damaged = 'Nhận lại bị hư hỏng'; Returned damaged = 'Trả lại bị hư hỏng'
- Accepted from the translator, not in the copy docs: conditions Mới / Như mới / Tốt / Khá / Đã dùng nhiều; categories Máy ảnh, Cắm trại, Dụng cụ cầm tay, Đồ bếp, Tiệc và sự kiện, Thể thao, Trò chơi, Nhạc cụ; Category/Categories = 'Loại đồ'
- Fee period 'Kỳ tính phí', Fee in USD 'Phí (USD)', Small fee 'Phí nhỏ', Free to borrow 'Mượn miễn phí', Damage: {damage} 'Đền bù: {damage}'
- Loan status badges: Đã gửi yêu cầu / Đã duyệt / Đã giao nhận / Đã trả / Đã từ chối / Đã hủy
- Queue: In line 'Đang xếp hàng', of {total} 'trên {total}', Offered to next · {count} in line 'Đã dành cho người tiếp theo · {count} người chờ', On loan · {count} in line 'Đang có người mượn · {count} người chờ'
- Main (nav aria-label) 'Điều hướng chính'; Screen {step} of {total} 'Màn hình {step} trên {total}'; {item}, borrowed by {name}. -> '{item}, do {name} mượn.'
- {h}h {m}m = '{h} giờ {m} phút', {m}m = '{m} phút' (i18n-notes vi section); Last updated: {date} = 'Cập nhật lần cuối: {date}'

**Values left the same as English, or containing English on purpose:**
- Email: copy-vi.md uses 'Email' as the field label (17.1, 17.3)
- Spam: copy-vi.md section 9 keeps 'Spam' as a report reason
- Also kept verbatim inside translated strings: DELETE, pre-alpha, iPhone/iPad, USD, [message removed], and 'arcade' in 'hội arcade' (glossary)

**For native review:**
- 'Fair' = 'Khá' (item condition, below 'Tốt'): the order is right, but 'Tạm được' or 'Bình thường' may read more like English 'Fair'
- Badge length: 'Đã dành cho người tiếp theo · {count} người chờ' (status-badge.tsx:11) is long for a badge. A shorter form such as 'Dành cho người kế · {count} người chờ' could be used if it wraps badly
- Profile stat labels 'Nhận lại bị hư hỏng' / 'Trả lại bị hư hỏng' (reviewer change): confirm they read naturally in the small uppercase cells
- '{item}, do {name} mượn.' (return-check.tsx:77): grammatical, but a native speaker may prefer no comma or another construction
- 'Rời hàng chờ: {title}' / 'Bạn đã rời hàng chờ: {title}.' use a colon so nothing is glued to user text, which reads a little stiffly
- 'trên {total}' under '#N' (uppercase xs) and 'ĐANG XẾP HÀNG' in the narrow queue column: check diacritic clipping and wrapping with CSS uppercase (i18n-notes vi, uppercase and diacritics)
- Curly quotes around “[message removed]” and “Không tính phí nếu hư hỏng” follow copy-vi.md; the English keys use straight or curly quotes

**Not verified:**
- Not rendered in a browser: badge and button widths, wrapping and stacked-diacritic clipping under CSS uppercase were not seen
- No native-speaker or lawyer review: this is a machine-assisted draft
- Whether plural keys need '=0' branches: the code calls plain {count} in an 'other' branch; zero cases were not checked in the UI
- The 'Not allowed for now: {categories}.' list is built by code (translated names joined with ', ', then lowercased). The Vietnamese result was not seen rendered

## ko

**Reviewer fixes:**
- "Marked as damaged. You set no charge for this item, so nothing is owed.": the old text '이 물건에는 배상금을 정하지 않았으니' reads as 'you never set a damage price', not 'you chose no charge'. It is now '파손으로 표시했어요. 이 물건은 파손돼도 청구하지 않기로 했으니 낼 돈은 없어요.', which matches the 'No charge if damaged' term (파손돼도 청구 없음) and the wording of the sibling key at return-check.tsx:113.
- "This tells the borrower it came back damaged. You set no charge for this item, so nothing is owed.": made the same correction. It is now '빌리는 사람에게 물건이 파손된 채 돌아왔다고 알려요. 이 물건은 파손돼도 청구하지 않기로 했으니 낼 돈은 없어요.'
- "You passed on {title}. It moves to the next person in line.": changed '줄의 다음 사람에게' to '대기열의 다음 사람에게'. 'Next person in the queue' is written that way everywhere else, including copy-ko.md section 10 and the "Time's up..." key.
- "Offered to the person ahead of you. {count} people ahead." (plural, other): changed '내 앞 사람에게 먼저 차례가 갔어요. 내 앞에 {count}명이 있어요.' to '앞사람에게 먼저 차례가 갔어요. 내 앞에 {count}명이 있어요.' to remove the repeated '내 앞'.

**Words chosen by the translator (not from the glossary or copy file):**
- The 4 fixes above are my own wording choices. They are not in the glossary or copy-ko.md, except that 대기열의 다음 사람 follows copy-ko.md section 10.
- I accepted the translator's terms after checking them in context: conditions (새것/거의 새것/좋음/보통/많이 사용함), categories, fee periods (1일/1주/1회 대여 기준, which fit the w-36 select), status badges, profile stats, queue position strings, 주 메뉴 for the nav aria-label, and '{date} 가입'.

**Values left the same as English, or containing English on purpose:**
- No value is identical to its English key.
- Parts kept in English on purpose: pre-alpha in prose (the glossary section 6 rule), DELETE in two keys, "[message removed]" (a database literal), USD in 'Damage price (USD)' and 'Fee in USD', iPhone/iPad, and 'Portland, OR' in '예: Portland, OR'. The site uses USD; a native reviewer may prefer a Korean example city.

**For native review:**
- "{site} is pre-alpha, so your notes really help..." and "<b>{site}</b> is a non-profit community project..." were restructured so only the invariant 에/에는 follows {site}. copy-ko.md writes 'project-arcade는'. If SITE_NAME stays project-arcade, the copy-doc wording would also be safe.
- 'Ready to borrow' badge = '지금 빌릴 수 있어요' (from copy-ko.md section 7). It is a full sentence inside a badge; a shorter form would be '빌릴 수 있음'.
- 'of {total}' = '총 {total}명' under the large '#3' in the queue list; '/ {total}명' is an alternative.
- "You're up next! #1 of {total}" = '내 차례가 왔어요! {total}명 중 #1' keeps the English '#1'.
- 'Screen {step} of {total}' = '화면 {step} / {total}' (an onboarding aria-label); a screen-reader phrasing such as '{total}개 화면 중 {step}번째' may sound more natural.
- 'Join the queue', 'Queue it' and 'Rejoin' (다시 줄 서기) all use 줄 서기. 'Report' and 'Reports' are both 신고.
- 'Damage: {damage}' = '배상금: {damage}' is a short form of 파손 배상금 on item cards. When the item has no charge it reads '배상금: 파손돼도 청구 없음', which is redundant, just as the English is.
- Long-ish xs hints on the profile stats: '빌려주는 사람으로서' and '빌리는 사람으로서'.
- No native-speaker or lawyer review has been done. The legal notice key uses the fixed 합니다체 text exactly as given.

**Not verified:**
- Rendering in the browser, so button, badge and select overflow on mobile was not checked; the Korean font and word-break: keep-all were not checked either.
- That no code appends 님 or a particle after {name}; I only checked the call sites at thread-view.tsx:46, messages/page.tsx:67 and return-check.tsx:77, which pass raw names.
- Whether the 8 plural keys read well with count 0 or 1. Korean has only 'other', so '내 앞에 1명이 있어요' is fine, but 0 is handled by separate code paths that I did not run.
- Nothing was committed or pushed, production was not touched, no code was changed, and i18n:extract was not run. The only file I edited is /Users/muhengfan/project-arcade/i18n/messages/ko.json.

## pt

**Reviewer fixes:**
- Five plural keys were changed so a count of 0 reads correctly. pt-BR puts 0 in the 'one' category (I checked with Intl.PluralRules('pt-BR'): 0 gives one). The code has no zero branch, so before this fix an empty queue heading showed '0 item na sua fila' and an empty search showed '0 item encontrado para ...', which is wrong Portuguese. I switched them to the 'label: number' pattern, with the same text in one/many/other, so it reads correctly for every count: '{count} items' -> 'Itens: {count}'; '{count} items in {category}' -> 'Itens em {category}: {count}'; '{count} items in your queue' -> 'Itens na sua fila: {count}'; '{count} items matching “{q}”' -> 'Resultados para “{q}”: {count}'; '{count} items matching “{q}” in {category}' -> 'Resultados para “{q}” em {category}: {count}'.
- '{count} listed' (hint in the profile stats grid) changed from 'publicados: {count}' to 'itens publicados: {count}'. On its own, 'publicados' didn't say what was published, and the new wording matches 'items listed' -> 'itens publicados' on the home page.

**Words chosen by the translator (not from the glossary or copy file):**
- Browse result counts use 'Resultados para “{q}”: {count}' (results) instead of 'itens encontrados', to avoid the zero/one problem.
- I kept all of the translator's own choices after checking them in context: 'All' -> 'Todas' (category chips, so feminine agrees with categoria); profile stats 'Emprestou' / 'Pegou emprestado' / 'Voltaram com danos' / 'Devolveu com danos'; 'Rejoin' -> 'Voltar para a fila'; 'Dismiss {title}' -> 'Remover {title} da lista' (the close button on an expired queue entry); 'Claimed: {title}...' -> 'Você garantiu: {title}...'; 'Offered to next · {count} in line' -> 'Oferecido ao próximo · {count} na fila'; '{item}, borrowed by {name}' -> '{item}, que estava com {name}', which avoids gender agreement.
- Every value that also appears as copy-en text matches copy-pt.md exactly. I checked this with a script: the only difference is 'Returned damaged', which here is a profile stat label, not the status label from copy section 7, so 'Devolveu com danos' is correct.

**Values left the same as English, or containing English on purpose:**
- Bio (the word copy-pt uses, 17.7)
- Bug (the glossary's term for the feedback type)
- Camping (the normal pt-BR word)
- Item (the same word in Portuguese)
- Spam (the standard pt-BR term)

**For native review:**
- The 'label: number' count lines ('Itens na sua fila: 3', 'Resultados para “bike”: 12'). They are grammatical for every count. A better fix is in the code: support an explicit zero branch, or show a zero string for empty lists. Then the natural forms ('3 itens na sua fila', 'Nenhum item na sua fila') can come back. This is a code-session item.
- The home 'How it works' step titles mix moods: 'Explorar' (infinitive, because the 'Browse' key is shared with the nav label), then 'Entre na fila' / 'Pegue emprestado' / 'Devolva' (imperative, as in copy-pt section 3, which uses 'Explore'). Fixing this needs either a separate key for the step title in code, or all-infinitive titles ('Entrar na fila', 'Pegar emprestado', 'Devolver'), which would differ from copy-pt.
- Badge length: 'Pronto para pegar emprestado' (it matches copy-pt) and 'Oferecido ao próximo · {count} na fila' may be too long for status badges on phones. 'ao próximo' is masculine generic.
- The profile stats grid labels are uppercase text-xs in a 2-column grid on mobile: 'PEGOU EMPRESTADO', 'VOLTARAM COM DANOS', 'DEVOLVEU COM DANOS'. Also check that the hint 'em bom estado: {count}' under 'Pegou emprestado' is clear enough.
- 'Me' and 'Profile' are both 'Perfil' (the glossary's choice), so the bottom-bar tab and the page title use the same word.
- 'e.g. Portland, OR' is kept as 'ex.: Portland, OR' (the site's area is not known).
- Masculine generic forms: 'como tomador', 'como emprestador', 'membro desde {date}', 'Obrigado'. These follow the copy-pt gender note.

**Not verified:**
- No native-speaker or lawyer review. Everything is a machine-assisted draft.
- I didn't view the rendered pages, so whether badges, buttons and stat labels get cut off or wrap badly is unchecked.
- I didn't check the code-side zero handling beyond reading browse/page.tsx, queue-list.tsx and item/[id]/page.tsx. The people-ahead and in-line plural keys are guarded by count > 0 in the code, so I left them in natural form.
- Nothing committed or pushed, production not touched, no code changed. The only file I edited is i18n/messages/pt.json, and I didn't run i18n:extract.

## ru

**Reviewer fixes:**
- "Pick one" (the placeholder in the Category and Condition selects, components/list-form.tsx:107,126): changed "Выбери" to "Выбери вариант". A bare "Выбери" read as cut off.
- "Uses sample data, so you can see how messaging will look. Nothing in it is real." (app/[locale]/messages/page.tsx:113): changed "примерные данные" to "демонстрационные данные". "Примерные" can be read as "approximate".

**Words chosen by the translator (not from the glossary or copy file):**
- Выбери вариант (Pick one, select placeholder): my wording in this review.
- демонстрационные данные (sample data, in the messages preview note): my wording in this review.
- I accepted the translator's other decisions, listed in the translator report: (вещь удалена); {amount} в день / в неделю / за выдачу; на сайте с {date}; выложено: {count}; возвращено в порядке: {count}; вещи в каталоге / участники / комиссия платформы; Сообщество в цифрах; Дано на время / Взято на время; Вернулось с повреждением / Возвращено с повреждением; loan status badges Запрошено / Одобрено / Передано / Возвращено / Отклонено / Отменено; conditions Новое / Как новое / Хорошее / Удовлетворительное / С заметным износом; categories Ручные инструменты / Походы / Музыкальные инструменты / Спорт / Кухня / Праздники и мероприятия; Без платы / Без платы за повреждение; Возмещение: {damage}; Плата / Плата в USD / Период оплаты / Небольшая плата / Можно брать бесплатно; На руках / Сейчас на руках; Попросить на время; Снова в очередь; Скрыть: / Скрыто: {title}; Твой ход! №1 из {total}; Где забрать: {city}; Главное меню; Найти; Поиск вещей; Смотреть все; Вещь; Кто раньше встал, тот раньше и берёт; Уложись в 80 символов.

**Values left the same as English, or containing English on purpose:**
- none

**For native review:**
- "Browse" is one key used three ways: the nav tab, the /browse page title, and a step title on the home page (app/[locale]/page.tsx:26). I kept "Каталог", which fits the tab and the page title. Among the other step titles (Вставай в очередь / Бери / Возвращай) it is the only noun; copy-ru section 3 uses "Ищи" for that step. Splitting the key would need a code change.
- "List your gear" is one key for both the buttons and the /list page heading. I kept the button form "Выложить свои вещи"; copy-ru section 4 uses "Выложи свои вещи" for the heading.
- "No charge if damaged" is shared between the checkbox label and the value from damageLabel. On item cards it reads "Возмещение: Без платы за повреждение" and on the queue offer "Сумма возмещения: Без платы за повреждение": capitalised after a colon and a little redundant. The English is just as redundant.
- "Came back damaged" (as lender) and "Returned damaged" (as borrower) became "Вернулось с повреждением" and "Возвращено с повреждением". These are close; only the hints "в роли владельца" and "в роли заёмщика" tell them apart.
- "Fair" is "Удовлетворительное" (the usual marketplace term) and "Well used" is "С заметным износом". Both are long for item cards.
- "{item} with {name}" is the uppercase H1 of a message thread: «{item}». Собеседник: {name}. It follows copy-ru's note 8, which avoids case endings, but the heading is heavy.
- The validation strings "… can be at most {max} characters", "Up to {max} characters." and "Optional. Up to {max} characters." are not plural keys. "символов" is correct for the current values (60, 80, 500) but would be wrong if {max} ever ended in 1 to 4.
- "Me" and "Profile" are both "Профиль", as the glossary says. This is the same overlap copy-ru already flags.
- "Messages the other person sent in your conversations" (a settings and account-deletion list) uses "в ваших переписках", meaning plural "you" (both people), as in copy-ru. Check that it does not read as formal address in the informal UI.
- Lender safety checkbox: "Вещь проверена мной: …" is taken from copy-ru section 11 to avoid a gendered past tense. It is grammatical but slightly stiff.
- "Fee: {fee} (paid directly to the lender)" is "Плата: {fee} (платится напрямую владельцу)". "Платится" is colloquial; a native reviewer may prefer another verb.

**Not verified:**
- I did not see the strings rendered in a browser. Length on buttons and badges (Удовлетворительное, Возвращено в порядке, Выложить свои вещи, Отправить письмо ещё раз) on mobile was checked only against the code, not on screen.
- I did not check that the code adds no quotes around {category} or {title}. The translations add «» around {category}, {q} and {item}, and around {title} only in "Claimed". I read the call sites for {item}, {title} and {q}, and none of them add quotes.
- No native-speaker or lawyer review; this is a machine-assisted draft.
- I did not check the translator's build script at /private/tmp/claude-501/-Users-muhengfan-project-arcade/5ed0df83-368a-4a38-8d5f-eaf281136f28/scratchpad/ru_build.py. If someone reruns it, it will undo the 2 fixes in this review, which were applied directly to ru.json.

## Update 2026-10-20 (later): context keys, "=0" forms, member since

Edited by one agent per language and checked by a second; `bun run i18n:check` passes for all 10 languages (424 keys) and for all 20 legal pages.

| Language | how it works step::Browse | item page heading::Queue | member since {date} |
|---|---|---|---|
| zh | 浏览 | 队列 | {date}加入 |
| zh-hant | 瀏覽 | 排隊清單 | {date}加入 |
| es | Explora | Fila de espera | miembro desde {date} |
| fr | Parcourir | File d'attente | membre depuis {date} |
| ar | تصفَّح | قائمة الانتظار | العضوية منذ {date} |
| tl | Mag-browse | Pila para sa item na ito | miyembro mula noong {date} |
| vi | Khám phá | Hàng chờ mượn | thành viên từ {date} |
| ko | 둘러보기 | 대기열 | {date} 가입 |
| pt | Explore | Fila | membro desde {date} |
| ru | Ищи | Очередь на эту вещь | дата регистрации: {date} |

- `{date}` is now Intl month and year (for example 2026年3月, mars 2026, март 2026 г.). ru changed from "на сайте с {date}" because "с" needs the genitive and Intl gives the nominative.
- "=0" forms were added to the five browse and queue count keys in every language (for example "Aucun objet", "Ningún artículo en {category}", "Твоя очередь пуста").
- Step titles now match each language's other step titles (es and pt imperative, ru imperative Ищи).

## ja (added 2026-10-21)

Built by one agent and reviewed key by key by a second, independent agent. `bun run i18n:check ja`: ok 432 keys. Register: sentences in です・ます; buttons, labels, tabs and badges in noun or dictionary form. Every character checked to encode in cp932 (no Simplified Chinese glyph forms). Machine-assisted; no native-speaker review.

**Reviewer fixes:**
- "{count} items" =0: changed 該当するアイテムはありません to アイテムはありません. This count line also shows when the browse page has no search or category filter, and 該当する ('matching') is wrong there (browse/page.tsx:64).
- "{count} items in your queue": removed the =0 branch (順番待ちリストは空です). The heading (queue-list.tsx:53) sits right above the empty state 順番待ちリストは空です。<link>..., so the same sentence appeared twice. Zero now falls into other: 順番待ちリスト：0件.
- "Community so far": changed これまでのコミュニティ to コミュニティのこれまで. The old wording can read as 'the community as it used to be'. This is the hidden heading over the home-page stats.
- "On loan. You're in line for when it comes back.": changed 返ってきたときのために、順番待ちに並んでいます to 返ってきたら借りられるよう、順番待ちに並んでいます. The old wording was a literal translation.
- "per loan": changed 貸し出し1回あたり to 1回あたり. It is a menu option in a w-36 (144px) select trigger (list-form.tsx:159), and at the 16px mobile font 9 characters plus padding and the icon do not fit, so the text gets cut off. The item card text "{amount} per loan" keeps 貸し出し1回あたり{amount}.
- "Returned damaged": changed 破損して返却 to 破損して返した. It is used only in profile-stats.tsx:14 with the hint 借り手として, so it now pairs with 破損して返ってきた (as lender) and with 貸した回数 / 借りた回数.

**Decided by the translator or reviewer:**
- I removed the =0 branch for the queue count instead of rewording it. The code shows its own empty-state sentence right below the heading, and =0 is optional (docs/i18n.md).
- I kept the =0 branches on the search and category counts ({q}, {category}). They match the pattern in zh, zh-hant and ko and read as normal Japanese status lines.
- I shortened the "per loan" menu option to 1回あたり to fit the 144px trigger. Next to the 1日あたり and 1週間あたり options and the fee field, its meaning stays clear.
- I left "Damage: {damage}" and "Damage price: {price}" as 弁償額：{...}. When the lender sets no charge, they show 弁償額：破損時の請求なし. That is a bit repetitive, but the English repeats in the same way.
- I left "Screen {step} of {total}" as {total}画面中{step}画面目 (adding 全 would also be fine) and "Fee period" as 利用料の単位.

**For native review or code follow-up:**
- Code decision: 削除済みアカウントさん. When the other person's account is deleted, the code puts t("Deleted account") into {name}, so the screen shows 削除済みアカウントさん. Affected: thread-view.tsx:46 ("{item} with {name}"), messages/page.tsx:67 ("{name} about {item}") and return-check.tsx:77 via profile/page.tsx:88. The decided register puts さん in the string, so I did not drop it. The fix is a code branch: a separate key for the deleted-account case, or don't use {name} there.
- Ellipsis on loading buttons: ja uses three plain dots (削除中..., 保存中...) as ja-terms.json and copy-ja 17.10 decide. Copy-ja makes that rule conditional on the codebase avoiding the ellipsis character, but en.json uses "…" (U+2026), and that character encodes in cp932 and is the normal mark in Japanese typography. Please confirm whether ja should switch to …
- Shared key "Too many tries. Please wait a few minutes and try again." uses 試行回数が多すぎます (copy 17.1, the login case). The same key also appears in the feedback form, where copy 19 has 送信回数が多すぎます. It needs a separate key in code, or a neutral wording a reviewer is happy with.
- "Declined" is お断り as the decided lender-side term, but the loan status badge (loan-status-badge.tsx) is also seen by the borrower. Please check that it sounds right from the borrower's side.
- The onboarding body uses 本サイト (from copy-ja 18.1) while the other UI strings say このサイト / サイト. This このサイト vs 本サイト question is still open from the copy reviews.
- The separator ・ replaces the English ' · ' in four strings, as the builder reported. I agree with the change; a reviewer can confirm it.


## Update 2026-10-21: Appearance / dark mode (11 keys, section 24)

- Values copied from section 24 of each `docs/copy-<code>.md` (translated and checked independently per language). `bun run i18n:check` passes with 447 keys.
- Punctuation follows each dictionary's existing convention, so two values differ slightly from the copy doc: zh uses a full-width colon (主题：{theme}, as in 最后更新：{date}) while `docs/copy-zh.md` uses half-width punctuation throughout; fr uses a no-break space before the colon (Thème\u00a0: {theme}), as in "Dernière mise à jour".
- The option descriptions are shown directly under the label (components/theme.tsx), so a description that starts with the label ("System follows ...") repeats it. ar, vi and tl use "Label: ..." for this; the other languages mirror the English. Native reviewers may prefer dropping the repeated label.
- The privacy local-storage sentence now mentions the theme choice (5号, 2026-10-21; stored only in localStorage, no cookie): Light or Dark is stored, and nothing is stored if the setting is left on System. It uses the section 24 labels. Updated in all 12 `docs/legal-drafts/<code>/privacy.md` and in section 15 of each copy doc. Still needs lawyer review.

## Update 2026-10-22: beta access page (7 keys, section 25)

- Values copied from section 25 of each `docs/copy-<code>.md` (translated and checked independently per language). `bun run i18n:check` passes with 454 keys.
- The intro key uses `{site}` where the copy docs write project-arcade. ko attaches 는 to `{site}` (project-arcade read as 프로젝트 아케이드, ending in a vowel); pt puts the article before it ("O {site}").
- "Checking…" uses the single ellipsis character, like the other loading labels in the dictionaries; the copy docs write three dots.
- Not in the dictionaries on purpose (1号, 2026-10-22): the "Don't have the password?" line (not on the page yet; contact address still a placeholder). Its translation stays in section 25 of the copy docs, marked "not on the page yet". The too-many-tries error was removed from section 25 in every language (no rate limit on this page, only a short fixed pause after a wrong password).
- tl keeps "Access password" in English (translator choice; native reviewer to confirm).

## Update 2026-10-23: What's new changelog (36 keys, section 26)

- Values copied from section 26 of each `docs/copy-<code>.md` (translated and checked independently per locale; every value appears word for word in that section, with project-arcade in place of `{site}`). `bun run i18n:check` passes with 490 keys.
- Kept as is in every locale: DELETE, project-arcade, pre-alpha (ja pre-alpha版), `{site}`. The System / Light / Dark labels and the Send feedback button name are the existing dictionary values.
- "What's new": zh 更新日志, zh-hant 更新紀錄, ja 更新情報, es Novedades, fr Nouveautés, ar ما الجديد, tl Ano ang bago, vi Có gì mới, ko 새 소식, pt Novidades, ru Что нового. Translator choices; no glossary row yet.
- New terms with no earlier use, for native review: full-width letters (zh 全角, zh-hant 全形, ko 전각 문자, ja, es letras de ancho completo, fr lettres pleine chasse, pt letras de largura total, ru полноширинными буквами, vi and ar with an English "(full-width)" gloss, tl full-width), home screen, back bar.
- Checker confidence: es and fr medium-high or high; zh, ja, pt medium to medium-high; zh-hant, ar, tl, vi, ko, ru medium. Headings and short labels ("Coming soon", "Private beta access", "Made for phones") are the least certain.
- fr: no-break spaces inside « » (fixed after the check, in both the dictionary and copy-fr.md).

## Update 2026-10-23 (later): section 26 corrections (6 keys replaced by 7)

- 5号 corrected six changelog lines in copy-en section 26 (theme button wording, the check-your-email page instead of account emails, DELETE with full-width letters, terms and privacy as unofficial translations, Send feedback is a link, welcome screens on first sign-in, tap vibration on its own line). The six old keys were removed from all 11 dictionaries and the seven new ones added; section 26 of each copy doc was updated to match. `bun run i18n:check` passes with 491 keys.
- Reused exactly: System / Light / Dark labels, "Send feedback", "Vibrate on tap" (as "tap vibration"), the "Check your email" page title, "Settings", and the "unofficial translation" wording of the section 21 notice.
- es uses "pantallas de introducción" for welcome screens (as in the privacy text and section 18.1); pt uses "faz login" for sign in, so the line cannot be read as "first visit".

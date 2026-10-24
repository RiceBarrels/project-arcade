---
title: Patakaran sa Privacy
updated: 2026-10-20
---

::: draft
**BORADOR — kailangang suriin ng abogado.** Makatotohanang paglalarawan ng kung paano gumagana ang site, nakasulat bilang teksto sa simpleng wika, hindi legal na payo. Ang mga bahaging may markang **[TO CONFIRM]** (kukumpirmahin pa) ay hindi pa nakukumpirma ng may-ari. Huwag i-publish hangga't hindi pa nakukumpirma at nasusuri.
:::

::: summary
**Ang maikling bersyon:** Kinokolekta namin ang kailangan namin para patakbuhin ang pahiraman, iniimbak ito sa aming database provider, at hindi namin ito ginagamit para sa advertising.
:::

## Ano ang kinokolekta namin

- **Detalye ng account:** ang email address ninyo (bineberipika sa sign-up) at ang impormasyon sa pag-sign in.
- **Profile:** display name, lungsod o lugar, at anumang iba pang detalye ng profile na pipiliin ninyong idagdag.
- **Mga listing:** mga pamagat, paglalarawan, kategorya, kondisyon, lugar ng kuhaan, mga presyong itinakda ninyo (bayad at bayad-pinsala), at ang mga litratong ina-upload ninyo.
- **Mga rekord ng panghihiram:** mga request, puwesto sa pila, mga pag-apruba, mga marka sa abutan at pagbabalik (maayos o sira), at mga kaugnay na tala.
- **Mga report:** mga report na ipinapadala ninyo, at mga report tungkol sa inyo o sa mga listing ninyo.
- **Feedback:** kung gagamitin ninyo ang "Magpadala ng feedback", iniimbak namin ang mensahe ninyo, ang uring pinili ninyo (bug, ideya, o iba pa), ang page na kinaroroonan ninyo noon, at maikling tala tungkol sa browser ninyo. Kung naka-sign in kayo, naka-link ito sa account ninyo. Kung maglalagay kayo ng contact para sa pagsagot, iniimbak din namin iyon. [TO CONFIRM: eksaktong mga field, batay sa supabase/08-feedback.sql, na hindi pa umiiral noong isinulat ito.]
- **Batayang teknikal na data:** kapag bumibisita kayo, pinoproseso ng aming mga provider ng hosting at analytics ang batayang teknikal na impormasyon, gaya ng mga page na tinitingnan ninyo, ang inyong tinatayang lokasyon (bansa o rehiyon), at ang uri ng browser at device ninyo. Tingnan ang "Analytics at cookies" sa ibaba. [TO CONFIRM: kung paano hinahawakan ng Vercel at Supabase ang server logs at IP address. NEEDS REVIEW.]

## Saan ito iniimbak

Iniimbak ang inyong account, profile, mga listing, mga rekord ng panghihiram, at mga litrato sa Supabase (database, authentication, at file storage). Nakaimbak ang data sa Canada (Supabase region ca-central-1). Naka-host ang website sa Vercel.

## Ano ang nakikita ng ibang user

Nakikita ng ibang user ang pampublikong profile ninyo. Ipinapakita rito ang display name ninyo, ang lungsod o lugar ninyo (kung maglalagay kayo nito), ang bio ninyo, ang buwan at taon ng pagsali ninyo, at ang mga listing ninyo kasama ang mga litrato nito. Ipinapakita rin dito ang mga simpleng bilang: kung ilang item ang na-list, naipahiram at nahiram ninyo, ilan ang naibalik nang maayos, at ilan ang nasira o nawala (bilang nagpapahiram at bilang nanghihiram). Hindi nito inililista kung kanino kayo nagpahiram o kung kanino kayo nanghiram. [NEEDS REVIEW: sinuri batay sa components/profile-stats.tsx at sa page ng profile noong 2026-10-20; suriin ulit kapag nagbago ang profile.] Hindi dapat ilagay sa mga listing ang eksaktong address ninyo. Hindi kailanman ipinapakita sa publiko ang email address ninyo. Kapag naaprubahan na ang isang request, nag-uugnayan lang ang nagpapahiram at ang nanghihiram sa pamamagitan ng mga mensahe sa loob ng site.

## Analytics at cookies (BORADOR, kailangang suriin)

Gumagamit kami ng Vercel Web Analytics para bilangin ang mga pagbisita sa mga page, para makita namin kung aling mga bahagi ng site ang ginagamit. Batay sa dokumentasyon ng Vercel (docs na "Privacy and Compliance", huling na-update noong 2026-06-26):
- Hindi ito gumagamit ng third-party cookies. Pinagkakaiba ang mga bisita sa pamamagitan ng hash na ginagawa mula sa papasok na request.
- Hindi permanenteng iniimbak ang impormasyon tungkol sa session ng bisita; itinatapon ito pagkalipas ng 24 na oras.
- Hindi ito nangongolekta ng impormasyong magbibigay-daan sa sinuman na sundan kayo sa iba't ibang website o app, at ginagamit lang ito para sa pinagsama-samang estadistika.
- Puwedeng kasama sa bawat page view ang mga sumusunod: ang oras, ang path ng page, ang page na pinanggalingan, ang tinatayang lokasyon (bansa, rehiyon, lungsod), ang operating system at bersyon nito, ang browser at bersyon nito, at ang uri ng device (mobile, tablet o desktop).

Bago ipadala ang isang page view, inaalis namin sa path ng page ang mga ID ng item, ng hiraman at ng profile, at inaalis namin ang mga query parameter at anumang kasunod ng simbolong #. Hindi kailanman nire-report ang mga link mula sa aming mga email (ang mga page na /auth/... na nagbubukas kapag nag-click kayo sa link para sa pag-sign up o sa pag-reset ng password), at para sa ibang mga page, ang path lamang ang nire-report, gaya ng /en/login. Hindi namin ipinapadala ang inyong user ID. Hindi namin mababago ang page na pinanggalingan, na kusang isinasama ng analytics tool. [NEEDS REVIEW: batay sa pagsusuri ng builder sa code noong 2026-10-20.]

Hindi namin ito ginagamit para magpakita ng ads, at hindi namin ito ibinebenta.

Cookies: ang itinatakda lang ng site ay ang mga cookies na kailangan nito para gumana (dalawang uri, at may ikatlo habang nasa pribadong beta).
- Pinapanatili kayong naka-sign in ng isang cookie para sa pag-sign in, na itinatakda ng aming provider ng pag-sign in (Supabase). Puwede itong hatiin sa ilang bahagi.
- Tinatandaan ng isang cookie para sa wika ang wikang pinili ninyo. Tumatagal ito nang 1 taon.
- Habang naka-on ang password ng pribadong beta, tinatandaan ng isang access cookie na tinatawag na pa_access na nailagay na ninyo ang password. Tumatagal ito nang 30 araw at wala itong personal na impormasyon. Hindi na namin ito itinatakda kapag naka-off na ang password. [NEEDS REVIEW: ang pangalan ng cookie, ang 30 araw na itinatagal nito at ang "habang naka-on lang ang password" ay mula sa brief ng koordinador, at hindi pa nasusuri sa code.]

Iniimbak din ng site ang inyong setting na "Mag-vibrate kapag nag-tap", ang napili ninyong tema (Maliwanag o Madilim; walang iniimbak kung iiwan ninyo ito sa System) at ang progreso ninyo sa mga screen ng onboarding sa local storage ng inyong browser, sa sarili ninyong device. Hindi ito cookie at hindi ito ipinapadala sa amin.

Hindi kami nagtatakda ng cookies para sa advertising o para sa cross-site tracking (pagsubaybay sa iba't ibang site). [NEEDS REVIEW: batay sa pagsusuri ng builder sa code noong 2026-10-20; suriin ulit kapag may idinagdag.]

[TO CONFIRM: mula sa Vercel o sa dashboard, dahil hindi ito nakasaad sa pahina ng dokumentasyon sa itaas: (1) kung iniimbak ang mga IP address o ginagamit lang nang sandali para matukoy ang tinatayang lokasyon; (2) gaano katagal iniingatan ang pinagsama-samang data ng analytics; (3) kung saan iniimbak at pinoproseso ang data ng analytics. Huwag mag-publish ng anumang pahayag tungkol sa mga ito hangga't hindi pa nasusuri.]

## Paano namin ito ginagamit

Para patakbuhin ang site: ipakita ang mga listing, pamahalaan ang mga pila at request, hayaang makapag-ugnayan ang mga nagpapahiram at nanghihiram, asikasuhin ang mga report, at panatilihing ligtas ang site.

## Ano ang hindi namin ginagawa

- Hindi namin ibinebenta ang data ninyo.
- Hindi kami nagpapakita ng ads.
- Walang tinatanggap na bayad ang site, kaya hindi kami nangongolekta ng detalye ng card o bangko.

## Pagbabahagi

Ibinabahagi namin ang data sa mga service provider na kailangan para patakbuhin ang site (gaya ng mga provider ng database at hosting). Puwede kaming magbunyag ng impormasyon kung hinihingi ng batas. [TO CONFIRM / abogado: kumpletong listahan ng mga processor.]

**Paghahatid ng email (Resend) (BORADOR, kailangang suriin).** Ginagamit namin ang Resend para magpadala ng mga email para sa inyong account: pag-verify ng inyong email, pag-reset ng inyong password, at mga abiso tungkol sa seguridad. Nanggagaling ang mga email na ito sa no-reply@project-arcade.ricebarrel.com. Para maipadala ang mga ito, natatanggap ng Resend ang inyong email address at ang nilalaman ng mensahe. Ginagamit lang namin ang Resend para magpadala ng mga email na may kaugnayan sa inyong account, at natatanggap lang ng Resend ang inyong email address para sa layuning iyon. Hindi kami nagpapadala ng mga email para sa marketing. Ayon sa patakaran sa privacy ng Resend, inililipat nito ang data sa United States at doon ito pinoproseso. [TO CONFIRM: mula sa Resend: (1) kung kumikilos ang Resend bilang aming processor at kung may umiiral na data processing agreement (kasunduan sa pagproseso ng data); (2) gaano katagal iniingatan ng Resend ang nilalaman ng mga naipadalang email at ang mga log (walang binabanggit na panahon ang patakaran nito sa privacy); (3) ang mga sub-processor ng Resend (inililista nito ang mga ito sa resend.com/legal/subprocessors). Susuriin ng abogado ang pananalita tungkol sa paglilipat ng data sa ibang bansa.]

## Pag-iingat at pagbura ng data

*Feedback:* kung buburahin ninyo ang inyong account, pinapanatili ang feedback ninyo pero hindi na ito naka-link sa inyo. [TO CONFIRM: tugma sa `user_id ON DELETE SET NULL` sa supabase/08-feedback.sql; ang panahon ng pag-iingat, at kung binubura rin ang contact para sa pagsagot.]

Puwede ninyong burahin ang inyong account nang kayo mismo sa settings ng account ninyo. Kapag ginawa ninyo ito, mabubura ang profile ninyo, ang mga item ninyo at ang mga litrato nito, at ang puwesto ninyo sa mga pila. Isasara ang mga nakabinbin at naaprubahan ninyong request, at papalitan ng "[message removed]" ang teksto ng mga mensaheng ipinadala ninyo. Ang mga rekord ng panghihiram (pangalan ng item, mga petsa, bayad-pinsala, mga tala tungkol sa pinsala, at status), ang mga mensaheng ipinadala ng kabilang tao sa mga usapan ninyo, at ang mga report ay pinapanatili, pero hindi na naka-link sa inyo. Hindi ninyo mabubura ang inyong account habang may mga item kayong kasalukuyang naiabot na. [TO CONFIRM: gaano katagal iniingatan ang mga log at ang mga pinanatiling rekord. Susuriin ng abogado ang anumang legal na pangangailangan sa pag-iingat ng data. Batay sa supabase/05-messages-and-deletion.sql, na hindi pa napapatakbo.]

## Ang inyong mga pagpipilian

Puwede ninyong i-edit ang inyong profile at mga listing sa app, at burahin ang inyong account anumang oras. Para sa iba pang tanong tungkol sa data ninyo, makipag-ugnayan po kayo sa amin sa [contact email].

## Edad

Para sa mga taong 18 taong gulang o higit pa ang site. Hindi kami sadyang nangongolekta ng data mula sa sinumang wala pang 18.

## Mga pagbabago

Puwede naming i-update ang patakarang ito, at papalitan namin ang petsa sa itaas kapag ginawa namin ito.

## Makipag-ugnayan

[contact email]

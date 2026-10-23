---
title: Política de privacidad
updated: 2026-10-20
---

::: draft
**BORRADOR: necesita revisión de un abogado.** Descripción factual de cómo funciona el sitio, escrita como texto en lenguaje sencillo, no como asesoría legal. Los puntos marcados con **[TO CONFIRM]** (por confirmar) todavía no los ha confirmado el responsable del sitio. No publicar hasta que estén confirmados y revisados.
:::

::: summary
**La versión corta:** Recopilamos lo que necesitamos para operar la biblioteca de préstamos, lo guardamos con nuestro proveedor de base de datos y no lo usamos para publicidad.
:::

## Qué recopilamos

- **Datos de la cuenta:** su dirección de correo electrónico (verificada al registrarse) y su información de inicio de sesión.
- **Perfil:** nombre visible, ciudad o zona, y cualquier otro dato del perfil que decida agregar.
- **Publicaciones:** títulos, descripciones, categorías, estado, zona de recogida, los precios que fija (tarifa y precio por daños) y las fotos que sube.
- **Registros de préstamos:** solicitudes, lugares en la fila, aprobaciones, marcas de entrega y de devolución (en buen estado o dañado) y las notas relacionadas.
- **Reportes:** los reportes que envía y los reportes hechos sobre usted o sus publicaciones.
- **Comentarios:** si usa Enviar comentarios, guardamos su mensaje, el tipo que eligió (error, idea u otro), la página en la que estaba y una nota breve sobre su navegador. Si inició sesión, sus comentarios se vinculan a su cuenta. Si agrega un contacto para respuesta, también lo guardamos. [TO CONFIRM: campos exactos, según supabase/08-feedback.sql, que todavía no existía cuando se escribió esto.]
- **Datos técnicos básicos:** cuando usted visita el sitio, nuestros proveedores de alojamiento y de analítica procesan información técnica básica, como las páginas que ve, su ubicación aproximada (país o región) y el tipo de navegador y de dispositivo que usa. Consulte «Analítica y cookies» más abajo. [TO CONFIRM: registros del servidor y manejo de la dirección IP por parte de Vercel y Supabase. NEEDS REVIEW.]

## Dónde se guarda

Su cuenta, su perfil, sus publicaciones, sus registros de préstamos y sus fotos se guardan con Supabase (base de datos, autenticación y almacenamiento de archivos). Los datos se guardan en Canadá (región de Supabase ca-central-1). El sitio web está alojado en Vercel.

## Qué pueden ver otros usuarios

Su perfil público es visible para otros usuarios. Muestra su nombre visible, su ciudad o zona (si la agrega), su biografía, el mes y el año en que se unió, y sus publicaciones con sus fotos. También muestra conteos simples: cuántos artículos ha publicado, prestado y pedido prestados, cuántos volvieron en buen estado y cuántos resultaron dañados o perdidos (como prestador y como prestatario). No indica a quién le prestó ni a quién le pidió prestado. [NEEDS REVIEW: verificado con components/profile-stats.tsx y la página del perfil el 2026-10-20; hay que volver a verificarlo si el perfil cambia.] Su dirección exacta no debe ponerse en las publicaciones. Su dirección de correo electrónico nunca se muestra públicamente. Una vez aprobada una solicitud, el prestador y el prestatario se comunican solo a través de los mensajes internos del sitio.

## Analítica y cookies (BORRADOR, necesita revisión)

Usamos Vercel Web Analytics para contar las visitas a las páginas, de modo que podamos ver qué partes del sitio se usan. Según la documentación de Vercel (página de la documentación «Privacy and Compliance», última actualización: 2026-06-26):
- No usa cookies de terceros. Los visitantes se distinguen mediante un hash creado a partir de la solicitud entrante.
- La información de la sesión del visitante no se guarda de forma permanente; se descarta después de 24 horas.
- No recopila información que permita a alguien seguirlo a usted entre distintos sitios web o aplicaciones, y se usa solo para estadísticas combinadas.
- Cada vista de página puede incluir: la hora, la ruta de la página, la página de referencia, la ubicación aproximada (país, región, ciudad), el sistema operativo y su versión, el navegador y su versión, y el tipo de dispositivo (móvil, tableta o computadora de escritorio).

Antes de enviar una vista de página, quitamos de la ruta de la página los ID de artículos, de préstamos y de perfiles, y quitamos los parámetros de consulta y todo lo que va después de un signo #. Los enlaces de nuestros correos (las páginas /auth/... que se abren cuando usted hace clic en un enlace para registrarse o para restablecer su contraseña) no se envían en absoluto, y las demás páginas se envían solo con la ruta de cada página, por ejemplo /en/login. No enviamos su ID de usuario. No podemos cambiar la página de referencia, que la herramienta de analítica incluye por sí sola. [NEEDS REVIEW: basado en la revisión del código que hizo el desarrollador el 2026-10-20.]

No usamos esto para mostrar anuncios y no lo vendemos.

Cookies: el sitio establece dos tipos de cookies, y ambos son necesarios para que funcione.
- Una cookie de inicio de sesión, establecida por nuestro proveedor de inicio de sesión (Supabase), mantiene su sesión iniciada. Puede dividirse en varias partes.
- Una cookie de idioma recuerda el idioma que usted eligió. Dura 1 año.

El sitio también guarda su configuración de «Vibrar al tocar», su elección de tema (Claro u Oscuro; si lo deja en Sistema, no se guarda nada) y su avance en las pantallas de introducción en el almacenamiento local de su navegador, en su propio dispositivo. Esto no es una cookie y no se nos envía.

No establecemos cookies publicitarias ni cookies de seguimiento entre sitios. [NEEDS REVIEW: basado en la revisión del código que hizo el desarrollador el 2026-10-20; hay que volver a verificarlo cuando se agregue algo.]

[TO CONFIRM: con Vercel o en el panel de control, ya que no se indica en la página de la documentación citada arriba: (1) si las direcciones IP se guardan o solo se usan brevemente para calcular la ubicación aproximada; (2) cuánto tiempo se conservan los datos de analítica agregados; (3) dónde se guardan y procesan los datos de analítica. No publicar ninguna afirmación sobre estos puntos hasta verificarlos.]

## Cómo lo usamos

Para operar el sitio: mostrar publicaciones, gestionar filas y solicitudes, permitir que prestadores y prestatarios se comuniquen, atender reportes y mantener el sitio seguro.

## Qué no hacemos

- No vendemos sus datos.
- No mostramos anuncios.
- El sitio no recibe pagos, así que no recopilamos datos de tarjetas ni de cuentas bancarias.

## Compartir datos

Compartimos datos con los proveedores de servicios necesarios para operar el sitio (como los proveedores de base de datos y de alojamiento). Podemos divulgar información si la ley lo exige. [TO CONFIRM / abogado: lista completa de encargados del tratamiento de datos.]

**Envío de correos electrónicos (Resend) (BORRADOR, necesita revisión).** Usamos Resend para enviar los correos electrónicos relacionados con su cuenta: la verificación de su correo electrónico, el restablecimiento de su contraseña y los avisos de seguridad. Estos correos provienen de no-reply@project-arcade.ricebarrel.com. Para enviarlos, Resend recibe su dirección de correo electrónico y el contenido del mensaje. Usamos Resend solo para enviar correos electrónicos relacionados con su cuenta, y Resend recibe su dirección de correo electrónico únicamente con ese fin. No enviamos correos de marketing. La política de privacidad de Resend indica que transfiere datos a los Estados Unidos y los procesa allí. [TO CONFIRM: con Resend: (1) si Resend actúa como nuestro encargado del tratamiento de datos y si existe un acuerdo de tratamiento de datos; (2) cuánto tiempo conserva Resend el contenido y los registros de los correos enviados (su política de privacidad no indica ningún plazo); (3) los subencargados del tratamiento de Resend (los enumera en resend.com/legal/subprocessors). El abogado debe revisar la redacción sobre transferencias internacionales.]

## Conservación y eliminación de datos

*Comentarios:* si elimina su cuenta, sus comentarios se conservan, pero ya no están vinculados a usted. [TO CONFIRM: coincide con `user_id ON DELETE SET NULL` en supabase/08-feedback.sql; falta definir el plazo de conservación y si también se elimina el contacto para respuesta.]

Puede eliminar su cuenta usted mismo en la configuración de su cuenta. Cuando lo hace, se eliminan su perfil, sus artículos y las fotos de estos, y su lugar en las filas. Sus solicitudes pendientes y aprobadas se cierran, y el texto de los mensajes que envió se reemplaza por «[message removed]». Los registros de préstamos (nombre del artículo, fechas, precio por daños, notas de daños y estado), los mensajes que la otra persona envió en sus conversaciones y los reportes se conservan, pero ya no están vinculados a usted. No puede eliminar su cuenta mientras tenga artículos entregados en este momento. [TO CONFIRM: cuánto tiempo se conservan los registros del servidor y los registros guardados. El abogado debe revisar si hay obligaciones legales de conservación. Basado en supabase/05-messages-and-deletion.sql, que todavía no se ha ejecutado.]

## Sus opciones

Puede editar su perfil y sus publicaciones en la aplicación, y eliminar su cuenta en cualquier momento. Para otras preguntas sobre sus datos, escríbanos a [contact email].

## Edad

El sitio es para personas de 18 años o más. No recopilamos a sabiendas datos de menores de 18 años.

## Cambios

Podemos actualizar esta política y, cuando lo hagamos, cambiaremos la fecha de arriba.

## Contacto

[contact email]
